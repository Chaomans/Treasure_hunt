const { readFileSync, existsSync } = require('fs')

function fileExist(path) {
    return existsSync(path);
}

function getContent(path) {
    return readFileSync(path, { encoding: 'utf8', flag: 'r' });
}

function getLines(content) {
    return content.split('\n');
}

module.exports = {
    fileExist,
    getContent,
    getLines
}