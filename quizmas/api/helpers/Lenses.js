/**
 * Created by vanraar on 21/09/16.
 */
let config = {};

exports.use = (c) => config = c;
exports.create = (path) => {
    const lens = R.lensPath(path);

    const view = () => R.view(lens, config);
    const set = (value) => config = R.set(lens, value, config);
    const min = (value) => config = R.set(lens, (R.view(lens, config) || 0) - value, config);
    const add = (value) => config = R.set(lens, (R.view(lens, config) || 0) + value, config);
    const equals = (value) => view() === value;

    return {
        view, set, equals, min, add
    }
};

exports.config = () => config;