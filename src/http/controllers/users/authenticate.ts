import { makeAuthenticationUseCase } from "@/use-cases/factories/user/make-authentication-use-case";
import { FastifyReply, FastifyRequest } from "fastify";
import z from "zod";

export async function authenticate(request: FastifyRequest, reply: FastifyReply) {
    const authenticateBodySchema = z.object({
        email: z.string().email(),
        senha: z.string().min(6)
    });

    const { email, senha } = authenticateBodySchema.parse(request.body);

    try {

        const authenticateUseCase = makeAuthenticationUseCase();

        const user = await authenticateUseCase.execute({
            email,
            senha
        });

        const token = await reply.jwtSign(
            { email: user.user.email }, // Inclua informações úteis no payload
            {
                sign: {
                    sub: user.user.id, // Identificador único do usuário
                },
            }
        );

        const refreshToken = await reply.jwtSign({}, {
            sign: {
                sub: user.user.id,
                expiresIn: '7d',
            }
        });

        return reply
            .status(200)
            .setCookie('refreshToken', refreshToken, {
                path: '/',
                secure: true,
                sameSite: true,
                httpOnly: true,
            })
            .send({ token });
    } catch (err) {
        return reply.status(401).send();
    }
}