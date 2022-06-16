const { getAdventurersLines, getAdventurers } = require('../hunt/adventurer');

test('Get adventurers lines from content', () => {
    lines = [
        'C​ - 3 - 4',
        'A​ - Lara - 1 - 1 - S - AADADAGGA'
    ]
    expect(getAdventurersLines(lines)).toEqual(['A​ - Lara - 1 - 1 - S - AADADAGGA']);
    lines.push('A​ - Nami - 1 - 5 - N - AAGGA')
    expect(getAdventurersLines(lines)).toEqual(['A​ - Lara - 1 - 1 - S - AADADAGGA', 'A​ - Nami - 1 - 5 - N - AAGGA']);
})