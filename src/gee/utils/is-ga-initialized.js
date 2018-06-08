module.exports = (configs = {}) => {
    return configs.ga && typeof window[configs.ga] === 'function';
};
