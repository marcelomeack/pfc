const mongoose = require("mongoose");
const clienteSchema = require("../models/Cliente");

clienteSchema.statics = {
  store: function(data, cb) {
    const cliente = new this(data);
    cliente.save(cb);
  },

  getAll: function(query, cb) {
    this.find(query, cb);
  },

  getById: function(query, cb) {
    this.findOne(query, cb);
  },

  update: function(query, updateData, cb) {
    this.findOneAndUpdate(query, { $set: updateData }, { new: true }, cb);
  },

  deleteById: function(query, cb) {
    this.findOneAndDelete(query, cb);
  }
};

module.exports = clienteSchema;
