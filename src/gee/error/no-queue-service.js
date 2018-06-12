module.exports = class noQueueServiceError extends Error {

    constructor(message = 'There is no queued service.') {
        super(message);
    }
}
