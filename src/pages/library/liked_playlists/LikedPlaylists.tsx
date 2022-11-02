import React, { createRef, memo, useEffect, useState } from 'react'
import { Navigate } from 'react-router-dom'
import cl from './likedPlaylists.module.scss'
import { useAppSeletor } from '../../../hooks/redux';
import PlaylistBlock from '../../home/playlistBlock/playlistBlock';
import mainRoutes from '../../../routes/mainRoutes';
import BaseProps from '../../../types/BaseProps';
import classNameCheck from '../../../scrtipts/classNameCheck';
import IPlaylist from '../../../types/IPlaylist';
import PlaylistService from '../../../API/PlaylistService';
import { useFetching } from '../../../hooks/fetching';
import Loader from '../../../components/UI/loader/Loader';

let observer: MutationObserver

const LikedPlaylists = memo(({className}: BaseProps) => {

  const { isAuth, user } = useAppSeletor(state => state.auth) 
  const [playlists, setPlaylists] = useState<IPlaylist[]>([])

  const playlistSectionRef = createRef<HTMLDivElement>()
  const [fetchPlaylists, isPlaylistsLoading, fetchPlaylistsError] = useFetching(async () => {
    const fetchedPlaylists = await PlaylistService.getLikedPlaylists()
    setPlaylists(fetchedPlaylists)
    observer = new MutationObserver(mutationRecords => {
      const section = mutationRecords[mutationRecords.length - 1].target as HTMLElement
      let isA = true;
      section.childNodes.forEach(item => {
        if (item.nodeName.toLowerCase() !== 'a') isA = false
      })

      if (isA) {
        const sectionWidth = section.clientWidth
        const a = section.childNodes[0] as HTMLElement
        const countInRow = Math.floor((sectionWidth + 30) / (a.clientWidth + 30))

        if (countInRow < section.childNodes.length) {
          section.childNodes.forEach(item => {
            const link = item as HTMLElement
            const additionalWidth = Math.floor((sectionWidth - ((a.clientWidth + 30) * countInRow) + 30) / countInRow)
            link.style.height = Math.ceil(a.clientHeight) + additionalWidth + 'px'
            link.style.width = Math.ceil(a.clientWidth) + additionalWidth + 'px'

          })
        }
      }
    });
  })

  useEffect(() => {
    fetchPlaylists()
  }, [])

  useEffect(() => {
    if (playlistSectionRef.current && playlists.length) {
      observer.observe(playlistSectionRef.current, { childList: true })
    }

    return () => {
      if (observer) observer.disconnect()
    }
  }, [isPlaylistsLoading])

  if (!isAuth)
    return <Navigate to={mainRoutes.login} replace={true} />

  if (isPlaylistsLoading)
    return <Loader />

  if (!playlists.length) return(
    <h2 className={cl.notFound}>You haven't liked any playlists yet</h2>
  )
    
  return (
    <div className={`${cl.container} ${classNameCheck(className)}`}>
      <section className={cl.content} ref={playlistSectionRef}>
        {
          user.likedPlaylists.map((playlist) =>
            <PlaylistBlock
              key={playlist._id}
              className={cl.playlistBlock}
              playlistId={playlist._id}
            />
          )
        }
      </section>
    </div>
  )
})

export default LikedPlaylists