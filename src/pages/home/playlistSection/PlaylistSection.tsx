import React, { createRef, memo, useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { useSyncLinkToArrowNav } from '../../../hooks/syncLinkToArrowNav';
import classNameCheck from '../../../scrtipts/classNameCheck';
import BaseProps from '../../../types/BaseProps';
import ISection from '../../../types/ISection';
import PlaylistBlock from '../playlistBlock/playlistBlock';
import cl from './playlistSection.module.css'

interface Props extends BaseProps {
  section: ISection,
  playlistsId: string[],
}

const PlaylistSection = memo(({ className, section, playlistsId }: Props) => {
  const sync = useSyncLinkToArrowNav()
  const sectionRef = createRef<HTMLDivElement>()
  const [playlistsCount, setPlaylistsCount] = useState<number>(1)

  useEffect(() => {
    let count = 1;
    if (sectionRef.current) {
      count = Math.floor((sectionRef.current.clientWidth + 25) / 265)
      setPlaylistsCount(count)
    }    
  }, [])

  return (
    <div className={`${cl.section} ${classNameCheck(className)}`} ref={sectionRef}>
      <div className={cl.header}>
        <Link
          className={cl.title}
          to={`section/${section._id}`}
          onClick={sync}
        >
          <h2>{section.title}</h2>
        </Link>
        <Link
          className={cl.link}
          to={`section/${section._id}`}
          onClick={sync}
        >
          See All
        </Link>
      </div>
      <div 
        className={cl.content} 
      >
        {
          
          playlistsId.slice(0, Math.min(playlistsCount, playlistsId.length)).map((id) =>
            <PlaylistBlock
              key={id}
              className={cl.block}
              playlistId={id}
            />
          )
        }
      </div>
    </div>
  )
})

export default PlaylistSection
