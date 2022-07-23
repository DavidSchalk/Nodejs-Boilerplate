class ServerResponse {
    constructor(statusCode, payload) {
        this.statusCode = statusCode;
        this.payload = payload;
    }
}

// Incorrect fields
class NoContent extends ServerResponse {
    constructor() {
        super();
        
        this.statusCode = 204;                                          
    }
}

class Created extends ServerResponse {
    constructor(payload) {
        super(payload);
        
        this.statusCode = 201;                                            
        this.payload = payload;                                           
    }
}

class Ok extends ServerResponse {
    constructor(payload) {
        super(payload);
        
        this.statusCode = 200   
        this.payload = payload;                                           
    }
}


export default {
    Ok,
    NoContent,
    Created
}

export {
    ServerResponse
}