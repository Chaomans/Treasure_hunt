const SEP = ' - ';

function createMap(content, adventurers) {
    return {
        size: getSize(getMapLine(content)),
        treasures: getTreasures(getTreasuresLines(content)),
        mountains: getMountains(getMountainsLines(content)),
        adventurers
    }
}

function getMapLine(lines) {
    return lines.filter(line => line.startsWith('C'));
}

function getMountainsLines(lines) {
    return lines.filter(line => line.startsWith('M'));
}

function getTreasuresLines(lines) {
    return lines.filter(line => line.startsWith('T'));
}

function getSize(line) {
    return { x: Number(line.split(SEP)[1]), y: Number(line.split(SEP)[2]) }
}

function getMountains(lines) {
    return lines.map(m => ({
        x: Number(m.split(SEP)[1]),
        y: Number(m.split(SEP)[2])
    }))
}

function getTreasures(lines) {
    return lines.map(t => ({
        x: Number(m.split(SEP)[1]),
        y: Number(m.split(SEP)[2]),
        n: Number(m.split(SEP)[3])
    }))
}

function isTreasure(map, pos) {
    return map.treasures.some(t => t.x === pos.x && t.y === pos.y);
}

function removeTreasure(map, pos) {
    map.treasures.foreach(t => {
        if (t.x === pos.x && t.y === pos.y) {
            t.n === t.n - 1;
        }
    });
    map.treasures = map.treasures.filter(t => t.n != 0);
}

function isMountain(map, pos) {
    return map.mountains.some(m => m.x === pos.x && m.y === pos.y);
}

module.exports = {
    createMap,
    getMountainsLines,
    getTreasuresLines,
    getMapLine,
    getSize,
    getMountains,
    getTreasures,
    isTreasure,
    removeTreasure,
    isMountain
}