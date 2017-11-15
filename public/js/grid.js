class Grid {
    constructor({ element, size }) {
        this.element = element;
        this.tableGrid = null;
        this.size = size;
        this.cells = null;
        this.buffer = null;

        this.init();
    }

    init() {
        // ЗАМЕТКА: DOM-элементы создаются с помощью метода createElement('название элемента')

        // создать таблицу и сохранить ее в свойство
        this.tableGrid = document.createElement('table');

        // создать массивы для клеток и буфера (временное хранение для расчета следующего поколения)
        this.cells = new Array(this.size);
        this.buffer = new Array(this.size);
   
        // перебрать ряды
            // создать элемент tr
            // доинициализировать массивы для клеток и буфера
        for (let r = 0; r < this.size; r++) {
            let row = document.createElement('tr');
            this.cells[r] = new Array(this.size);
            this.buffer[r] = new Array(this.size);

            // перебрать столбцы
                // создать клетку
                // добавить ее в ряд
                // сохранить ее в сетку
                // продублировать значение в буфере
            for (let c = 0; c < this.size; c++) {
                 let cell = new Cell({
                    element: document.createElement('td'),
                    row: r,
                    col: c,
                 });

                 row.appendChild(cell.element);
                 this.cells[r][c] = cell;
                 this.buffer[r][c] = false;
            }

            // добавить ряд в таблицу
            this.tableGrid.appendChild(row);
        }

        // добавить таблицу в элемент
        this.element.appendChild(this.tableGrid);
    }

    countNeighbors(cell) {
        // высчитать и вернуть количество соседей у клетки
        let size = this.size;
        let cells = this.cells;
        let { row, col } = cell;
        let count = 0;

        // +1 если сверху есть живая клетка
        if (row - 1 >= 0) {
            if (cells[row - 1][col].alive) count += 1;
        }

        // +1 если сверху слева есть живая клетка
        if (row - 1 >= 0 && col - 1 >= 0) {
            if (cells[row - 1][col - 1].alive) count += 1;
        }

        // +1 если сверху справа есть живая клетка
        if (row - 1 >= 0 && col + 1 < size) {
            if (cells[row - 1][col + 1].alive) count += 1;
        }

        // +1 если слева есть живая клетка
        if (col - 1 >= 0) {
            if(cells[row][col - 1].alive) count += 1;
        }

        // +1 если справа есть живая клетка
        if (col + 1 < size) {
            if (cells[row][col + 1].alive) count += 1;
        }

        // +1 если снизу есть живая клетка
        if (row + 1 < size) {
            if (cells[row + 1][col].alive) count += 1;
        }

        // +1 если снизу справа есть живая клетка
        if (row + 1 < size && col + 1 < size) {
            if (cells[row + 1][col + 1].alive) count += 1;
        }

        // +1 если снизу слева есть живая клетка
        if (row + 1 < size && col - 1 >= 0) {
            if (cells[row + 1][col - 1].alive) count += 1;
        }

        // вернуть количество соседей
        return count;        
    }

    reset() {        
        // привести сетку в исходное состояние
        for (let r = 0; r < this.size; r++) {
            for (let c = 0; c < this.size; c++) {
                this.cells[r][c].alive = false;
            }
        }
    }

    resetBuffer() {
        for (let r = 0; r < this.size; r++) {
            for (let c = 0; c < this.size; c++) {
                this.cells[r][c].alive = this.buffer[r][c];
                this.buffer[r][c] = false;
            }
        }
    }

    randomize() {
        // определить случайное состояние для сетки
        this.reset();

        for (let r = 0; r < this.size; r++) {
            for (let c = 0; c < this.size; c++) {
                let isAlive = Math.random() >= 0.5;
                this.cells[r][c].alive = isAlive;
            }
        }
    }


    next() {
        for (let r = 0; r < this.size; r++) {
            for (let c = 0; c < this.size; c++) {
                let cell = this.cells[r][c];
                let neighbors = this.countNeighbors(cell);

                if (cell.alive) {
                    if (neighbors < 2) {
                        this.buffer[r][c] = false;
                    } else if (neighbors === 2 || neighbors === 3) {
                        this.buffer[r][c] = true;
                    } else if (neighbors > 3) {
                        this.buffer[r][c] = false;
                    }
                } else {
                    if (neighbors === 3) {
                        this.buffer[r][c] = true;
                    }
                }
            }
        }

        this.resetBuffer();
    }
}
