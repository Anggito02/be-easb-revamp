import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { LoggerMiddleware } from './common/middleware/request_logger.middleware';
import { CorrelationIdMiddleware } from './common/middleware/correlation_id.middleware';

async function bootstrap() {
    const app = await NestFactory.create(AppModule, {
        logger: ['log', 'error', 'warn'],
    });
    const config = app.get(ConfigService);

    // Global validation
    app.useGlobalPipes(
        new ValidationPipe({
            whitelist: true,
            forbidNonWhitelisted: true,
            transform: true,
        }),
    );

    // Middleware (order matters)
    app.use(CorrelationIdMiddleware());
    app.use(LoggerMiddleware());

    // Prefix API, e.g. /api/v1
    app.setGlobalPrefix('api');

    const port = config.get('port', 3000);
    await app.listen(port);
    Logger.log(`App started on port ${port}`);
}
bootstrap();
