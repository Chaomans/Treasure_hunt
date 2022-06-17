const A = require('./adventurer');
const M = require('./map');
const F = require('./file');
const assert = require('assert');

function collectTreasure(map, adventurer) {
    A.addTreasure(adventurer);
    M.removeTreasure(map, adventurer.position);
}

function checkTreasure(map, adventurer) {
    if (M.isTreasure(map, adventurer.position)) {
        collectTreasure(map, adventurer);
    }
}

function doAction(map, adventurer) {
    if (adventurer.nextAction === -1) {
        return
    }
    switch (A.getActionType(A.getNextAction(adventurer))) {
        case A.Types.MOVE:
            if (M.canMove(map, A.getDestination(adventurer))) {
                A.move(adventurer);
                checkTreasure(map, adventurer);
            }
            break;
        case A.Types.TURN:
            A.turn(adventurer, A.getNextAction(adventurer));
            break;
    }
    A.setNextAction(adventurer);
}

function doTurnActions(map) {
    map.adventurers.forEach(a => {
        doAction(map, a)
    })
}

function getTurns(adventurers) {
    return Math.max(...adventurers.map(a => a.actions.length));
}

function hunt(map) {
    for (let turn = 0; turn < getTurns(map.adventurers); turn++) {
        doTurnActions(map);
    }
    return map;
}

function startHunt(path) {
    assert(F.fileExist(path), `File ${path} does not exists`);
    const lines = F.getLines(F.getContent(path));
    // assert(F.isFileCorrect(lines), 'File is not correct');
    const endMap = hunt(M.createMap(lines, A.getAdventurers(lines)))
    F.writeFile(F.prepareLines(endMap))
}

module.exports = {
    collectTreasure,
    checkTreasure,
    doAction,
    doTurnActions,
    getTurns,
    hunt,
    startHunt
}