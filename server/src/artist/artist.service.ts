import { ConflictException, Injectable, Logger } from '@nestjs/common';
import { Artist, Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';
import { ArtistEntity } from './entities/artist.entity';

@Injectable()
export class ArtistService {
  private readonly logger = new Logger(ArtistService.name);
  constructor(
    private prisma: PrismaService,
  ) {

  }
  async create(createArtistDto: CreateArtistDto) {
    let result: Artist = undefined;

    try {
      result = await this.prisma.artist.create({ data: createArtistDto })
    } catch (error) {
      this.logger.error(error.code, error.message);
    }

    return result;
  }

  async findAll() {
    let result: Artist[] | undefined = undefined;
    try {
      result = await this.prisma.artist.findMany({ include: { albums: true, tracks: true } });
    } catch (error) {
      this.logger.error(error.code, error.message);
    }

    return result;
  }

  async findOne(id: string) {
    let result: Artist | undefined = undefined;
    try {
      result = await this.prisma.artist.findUnique({ where: { id }, include: { albums: true, tracks: true } });
    } catch (error) {
      this.logger.error(error.code, error.message);
    }
    return result;
  }

  async update(id: string, updateArtistDto: UpdateArtistDto) {
    let result: Artist | undefined = undefined;
    try {
      result = await this.prisma.artist.update({
        data: updateArtistDto,
        where: { id },
      });
    } catch (error) {
      this.logger.error(error.code, error.message);
    }
    return result;
  }

  async remove(id: string) {
    let result: Artist | undefined = undefined;
    try {
      result = await this.prisma.artist.delete({ where: { id } });
    } catch (error) {
      this.logger.error(error.code, error.message);
    }

    return result
  }
}
