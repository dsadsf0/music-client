import ISong from './ISong';

interface IPlaylist {
  _id: string,
  title: string,
  author: string,
  cover: string,
  songs: ISong[],
  description: string,
}

export default IPlaylist