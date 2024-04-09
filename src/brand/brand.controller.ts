/* eslint-disable prettier/prettier */
import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Put,
} from '@nestjs/common';
import { BrandService } from './brand.service';
import { CreateBrandDto } from './dto/create-brand.dto';
import { UpdateBrandDto } from './dto/update-brand.dto';

@Controller('brand')
export class BrandController {
  constructor(private readonly brandService: BrandService) {}

  @Post()
  create(@Body() createBrandDto: CreateBrandDto) {
    return this.brandService.create(createBrandDto);
  }

  @Get()
  findAll() {
    return this.brandService.findAll();
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateBrandDto: UpdateBrandDto) {
    return this.brandService.update(+id, updateBrandDto);
  }

  @Put('all')
  update_all() {
    return this.brandService.update_all();
  }
  @Delete()
  remove_all() {
    return this.brandService.remove_all();
  }
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.brandService.remove(id);
  }

  @Get('not-valid')
  find_not_valid() {
    return this.brandService.find_not_valid();
  }

  @Post('transform')
  async transformBrands() {
    return await this.brandService.transformAndSaveBrands();
    // return this.brandService.findAll();
  }

  @Get('test-date')
  seedTestData() {
    return this.brandService.seedTestData();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.brandService.findOne(id);
  }
}
