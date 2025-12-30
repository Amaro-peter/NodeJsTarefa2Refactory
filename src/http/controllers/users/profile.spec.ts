import { afterAll, beforeAll, describe, expect, it } from "vitest"
import { app } from "@/app"
import request from "supertest"
import { cpf as cpfValidator } from "cpf-cnpj-validator"

describe("Profile Controller (e2e)", () => {
    beforeAll(async () => {
        await app.ready()
    })

    afterAll(async () => {
        await app.close()
    })
    
    it("should be able to get user profile", async () => {

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

        const authenticateResponse = await request(app.server)
            .post('/users/sessions')
            .send({
                email: email,
                senha: senha
            })

            const { token } = authenticateResponse.body

            const profileResponse = await request(app.server)
                .get('/users/me')
                .set('Authorization', `Bearer ${token}`)
                .send()

        if (profileResponse.statusCode !== 200) {
            console.error(profileResponse.body)
        }

        expect(profileResponse.statusCode).toEqual(200)

        expect(profileResponse.body).toEqual(
            {
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
            }
        )
    })
})