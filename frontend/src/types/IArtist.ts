import { IAlbum } from "./IAlbum";
import { ITrack } from "./ITrack";

export interface IArtist {
    id: string;
    name: string;
    tracks?: ITrack[];
    albums?: IAlbum[];
    createdAt: Date
    updatedAt: Date
}