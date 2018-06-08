module.exports = class NotImplementedError extends Error {

    constructor(method) {
        super(`Method ${(method || arguments.callee.caller.name)}() must be implemented.`);
    }
}