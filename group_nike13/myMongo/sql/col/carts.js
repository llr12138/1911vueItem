const mongoose = require('../db');
const Schema = mongoose.Schema;

const schema = new Schema({
  cartid: { type: String },
  proid: { type: String },
  userid: { type: String },
  num: { type: Number },
  sel: { type: String },
  type: { type: String }
})

module.exports = mongoose.model('Cart', schema)