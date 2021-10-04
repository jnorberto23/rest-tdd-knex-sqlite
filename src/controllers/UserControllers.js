import UserModels from "../models/User.js";
import bcrypt from "bcrypt";

class UserControllers {

    async create(req, res) {

        const hash = await bcrypt.hash(req.body.password, 10);

        const user = {
            name: req.body.name,
            email: req.body.email,
            password: hash
        }

        const result = await UserModels.create(user);

        if (result.status) {
            res.json({ message: "Usuario cadastrado com sucesso" });
        } else {
            res.statusCode = 403;
            res.json({ message: "Erro ao cadastrar usuario" });
        }

    }
}

export default new UserControllers;