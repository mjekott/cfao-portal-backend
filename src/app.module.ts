import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { LinkModule } from './link/link.module';
import { DocumentModule } from './document/document.module';
import { PhotoModule } from './photo/photo.module';
import { VideoModule } from './video/video.module';
import { ConfigModule } from '@nestjs/config';
import * as Joi from 'joi';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    LinkModule,
    VideoModule,
    PhotoModule,
    DocumentModule,
    ConfigModule.forRoot({
      envFilePath: './env',
      validationSchema: Joi.object({
        DATABASE_USER: Joi.string().required(),
        DATBASE_PASSWORD: Joi.string().required(),
      }),
    }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: process.env.DATABASE_USER,
      password: process.env.DATABASE_PASSWORD,
      database: 'resource',
      entities: [],
      synchronize: true,
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
