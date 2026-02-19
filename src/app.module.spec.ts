import { Test } from '@nestjs/testing';
import { AppModule } from './app.module';

jest.mock('@nestjs/typeorm', () => {
    const actual = jest.requireActual('@nestjs/typeorm');
    return {
        ...actual,
        TypeOrmModule: {
            forRoot: jest.fn(() => ({ module: class FakeTypeOrmRootModule { } })),
            forFeature: jest.fn(() => ({
                module: class FakeTypeOrmFeatureModule { },
                providers: [{ provide: 'MovieRepository', useValue: {} }],
                exports: ['MovieRepository']
            })),
        },
        getRepositoryToken: jest.fn(() => 'MovieRepository'),
    };
});

describe('AppModule', () => {
    it('should compile', async () => {
        const module = await Test.createTestingModule({
            imports: [AppModule],
        }).compile();

        expect(module).toBeDefined();
    });
});
