class  Ship {
    constructor(name, length, orientation) {
        this._name = name;
        this._length = length;
        this._orientation = orientation;

        this._hits = [];
        for(let i = 0; i < length; i++) {
            this._hits.push(false);
        }
        
        this._startPosition = {x: null, y: null};

    }

    get name() {
            return this._name;
    }
    set name(value) {
        this._name = value;
    }
    get length() {
        return this._length;
    }
    set length(value) {
        this._length = value;
    }
    get orientation() {
        return this._orientation;
    }
    set orientation(value) {
        this._orientation = value;
    }
    get hits() {
        return this._hits;
    }
    set hits(value) {
        this._hits = value;
    }
    get startPosition() {
        return this._startPosition;
    }
    set startPosition(value) {
        this._startPosition = value;
    }
    get startX() {
        return this._startPosition.x;
    }
    set startX(value) {
        this._startPosition.x = value;
    }
    get startY() {
        return this._startPosition.y;
    }
    set startY(value) {
        this._startPosition.y = value;
    }
    hit(index) {
        return this._hits[index] = true;
    }
    isSunk() {
        let res = true;
        this._hits.forEach(e => {
            res = e ? res : e;
        })
        return res;
    }
}


class Board {
    constructor(size) {
        this._size = size;
        this._grid = [];
        for(let i = 0; i < size; i++) {
            this._grid.push([]);
            for(let j = 0; j < size; j++) {
                this._grid[i].push(null);
            }
        }
        this._ships = [];
    }
    get size() {
        return this._size;
    }
    set size(value) {
       this._size = value;     
    }
    get ships() {
        return this._ships;
    }
    set ships(value) {
        this._ships = value;
    } 
    get grid() {
        return this._grid;
    }
    set grid(value) {
        this._grid = value;
    }

    placeShip(ship, x, y) {
    if(ship.orientation === 0) { // если горизонтальный корабль
        if(y + ship.length > this._size) {
            alert("вышел за рамки!");
            return false;
        }
        for(let i = 0; i < ship.length; i++)
            if(this._grid[x][y + i] !== null) {
                alert("клетка занята!");
                return false;
            }
                
                for(let i = 0; i < ship.length; i++)
                this._grid[x][y + i] = {
                    ship: ship,
                    index: i
                };
            
    } else if(ship.orientation === 1) { // если вертикальный корабль
        if(x + ship.length > this._size) {
            alert("вышел за рамки");
            return false;
        }
        for(let i = 0; i < ship.length; i++) 
            if(this._grid[x + i][y] !== null) {
                 alert("клетка занята!");
                 return false;
            }

                for(let i = 0; i < ship.length; i++)
                this._grid[x + i][y] = {
                    ship: ship,
                    index: i
                };
            }
    this._ships.push(ship);
    ship.startPosition = {x, y};
    return true;
}

    findAvailableCells() {
        let cells =[];
        for(let i = 0; i < this._size; i++) 
            for(let j = 0; j < this._size; j++)
                if(this._grid[i][j] === null) 
                    cells.push({x: i, y: j});
        return cells;
    }

    receiveAttack(x, y) {
        let attack = this._grid[x][y];
        if(attack !== null && attack.ship) {
            attack.ship.hit(attack.index);
            return true;
        }
        return false;
    }

    display() {
        let field = "";
        for(let i = 0; i < this._size; i++) {
            for(let j = 0; j < this._size; j++) {
                const cell = this._grid[i][j];

                if(cell === null) {
                    field += "o";
                } else if(cell.ship.hits[cell.index] === true) {
                    field += "x";
                } else {
                    field += "s";
                } 
            
            }
            field += '\n';
        }
        alert(field);
    }
}

const size = Number(prompt("введи размер поля"));
const myBoard = new Board(size);
const myShip = new Ship("ShipTest", 3, 0);
myBoard.placeShip(myShip, 0, 0);

console.log(myBoard.size + ', ' + myBoard.receiveAttack(0, 1));



