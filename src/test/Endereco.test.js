const mongoose = require("mongoose");
mongoose.set("useFindAndModify", false);
const Endereco = require("../DAO/EnderecoDAO");

describe("User Model Test", () => {
  beforeAll(async () => {
    await mongoose.connect(process.env.DB_CONNECT, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
  });

  it("create & save user successfully", async () => {
    const res = await request
      .post("/endereco")

      .send({
        rua: "teste",
        numero: 59,
        complemento: "teste",
        cep: "teste",
        bairro: "teste"
      });

    const endereco = await Endereco.findOne({ rua: "teste" });

    done();

    expect(endereco.rua).toBe("teste");
    expect(endereco.numero).toBe(59);
    expect(endereco.complemento).toBe("teste");
    expect(endereco.cep).toBe("teste");
    expect(endereco.bairro).toBe("teste");
  });
});
