const mongoose = require("mongoose");
const enderecoSchema = require("../models/Endereco");

enderecoSchema.statics = {
  store: function(data, cb) {
    const endereco = new this(data);
    endereco.save(cb);
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

module.exports = mongoose.model("Endereco", enderecoSchema);
