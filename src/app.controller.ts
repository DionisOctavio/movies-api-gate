import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { CreateMovieDto } from './movies/dto/create-movie.dto';
import { Movie } from './movies/entities/movie.entity';
import { MoviesService } from './movies/movies.service';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly moviesService: MoviesService,
  ) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
  @ApiTags('movies')
  @Get()
  @ApiOkResponse({ type: CreateMovieDto, isArray: true })
  async getMovies(): Promise<Movie[]> {
    return this.moviesService.listMovies();
  }
}
