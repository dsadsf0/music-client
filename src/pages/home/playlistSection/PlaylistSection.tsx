import React, { createRef, memo, useEffect, useState } from 'react'
import classNameCheck from '../../../scrtipts/classNameCheck';
import BaseProps from '../../../types/BaseProps';
import ISection from '../../../types/ISection';
import PlaylistBlock from '../playlistBlock/playlistBlock';
import cl from './playlistSection.module.css'
import LinkStd from './../../../components/UI/links/LinkStd';
import mainRoutes from './../../../routes/mainRoutes';

interface Props extends BaseProps {
  section: ISection,
  playlistsId: string[],
}

const PlaylistSection = memo(({ className, section, playlistsId }: Props) => {
  const sectionRef = createRef<HTMLDivElement>()
  const [playlistsCount, setPlaylistsCount] = useState<number>(1)

  useEffect(() => {
    if (sectionRef.current) {      
      const count = Math.floor((sectionRef.current.clientWidth + 25) / 261)
      setPlaylistsCount(count)
    }    
  }, [sectionRef])

  return (
    <div className={`${cl.section} ${classNameCheck(className)}`} ref={sectionRef}>
      <div className={cl.header}>
        <LinkStd
          className={cl.title}
          to={`${mainRoutes.section}/${section._id}`}
        >
          <h2>{section.title}</h2>
        </LinkStd>
        <LinkStd
          className={cl.link}
          to={`${mainRoutes.section}/${section._id}`}
        >
          See All
        </LinkStd>
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
