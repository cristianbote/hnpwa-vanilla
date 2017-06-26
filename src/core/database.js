import { urls } from '../urls';
import { get, set } from '../cache-store';

let ref;

export const getData = (dataType, start, end) => {
    return new Promise(resolve => {
        let stamp = Date.now();
        let out = get(dataType);

        if (out) {
            resolve(out.data.slice(start, end));
        }

        fetch(urls[dataType]())
            .then(res => res.json())
            .then(res => {
                set(dataType, res.slice(), Date.now() + (10e3 * 60));
                resolve(res.slice(start, end));
            });
    });
};

export const getItemData = (id) => {

    if (!ref) ref = new Firebase("https://hacker-news.firebaseio.com/v0/");

    return new Promise(resolve => {
        let stamp = Date.now();
        let out = get(id);

        if (out) {
            resolve(out.data);
        }

        ref.child('item').child(id).once('value', itemData => {
            set(id, itemData.val(), Date.now() + (10e3 * 60));
            resolve(itemData.val());
        });
    })
};