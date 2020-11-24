import BaseModel from './base'
import UsersModel from './users'

export const Root = new BaseModel('/')
export const Users = new UsersModel()
export const Rooms = new BaseModel('rooms')
export const Config = new BaseModel('config')
