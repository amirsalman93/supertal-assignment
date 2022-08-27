import { IAlbum } from "./IAlbum";
import { IArtist } from "./IArtist";

export interface ITrack {
    id: string
    name: string
    albumId: string | null;
    album?: IAlbum;
    artistId: string;
    artist: IArtist;
    length: number
    track?: number;
    lyrics?: string;
    fileUrl: string
    createdAt: Date
    updatedAt: Date

}