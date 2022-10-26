import React, { createRef, memo, useEffect, useState } from 'react'
import FileInput from '../../../components/UI/inputs/FileInput'
import cl from './uploadSong.module.scss'
import Input from '../../../components/UI/inputs/Input';
import { useAppDispatch, useAppSeletor } from '../../../hooks/redux';
import SongService from '../../../API/SongService';
import { authSlice } from '../../../store/reducers/AuthSlice';
import { Navigate } from 'react-router-dom';
import { useFetching } from '../../../hooks/fetching';
import Loader from '../../../components/UI/loader/Loader';
import mainRoutes from '../../../routes/mainRoutes';

const reader = new FileReader()

const UploadSong = memo(() => {

  const { isAuth } = useAppSeletor(state => state.auth)
  const dispatch = useAppDispatch()
  const imageFormats = 'image/jpeg,image/webp,image/png' 
  const audioFormats = 'audio/mpeg,audio/wav'
  

  const [coverImage, setCoverImage] = useState<File>()
  const [coverErrors, setCoverErrors] = useState<string>('')
  const coverInputRef = createRef<HTMLInputElement>()
  const imageRef = createRef<HTMLImageElement>()


  const [songFile, setSongFile] = useState<File>()
  const [songFileErrors, setSongFileErrors] = useState<string>('')
  const songInputRef = createRef<HTMLInputElement>()

  const [songName, setSongName] = useState<string>('')
  const [songNameErrors, setSongNameErrors] = useState<string>('')

  const [songAuthor, setSongAuthor] = useState<string>('')
  const [songAuthorErrors, setSongAuthorErrors] = useState<string>('')

  const [uploadSong, isUploadingSong, uploadingSongError] = useFetching(async () => {
    await handleUploadSong()
  })

  useEffect(()=> {
    reader.onload = function (e) {      
      if (imageRef.current) {
        imageRef.current.src = e.target?.result as string
      }
    }

  }, [imageRef])

  const validateInputFile = (fileTypes: string[], file: File, setFile: (f: File | undefined) => void, setError: (s: string) => void ) => {           
    if (fileTypes.includes(file.type)) {
      setFile(file)
      setError('')
      return true
    } else {
      setError('Wrong file')
      setFile(undefined)
      return false
    } 
  }

  const coverImageInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (files && files[0]) {
      if (validateInputFile(imageFormats.split(','), files[0], setCoverImage, setCoverErrors)) 
        reader.readAsDataURL(files[0])
      else if (imageRef.current) imageRef.current.src = ''
    }         
  }

  const coverInputClick = (e: React.MouseEvent) => {
    e.preventDefault()
    coverInputRef.current?.click()
  }

  const songInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (files && files[0]) {
      validateInputFile(audioFormats.split(','), files[0], setSongFile, setSongFileErrors)
    }
  }

  const songInputClick = (e: React.MouseEvent) => {
    e.preventDefault()
    songInputRef.current?.click()
  }

  const handleUploadSong = async () => {
    if (!songFile) setSongFileErrors('There is no song')
    else setSongFileErrors('')

    if (!coverImage) setCoverErrors('There is no image')
    else setCoverErrors('')

    if (!songName) setSongNameErrors('There is no song name')
    else setSongNameErrors('')

    if (!songAuthor) setSongAuthorErrors('There is no song author')
    else setSongAuthorErrors('')

    if (!songFileErrors && !coverErrors && !songNameErrors && !songAuthorErrors) {
      if (songFile && coverImage) {
        let data = new FormData()
        data.append('name', songName)
        data.append('author', songAuthor)
        data.append('songFile', new Blob([songFile], { type: songFile.type }), songFile.name)
        data.append('coverFile', new Blob([coverImage], { type: coverImage.type }), coverImage.name)
        try {
          const res = await SongService.uploadSong(data)
          dispatch(authSlice.actions.setUser(res))
          setCoverImage(undefined)
          setSongFile(undefined)
          setSongName('')
          setSongAuthor('')
        } catch (error) {
          console.log(error);
        }
      }
    }
  }

  if (!isAuth)
    return <Navigate to={mainRoutes.login} replace={true} /> 

  if (isUploadingSong) return <Loader />

  return (
    <div className={cl.container}>
      <form className={cl.form} method='post' onSubmit={e => e.preventDefault()}>
        <div className={cl.wrapper}>
          <div className={cl.formElements}>
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
                  accept={imageFormats}
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
                  accept={audioFormats}
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
              <Input
                className={`${cl.input} ${songAuthorErrors ? cl._error : ''}`}
                value={songAuthor}
                onChange={e => setSongAuthor(e.target.value)}
                placeholder={songAuthorErrors || 'Enter song author 2-60 characters long'}
              />
            </div>
          </div>
          <img className={cl.image} ref={imageRef} />
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

export default UploadSong