const pdf = require("html-pdf");
const estoquePdfTemplate = require("../documents/Estoque");
const faturamentoPdfTemplate = require("../documents/Faturamento");
const rankPdfTemplate = require("../documents/Rank");
const mongoose = require("mongoose");
const path = require("path");
const Produto = require("../DAO/ProdutoDAO");
const mailer = require("../services/mailer");
const Pedido = require("../DAO/PedidoDAO");
mongoose.set("useFindAndModify", false);

module.exports = {
  async estoquePdf(req, res) {
    const produtos = await Produto.find({ quantidade: { $lt: 4 } });

    pdf.create(estoquePdfTemplate(produtos), {}).toFile("estoque.pdf", err => {
      if (err) {
        res.send(Promise.reject());
      }

      res.send(Promise.resolve());
    });
  },

  async getEstoquePdf(req, res) {
    res.sendFile(path.resolve(__dirname, "..", "..", "estoque.pdf"));
  },

  async faturamentoPdf(req, res) {
    const pedidos = await Pedido.aggregate([
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
    ]);
    pdf
      .create(faturamentoPdfTemplate(pedidos), {})
      .toFile("faturamento.pdf", err => {
        if (err) {
          res.send(Promise.reject());
        }

        res.send(Promise.resolve());
      });
  },

  async getFaturamentoPdf(req, res) {
    res.sendFile(path.resolve(__dirname, "..", "..", "faturamento.pdf"));
  },

  async rankPdf(req, res) {
    const pedidos = await Pedido.aggregate([
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
    ]);
    pdf.create(rankPdfTemplate(pedidos), {}).toFile("rank.pdf", err => {
      if (err) {
        res.send(Promise.reject());
      }

      res.send(Promise.resolve());
    });
  },

  async getRankPdf(req, res) {
    res.sendFile(path.resolve(__dirname, "..", "..", "rank.pdf"));
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
