import React, { createRef, memo, useEffect, useState } from 'react';
import SectionService from '../../API/SectionService';
import Loader from '../../components/UI/loader/Loader';
import { useFetching } from '../../hooks/fetching';
import ISection from '../../types/ISection';
import cl from './home.module.css'
import PlaylistSection from './playlistSection/PlaylistSection';

const Home = memo(() => {
  const [sections, setSections] = useState<ISection[]>([])

  const [fetchSections, isSectionsLoading, fetchSectionsError] = useFetching(async () => {
    const fetchedSections = await SectionService.getAllSections();
    setSections(fetchedSections)
  })

  useEffect(() => {
    fetchSections();
  }, []);

  if (isSectionsLoading) {
    return (
      <Loader />
    )
  }

  if (fetchSectionsError) {
    return (
      <h1 className={cl.error}>Loading Error</h1>
    )
  }

  return (
    <div className={cl.container}>
      {
        sections.map(section =>
          <PlaylistSection
            key={section._id}
            section={section}
            className={cl.section}
            playlistsId={section.playlists}
          />
        )
      }
    </div>
  )
})

export default Home