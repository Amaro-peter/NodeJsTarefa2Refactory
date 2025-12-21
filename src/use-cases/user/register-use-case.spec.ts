import { describe, expect, it } from 'vitest'
import { RegisterUseCase } from './register-use-case'
import { compare } from 'bcryptjs'
import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository'
import { UserAlreadyExists } from '../errors/user-already-exists-error'
import { uuidv4 } from 'zod'

describe('Register Use Case', () => {
    it("should be able to register", async () => {
        try {
            const usersRepository = new InMemoryUsersRepository()
            const registerUseCase = new RegisterUseCase(usersRepository)

            const uniqueEmail = `johndoe${Date.now()}@gmail.com`
            const uniqueCpf = `${Math.floor(Math.random() * 100000000000)}`

            const { user } = await registerUseCase.execute({
                name: 'John Doe',
                email: uniqueEmail,
                password: 'pedroca1x!',
                cpf: uniqueCpf,
                role: 'DEFAULT'
            })

            
            expect(user.publicId).toEqual(expect.any(uuidv4))
        } catch (error) {
            console.log('ERROR: ', error)
            throw error
        }
    })

    it("should hash user's password upon registration", async () => {
        try {
            const usersRepository = new InMemoryUsersRepository()
            const registerUseCase = new RegisterUseCase(usersRepository)

            const uniqueEmail = `johndoe${Date.now()}@gmail.com`
            const uniqueCpf = `${Math.floor(Math.random() * 100000000000)}`

            const { user } = await registerUseCase.execute({
                name: 'John Doe',
                email: uniqueEmail,
                password: 'pedroca1x!',
                cpf: uniqueCpf,
                role: 'DEFAULT'
            })

            const isPasswordCorrectlyHashed = await compare(
                'pedroca1x!',
                user.password_hash,
            )

            expect(isPasswordCorrectlyHashed).toBe(true)
        } catch (error) {
            console.log('ERROR: ', error)
            throw error
        }
    })

    it("should not be able to register with the same email twice", async () => {
        try {
            const usersRepository = new InMemoryUsersRepository()
            const registerUseCase = new RegisterUseCase(usersRepository)

            const uniqueEmail = `johndoe@gmail.com`
            const uniqueCpf = `${Math.floor(Math.random() * 100000000000)}`

            await registerUseCase.execute({
                name: 'John Doe',
                email: uniqueEmail,
                password: 'pedroca1x!',
                cpf: uniqueCpf,
                role: 'DEFAULT'
            })

            await expect(() => registerUseCase.execute({
                name: 'John Doe',
                email: uniqueEmail,
                password: 'pedroca1x!',
                cpf: uniqueCpf,
                role: 'DEFAULT'
            })).rejects.toBeInstanceOf(UserAlreadyExists)
            
        } catch (error) {
            console.log('ERROR: ', error)
            throw error
        }
    })
})