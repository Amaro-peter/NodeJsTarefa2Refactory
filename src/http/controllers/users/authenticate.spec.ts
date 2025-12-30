import { afterAll, beforeAll, describe, expect, it } from "vitest"
import { app } from "@/app"
import request from "supertest"
import { cpf as cpfValidator } from "cpf-cnpj-validator"

describe("Authenticate Controller (e2e)", () => {
    beforeAll(async () => {
        await app.ready()
    })

    afterAll(async () => {
        await app.close()
    })
    
    it("should be able to authenticate", async () => {

        const email = `johndoe${Date.now()}@gmail.com`
        const senha = 'Teste123x!'
        const cpf = cpfValidator.generate()

        await request(app.server)
        .post('/users/register')
        .send({
            name: 'John Doe',
            email: email,
            password: senha,
            cpf: cpf
        })

        const response = await request(app.server)
            .post('/users/sessions')
            .send({
                email: email,
                senha: senha
            })

        if (response.statusCode !== 200) {
            console.error(response.body)
        }

        expect(response.statusCode).toEqual(200)

        expect(response.body).toEqual({
            token: expect.any(String),
            user: {
                cpf: expect.any(String),
                createdAt: expect.any(String),
                email: email,
                name: 'John Doe',
                photo: null,
                publicId: expect.any(String),
                role: 'DEFAULT',
                updatedAt: expect.any(String)
            }
        })
    })
})