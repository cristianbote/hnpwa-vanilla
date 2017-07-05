import { urls } from '../urls';
import { get, set } from '../cache-store';

export const getData = (dataType, start, end, expire) => {
    return new Promise(resolve => {
        let stamp = Date.now();
        let out = get(dataType);

        if (out) {
            resolve(out.data.slice(start, end));
        }

        fetch(urls[dataType]())
            .then(res => res.json())
            .then(res => {
                set(dataType, res.slice(), expire);
                resolve(res.slice(start, end));
            });
    });
};

export const getItemData = (id) => {

    return new Promise(resolve => {
        let stamp = Date.now();
        let out = get(id);

        if (out) {
            resolve(out.data);
        }

        fetch(urls.item(id))
            .then(res => res.json())
            .then(itemData => {
                set(id, itemData);
                resolve(itemData);
            });
    })
};