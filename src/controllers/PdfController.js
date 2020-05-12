const pdf = require("html-pdf");
const pdfTemplate = require("../documents/LessProd");
const mongoose = require("mongoose");
const path = require("path");
mongoose.set("useFindAndModify", false);

// const Produto = require("../DAO/ProdutoDAO");

module.exports = {
  async store(req, res) {
    pdf.create(pdfTemplate(req.data), {}).toFile("result.pdf", err => {
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
