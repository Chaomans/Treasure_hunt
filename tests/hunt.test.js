const H = require('../hunt/hunt');
const { clone } = require('../utils');

const A1 = {
    name: 'Lara',
    position: { x: 1, y: 1 },
    orientation: 'S',
    actions: 'AAGADADAA',
    nextAction: 0,
    treasures: 0
}

const A2 = {
    name: 'Nima',
    position: { x: 1, y: 3 },
    orientation: 'E',
    actions: 'DADADA',
    nextAction: 0,
    treasures: 0
}

const MAP = {
    size: { x: 3, y: 4 },
    treasures: [
        { x: 0, y: 3, n: 2 },
        { x: 1, y: 3, n: 3 }
    ],
    mountains: [{ x: 1, y: 0 }, { x: 0, y: 2 }],
    adventurers: [A1, A2]
}

test('Collect a treasure', () => {
    const map = clone(MAP);
    H.collectTreasure(map, map.adventurers[1]);
    expect(map.treasures[1].n).toBe(2);
})

test('Check if there is a Treasure and collect it', () => {
    const map = clone(MAP);
    H.checkTreasure(map, map.adventurers[0]);
    expect(map.treasures[1].n).toBe(3);
    H.checkTreasure(map, map.adventurers[1]);
    expect(map.treasures[1].n).toBe(2);
})

test('Do one single action', () => {
    const map = clone(MAP);
    H.doAction(map, map.adventurers[0]); // A
    expect(map.adventurers[0].position).toEqual({
        x: 1,
        y: 2
    });
    H.doAction(map, map.adventurers[1]); // D
    expect(map.adventurers[1].orientation).toBe('S');
})

test('Do one action for all adventurers', () => {
    const map = clone(MAP);
    H.doTurnActions(map);
    expect(map.adventurers[0].position).toEqual({
        x: 1,
        y: 2
    });
    expect(map.adventurers[1].orientation).toBe('S');
})

test('Count number of turns to do all actions', () => {
    const map = clone(MAP);
    expect(H.getTurns(map.adventurers)).toBe(9)
})

test('Do all actions', () => {
    const map = H.hunt(clone(MAP));
    expect(map.treasures).toEqual([
        { x: 0, y: 3, n: 1 },
        { x: 1, y: 3, n: 2 }
    ]);
    const Lara = map.adventurers[0];
    const Nima = map.adventurers[1];
    expect(Lara.treasures).toBe(1);
    expect(Lara.position).toEqual({ x: 1, y: 3 });
    expect(Lara.nextAction).toBe(-1);
    expect(Nima.position).toEqual({ x: 0, y: 3 });
    expect(Nima.treasures).toBe(1);
    expect(Nima.nextAction).toBe(-1);
})