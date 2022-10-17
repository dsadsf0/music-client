import React, { createRef, memo, useState } from 'react'
import FileInput from '../../components/UI/inputs/FileInput'
import cl from './createPlaylist.module.scss'

const CreatePlaylist = memo(() => {

  const [coverImage, setCoverImage] = useState<File>()
  const [coverErrors, setCoverErrors] = useState<string>('')
  const coverInputRef = createRef<HTMLInputElement>()

  const [songFile, setSongFile] = useState<File>()
  const [songFileErrors, setSongFileErrors] = useState<string>('')
  const songInputRef = createRef<HTMLInputElement>()

  const validateInputFile = (fileTypes: string[], file: File, setFile: (f: File | undefined) => void, setError: (s: string) => void ) => {    
    if (fileTypes.includes(file.type)) {
      setFile(file)
      setError('')
    } else {
      setError('Wrong file')
      setFile(undefined)
    } 
  }

  const coverImageInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (files && files[0]) {
      validateInputFile(['image/jpeg', 'image/webp', 'image/png'], files[0], setCoverImage, setCoverErrors)
    }         
  }

  const coverInputClick = (e: React.MouseEvent) => {
    e.preventDefault()
    coverInputRef.current?.click()
  }

  const songInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (files && files[0]) {
      validateInputFile(['audio/mp3', 'audio/wav'], files[0], setSongFile, setSongFileErrors)
    }
  }

  const songInputClick = (e: React.MouseEvent) => {
    e.preventDefault()
    songInputRef.current?.click()
  }

  return (
    <div className={cl.container}>
      <form className={cl.form} method='post' onSubmit={e => e.preventDefault()}>
        <h2 className={cl.title}>Upload Song</h2>
        <div className={cl.fileInput}>
          <button
            className={`${cl.inputBtn} ${coverImage && !coverErrors ? cl._good : coverErrors ? cl._error : ''}`}
            onClick={coverInputClick}
          >
            Choose cover image
          </button>
          <FileInput
            className={cl.input}
            ref={coverInputRef}
            accept='image/jpeg, image/webp, image/png'
            onChange={coverImageInput}
          />
          <span className={`${cl.fileName}`}>
            {coverImage?.name}
          </span>
        </div>
        <div className={cl.fileInput}>
          <button
            className={`${cl.inputBtn} ${songFile && !songFileErrors ? cl._good : songFileErrors ? cl._error : ''}`}
            onClick={songInputClick}
          >
            Choose audio file
          </button>
          <FileInput
            className={cl.input}
            ref={songInputRef}
            accept='audio/mp3, audio/wav'
            onChange={songInput}
          />
          <span className={`${cl.fileName}`}>
            {songFile?.name}
          </span>
        </div>
      </form>
    </div>
  )
})

export default CreatePlaylist