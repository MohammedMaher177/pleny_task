/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Injectable } from '@nestjs/common';
import { CreateBrandDto } from './dto/create-brand.dto';
import { UpdateBrandDto } from './dto/update-brand.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Brand } from './entities/brand.entity';
import { Model } from 'mongoose';
import { brands_not_valid } from './data/data';

@Injectable()
export class BrandService {
  constructor(
    @InjectModel(Brand.name) private readonly brandModel: Model<Brand>,
  ) {}
  async create(createBrandDto: CreateBrandDto) {
    const brand = await this.brandModel.create(createBrandDto);
    return { brand };
  }

  async findAll() {
    return { brands: await this.brandModel.find() };
  }

  findOne(id: string) {
    return `This action returns a #${id} brand`;
  }

  update(id: number, updateBrandDto: UpdateBrandDto) {
    return `This action updates a #${id} brand`;
  }

  remove(id: string) {
    return this.brandModel.findByIdAndDelete(id);
  }

  find_not_valid() {
    return { brands_not_valid };
  }

  async transformAndSaveBrands() {
    try {
      // const brands = await this.brandModel.find().exec();
      const brands = brands_not_valid;
      for (const brand of brands) {
        const transformedBrand = {
          brandName: brand.brandName || brand.brand['name'],
          yearFounded: +brand.yearFounded || +brand.yearCreated || new Date().getFullYear(),
          headquarters: brand.headquarters || 'not-found',
          numberOfLocations: +brand.numberOfLocations || 1,
        };
        // await this.brandModel.findByIdAndUpdate(brand._id, transformedBrand);
        await this.brandModel.create(transformedBrand);
      }
    } catch (error) {
      console.error('Error transforming data:', error);
      return error;
    }
  }
}
