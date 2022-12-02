import React, { createRef, memo, useEffect, useState } from 'react'
import PlaylistService from '../../API/PlaylistService'
import Loader from '../../components/UI/loader/Loader'
import { useFetching } from '../../hooks/fetching'
import { useAppSeletor } from '../../hooks/redux'
import IPlaylist from '../../types/IPlaylist'
import PlaylistBlock from '../home/playlistBlock/playlistBlock'
import cl from './genres.module.scss'

let observer: MutationObserver

const Genres = memo(() => {
  const [playlists, setPlaylists] = useState<IPlaylist[]>([])
  const playlistSectionRef = createRef<HTMLDivElement>()

  const [fetchPlaylists, isPlaylistsLoading, fetchPlaylistsError] = useFetching(async () => {
    const fetchedPlaylists = await PlaylistService.getAllPlaylists()
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

  if (isPlaylistsLoading)
    return <Loader/>
  
  return (
    <div className={cl.container}>
      <h2 className={cl.title}>Browse all playlists</h2>
      <section className={cl.content} ref={playlistSectionRef}>
        {
          playlists.map((playlist) =>
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

export default Genres