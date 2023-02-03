const mongoose = require('mongoose');

const productsMongooseSchema = new mongoose.Schema({
  _id: String,
  product: {type: String, require: true},
  description: {type: String},
  slug: {type: String, require: true},
  unit_price: {type: Number},
  quantity: {type: Number, require: true},
  category: {type: String, require: true},
});

const ProductsModel = mongoose.model('products', productsMongooseSchema);
module.exports = ProductsModel;
