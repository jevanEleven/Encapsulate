class APIError extends Error {
    statusCode: number;

    constructor(message: string, statusCode: number) {
        super(message);
        this.statusCode = statusCode;
        Object.setPrototypeOf(this, APIError.prototype);
    }
}

class APIAuthError extends APIError {
    constructor(message: string, statusCode: number = 401) {
        super(message, statusCode);
        Object.setPrototypeOf(this, APIAuthError.prototype);
    }
}

export { APIError, APIAuthError };
