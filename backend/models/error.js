class httpError extends Error {
    constructor(message, code){
        super(message);
        this.code = errorCode;
    }
}

module.exorts = httpError;