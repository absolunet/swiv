const debounce = function(callback, rule, delay = 0) {

    const _rule = typeof rule === 'function' ? rule : () => {
        return true;
    };

    setTimeout(() => {
        if (_rule()) {
            callback();
        } else {
            debounce(...arguments);
        }
    }, delay);
};

module.exports = debounce;
