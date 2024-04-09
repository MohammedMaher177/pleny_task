/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BrandModule } from './brand/brand.module';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { BrandController } from './brand/brand.controller';
import { BrandService } from './brand/brand.service';
import { Brand, BrandSchema } from './brand/entities/brand.entity';
import { APP_FILTER } from '@nestjs/core';
import { GlobalExceptionFilter } from './Error-Handler/global-exception.filter';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRoot(process.env.DB_CONNECTION_URL),
    MongooseModule.forFeature([{ name: Brand.name, schema: BrandSchema }]),
    BrandModule,
  ],
  controllers: [AppController, BrandController],
  providers: [
    {
      provide: APP_FILTER,
      useClass: GlobalExceptionFilter,
    },
    AppService,
    BrandService,
  ],
})
export class AppModule {}
