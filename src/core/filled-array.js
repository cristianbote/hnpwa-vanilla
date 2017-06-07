export const filledArray = (count, generatorFunction) => {
    let list = [];
    for( let i = 0; i < count; i += 1) {
        list.push(generatorFunction());
    }

    return list.slice();
};