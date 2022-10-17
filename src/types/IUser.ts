export default interface Iuser {
  id: string,
  email: string,
  username: string,
  likedSongs: string[],
  likedPlaylists: string[],
  uploadedSongs: string[],
  createdPlaylists: string[]
}