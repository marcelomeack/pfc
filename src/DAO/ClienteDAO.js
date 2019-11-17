const mongoose = require("mongoose");
const clienteSchema = require("../models/cliente");

clienteSchema.statics = {
  store: function(data, cb) {
    const cliente = new this(data);
    cliente.save(cb);
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

module.exports = mongoose.model("Cliente", clienteSchema);
