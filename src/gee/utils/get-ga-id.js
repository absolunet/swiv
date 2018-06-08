module.exports = (configs) => {
    try {
        return ga.getAll().shift().a.data.values[':trackingId'];
    } catch(e) {
        const d = window[configs.dataLayer] || [];
        for (let i = 0; i < d.length; i++) {
            const data = d[i] || [];
            if (data[0] === 'config') {
                return data[1];
            }
        }
    }

    return null;
};
