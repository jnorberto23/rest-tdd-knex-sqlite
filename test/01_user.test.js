import supertest from "supertest";
import app from "../src/app.js";
import jwt from "jsonwebtoken";

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
                const { id } = req.body;
                expect(req.statusCode).toEqual(200);
                mainUser.id = id;
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

describe("Autenticação", () => {
    test("Deve impedir que um usuario não cadastrado se logue", () => {
        return request.post("/auth")
            .send({ email: Date.now(), password: mainUser.password })
            .then((req) => {
                expect(req.statusCode).toEqual(404);
            }).catch((err) => {
                throw new Error(err);
            })
    })

    test("Deve impedir que um usuario cadastrado se logue com uma senha errado", () => {
        return request.post("/auth")
            .send({ email: mainUser.email, password: Date.now() })
            .then((req) => {
                expect(req.statusCode).toEqual(400);
            }).catch((err) => {
                throw new Error(err);
            })
    })

    test("O usuario deve se autenticar com sucesso", () => {

        return request.post("/auth")
            .send({ email: mainUser.email, password: mainUser.password })
            .then((req) => {
                expect(req.statusCode).toEqual(200); 
            }).catch((err) => {
                throw new Error(err);
            })
    })

    test("A autenticação deve gerar um token válido", () => {

        return request.post("/auth")
            .send({ email: mainUser.email, password: mainUser.password })
            .then((req) => {

                var validToken = jwt.sign({
                    email: mainUser.email,
                    id: mainUser.id
                }, process.env.JWT_SECRET);
          
                expect(req.statusCode).toEqual(200);
                expect(req.body.token).toEqual(validToken);
            }).catch((err) => {
                throw new Error(err);
            })
    })    
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

        return request.get(`/user/${mainUser.id}`)
            .then((req) => {
                expect(req.statusCode).toEqual(200);
                expect(req.body.result.id).toEqual(mainUser.id);
                expect(req.body.result.name).toEqual(mainUser.name);
                expect(req.body.result.email).toEqual(mainUser.email);
                expect(req.body.result.nationality).toEqual(mainUser.nationality);
            }).catch((err) => {
                throw new Error(err);
            });
    });

})

describe("Editar usuario", () => {

    test("Deve retornar 404 caso o usuario não seja encontrado", async () => {
        const user = {
            id: Date.now(),
            name: "Juan Hernandes",
            email: `juan.hernandes${Date.now()}@outlook.com`,
            nationality: "Chileno",
        };

        return request.put(`/user`)
            .send(user)
            .then((req) => {
                expect(req.statusCode).toEqual(404);
            }).catch((err) => {
                throw new Error(err);
            });
    });

    test("Deve impedir que o usuario edite seu perfil com campos vazios", async () => {
        const user = {
            id: mainUser.id,
            name: "",
            email: "",
            nationality: "",
        };

        return request.put(`/user`)
            .send(user)
            .then((req) => {
                expect(req.statusCode).toEqual(400);
            }).catch((err) => {
                throw new Error(err);
            });
    });

    test("Os dados do usuario devem ser alterados com sucesso.", async () => {
        const user = {
            id: mainUser.id,
            name: "Juan Hernandes",
            email: `juan.hernandes${Date.now()}@outlook.com`,
            nationality: "Chileno",
        };

        return request.put("/user")
            .send(user)
            .then((req) => {
                expect(req.statusCode).toEqual(200);
            }).catch((err) => {
                throw new Error(err);
            })
    })

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

        return request.delete(`/user/${mainUser.id}`)
            .then((req) => {
                expect(req.statusCode).toEqual(200);
            }).catch((err) => {
                throw new Error(err);
            });

    });

})

