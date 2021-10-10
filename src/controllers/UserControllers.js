import UserModels from "../models/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

class UserControllers {

    async create(req, res) {

        const user = req.body;

        for (var [key, value] of Object.entries(user)) {
            if (value === "") {
                res.statusCode = 400;
                res.json({ message: `Erro: ${key} não informado` });
                return false;
            }
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
            const { id } = userWasRegistered
            res.json({ message: "Usuario cadastrado com sucesso!", id });
            return;

        } else {
            res.statusCode = 500;
            res.json({ message: "Sinto muito, ocorreu um erro interno :(" });
            return;
        }
    }

    async findByEmail(req, res) {
        const email = req.params.email;

        const isEmailRegistered = await UserModels.findEmail(email);

        if (isEmailRegistered.status) {
            res.send({ result: isEmailRegistered });
            return;
        } else {
            res.statusCode = 404;
            res.json({ message: "Erro: Nenhum usuário encontrado" });
            return;
        }
    }

    async findById(req, res) {

        const id = req.params.id;

        if (id === "" || id === undefined) {
            res.statusCode = 400;
            res.json({ message: "Erro: código de usuário não foi informado" });
            return;
        }

        const isUserRegistered = await UserModels.findById(id);

        if (isUserRegistered.status) {
            res.send({ result: isUserRegistered.result });
            return;
        } else {
            res.statusCode = 404;
            res.json({ message: "Erro: Nenhum usuário encontrado" });
            return;
        }
    }

    async deleteById(req, res) {

        const id = req.params.id;

        const isUserRegistered = await UserModels.findById(id);

        if (isUserRegistered.status === false) {
            res.statusCode = 404;
            res.json({ message: "Erro: Nenhum usuário encontrado" });
            return;
        }

        const isUserDeleted = await UserModels.delete(id);

        if (isUserDeleted.status) {
            res.send({ message: "Usuário apagado com sucesso" });
            return;
        } else {
            res.statusCode = 500;
            res.json({ message: "Erro: o usuário nào foi apagado" });
            return;
        }
    }

    async edit(req, res) {
        const user = req.body;

        for (var [key, value] of Object.entries(user)) {
            if (value === "") {
                res.statusCode = 400;
                res.json({ message: `Erro: ${key} não informado` });
                return false;
            }
        }

        const isUserRegistered = await UserModels.findById(user.id);

        if (isUserRegistered.status === false) {
            res.statusCode = 404;
            res.json({ message: "Erro: Nenhum usuário encontrado" });
            return;
        }

        const isUserChanged = await UserModels.edit(user);

        if (isUserChanged.status) {
            res.json({ message: "Dados do usuario alterado com sucesso!" });
            return;
        }
        else {
            res.statusCode = 500;
            res.json({ message: "Sinto muito, ocorreu um erro interno :(" });
            return;
        }

    }

    async auth(req, res) {

        const { email, password } = req.body;

        const getUserToAutenticate = await UserModels.auth(email);

        if (getUserToAutenticate.status) {

            const isPasswordRight = await bcrypt.compare(password.toString(), getUserToAutenticate.result.password);

            if (isPasswordRight) {

                var token = jwt.sign({
                    email: getUserToAutenticate.result.email,
                    id: getUserToAutenticate.result.id
                }, process.env.JWT_SECRET);

                res.statusCode = 200;
                res.json({ token });
                return;

            } else {
                res.statusCode = 400;
                res.json({ message: "Erro: A senha está incorreta." });
                return;
            }
        }

        else {
            res.statusCode = 404;
            res.json({ message: "Erro: O e-mail não está cadastrado" });
            return;
        }
    }
}

export default new UserControllers;