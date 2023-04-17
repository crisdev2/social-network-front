import { IUser } from './userModel';

export interface IPosts {
  id?: number
  created: string
  body: string
  idAuthor: IUser
  idParent: IPosts
  idChildren: IPosts[]
}