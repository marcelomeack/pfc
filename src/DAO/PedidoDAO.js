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
  },

  faturamentoPdf: function(query, cb) {
    this.find(
      query,
      Pedido.aggregate([
        {
          $group: {
            _id: null,
            total: {
              $sum: {
                $multiply: ["$valorTotal"]
              }
            }
          }
        }
      ])
    );
  },

  rankPdf: function(query, cb) {
    this.find(
      aggregate([
        { $unwind: "$itemPedidos" },
        {
          $group: {
            _id: "$itemPedidos.nome",
            total: {
              $sum: {
                $sum: ["$itemPedidos.quantidade"]
              }
            }
          }
        },
        { $sort: { total: -1, posts: 1 } }
      ])
    );
  },

  updateCliente: function(query, cb) {
    this.updaeManu(query, { $set: updateData }, { new: true }, cb);
  }
};

module.exports = mongoose.model("Pedido", pedidoSchema);
