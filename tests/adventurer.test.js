const A = require('../hunt/adventurer');

test('Get adventurers lines from content', () => {
    const lines = [
        'C​ - 3 - 4',
        'A​ - Lara - 1 - 1 - S - AADADAGGA'
    ]
    expect(A.getAdventurersLines(lines)).toEqual(['A​ - Lara - 1 - 1 - S - AADADAGGA']);
    lines.push('A​ - Nami - 1 - 5 - N - AAGGA')
    expect(A.getAdventurersLines(lines)).toEqual(['A​ - Lara - 1 - 1 - S - AADADAGGA', 'A​ - Nami - 1 - 5 - N - AAGGA']);
})

test('Get adventurer name', () => {
    const line = 'A​ - Lara - 1 - 1 - S - AADADAGGA';
    expect(A.getName(line)).toBe('Lara');
})

test('Get adventurer position', () => {
    const line = 'A​ - Lara - 1 - 1 - S - AADADAGGA';
    expect(A.getPosition(line)).toEqual({ x: 1, y: 1 });
})

test('Get adventurer orientation', () => {
    const line = 'A​ - Lara - 1 - 1 - S - AADADAGGA';
    expect(A.getOrientation(line)).toEqual('S');
})

test('Get adventurer actions', () => {
    const line = 'A​ - Lara - 1 - 1 - S - AADADAGGA';
    expect(A.getActions(line)).toEqual('AADADAGGA');
})

test('Get adventurer destination', () => {
    const Lara = {
        name: 'Lara',
        position: { x: 1, y: 1 },
        orientation: 'N',
    }
    expect(A.getDestination(Lara)).toEqual({ x: 1, y: 0 });

    Lara.orientation = 'S';
    expect(A.getDestination(Lara)).toEqual({ x: 1, y: 2 });

    Lara.orientation = 'O';
    expect(A.getDestination(Lara)).toEqual({ x: 0, y: 1 });

    Lara.orientation = 'E';
    expect(A.getDestination(Lara)).toEqual({ x: 2, y: 1 });
})

test('Move adventurer', () => {
    const Lara = {
        name: 'Lara',
        position: { x: 1, y: 1 },
        orientation: 'N',
    }
    A.move(Lara)
    expect(Lara.position).toEqual({ x: 1, y: 0 });

    Lara.orientation = 'S';
    Lara.position.y = 1;
    A.move(Lara)
    expect(Lara.position).toEqual({ x: 1, y: 2 });

    Lara.orientation = 'O';
    Lara.position.y = 1;
    A.move(Lara)
    expect(Lara.position).toEqual({ x: 0, y: 1 });

    Lara.orientation = 'E';
    Lara.position.x = 1;
    A.move(Lara)
    expect(Lara.position).toEqual({ x: 2, y: 1 });
})

test('Change adventurer orientation', () => {
    const Lara = {
        name: 'Lara',
        position: { x: 1, y: 1 },
        orientation: 'N',
    }
    A.turn(Lara, 'D');
    expect(Lara.orientation).toBe('E');
    Lara.orientation = 'S';
    A.turn(Lara, 'G');
    expect(Lara.orientation).toBe('E');
})

test('Test Adventurer collecting treasure', () => {
    const Lara = {
        name: 'Lara',
        treasures: 0
    }
    A.addTreasure(Lara);
    expect(Lara.treasures).toBe(1);
})

const LINES = [
    'C​ - 3 - 4 ',
    'M​ - 1 - 0 ',
    'M​ - 2 - 1 ',
    'T​ - 0 - 3 - 2 ',
    'T​ - 1 - 3 - 3 ',
    'A​ - Lara - 1 - 1 - S - AADADAGGA',
    'A​ - Nima - 1 - 3 - E - DADGA'
];

const A1 = {
    name: 'Lara',
    position: { x: 1, y: 1 },
    orientation: 'S',
    actions: 'AADADAGGA',
    nextAction: 0,
    treasures: 0
}

const A2 = {
    name: 'Nima',
    position: { x: 1, y: 3 },
    orientation: 'E',
    actions: 'DADGA',
    nextAction: 0,
    treasures: 0
}

test('Get all Adventurers', () => {
    expect(A.getAdventurers(LINES)).toEqual([A1, A2]);
})

test('Get action type', () => {
    expect(A.getActionType('A')).toBe('move');
    expect(A.getActionType('G')).toBe('turn');
    expect(A.getActionType('D')).toBe('turn');
})

test('Get next action', () => {
    expect(A.getNextAction(A1)).toBe('A');
    expect(A.getNextAction(A2)).toBe('D');
    const A3 = JSON.parse(JSON.stringify(A1));
    A3.nextAction = 2;
    expect(A.getNextAction(A3)).toBe('D');
})

test('Set next action', () => {
    const A3 = JSON.parse(JSON.stringify(A1));
    A.setNextAction(A3);
    expect(A3.nextAction).toBe(1);
    A.setNextAction(A3);
    expect(A3.nextAction).toBe(2);
    A3.nextAction = A3.actions.length - 1
    A.setNextAction(A3);
    expect(A3.nextAction).toBe(-1);
})