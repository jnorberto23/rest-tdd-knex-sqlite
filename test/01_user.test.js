import supertest from "supertest";
import app from "../src/app.js";

const request = supertest(app);

var mainUser = {
    name: 'João Norberto',
    email: `joao.norberto${Date.now()}@gmail.com`,
    nationality: 'Brasileiro',
    password: 'batatinhafrita123'
};


describe("Criar usuario", () => {
    test("O usuario deve ser cadastrado com sucesso", async () => {

        return request.post("/user")
            .send(mainUser)
            .then((req) => {
                expect(req.statusCode).toEqual(200);
                mainUser['id'] = req.body.id;
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
            nationality: "",
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
})

describe("Buscar usuario", () => {

    test("Deve retornar 404 caso o usuario não seja encontrado", async () => {

        return request.get(`/user/${Date.now()}`)
            .then((req) => {
                expect(req.statusCode).toEqual(404);
            }).catch((err) => {
                throw new Error(err);
            });
    });

    test("Deve retornar os dados do usuario cadastrado atraves do id", async () => {

        return request.get(`/user/${mainUser['id']}`)
            .then((req) => {
                expect(req.statusCode).toEqual(200);
            }).catch((err) => {
                throw new Error(err);
            });
    });

})

describe("Apagar usuario", () => {
    test("Deve retornar 404 caso o usuario não seja encontrado", async () => {

        return request.delete(`/user/${Date.now()}`)
            .then((req) => {
                expect(req.statusCode).toEqual(404);
            }).catch((err) => {
                throw new Error(err);
            });

    });

    test("O usuario deve ser apagado com sucesso", async () => {

        return request.delete(`/user/${mainUser['id']}`)
            .then((req) => {
                expect(req.statusCode).toEqual(200);
            }).catch((err) => {
                throw new Error(err);
            });

    });

})

/*


describe("Buscar usuario", () => {
    test("Deve retornar os dados do usuario cadastrado atraves do e-mail", async () => {

        return request.get(`/user/${mainUser.email}`)
            .then((req) => {
                expect(req.statusCode).toEqual(200);
                done();
            }).catch((err) => {
                throw new Error(err);
            });
    });
})
*/
/*
test("Os dados do usuario devem ser alterados com sucesso.", async () => {
    const user = {
        name: "João Machado",
        email: "",
        password: "ourodetolo"
    };

    return request.put("/user")
        .send(user)
        .then((req) => {
            expect(req.statusCode).toEqual(200);
        }).catch((err) => {
            throw new Error(err);
        })
})*/