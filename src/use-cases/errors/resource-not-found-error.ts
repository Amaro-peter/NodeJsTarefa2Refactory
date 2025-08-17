export class ResourceNotFoundError extends Error {
    constructor(arg: string = "Resource not found") {
        super(arg);
    }
}