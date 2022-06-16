const { fileExist, getContent, getLines } = require('../hunt/file');

const PATH = __dirname + '/data/';
const DATA = PATH + 'data_1.txt';
const NULLDATA = PATH + 'data_0.txt';
const READ = PATH + 'read.txt';

test('Check if file exists', () => {
    expect(fileExist(DATA)).toBe(true);
    expect(fileExist(NULLDATA)).toBe(false);
})

test('Read file content', () => {
    data = 'SOMETXT'
    expect(getContent(READ)).toEqual(data);
})

test('Transforms content into list', () => {
    const content = getContent(DATA);
    expect(getLines(content)).toEqual([
        'C​ - 3 - 4 ',
        'M​ - 1 - 0 ',
        'M​ - 2 - 1 ',
        'T​ - 0 - 3 - 2 ',
        'T​ - 1 - 3 - 3 ',
        'A​ - Lara - 1 - 1 - S - AADADAGGA',
    ]);
})