import React, { createRef, memo, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import SectionService from '../../API/SectionService';
import Loader from '../../components/UI/loader/Loader';
import { useFetching } from '../../hooks/fetching';
import ISection from './../../types/ISection';
import cl from './section.module.scss'
import PlaylistBlock from './../home/playlistBlock/playlistBlock';

let observer: MutationObserver

const Section = memo(() => {
  const sectionId = useParams().id || ''
  const [section, setSection] = useState<ISection>({} as ISection)
  const playlistSectionRef = createRef<HTMLDivElement>()
  
  const [fetchSection, isSectionLoading, fetchSectionError] = useFetching(async () => {
    const fetchedSection = await SectionService.getSectionById(sectionId);
    setSection(fetchedSection)
    observer = new MutationObserver(mutationRecords => {
      const sectionBlock = mutationRecords[mutationRecords.length - 1].target as HTMLElement
      let isA = true;
      sectionBlock.childNodes.forEach(item => {
        if (item.nodeName.toLowerCase() !== 'a') isA = false
      })

      if (isA) {
        const sectionWidth = sectionBlock.clientWidth
        const a = sectionBlock.childNodes[0] as HTMLElement
        const countInRow = Math.floor((sectionWidth + 30) / (a.clientWidth + 30))
        if (countInRow < sectionBlock.childNodes.length) {
          sectionBlock.childNodes.forEach(item => {
            const link = item as HTMLElement
            const additionalWidth = Math.floor((sectionWidth - ((a.clientWidth + 30) * countInRow) + 30) / countInRow)
            link.style.height = Math.floor(a.clientHeight) + additionalWidth + 'px'
            link.style.width = Math.floor(a.clientWidth) + additionalWidth + 'px'  
          })
        }
      }
    });
  })

  useEffect(() => {
    fetchSection()        
  }, []);

  useEffect(() => {
    if (playlistSectionRef.current && section?.playlists?.length) {
      observer.observe(playlistSectionRef.current, { childList: true })
    }

    return () => {
      if (observer) observer.disconnect()
    }
  }, [isSectionLoading])

  if (isSectionLoading) 
    return (
      <Loader />
    )
  
  return (
    <div className={cl.container}>
      <div className={cl.section} ref={playlistSectionRef}>
        {
          section.playlists?.map(id =>
            <PlaylistBlock
              key={id}
              playlistId={id}
            />
          )
        }
      </div>
    </div>
  )
})

export default Section