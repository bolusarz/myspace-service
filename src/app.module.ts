import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { UserModule } from './user/user.module';
import { PostModule } from './post/post.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [UserModule, PostModule, ConfigModule.forRoot({ isGlobal: true })],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
