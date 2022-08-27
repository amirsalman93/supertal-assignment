import { ApiProperty } from "@nestjs/swagger";
import { AlbumEntity } from "src/album/entities/album.entity";
import { Base } from "src/base.entity";
import { InteractionEntity } from "src/interaction/entities/interaction.entity";
import { TrackEntity } from "src/track/entities/track.entity";

export class ArtistEntity extends Base {

    @ApiProperty()
    name: string;

    tracks?: TrackEntity[];       // returned only if joined with the tracks
    albums?: AlbumEntity[]; // returned only if joined with the albums
}