class  Ship {
    constructor(name, length, orientation) {
        this._name = name;
        this._length = length;
        this._orientation = orientation;

        this._hits = [];
        for(let i = 0; i < length; i++) {
            this._hits.push(false);  // все корабли инициализируем непробитыми клетками
        }
        
        this._startPosition = {x: null, y: null}; // объект начальных позиций

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
        return this._hits[index] = true;  // метод для пробития по индексу
    }
    isSunk() {      // метод для проверки, потоплен ли корабль
        let res = true;  // 
        this._hits.forEach(e => {
            res = e ? res : e; // если все элементы будут такие же как рес, то корабль потоплен
        })
        return res;
    }
}


class Board {
    constructor(size) {
        this._size = size;
        this._grid = [];      // инициализация двумерного поля null 
        for(let i = 0; i < size; i++) {
            this._grid.push([]);
            for(let j = 0; j < size; j++) {
                this._grid[i].push(null);
            }
        }
        this._ships = [];  // массив кораблей на поле
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

    placeShip(ship, x, y) {  // расположение корабля на поле

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

    findAvailableCells() {  // возврат пустых доступных клеток
        let cells =[];
        for(let i = 0; i < this._size; i++) 
            for(let j = 0; j < this._size; j++)
                if(this._grid[i][j] === null) 
                    cells.push({x: i, y: j});
        return cells;
    }

    receiveAttack(x, y) {  // атака по оппоненту
        if(x < 0 || x >= this.size || y < 0 || y >= this.size)
            return false;
        let attack = this._grid[x][y];
        
        if(attack !== null && attack?.ship) {
            attack.ship.hit(attack.index);  // пометка о попадании
            return true;
        }
        this._grid[x][y] = 'miss';  // пометка о промахе
        return false;
    }

    display() {  // вывод текущего состояния доски
        let field = "твое поле \n";
        for(let i = 0; i < this._size; i++) {
            for(let j = 0; j < this._size; j++) {
                const cell = this._grid[i][j];

                if(cell === null) {
                    field += "o";
                } else if(cell === 'miss') {
                    field += "m";
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

    displayOpponent() {  // вывод текущего состояния доски оппонента(без показа кораблей)
        let field = "поле противника \n";
        for(let i = 0; i < this._size; i++) {
            for(let j = 0; j < this._size; j++) {
                const cell = this._grid[i][j];

                if(cell === null) {
                    field += "o";
                } else if(cell === 'miss') {
                    field += "m";
                } else if(cell.ship.hits[cell.index] === true) {
                    field += "x";
                } else {
                    field += "o";
                } 
            
            }
            field += '\n';
        }
        alert(field);
    }
}
class Player {
    constructor(name, boardSize) {
        this._name = name;
        this._boardSize = boardSize;
        this._board = new Board(boardSize);  // создание доски для игрока
    }
    get name() {
        return this._name;
    }
    set name(value) {
        this._name = value;
    }
    get boardSize() {
        return this._boardSize;
    }
    set boardSize(value) {
        this._boardSize = value;
    }
    get board() {
        return this._board;
    }
    placeShips(shipName, length, isVertical, startPosition) {  // создание корабля и расположение его на поле
        if(isVertical !== 1 && isVertical !== 0) 
        return false;
        const ship = new Ship(shipName, length, isVertical);
        return this._board.placeShip(ship, startPosition.x, startPosition.y);
    }
    takeTurn(opponent) {  // возврат экземпляра оппонента по введенным координатам
        let x = parseInt(prompt("введи x координаты удара"));
        let y = parseInt(prompt("введи y координаты удара"));
        if(isNaN(x) || isNaN(y)) {
            alert("вводи числа!");
            return this.takeTurn(opponent);  // если введены были не числа то вызывается рекурсия
        }
        return {
            x: x,
            y: y,
            opponent: opponent
        };
    }
}

class App {
    constructor(boardSize, maxShipSize, maxCountShip) {
        this._boardSize = boardSize;
        this._maxShipSize = maxShipSize;
        this._maxCountSHip = maxCountShip;

        this.firstPlayer = null;
        this.secondPlayer = null;
        this.winner = null;
    }

    get boardSize() {
        return this._boardSize;
    }
    set boardSize(value) {
        this._boardSize = value;
    }
    get maxShipSize() {
        return this._maxShipSize;
    }
    set maxShipSize(value) {
        this._maxShipSize = value;
    }
    get maxCountShip() {
        return this._maxCountSHip;
    }
    set maxCountShip(value) {
        this._maxCountSHip = value;
    }

    shipArrangement(player, shipCount, maxShipLength) {  // создание и размещение кораблей

        for(let i = 0; i < shipCount; i++) { // цикл проходит по всем кораблям
            let Placed = false;
            while(!Placed) {
                let shipName = prompt(`имя корабля ${i + 1} :`);
                if(!shipName) {
                    shipName = `Ship ${i + 1}`;
                }
                let shipLength = null;
                let isVertical = null;
                
                while(true) {
                shipLength = parseInt(prompt(`длина корабля ${shipName}, максимум: ${maxShipLength}`));
                isVertical = parseInt(prompt(`Расположение корабля ${shipName} (0 - горизонтально, 1 - вертикально)`));
                if(shipLength <= maxShipLength && (isVertical === 0 || isVertical === 1) && !isNaN(shipLength) && !isNaN(isVertical)) 
                    break;
                    alert("такие крейсеры и ориентации твой океан не потянет");
                }
                
                let startPosition = { };
                while(true) {
                const x = parseInt(prompt("введите координату x :"));
                const y = parseInt(prompt("введите координату y :"));

                if(!isNaN(x) && !isNaN(y)) {
                    startPosition = {x, y};
                    break;
                }
                    alert("введи числа!");  
            }
                
                Placed = player.placeShips(shipName, shipLength, isVertical, startPosition);
                if(!Placed) 
                    alert("не удалось разместить корабль");
            }
        }
    }

    run() {  // весь игровой процесс

        this.firstPlayer = new Player(prompt("имя первого игрока :"), this._boardSize);
        this.secondPlayer = new Player(prompt("имя второго игрока :"), this._boardSize);
        let shipCount = null;
        let currentPlayer = this.firstPlayer;
        let otherPlayer = this.secondPlayer;
        while(shipCount == null) {
        shipCount = parseInt(prompt("введите количество кораблей"));
        if(shipCount > this._maxCountSHip || isNaN(shipCount) || shipCount <= 0 ) {
            alert("невалидное количество кораблей, юнга!");
            shipCount = null;
        }
    }
    let length = null;
    while(length == null) {
        length = parseInt(prompt("введи максимальрную длину кораблей"));
        if(length > this._maxShipSize || isNaN(length) || length <= 0) {
            alert("таких крейсеров не бывает, салага!");
            length = null;
        }
    }
    alert("игрок 1 расставляет корабли!");
    this.shipArrangement(currentPlayer, shipCount, length);
    
     alert("игрок 2 расставляет корабли!");
     this.shipArrangement(otherPlayer, shipCount, length);


     alert("игра началась!");

     while(true) {
        let isHit;
        let res = null;
        alert(`ход  ${currentPlayer.name}`);
        currentPlayer.board.display();
        otherPlayer.board.displayOpponent();
        let coordAttack;
        while(true) {
        coordAttack = currentPlayer.takeTurn(otherPlayer);
        if(coordAttack.x < 0 || coordAttack.x >= otherPlayer.boardSize || coordAttack.y < 0 || coordAttack.y >= otherPlayer.boardSize) {
            alert("куда бъешь то!?");
            continue;
            }
            const cell = otherPlayer.board.grid[coordAttack.x][coordAttack.y];
            if(cell === 'miss' || cell?.ship?.hits[cell.index]) {
                alert("ты сюда уже бил");
                continue;
            }
        isHit = otherPlayer.board.receiveAttack(coordAttack.x, coordAttack.y);
        break;
        }
        alert(isHit ? "Есть пробитие!" : "Мимо!");
       
        if(isHit) {
        const cell = otherPlayer.board.grid[coordAttack.x][coordAttack.y];
            if(cell?.ship?.isSunk()) {
                alert("Корабль затоплен!");
                res = otherPlayer.board.ships.every(ship => ship.isSunk());
                if(res) {
                    alert(`победил игрок ${currentPlayer.name}`);
                    this.winner = currentPlayer;
                    return false
                }
            }
     }
     let tempPlayer = currentPlayer;
     currentPlayer = otherPlayer;
     otherPlayer = tempPlayer;
    }
    }

}

class HumanPlayer extends Player {
    constructor(name, boardSize) {
        super(name, boardSize);  // доступ к родительскому классу
    }                            // геттеры и сеттеры в доступе так же с родительского класса


    placeShips(shipName, length, isVertical, startPosition) {  // создание корабля и расположение его на поле
       
        return super.placeShips(shipName, length, isVertical, startPosition); // вызываем метод в родительском классе
    }

    takeTurn(opponent) {  // возврат экземпляра оппонента по введенным координатам
        
        return super.takeTurn(opponent);
    }
}

class AIPlayer extends Player {
    constructor(name, boardSize) {
        super(name, boardSize);  // доступ к родительскому классу
                               // геттеры и сеттеры в доступе так же с родительского класса
    }
   
    
    placeShips(shipName, length, isVertical, startPosition) {  // создание корабля и расположение его на поле
       let placed = false;

       while(!placed) {
        const x = Math.floor(Math.random() * this.board.size);
        const y = Math.floor(Math.random() * this.board.size);
        const orientation = Math.floor(Math.random() * 2);

        placed = super.placeShips(shipName, length, orientation, {x, y}); // вызываем метод в родительском классе
       }

        return true;
    }

    takeTurn(opponent) {  // возврат экземпляра оппонента по введенным координатам
        
        const x = Math.floor(Math.random() * this.board.size);
        const y = Math.floor(Math.random() * this.board.size);

        return {
            x: x,
            y: y,
            opponent: opponent
        };
    }
}

const ai = new AIPlayer('"AIPlayer"', 5);
console.log(ai.name);




