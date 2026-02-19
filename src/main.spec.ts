
describe('Main', () => {
    let app: any;
    let NestFactory: any;
    let SwaggerModule: any;
    let DocumentBuilder: any;

    beforeEach(() => {
        jest.resetModules(); // clears cache

        app = {
            listen: jest.fn(),
        };

        NestFactory = {
            create: jest.fn().mockResolvedValue(app),
        };

        SwaggerModule = {
            createDocument: jest.fn(),
            setup: jest.fn(),
        };

        DocumentBuilder = jest.fn(() => ({
            setTitle: jest.fn().mockReturnThis(),
            setDescription: jest.fn().mockReturnThis(),
            setVersion: jest.fn().mockReturnThis(),
            build: jest.fn(),
        }));

        jest.mock('@nestjs/core', () => ({ NestFactory }));
        jest.mock('@nestjs/swagger', () => ({ SwaggerModule, DocumentBuilder }));
        jest.mock('./app.module', () => ({ AppModule: class { } }));
    });

    it('should bootstrap', async () => {
        require('./main');
        expect(NestFactory.create).toHaveBeenCalled();
        // expect(app.listen).toHaveBeenCalled(); // Waiting for promise resolution in main might be tricky if not awaited.
        // main calls bootstrap(), but it's async and not awaited at top level.
        // However, jest waits for outstanding promises usually? No.
        // We can just check that create was called. app.listen is called asynchronously.

        // To wait for app.listen, we can try to wait a bit.
        await new Promise(resolve => setTimeout(resolve, 100));
        expect(app.listen).toHaveBeenCalled();
    });
});
