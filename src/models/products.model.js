const mongoose = require('mongoose');

const productsMongooseSchema = new mongoose.Schema({
  id: String,
  product: {type: String, require: true},
  description: {type: String, require: true},
  slug: {type: String, require: true},
  unit_price: {type: Number, require: true},
  quantity: {type: Number, require: true},
  category_id: {type: String, require: true},
}, { versionKey: false });

const ProductsModel = mongoose.model('products', productsMongooseSchema);
module.exports = ProductsModel;
