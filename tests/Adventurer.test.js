const Adventurer = require("../classes/Adventurer");

test('Create an Adventurer', () => {
    const A = new Adventurer('Yunfa', 2, 3, 'N', 'ADDA');
    expect(A.name).toBe('Yunfa');
    expect(A.x).toBe(2);
    expect(A.y).toBe(3);
    expect(A.position).toStrictEqual([2, 3]);
    expect(A.orientation).toBe('N');
    expect(A.actions).toStrictEqual(['A', 'D', 'D', 'A', 'END']);
    expect(A.currentAction).toBe('A');
    expect(A.nextAction).toBe('D');
    expect(A.last).toBe('END');
})

test('Adventurer with just one action', () => {
    const A = new Adventurer('Yunfa', 2, 3, 'N', 'A');
    expect(A.currentAction).toBe('A');
    expect(A.nextAction).toBe("END");
})

test('Adventurer without action', () => {
    const A = new Adventurer('Yunfa', 2, 3, 'N', '');
    expect(A.currentAction).toBe('END');
    expect(A.nextAction).toBeNull();
})