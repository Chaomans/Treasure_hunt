const F = require('../hunt/file');

const PATH = __dirname + '/data/';
const DATA = PATH + 'data_1.txt';
const NULLDATA = PATH + 'data_0.txt';
const READ = PATH + 'read.txt';

test('Check if file exists', () => {
    expect(F.fileExist(DATA)).toBe(true);
    expect(F.fileExist(NULLDATA)).toBe(false);
})

test('Read file content', () => {
    data = 'SOMETXT'
    expect(F.getContent(READ)).toEqual(data);
})

test('Transforms content into list', () => {
    const content = F.getContent(DATA);
    expect(F.getLines(content)).toEqual([
        'C​ - 3 - 4',
        'M​ - 1 - 0',
        'M​ - 2 - 1',
        'T​ - 0 - 3 - 2',
        'T​ - 1 - 3 - 3',
        'A​ - Lara - 1 - 1 - S - AADADAGGA',
    ]);
})

test('Get the right regex', () => {
    expect(F.getRe('T')).toStrictEqual(F.Re.TREASURE);
    expect(() => F.getRe('R')).toThrow('Invalid line using R as first character.');
})

const T = 'T - 1 - 3 - 3';
const C = 'C - 3 - 4';
const M = 'M - 1 - 0';
const A = 'A - Lara - 1 - 1 - S - AADADAGGA';
const wrongLine_1 = 'T - 1 - 3 - 3 - 8';
const wrongLine_2 = 'E - 1 - 3 - 3';

test('Apply regex on line', () => {
    expect(F.isLineValid(A, F.getRe(A[0]))).toBe(true);
    expect(F.isLineValid(T, F.getRe(T[0]))).toBe(true);
    expect(F.isLineValid(C, F.getRe(C[0]))).toBe(true);
    expect(F.isLineValid(M, F.getRe(M[0]))).toBe(true);
    expect(F.isLineValid(wrongLine_1, F.getRe(wrongLine_1[0]))).toBe(false);
    try {
        F.isLineValid(wrongLine_2, F.getRe(wrongLine_2[0]))
    } catch (error) {
        expect(error).toBe('Invalid line using E as first character.');
    }
})

test('Check if file data are correct', () => {
    expect(F.isFileCorrect([
        T,
        C,
        M,
        A,
    ])).toBe(true);
    expect(F.isFileCorrect([
        T,
        C,
        M,
        A,
        wrongLine_1
    ])).toBe(false);
    try {
        F.isFileCorrect([
            T,
            C,
            wrongLine_2,
            M,
            A
        ])
    } catch (error) {
        expect(error).toBe('Invalid line using E as first character.')
    }
})