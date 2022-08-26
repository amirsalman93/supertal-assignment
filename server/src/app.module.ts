import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { TracksModule } from './tracks/tracks.module';
import { FavoritesModule } from './favorites/favorites.module';
import { AlbumsModule } from './albums/albums.module';
import { AuthModule } from './auth/auth.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { ArtistModule } from './artist/artist.module';

@Module({
  imports: [
    UserModule, TracksModule, FavoritesModule, AlbumsModule, AuthModule,
    // todo: Serve static frontend files only for production
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', '..', 'frontend', 'build'),
      // renderPath: '/'
    }),
    ArtistModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
