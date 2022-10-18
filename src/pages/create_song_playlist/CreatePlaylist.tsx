import React, { createRef, memo, useState } from 'react'
import FileInput from '../../components/UI/inputs/FileInput'
import cl from './createPlaylist.module.scss'
import Input from './../../components/UI/inputs/Input';
import { useAppDispatch, useAppSeletor } from '../../hooks/redux';
import SongService from '../../API/SongService';
import { authSlice } from '../../store/reducers/AuthSlice';
import { Navigate } from 'react-router-dom';

const CreatePlaylist = memo(() => {

  const { isAuth } = useAppSeletor(state => state.auth)
  const dispatch = useAppDispatch()

  const [coverImage, setCoverImage] = useState<File>()
  const [coverErrors, setCoverErrors] = useState<string>('')
  const coverInputRef = createRef<HTMLInputElement>()

  const [songFile, setSongFile] = useState<File>()
  const [songFileErrors, setSongFileErrors] = useState<string>('')
  const songInputRef = createRef<HTMLInputElement>()

  const [songName, setSongName] = useState<string>('')
  const [songNameErrors, setSongNameErrors] = useState<string>('')

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
      validateInputFile(['audio/mpeg', 'audio/wav'], files[0], setSongFile, setSongFileErrors)
    }
  }

  const songInputClick = (e: React.MouseEvent) => {
    e.preventDefault()
    songInputRef.current?.click()
  }

  const uploadSong = async (e: React.MouseEvent) => {
    if (!songFile) setSongFileErrors('There is no song')
    else setSongFileErrors('')

    if (!coverImage) setCoverErrors('There is no image')
    else setCoverErrors('')

    if (!songName) setSongNameErrors('There is no song name')
    else setSongNameErrors('')


    if (!songFileErrors && !coverErrors && !songNameErrors) {
      if (songFile && coverImage) {
        let data = new FormData()
        data.append('name', songName)
        data.append('songFile', new Blob([songFile], { type: songFile.type }), 'songFile')
        data.append('coverFile', new Blob([coverImage], { type: coverImage.type }), 'coverImage')
        try {
          const res = await SongService.uploadSong(data)
          dispatch(authSlice.actions.setUser(res))
          setCoverImage(undefined)
          setSongFile(undefined)
          setSongName('')
        } catch (error) {
          console.log(error);
        }   
      }     
    }
  }

  if (!isAuth)
    return <Navigate to={'/login'} replace={true} /> 

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
            placeholder={songNameErrors || 'Enter song name 2-60 characters long'}
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