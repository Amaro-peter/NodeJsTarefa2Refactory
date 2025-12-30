import { afterAll, beforeAll, describe, expect, it } from "vitest"
import { app } from "@/app"
import request from "supertest"
import { cpf as cpfValidator } from "cpf-cnpj-validator"

describe("Register Controller (e2e)", () => {
    beforeAll(async () => {
        await app.ready()
    })

    afterAll(async () => {
        await app.close()
    })
    
    it("should be able to register", async () => {
        const cpf = cpfValidator.generate()

        const response = await request(app.server)
        .post('/users/register')
        .send({
            name: 'John Doe',
            email: `johndoe${Date.now()}@gmail.com`,
            password: 'Teste123x!',
            cpf: cpf
        })

        if (response.statusCode !== 201) {
            console.error(response.body)
        }

        expect(response.statusCode).toEqual(201)
    })
})