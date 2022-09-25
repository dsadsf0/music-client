import ISong from "../types/ISong"

const comparePlaylistsSongs = (a: ISong[], b: ISong[]) => {
  if (a.length !== b.length) return false
  
  for (let i = 0; i < a.length; i++) {
    if (a[i]._id !== b[i]._id) return false
  }
  
  return true
}

export default comparePlaylistsSongs