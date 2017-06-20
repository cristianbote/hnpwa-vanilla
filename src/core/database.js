const ref = new Firebase("https://hacker-news.firebaseio.com/v0/");

export const getData = (dataType, start, end) => {
    return new Promise((resolve) => {
        let itemRef = ref.child(dataType).on('value', function (snapshot) {
            let temp = snapshot.val().slice(start, end);
            let out = [];

            temp.forEach(id => {
                ref.child('item').child(id).on('value', (itemData) => {
                    out.push(itemData.val());

                    if (out.length === temp.length) {
                        resolve(out);
                    }
                });
            });
        });
    });
};