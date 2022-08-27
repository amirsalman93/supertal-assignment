import { IArtist } from "./IArtist"
import { ITrack } from "./ITrack"

export interface IAlbum {
    id: string
    name: string
    cover: string
    tracks?: ITrack[]
    artists?: IArtist[]
    createdAt: Date
    updatedAt: Date
}