import { Controller, Get } from '@nestjs/common';
import { MoviesService } from './movies.service';
import { Movie } from './entities/movie.entity';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { CreateMovieDto } from './dto/create-movie.dto';
/*import { Movie } from './movies.entity';*/

@ApiTags('movies')
@Controller('api/movies')
export class MoviesController {
  constructor(private readonly moviesService: MoviesService) {}

  @Get()
  @ApiOkResponse({ type: CreateMovieDto, isArray: true })
  async getMovies(): Promise<Movie[]> {
    return this.moviesService.listMovies();
  }
  /*async getMovies(): Promise<any> {
        return [{ name: 'Error intencionado' }];
    }*/
  /*async getMovies(): Promise<MovieDto[]> {
    return this.moviesService.listMovies();
  }*/
}
