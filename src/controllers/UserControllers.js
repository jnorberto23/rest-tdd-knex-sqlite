import UserModels from "../models/User.js";
import bcrypt from "bcrypt";

class UserControllers {

    async create(req, res) {

        const user = req.body;

        if (user.name == "" || user.email == "" || user.password == "") {
            res.statusCode = 400;
            res.json({ message: "Opa, algo não informado corretamente." });
            return false;
        }

        user.password = await bcrypt.hash(user.password, 10);

        const isEmailRegistered = await UserModels.findEmail(user.email);

        if (isEmailRegistered.status) {
            res.statusCode = 400;
            res.json({ message: "Erro: O e-mail já está cadastrado" });
            return;
        }

        const userWasRegistered = await UserModels.create(user);

        if (userWasRegistered.status) {
            res.json({ message: "Usuario cadastrado com sucesso!" });
        } else {
            res.statusCode = 500;
            res.json({ message: "Sinto muito, ocorreu um erro interno :(" });
        }

    }

}

export default new UserControllers;