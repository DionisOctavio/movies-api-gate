/* eslint-disable @typescript-eslint/unbound-method */
import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MoviesService } from './movies/movies.service';
import { Movie } from './movies/entities/movie.entity';

describe('AppController', () => {
  let appController: AppController;
  let moviesService: MoviesService;

  const mockMoviesService = {
    listMovies: jest.fn(),
  };

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [
        AppService,
        {
          provide: MoviesService,
          useValue: mockMoviesService,
        },
      ],
    }).compile();

    appController = app.get<AppController>(AppController);
    moviesService = app.get<MoviesService>(MoviesService);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(appController.getHello()).toBe('Hello World!');
    });
  });

  it('getMovies() debe retornar una lista de películas', async () => {
    const result: Movie[] = [{ id: 1, title: 'Test Movie' } as Movie];
    mockMoviesService.listMovies.mockResolvedValue(result);

    expect(await appController.getMovies()).toBe(result);
    expect(moviesService.listMovies).toHaveBeenCalled();
  });
});
