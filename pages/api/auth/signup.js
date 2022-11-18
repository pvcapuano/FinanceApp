import connectMongo from "../../../database/conn";
import Users from "../../../model/Schema";
import { hash } from "bcryptjs";

export default async function handler(req, res) {
  connectMongo().catch((erro) => res.json({ error: "A conexão falhou" }));

  //only post method is accepted

  if (req.method === "POST") {
    if (!req.body)
      return res.status(404).json({ erro: "Sem os dados do formulário." });
    const { username, email, password } = req.body;

    //check duplicate users
    const checkExisting = await Users.findOne({ email });

    if (checkExisting)
      return res.status(422).json({ message: "Usuario já existe" });

    //hash password
    Users.create(
      { username, email, password: await hash(password, 12) },
      function (err, data) {
        if (err) return res.status(404).json({ err });
        res.status(201).send({ status: true, user: data });
      }
    );
  } else {
    res
      .status(500)
      .json({ message: "Metodo Http inválido. Somente POST é aceito." });
  }
}
