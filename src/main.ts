import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { PrismaService } from "./prisma.service";
import { HttpStatus, ValidationPipe } from "@nestjs/common";
import { HttpExceptionFilter } from "./filters/http-exception.filter";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // app.useGlobalFilters(new HttpExceptionFilter());
  app.useGlobalPipes(
    new ValidationPipe({
      enableDebugMessages: false,
      disableErrorMessages: false,
      errorHttpStatusCode: HttpStatus.BAD_REQUEST,
      stopAtFirstError: true,
    })
  );

  const prismaService = app.get(PrismaService);
  await prismaService.enableShutdownHooks(app);

  await app.listen(3000);
}
bootstrap();
