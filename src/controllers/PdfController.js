const pdf = require("html-pdf");
const pdfTemplate = require("../documents/LessProd");
const mongoose = require("mongoose");
const path = require("path");
const Produto = require("../DAO/ProdutoDAO");
mongoose.set("useFindAndModify", false);

module.exports = {
  async store(req, res) {
    const produtos = await Produto.find({ quantidade: { $lt: 4 } });

    pdf.create(pdfTemplate(produtos), {}).toFile("result.pdf", err => {
      if (err) {
        res.send(Promise.reject());
      }

      res.send(Promise.resolve());
    });
  },

  async get(req, res) {
    res.sendFile(path.resolve(__dirname, "..", "..", "result.pdf"));
  }
};
