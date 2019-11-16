const mongoose = require("mongoose");
const produtoSchema = require("../models/produto");

produtoSchema.statics = {
  store: function(data, cb) {
    const produto = new this(data);
    produto.save(cb);
  },
  get: function(query, cb) {
    this.find(query, cb);
  },

  getByName: function(query, cb) {
    this.find(query, cb);
  },

  update: function(query, updateData, cb) {
    this.findOneAndUpdate(query, { $set: updateData }, { new: true }, cb);
  },

  delete: function(query, cb) {
    this.findOneAndDelete(query, cb);
  }
};

module.exports = mongoose.model("Produto", produtoSchema);
