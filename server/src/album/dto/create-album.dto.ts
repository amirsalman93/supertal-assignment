import { Artist, Track } from "@prisma/client";

export class CreateAlbumDto {
    name: string;
    cover: string;
    tracks?: Track[];
    artists?: Artist[];
}
