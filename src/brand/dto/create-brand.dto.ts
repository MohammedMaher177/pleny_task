/* eslint-disable prettier/prettier */
import { IsNotEmpty, IsNumber, IsString, Max, Min } from 'class-validator';

export class CreateBrandDto {
  @IsNotEmpty()
  @IsString()
  brandName: string;
  @IsNumber()
  @Min(1600)
  @Max(new Date().getFullYear())
  yearFounded: number;
  @IsString()
  @IsNotEmpty()
  headquarters: string;
  @IsNumber()
  @Min(1)
  numberOfLocations: number;
}
