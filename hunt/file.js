const { readFileSync, existsSync, writeFileSync } = require('fs');
const _ = require('lodash');

function fileExist(path) {
    return existsSync(path);
}

function getContent(path) {
    return readFileSync(path, { encoding: 'utf8', flag: 'r' });
}

function getLines(content) {
    return content.split('\n');
}

const Re = {
    ADVENTURER: /^[AMCT](?: - [a-zA-Z]+)(?: - [0-9]){2}(?: - [NSEO])(?: - [ADG]+)$/,
    MAP: /^[AMCT](?: - [0-9]){2}$/,
    TREASURE: /^[AMCT](?: - [0-9]){3}$/,
    MOUNTAIN: /^[AMCT](?: - [0-9]){2}$/
}

function getRe(c) {
    switch (c) {
        case 'C':
            return Re.MAP;
        case 'M':
            return Re.MOUNTAIN;
        case 'T':
            return Re.TREASURE;
        case 'A':
            return Re.ADVENTURER;
        default:
            throw `Invalid line using ${c} as first character.`;
    }
}

function isLineValid(line, re) {
    if (!_.isNull(line.match(re))) {
        return line.match(re)[0] === line;
    }
    return false
}

function isFileCorrect(lines) {
    try {
        return _.every(lines.map(line => isLineValid(line, getRe(line[0]))), x => x === true)
    } catch (error) {
        return false
    }
}

function writeFile(lines) {
    const fileName = 'end_map.txt';
    writeFileSync(fileName, lines.join("\n"));
    console.log(`${fileName} written !`)
}

const SEP = ' - ';

function prepareAdventurersLines(adventurers) {
    return adventurers.map(adv => _.join([
        'A',
        adv.name,
        adv.position.x,
        adv.position.y,
        adv.orientation,
        adv.treasures
    ], SEP));
}

function prepareMapLine(size) {
    return [`C - ${size.x} - ${size.y}`];
}

function prepareMountainsLines(mountains) {
    return mountains.map(m => _.join([
        'M',
        m.x,
        m.y
    ], SEP));
}

function prepareTreasuresLines(treasures) {
    return treasures.map(t => _.join([
        'M',
        t.x,
        t.y,
        t.n
    ], SEP));
}

function prepareLines(map) {
    return [
        prepareMapLine(map.size),
        ...prepareMountainsLines(map.mountains),
        ...prepareTreasuresLines(map.treasures),
        ...prepareAdventurersLines(map.adventurers)
    ]
}

module.exports = {
    fileExist,
    getContent,
    getLines,
    isFileCorrect,
    isLineValid,
    getRe,
    Re,
    prepareAdventurersLines,
    prepareMapLine,
    prepareMountainsLines,
    prepareTreasuresLines,
    prepareLines,
    writeFile
}