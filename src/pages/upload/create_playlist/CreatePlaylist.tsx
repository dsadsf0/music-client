import React, { createRef, memo, useEffect, useState } from 'react'
import { Navigate } from 'react-router-dom'
import PlaylistService from '../../../API/PlaylistService'
import FileInput from '../../../components/UI/inputs/FileInput'
import Input from '../../../components/UI/inputs/Input'
import Loader from '../../../components/UI/loader/Loader'
import { useFetching } from '../../../hooks/fetching'
import { useAppDispatch, useAppSeletor } from '../../../hooks/redux'
import mainRoutes from '../../../routes/mainRoutes'
import { authSlice } from '../../../store/reducers/AuthSlice'
import cl from './createPlaylist.module.scss'

const reader = new FileReader()

const CreatePlaylist = memo(() => {
  
  const { isAuth } = useAppSeletor(state => state.auth)
  const dispatch = useAppDispatch()
  const imageFormats = 'image/jpeg,image/webp,image/png'

  const [coverImage, setCoverImage] = useState<File>()
  const [coverErrors, setCoverErrors] = useState<string>('')
  const coverInputRef = createRef<HTMLInputElement>()
  const imageRef = createRef<HTMLImageElement>()

  const [playlistTitle, setPlaylistTitle] = useState<string>('')
  const [playlistTitleErrors, setPlaylistTitleErrors] = useState<string>('')

  const [playlistDescription, setPlaylistDescription] = useState<string>('')
  const [playlistDescriptionErrors, setPlaylistDescriptionErrors] = useState<string>('')

  const [creatingPlaylist, isCreatingPlaylist, creatingPlaylistError] = useFetching(async () => {
    await handleCreatePlaylist()
  })

  useEffect(() => {
    reader.onload = function (e) {
      if (imageRef.current) {
        imageRef.current.src = e.target?.result as string
      }
    }

  }, [imageRef])

  const validateInputFile = (fileTypes: string[], file: File, setFile: (f: File | undefined) => void, setError: (s: string) => void) => {
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

  const handleCreatePlaylist = async () => {

    if (!coverImage) setCoverErrors('There is no image')
    else setCoverErrors('')

    if (!playlistTitle) setPlaylistTitle('There is no song name')
    else setPlaylistTitleErrors('')

    if (!playlistDescription) setPlaylistDescription('There is no song author')
    else setPlaylistDescriptionErrors('')

    if (!coverErrors && !playlistTitleErrors && !playlistDescriptionErrors) {
      if (coverImage) {
        let data = new FormData()
        data.append('title', playlistTitle)
        data.append('description', playlistDescription)
        data.append('coverFile', new Blob([coverImage], { type: coverImage.type }), coverImage.name)
        try {
          const res = await PlaylistService.createPlaylist(data)
          dispatch(authSlice.actions.setUser(res))
          setCoverImage(undefined)
          setPlaylistTitle('')
          setPlaylistDescription('')
        } catch (error) {
          console.log(error);
        }
      }
    }
  }

  if (!isAuth)
    return <Navigate to={mainRoutes.login} replace={true} />

  if (isCreatingPlaylist) return <Loader />
  
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
            </div>
            <div className={cl.songInfo}>
              <Input
                className={`${cl.input} ${playlistTitleErrors ? cl._error : ''}`}
                value={playlistTitle}
                onChange={e => setPlaylistTitle(e.target.value)}
                placeholder={playlistTitleErrors || 'Enter playlist title 2-60 characters long'}
              />
              <Input
                className={`${cl.input} ${playlistDescriptionErrors ? cl._error : ''}`}
                value={playlistDescription}
                onChange={e => setPlaylistDescription(e.target.value)}
                placeholder={playlistDescriptionErrors || 'Enter playlist description 2-120 characters long'}
              />
            </div>
          </div>
          <img className={cl.image} ref={imageRef} />
        </div>
        <button
          className={cl.upBtn}
          onClick={creatingPlaylist}
        >
          Сreate Playlist
        </button>
      </form>
    </div>
  )
})

export default CreatePlaylist