class Cell {
    constructor({ element, row, col, alive = false }) {
        // опредлить свойства
        this.element = element;
        this.row = row;
        this.col = col;
        this._alive = alive;

        // доинициализировать свойства в методе `init`
        this.init();
    }

    get alive() {
        return this._alive;
    }

    set alive(value) {
        this._alive = value;

        if (this._alive) {
            this.element.classList.add('alive');
        } else {
            this.element.classList.remove('alive');
        }
    }

    init() {
        this.element.className = 'cell';
        this.alive = this._alive;
        this.element.addEventListener('click', this.handleClick.bind(this));
    }

    handleClick(event) {
        this.alive = !this.alive;
    }
}