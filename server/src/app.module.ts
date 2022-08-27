import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { ArtistModule } from './artist/artist.module';
import { InteractionModule } from './interaction/interaction.module';
import { AlbumModule } from './album/album.module';
import { TrackModule } from './track/track.module';

@Module({
  imports: [
    UserModule, AuthModule,
    // todo: Serve static frontend files only for production
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'build'),
      // renderPath: '/'
    }),
    ArtistModule,
    InteractionModule,
    AlbumModule,
    TrackModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
