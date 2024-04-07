/* eslint-disable prettier/prettier */
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
export type BrandDocument = HydratedDocument<Brand>;
@Schema()
export class Brand {
  @Prop({
    required: [true, 'Brand name is required'],
    trim: true,
    unique: true,
  })
  brandName: string;
  @Prop({
    required: [true, 'Year founded is required'],
    trim: true,
    min: [1600, 'Year founded seems too old'],
    max: [new Date().getFullYear(), 'Year founded cannot be in the future'],
  })
  yearFounded: number;
  @Prop({ required: [true, 'Headquarters location is required'], trim: true })
  headquarters: string;
  @Prop({
    required: [true, 'Number of locations is required'],
    min: [1, 'There should be at least one location'],
  })
  numberOfLocations: number;
}

export const BrandSchema = SchemaFactory.createForClass(Brand);
