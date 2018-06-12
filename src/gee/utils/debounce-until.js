const debounceUntil = (callback, rule, delay = 0) => {

    const _rule = typeof rule === 'function' ? rule : () => {
        return true;
    };

    setTimeout(() => {
        if (_rule()) {
            callback();
        } else {
            debounceUntil(...arguments);
        }
    }, delay);
};

module.exports = debounceUntil;
