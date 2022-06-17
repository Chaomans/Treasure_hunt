const _ = require('lodash');

function clone(o) {
    return _.cloneDeep(o)
}

module.exports = {
    clone
}