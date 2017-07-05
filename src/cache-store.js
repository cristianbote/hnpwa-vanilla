const CACHE_PERIOD = () => Date.now() + (1e3 * 60 * 5); // 5minutes

let cache = {};

export const set = (key, val, expire) => {
    cache[key] = {
        data: val,
        expire: expire || CACHE_PERIOD(),
        isExpired: function isExpired() {
            return Date.now() > this.expire
        }
    };
};

export const get = (key) => {
    let data = cache[key];

    if (data && data.isExpired()) {
        return null;
    }

    return data;
};