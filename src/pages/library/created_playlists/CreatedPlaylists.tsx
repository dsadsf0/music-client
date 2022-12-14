import React, { createRef, memo, useEffect } from 'react'
import { useAppSeletor } from '../../../hooks/redux'
import PlaylistBlock from '../../home/playlistBlock/playlistBlock'
import cl from './createdPlaylists.module.scss'

let observer: MutationObserver

const CreatedPlaylists = memo(() => {

  const { user } = useAppSeletor(state => state.auth)
  const playlistSectionRef = createRef<HTMLDivElement>()
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

      if (countInRow < user.likedPlaylists.length) {
        section.childNodes.forEach(item => {
          const link = item as HTMLElement
          const additionalWidth = Math.floor((sectionWidth - ((a.clientWidth + 30) * countInRow) + 30) / countInRow)
          link.style.height = Math.ceil(a.clientHeight) + additionalWidth + 'px'
          link.style.width = Math.ceil(a.clientWidth) + additionalWidth + 'px'
        })
      }
    }

  })

  useEffect(() => {
    if (playlistSectionRef.current) {
      observer.observe(playlistSectionRef.current, { childList: true })
    }

    return () => {
      observer.disconnect()
    }
  }, [])

  if (!user.createdPlaylists.length) return (
    <h2 className={cl.notFound}>You haven't created any playlists yet</h2>
  )

  return (
    <div className={cl.container}>
      <section className={cl.content} ref={playlistSectionRef}>
        {
          user.createdPlaylists.map((playlist) =>
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

export default CreatedPlaylists