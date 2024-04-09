/* eslint-disable prettier/prettier */
// brands.schema.ts
import * as mongoose from 'mongoose';

export const BrandSchema = new mongoose.Schema({
  brandName: { type: String, required: true },
  yearFounded: { type: Number, required: true },
  numberOfLocations: { type: Number, required: true },
  headquarters: { type: String },
});
