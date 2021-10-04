import supertest from "supertest";
import app from "../src/app.js";

const request = supertest(app);

const mainUser = {
    name: 'João Norberto',
    email: 'joao@gmail.com',
    password: 'batatinhafrita123'
};

/*
afterAll(() => {
    request.post("/user")
        .send(mainUser)
        .then(() => { })
        .catch((err) => {
            console.log(err);
        })
})

beforeAll(() => {
    request.delete(`/user/${mainUser.email}`)
        .then(() => { })
        .catch((err) => {
            console.log(err);
        })
})
*/

test("O usuario deve ser cadastrado com sucesso", async () => {

    return request.post("/user")
        .send(mainUser)
        .then((req) => {
            const {email} = req.body;
            expect(req.statusCode).toEqual(200);
            expect(req.body.message).toEqual("Usuario cadastrado com sucesso");
        }).catch((err) => {
            throw new Error(err);
        });

});
/*
test("O e-mail de usuario não deve estar cadastrado", async () => {

    return request.get("/user/")
        .send(mainUser)
        .then((req) => {
            const {email} = req.body;
            expect(req.statusCode).toEqual(200);
            expect(req.body.message).toEqual("Usuario cadastrado com sucesso");
        }).catch((err) => {
            throw new Error(err);
        });

});
*/