const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");
const routes = require("./routes");
const dotenv = require("dotenv");
const bodyParser = require("body-parser");
const cron = require("node-cron");
const mailer = require("./services/mailer");
const pdf = require("html-pdf");
const estoquePdfTemplate = require("./documents/Estoque");
const Produto = require("./DAO/ProdutoDAO");
const app = express();

dotenv.config();

mongoose.connect(process.env.DB_CONNECT, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

// req.query.params = acessar query params (para filtros)
// req.params = acessar route params (para edição, delete) através de id por exemplo
// req.body = acessar corpo da requisição (criação edição)

app.use(cors());
app.use(express.json());
app.use(
  bodyParser.urlencoded({
    extended: true
  })
);
app.use(bodyParser.json());
app.use("/files", express.static(path.resolve(__dirname, "..", "uploads")));
app.use(routes);

cron.schedule("41 20 22 * *", async (req, res) => {
  const produtos = await Produto.find({ quantidade: { $lt: 4 } });
  await pdf
    .create(estoquePdfTemplate(produtos), {})
    .toFile("estoque.pdf", err => {
      if (err) {
        console.log("PDF NAO GERADO ERRO");
      }
      console.log("PDF GERADO");
    });

  let mailOptions = {
    from: "pfc.ecommerce.umc@gmail.com",
    to: "marcelomeack@gmail.com, Vitor@suzulan.com.br",
    subject: "Importante! Relatório de Estoque Mensal",
    text: "Segue em anexo relatório de produtos abaixo do estoque",
    attachments: [
      {
        path: path.resolve(__dirname, "../estoque.pdf"),
        contentType: "application/pdf"
      }
    ]
  };
  await mailer.sendMail(mailOptions, (err, data) => {
    if (err) {
      console.log("EMAIL NAO ENVIADO");
    }
    console.log("email enviado");
  });
});

app.listen(3333);
