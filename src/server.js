const app = require('./app');
const mongoose = require('mongoose');

PORT = 3001
mongoose.connect('mongodb://root:secret@127.0.0.1:3002/ecomm-product?authSource=admin',)
  .then(() => console.log('MongoDB connected successfully'))
  .catch((error) => console.error(error));

app.listen(PORT, () => console.log(`Server is listening on port: ${PORT}`));