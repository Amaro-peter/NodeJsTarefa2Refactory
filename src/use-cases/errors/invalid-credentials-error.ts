export class InvalidCrendentialsError extends Error {
    constructor(arg: string = 'Invalid Credentials.') {
        super(arg);
    }
}