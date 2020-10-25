const mongoose = require("mongoose");
const pedidoSchema = require("../models/Pedido");

pedidoSchema.statics = {
  store: function(data, cb) {
    const pedido = new this(data);
    pedido.save(cb);
  },

  getAll: function(query, cb) {
    this.find(query, cb);
  },

  getAllId: function(query, cb) {
    this.find(query, cb);
  },

  updateStatus: function(query, updateData, cb) {
    this.findByIdAndUpdate(query, { $set: updateData }, { new: true }, cb);
  },

  deleteById: function(query, cb) {
    this.findByIdAndDelete(query, cb);
  }
};

module.exports = mongoose.model("Pedido", pedidoSchema);
