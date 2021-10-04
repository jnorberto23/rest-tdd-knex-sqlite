import supertest from "supertest";
import app from "../src/app.js";

const request = supertest(app);

test("A aplicação deve retornar na porta 3000", async () => {

    return request.get("/")
        .then((req) => {
            const {status} = req.body;
            expect(req.statusCode).toEqual(200);
            expect(status).toEqual(true);
        }).catch((err) => {
            throw new Error(err);
        });
        
});