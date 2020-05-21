const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");
const routes = require("./routes");
const dotenv = require("dotenv");
const bodyParser = require("body-parser");
const cron = require("node-cron");
const mailer = require("./services/mailer");

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

cron.schedule("* 17 20 * *", () => {
  let mailOptions = {
    from: "pfc.ecommerce.umc@gmail.com",
    to: "marcelomeack@gmail.com, Vitor@suzulan.com.br",
    subject: "Importante! Relatório de Estoque Mensal",
    text: "Segue em anexo relatório de produtos abaixo do estoque",
    attachments: [
      {
        path: path.resolve(__dirname, "../result.pdf"),
        contentType: "application/pdf"
      }
    ]
  };
  mailer.sendMail(mailOptions, (err, data) => {
    if (err) {
      console.log("erro");
    }
    console.log("email enviado");
  });
});

app.listen(3333);
