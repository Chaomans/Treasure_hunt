const SEP = ' - ';

function createMap(lines, adventurers) {
    return {
        size: getSize(getMapLine(lines)),
        treasures: getTreasures(getTreasuresLines(lines)),
        mountains: getMountains(getMountainsLines(lines)),
        adventurers
    }
}

function getMapLine(lines) {
    return lines.filter(line => line.startsWith('C'))[0];
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
        x: Number(t.split(SEP)[1]),
        y: Number(t.split(SEP)[2]),
        n: Number(t.split(SEP)[3])
    }))
}

function isTreasure(map, pos) {
    return map.treasures.some(t => t.x === pos.x && t.y === pos.y);
}

function removeTreasure(map, pos) {
    map.treasures.forEach(t => {
        if (t.x === pos.x && t.y === pos.y && t.n > 0) {
            t.n = t.n - 1;
        }
    });
    map.treasures = map.treasures.filter(t => t.n > 0);
}

function isMountain(map, pos) {
    return map.mountains.some(m => m.x === pos.x && m.y === pos.y);
}

function isAdventurer(map, pos) {
    return map.adventurers.some(a => a.position.x === pos.x && a.position.y === pos.y);
}

function isOut(map, pos) {
    return map.size.x <= pos.x
        || map.size.y <= pos.y
        || [pos.x, pos.y].some(x => x < 0);
}

function canMove(map, destination) {
    return !(isMountain(map, destination) || isAdventurer(map, destination) || isOut(map, destination))
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
    isMountain,
    isOut,
    canMove,
    isAdventurer
}