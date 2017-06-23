/**
 * Returns an list with the generated function result.
 * @param {number} count
 * @param {function} generatorFunction
 * @returns {array}
 */
export const filledArray = (count, generatorFunction) => {
    return [generatorFunction()];
};