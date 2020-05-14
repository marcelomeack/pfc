const pdf = require("html-pdf");
const pdfTemplate = require("../documents/LessProd");
const mongoose = require("mongoose");
const path = require("path");
const Produto = require("../DAO/ProdutoDAO");
const mailer = require("../services/mailer");
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
  },

  async sendEmail(req, res) {
    let mailOptions = {
      from: "pfc.ecommerce.umc@gmail.com",
      to: "marcelomeack@gmail.com, Vitor@suzulan.com.br",
      subject: "Relatório de Estoque Mensal",
      text: "Segue em anexo relatório de produtos abaixo do estoque",
      attachments: [
        {
          path: path.resolve(__dirname, "../../result.pdf"),
          contentType: "application/pdf"
        }
      ]
    };

    mailer.sendMail(mailOptions, (err, data) => {
      if (err) {
        return res.status(400).json({ error: "Erro" });
      }
      return res.status(200).json("Email Enviado!!!");
    });
  }
};
