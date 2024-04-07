/* eslint-disable prettier/prettier */
import mongoose from 'mongoose';
import { brands_not_valid } from 'src/brand/data/data';
import { Brand } from 'src/brand/entities/brand.entity';

// Connect to MongoDB database
mongoose.connect('mongodb+srv://momaherfrontend:Mohammed189199@cluster0.mbdwkdz.mongodb.net/pleny_task');

const db = mongoose.connection;

// Check for MongoDB connection errors
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

// Once connected to the database
db.once('open', async () => {
  console.log('Connected to MongoDB');
    
//   try {
//     // Fetch documents from the brands collection
//     const brands = brands_not_valid;

//     // Transform and validate each document
//     for (const brand of brands) {
//       // Transform the document according to the schema
//       const transformedBrand = {
//         brandName: brand.brandName,
//         yearFounded:
//           brand.yearCreated || brand.yearFounded || new Date().getFullYear(),
//         headquarters: brand.headquarters,
//         numberOfLocations: parseInt(brand.numberOfLocations) || 0,
//       };

//       // Validate the transformed data against the schema
//       const validationResult = await new Brand(transformedBrand).validate();

//       // Update the document in the collection with the transformed data
//       await Brand.findByIdAndUpdate(brand._id, transformedBrand);
//     }

//     console.log('Data transformation complete');
//   } catch (error) {
//     console.error('Error transforming data:', error);
//   } finally {
//     // Disconnect from the MongoDB database
//     mongoose.disconnect();
//     console.log('Disconnected from MongoDB');
//   }
});
