let cache = {};

export const set = (key, val, expire) => {
    cache[key] = {
        data: val,
        expire: expire
    };
};

export const get = (key) => {
    let data = cache[key];

    if (data && Date.now() >= data.expire) {
        return null;
    }

    return data;
};