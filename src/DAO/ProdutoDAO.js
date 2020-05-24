const mongoose = require("mongoose");
const produtoSchema = require("../models/produto");

produtoSchema.statics = {
  store: function(data, cb) {
    const produto = new this(data);
    produto.save(cb);
  },

  getAll: function(query, cb) {
    this.find(query, cb);
  },

  getById: function(query, cb) {
    this.find(query, cb);
  },

  update: function(query, updateData, cb) {
    this.findOneAndUpdate(query, { $set: updateData }, { new: true }, cb);
  },

  deleteById: function(query, cb) {
    this.findOneAndDelete(query, cb);
  },

  getLess: function(query, cb) {
    this.find(query, cb);
  }
};

module.exports = mongoose.model("Produto", produtoSchema);
