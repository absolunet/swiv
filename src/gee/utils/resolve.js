module.exports = (path, obj = {}) => {
    return path.split('.').reduce(function(prev, curr) {
        return prev ? prev[curr] : undefined
    }, obj);
};
