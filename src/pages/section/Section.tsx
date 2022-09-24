import React, { memo, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import SectionService from '../../API/SectionService';
import Loader from '../../components/UI/loader/Loader';
import { useFetching } from '../../hooks/fetching';
import ISection from './../../types/ISection';
import cl from './section.module.scss'
import PlaylistBlock from './../home/playlistBlock/playlistBlock';

const Section = memo(() => {
  const sectionId = useParams().id || ''
  const [section, setSection] = useState<ISection>({} as ISection)
  const [fetchSection, isSectionLoading, fetchSectionError] = useFetching(async () => {
    const fetchedSection = await SectionService.getSectionById(sectionId);
    setSection(fetchedSection)
  })

  useEffect(() => {
    fetchSection()
  }, []);

  if (isSectionLoading) {
    return (
      <Loader />
    )
  }
  
  return (
    <div className={cl.container}>
      {
        section.playlists.map( id => 
          <PlaylistBlock
            key={id}
            className={cl.playlist}
            playlistId={id}
          />
        )
      }
    </div>
  )
})

export default Section