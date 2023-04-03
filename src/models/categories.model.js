const mongoose = require('mongoose');

const categoriesMongooseSchema = new mongoose.Schema({
  id: String,
  name: { type: String, require: true },
  status: { type: String, require: true },
  sub_categories: { type: [String] },
  tags: { type: [String] },
  thumbnail: { type: String, require: true },
}, { versionKey: false });

const CategoriesModel = mongoose.model('categories', categoriesMongooseSchema);
module.exports = CategoriesModel;
