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
            res = e ? res : e; // если все элементы будут true, то корабль потоплен 
            // e true? - res = res; e false? - res = e;
        })
        return res;
    }
}


const name = prompt("введи название корабля");
const length = Number(prompt("теперь длину корабля"));
const orientation = prompt("ну и расположение");
const myShip = new Ship(name, length, orientation);

myShip.hit(0);
myShip.hit(1);

console.log('"' + myShip.name + '", ' +  myShip.length + ', ' + myShip.orientation + ', ' + myShip.isSunk());

