import { ApiProperty } from "@nestjs/swagger"
import { AlbumEntity } from "src/album/entities/album.entity"
import { ArtistEntity } from "src/artist/entities/artist.entity"
import { Base } from "src/base.entity"
import { InteractionEntity } from "src/interaction/entities/interaction.entity"

export class TrackEntity extends Base {
    name: string;
    albumId?: string;
    artistId: string;
    length: number;
    track: number;
    lyrics?: string;
    fileUrl: string;
    album: AlbumEntity;
    artist: ArtistEntity;
    interactions: InteractionEntity[]
}
