/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Injectable } from '@nestjs/common';
import { CreateBrandDto } from './dto/create-brand.dto';
import { UpdateBrandDto } from './dto/update-brand.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Brand, BrandDocument } from './entities/brand.entity';
import { Model } from 'mongoose';
import { brands_not_valid } from './data/data';
// import * as faker from '@faker-js/faker';
import * as faker from 'faker';
import { simpleFaker } from '@faker-js/faker';

@Injectable()
export class BrandService {
  constructor(
    @InjectModel(Brand.name) private readonly brandModel: Model<BrandDocument>,
  ) {}

  async create(createBrandDto: CreateBrandDto) {
    const brand = await this.brandModel.create(createBrandDto);

    return { brand };
  }

  async findAll() {
    const brands = await this.brandModel.find();
    return { brands, count: brands.length };
  }

  async findOne(id: string) {
    return await this.brandModel.findOne({ _id: { oid: id } });
    // return `This action returns a #${id} brand`;
  }

  update(id: number, updateBrandDto: UpdateBrandDto) {
    return `This action updates a #${id} brand`;
  }

  async update_all() {
    return await this.brandModel.updateMany(
      { yearFounded: 2024 },
      { yearFounded: 1600 },
    );
  }

  async remove(id: string) {
    return await this.brandModel.findByIdAndDelete(id);
  }

  remove_all() {
    return this.brandModel.deleteMany({});
  }

  find_not_valid() {
    return { brands_not_valid };
  }

  async transformAndSaveBrands() {
    const valid = [];
    try {
      // const brands = await this.brandModel.find().exec();
      const brands = brands_not_valid;
      for (const brand of brands) {
        const transformedBrand = {
          _id: { oid: brand._id.$oid },
          brandName: brand.brandName || brand.brand['name'],
          yearFounded: +brand.yearFounded || +brand.yearCreated || 1600,
          headquarters: brand.headquarters || 'not-found',
          numberOfLocations: +brand.numberOfLocations || 1,
        };
        // await this.brandModel.findByIdAndUpdate(brand._id.$oid, transformedBrand);
        await this.brandModel.create(transformedBrand);
        valid.push(transformedBrand);
      }
      return valid;
    } catch (error) {
      console.error('Error transforming data:', error);
      return error;
    }
  }

  async seedTestData() {
    const testData = Array.from({ length: 10 }, () => ({
      brandName: faker.company.bs(),
      yearFounded: faker.random.number({ min: 1600, max: 2022 }),
      numberOfLocations: faker.random.number({ min: 1, max: 100 }),
      headquarters: faker.company.companyName(),
    }));
    return await this.brandModel.insertMany(testData);
  }
}
