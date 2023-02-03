const mongoose = require('mongoose');

const categoriesMongooseSchema = new mongoose.Schema({
  id: String,
  name: String,
  status: String,
}, { versionKey: false });

const CategoriesModel = mongoose.model('categories', categoriesMongooseSchema);
module.exports = CategoriesModel;
