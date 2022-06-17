const { startHunt } = require('./hunt/hunt');
const { format } = require('path')

startHunt(format({
    dir: __dirname,
    base: process.argv.slice(2)[0],
}));