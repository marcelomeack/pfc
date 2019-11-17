const mongoose = require("mongoose");

const produtoSchema = new mongoose.Schema(
  {
    nome: String,
    valor: Number,
    descricao: String,
    thumbnail: String
  },
  {
    toJSON: {
      virtuals: true
    }
  }
);

produtoSchema.virtual("thumbnail_url").get(function() {
  return `http://localhost:3333/files/${this.thumbnail}`;
});

module.exports = produtoSchema;
