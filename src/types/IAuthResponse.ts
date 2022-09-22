import Iuser from './IUser';

export default interface IAuthResponse {
  accessToken: string,
  refreshToken: string,
  user: Iuser
}