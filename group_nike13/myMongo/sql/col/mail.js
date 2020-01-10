const mongoose = require('../db');
const Schema = mongoose.Schema;

const schema = new Schema({
  mailid: { type: String },
  mail: { type: String },
  flag: { type: Number } // 1表示默认地址 0 表示一般地址
})

module.exports = mongoose.model('Mail', schema)