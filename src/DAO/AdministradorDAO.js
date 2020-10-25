const mongoose = require("mongoose");
const administradorSchema = require("../models/Administrador");

administradorSchema.statics = {
  store: function(data, cb) {
    const administrador = new this(data);
    administrador.save(cb);
  },

  getAll: function(query, cb) {
    this.find(query, cb);
  },

  update: function(query, updateData, cb) {
    this.findOneAndUpdate(query, { $set: updateData }, { new: true }, cb);
  },

  deleteById: function(query, cb) {
    this.findOneAndDelete(query, cb);
  }
};

module.exports = administradorSchema;
