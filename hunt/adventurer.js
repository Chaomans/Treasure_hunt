const { canMove } = require("./map");

const SEP = ' - ';
const ORIENTATIONS = ['N', 'E', 'S', 'O'];

function getAdventurers(lines) {
    return getAdventurersLines(lines).map(line => ({
        name: getName(line),
        position: getPosition(line),
        orientation: getOrientation(line),
        actions: getActions(line),
        nextAction: 0,
        treasures: 0
    }))
}

function getName(line) {
    return line.split(SEP)[1];
}

function getPosition(line) {
    return { x: Number(line.split(SEP)[2]), y: Number(line.split(SEP)[3]) }
}

function getOrientation(line) {
    return line.split(SEP)[4]
}

function getActions(line) {
    return line.split(SEP)[5]
}

function getAdventurersLines(lines) {
    return lines.filter(line => line.startsWith('A'));
}

function getDestination(adventurer) {
    switch (adventurer.orientation) {
        case ORIENTATIONS[0]: // N
            return {
                x: adventurer.position.x,
                y: adventurer.position.y - 1
            }
        case ORIENTATIONS[2]: // S
            return {
                x: adventurer.position.x,
                y: adventurer.position.y + 1
            }
        case ORIENTATIONS[1]: // E
            return {
                x: adventurer.position.x + 1,
                y: adventurer.position.y
            }
        case ORIENTATIONS[3]: // O
            return {
                x: adventurer.position.x - 1,
                y: adventurer.position.y
            }
    }
}

function getActionType(action) {
    return action === 'A' ? Types.MOVE : Types.TURN;
}

function getNextAction(adventurer) {
    return adventurer.actions[adventurer.nextAction];
}

const Types = {
    MOVE: 'move',
    TURN: 'turn'
}

function move(adventurer) {
    switch (adventurer.orientation) {
        case ORIENTATIONS[0]: // N
            adventurer.position.y = adventurer.position.y - 1;
            break;
        case ORIENTATIONS[2]: // S
            adventurer.position.y = adventurer.position.y + 1;
            break;
        case ORIENTATIONS[1]: // E
            adventurer.position.x = adventurer.position.x + 1;
            break;
        case ORIENTATIONS[3]: // O
            adventurer.position.x = adventurer.position.x - 1;
            break;
    }
}

function turn(adventurer, direction) {
    switch (direction) {
        case 'D':
            adventurer.orientation = ORIENTATIONS[(ORIENTATIONS.findIndex(x => x === adventurer.orientation) + 1) % ORIENTATIONS.length];
            break;
        case 'G':
            adventurer.orientation = ORIENTATIONS[(ORIENTATIONS.findIndex(x => x === adventurer.orientation) + 3) % ORIENTATIONS.length];
            break;
    }
}

function addTreasure(adventurer) {
    adventurer.treasures = adventurer.treasures + 1;
}

function setNextAction(adventurer) {
    adventurer.nextAction = adventurer.nextAction === adventurer.actions.length - 1
        ? adventurer.nextAction = - 1
        : adventurer.nextAction = adventurer.nextAction + 1
}

module.exports = {
    getAdventurersLines,
    getAdventurers,
    getPosition,
    getName,
    getOrientation,
    getActions,
    getDestination,
    move,
    turn,
    addTreasure,
    getActionType,
    getNextAction,
    setNextAction,
    Types
};