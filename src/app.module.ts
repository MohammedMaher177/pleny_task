import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BrandModule } from './brand/brand.module';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { BrandController } from './brand/brand.controller';
import { BrandService } from './brand/brand.service';
import { Brand, BrandSchema } from './brand/entities/brand.entity';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRoot(
      'mongodb+srv://momaherfrontend:Mohammed189199@cluster0.mbdwkdz.mongodb.net/pleny_task',
    ),
    MongooseModule.forFeature([{ name: Brand.name, schema: BrandSchema }]),
    BrandModule,
  ],
  controllers: [AppController, BrandController],
  providers: [AppService, BrandService],
})
export class AppModule {}
