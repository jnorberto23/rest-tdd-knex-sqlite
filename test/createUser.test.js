import supertest from "supertest";
import app from "../src/app.js";

const request = supertest(app);

const mainUser = {
    name: 'João Norberto',
    email: Date.now() + '@gmail.com',
    password: 'batatinhafrita123'
};

test("O usuario deve ser cadastrado com sucesso", async () => {

    return request.post("/user")
        .send(mainUser)
        .then((req) => {
            expect(req.statusCode).toEqual(200);
        }).catch((err) => {
            throw new Error(err);
        });

});

test("O e-mail informado não deve estar cadastrado", async () => {

    return request.post("/user")
        .send(mainUser)
        .then((req) => {
            expect(req.statusCode).toEqual(400);
        }).catch((err) => {
            throw new Error(err);
        });
});

test("Deve impedir que um usuario se cadastre com os dados vazios", async () => {

    const user = {
        name: "",
        email: "",
        password: ""
    }

    return request.post("/user")
        .send(user)
        .then((req) => {
            expect(req.statusCode).toEqual(400);

        }).catch((err) => {
            throw new Error(err);
        });
});

