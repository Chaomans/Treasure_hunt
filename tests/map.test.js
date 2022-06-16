const { getMountainsLines, getTreasuresLines, getMapLine } = require('../hunt/map');

const LINES = [
    'C​ - 3 - 4 ',
    'M​ - 1 - 0 ',
    'M​ - 2 - 1 ',
    'T​ - 0 - 3 - 2 ',
    'T​ - 1 - 3 - 3 ',
];

test('Get mountains lines from content', () => {
    expect(getMountainsLines(LINES)).toEqual([
        'M​ - 1 - 0 ',
        'M​ - 2 - 1 '
    ])
})

test('Get treasures lines from content', () => {
    expect(getTreasuresLines(LINES)).toEqual([
        'T​ - 0 - 3 - 2 ',
        'T​ - 1 - 3 - 3 '
    ])
})

test('Get map line from content', () => {
    expect(getMapLine(LINES)).toEqual([
        'C​ - 3 - 4 '
    ])
})
