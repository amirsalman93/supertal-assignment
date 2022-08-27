import { ArtistEntity } from "src/artist/entities/artist.entity";
import { Base } from "src/base.entity";
import { TrackEntity } from "src/track/entities/track.entity";

export class AlbumEntity extends Base{
    name: string;
    cover: string;
    tracks?: TrackEntity[];
    artists?: ArtistEntity[];
}
