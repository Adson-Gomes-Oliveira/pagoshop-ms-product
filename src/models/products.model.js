const mongoose = require('mongoose');

const productsMongooseSchema = new mongoose.Schema({
  id: String,
  product: { type: String, required: true },
  description: { type: String, required: true },
  thumbnail: { type: String },
  slug: { type: String, required: true },
  unit_price: { type: Number, required: true },
  quantity: { type: Number, required: true },
  category: { type: mongoose.Schema.Types.ObjectId },
  subCategory: { type: [String] },
  tags: { type: [String] },
}, { versionKey: false });

const ProductsModel = mongoose.model('products', productsMongooseSchema);
module.exports = ProductsModel;
