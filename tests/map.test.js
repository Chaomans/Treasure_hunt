const { clone } = require('../utils');
const M = require('../hunt/map');
const { writeFile } = require('../hunt/file');

const LINES = [
    'C​ - 3 - 4 ',
    'M​ - 1 - 0 ',
    'M​ - 2 - 1 ',
    'T​ - 0 - 3 - 2 ',
    'T​ - 1 - 3 - 3 ',
];

test('Get mountains lines from content', () => {
    expect(M.getMountainsLines(LINES)).toEqual([
        'M​ - 1 - 0 ',
        'M​ - 2 - 1 '
    ])
})

test('Get treasures lines from content', () => {
    expect(M.getTreasuresLines(LINES)).toEqual([
        'T​ - 0 - 3 - 2 ',
        'T​ - 1 - 3 - 3 '
    ])
})

test('Get map line from content', () => {
    expect(M.getMapLine(LINES)).toEqual('C​ - 3 - 4 ')
})

test('Get map size', () => {
    const line = 'C​ - 3 - 4 ';
    expect(M.getSize(line)).toEqual({ x: 3, y: 4 });
})

test('Get mountains positions', () => {
    const lines = [
        'M​ - 1 - 0 ',
        'M​ - 2 - 1 '
    ]
    expect(M.getMountains(lines)).toEqual([{ x: 1, y: 0 }, { x: 2, y: 1 }]);
})

test('Get treasures positions', () => {
    const lines = [
        'T​ - 0 - 3 - 2 ',
        'T​ - 1 - 3 - 3 '
    ]
    expect(M.getTreasures(lines)).toEqual([{ x: 0, y: 3, n: 2 }, { x: 1, y: 3, n: 3 }]);
})

const Lara = {
    name: 'Lara',
    position: { x: 1, y: 1 },
    orientation: 'N',
    actions: 'AADAGA',
    nextAction: 0,
    treasures: 0
}

const MAP = {
    size: { x: 3, y: 4 },
    treasures: [
        { x: 0, y: 3, n: 2 },
        { x: 1, y: 3, n: 3 },
    ],
    mountains: [{ x: 1, y: 0 }, { x: 2, y: 1 }],
    adventurers: [Lara]
}

test('Check if treasure at position', () => {
    expect(M.isTreasure(MAP, { x: 0, y: 3 })).toBe(true);
    expect(M.isTreasure(MAP, { x: 0, y: 2 })).toBe(false);
})

test('Check if mountain at position', () => {
    expect(M.isMountain(MAP, { x: 1, y: 0 })).toBe(true);
    expect(M.isMountain(MAP, { x: 2, y: 0 })).toBe(false);
})

test('Check if adventurer at position', () => {
    expect(M.isAdventurer(MAP, { x: 1, y: 1 })).toBe(true);
    expect(M.isAdventurer(MAP, { x: 2, y: 0 })).toBe(false);
})

test('Check if position is out of the map', () => {
    expect(M.isOut(MAP, { x: 3, y: 3 })).toBe(true);
    expect(M.isOut(MAP, { x: 2, y: 4 })).toBe(true);
    expect(M.isOut(MAP, { x: -1, y: 4 })).toBe(true);
    expect(M.isOut(MAP, { x: -1, y: 3 })).toBe(true);
    expect(M.isOut(MAP, { x: 1, y: -3 })).toBe(true);
    expect(M.isOut(MAP, { x: -1, y: -3 })).toBe(true);
    expect(M.isOut(MAP, { x: 2, y: 0 })).toBe(false);
})

test('Check if adventurer can move', () => {
    expect(M.canMove(MAP, { x: 0, y: 1 })).toBe(true);
    expect(M.canMove(MAP, { x: 1, y: 0 })).toBe(false); // Mountain
    expect(M.canMove(MAP, { x: 1, y: 1 })).toBe(false); // Adventurer
    expect(M.canMove(MAP, { x: 4, y: 4 })).toBe(false); // out
})

test('Remove one treasure from the map at position', () => {
    const map = clone(MAP);
    M.removeTreasure(map, { x: map.treasures[0].x, y: map.treasures[0].y });
    expect(map.treasures[0].n).toBe(1);
    expect(map.treasures.length).toBe(2);
})

const LINES_2 = [
    'C​ - 3 - 4 ',
    'M​ - 1 - 0 ',
    'M​ - 2 - 1 ',
    'T​ - 0 - 3 - 2 ',
    'T​ - 1 - 3 - 3 ',
];

test('Create map', () => {
    expect(M.createMap(LINES_2, [Lara])).toEqual(MAP);
})