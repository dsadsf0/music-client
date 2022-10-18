export default interface IUser {
  id: string,
  email: string,
  username: string,
  likedSongs: string[],
  likedPlaylists: string[],
  uploadedSongs: string[],
  createdPlaylists: string[]
}