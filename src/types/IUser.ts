import ISong from './ISong';
import IPlaylist from './IPlaylist';

export default interface IUser {
  id: string,
  email: string,
  username: string,
  likedSongs: ISong[],
  likedPlaylists: IPlaylist[],
  uploadedSongs: ISong[],
  createdPlaylists: IPlaylist[]
}