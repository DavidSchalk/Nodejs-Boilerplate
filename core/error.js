// Incorrect fields
class ErrorBadRequest extends Error {
    constructor(message, code) {
        super(message, code);
        
        this.statusCode = 400                                              
        this.data = {
            message: message || 'Bad Request',
            code,
        }
    }
}

class ErrorValidation extends Error {
    constructor(fields, code) {
        super(fields, code);
        
        this.statusCode = 400                                              
        this.data = {
            message: 'Validation failed, ensure all fields are correct.',
            code,
            fields
        }
    }
}

// User have a valid token just insuffienct access.
class ErrorForbidden extends Error {
    constructor() {
        super();
        
        this.statusCode = 403;
        this.data = {
            message: 'Insufficient priviledges, this is forbidden.',
        }
    }
}


class ErrorUnauthorized extends Error {
    constructor() {
        super();
        
        this.statusCode = 401;
        this.data = {
        message: 'Insuffiencient access, you are not authorized.',
        }
    }
}

class ErrorDependencyFailed extends Error {
    constructor(message, code) {
        super(message, code);
        
        this.statusCode = 424;
        this.data = {
            message: message || 'Dependency service is down. Please give it a second and try again.',
            code
        }
    }
}

class ErrorInternalServer extends Error {
    constructor(message, code) {
        super(message, code);
        
        this.statusCode = 500;
        this.data = {
            message: message || 'Internal Server error',
            code
        }
    }
}


class ErrorCustom extends Error {
    constructor(statusCode, message, code) {
        super(statusCode, message, code);
        
        this.statusCode = statusCode || 500;
        this.data = {
            message: message || 'Internal Service Error',
            code
        }
    }
}

export {
    ErrorBadRequest,
    ErrorValidation,
    ErrorForbidden,
    ErrorUnauthorized,
    ErrorDependencyFailed,
    ErrorCustom,
    ErrorInternalServer
}
