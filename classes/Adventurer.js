let TURN = require('../globals');

class Adventurer {

    constructor(name, x, y, orientation, actions) {
        this.name = name;
        this.x = x;
        this.y = y;
        this.orientation = orientation;
        this.actions = actions;
    }

    get last() {
        return "END";
    }

    //name
    set name(n) {
        this._name = n;
    }

    get name() {
        return this._name;
    }

    //position
    set x(x) {
        this._x = x;
    }

    get x() {
        return this._x;
    }

    set y(y) {
        this._y = y;
    }

    get y() {
        return this._y;
    }

    get position() {
        return [this._x, this._y];
    }

    //orientation
    set orientation(o) {
        this._orientation = o;
    }

    get orientation() {
        return this._orientation;
    }

    set actions(a) {
        this._actions = a.split('');
        this._actions.push(this.last);
    }

    get actions() {
        return this._actions;
    }

    get nextAction() {
        if (this.actions.length < 2) {
            return null;
        }
        return this.actions[TURN + 1];
    }

    get currentAction() {
        return this.actions[TURN];
    }


}

module.exports = Adventurer;