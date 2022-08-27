import { ApiProperty, ApiPropertyOptional, PartialType } from '@nestjs/swagger';
import { Album, Track } from '@prisma/client';
import { AlbumEntity } from 'src/album/entities/album.entity';
import { TrackEntity } from 'src/track/entities/track.entity';
import { CreateArtistDto } from './create-artist.dto';

export class UpdateArtistDto extends PartialType(CreateArtistDto) {
    @ApiPropertyOptional({isArray: true, type: TrackEntity})
    tracks?: Track[];       // add new track to the Artist
    
    @ApiPropertyOptional({isArray: true, type: AlbumEntity})
    albums?: Album[]; // add new album to the Artist
}
