import { FastifyInstance } from "fastify";
import { register } from "./register";
import { authenticate } from "./authenticate";
import { get } from "./get";
import { deleteUser } from "./deleteUser";
import { updateUser } from "./updateUser";
import { profile } from "./profile";
import { verifyJwt } from "@/http/middlewares/verify-jwt";
import { refresh } from "./refresh";
import { getAllUsers } from "./getAllUsers";


export function userRoutes(app: FastifyInstance) {
    app.post('/users', register);

    app.post('/authenticate', authenticate);

    app.get('/users/:userId', get);

    app.get('/users', getAllUsers)

    app.patch('/token/refresh', refresh);

    //Authenticated routes
    app.get('/profile',  {onRequest: [verifyJwt]}, profile);
    
    app.delete("/users", {  onRequest: [verifyJwt] }, deleteUser);

    app.patch('/users', { onRequest: [verifyJwt] }, updateUser);
}