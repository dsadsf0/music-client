import React, { createRef, memo, useState } from 'react'
import FileInput from '../../components/UI/inputs/FileInput'
import cl from './createPlaylist.module.scss'
import Input from './../../components/UI/inputs/Input';

const CreatePlaylist = memo(() => {

  const [coverImage, setCoverImage] = useState<File>()
  const [coverErrors, setCoverErrors] = useState<string>('')
  const coverInputRef = createRef<HTMLInputElement>()

  const [songFile, setSongFile] = useState<File>()
  const [songFileErrors, setSongFileErrors] = useState<string>('')
  const songInputRef = createRef<HTMLInputElement>()

  const [songName, setSongName] = useState<string>('')
  const [songNameErrors, setSongNameErrors] = useState<string>('')

  const [songAuthor, setSongAuthor] = useState<string>('')
  const [songAuthorErrors, setSongAuthorErrors] = useState<string>('')

  const validateInputFile = (fileTypes: string[], file: File, setFile: (f: File | undefined) => void, setError: (s: string) => void ) => {    
    console.log(file.type);
    
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
      validateInputFile(['audio/mpeg', 'audio/wav'], files[0], setSongFile, setSongFileErrors)
    }
  }

  const songInputClick = (e: React.MouseEvent) => {
    e.preventDefault()
    songInputRef.current?.click()
  }

  const uploadSong = (e: React.MouseEvent) => {
    e.preventDefault()
    if (!songFile) setSongFileErrors('There is no song')
    else setSongFileErrors('')

    if (!coverImage) setCoverErrors('There is no image')
    else setCoverErrors('')

    if (!songName) setSongNameErrors('There is no song name')
    else setSongNameErrors('')

    if (!songAuthor) setSongAuthorErrors('There is no song author')
    else setSongAuthorErrors('')

    if (!songFileErrors && !coverErrors && !songNameErrors && !songAuthorErrors) {

      // отпрака на сервер

      setCoverImage(undefined)
      setSongFile(undefined)
      setSongAuthor('')
      setSongName('')
    }
  }

  return (
    <div className={cl.container}>
      <form className={cl.form} method='post' onSubmit={e => e.preventDefault()}>
        <h2 className={cl.title}>Upload Song</h2>
        <div className={cl.files}>
          <div className={cl.fileInput}>
            <button
              className={`${cl.inputBtn} ${coverImage && !coverErrors ? cl._good : coverErrors ? cl._error : ''}`}
              onClick={coverInputClick}
            >
              {coverImage?.name || coverErrors || 'Choose cover image'}
            </button>
            <FileInput
              className={cl.input}
              ref={coverInputRef}
              accept='image/jpeg, image/webp, image/png'
              onChange={coverImageInput}
            />
          </div>
          <div className={cl.fileInput}>
            <button
              className={`${cl.inputBtn} ${songFile && !songFileErrors ? cl._good : songFileErrors ? cl._error : ''}`}
              onClick={songInputClick}
            >
              {songFile?.name || songFileErrors || 'Choose audio file'}
            </button>
            <FileInput
              className={cl.input}
              ref={songInputRef}
              accept='audio/mpeg, audio/wav'
              onChange={songInput}
            />
          </div>
        </div>
        <div className={cl.songInfo}>
          <Input
            className={`${cl.input} ${songNameErrors ? cl._error : ''}`}
            value={songName}
            onChange={e => setSongName(e.target.value)}
            placeholder={songNameErrors || 'Enter song name'}
          />
          <Input
            className={`${cl.input} ${songAuthorErrors? cl._error : ''}`}
            value={songAuthor}
            onChange={e => setSongAuthor(e.target.value)}
            placeholder={ songAuthorErrors || 'Enter song author'}
          />
        </div>
        <button 
          className={cl.upBtn}
          onClick={uploadSong} 
        >
          Upload
        </button>
      </form>
    </div>
  )
})

export default CreatePlaylist