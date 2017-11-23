class Game {
    constructor({ element, grid }) {
        // определить свойства
        this.element = element;
        this.grid = grid;
        this.playButton = null;
        this.speed = 0;
        this.playGame = false;
        this.interval = null;

        // доинициализировать свойства в методе `init`
        this.init();
    }

    init() {
        // сохранить кнопку Play в свойство и подписаться на событие `click`
        this.playButton = this.element.querySelector('#play-button');
        this.playButton.addEventListener('click', this.handlePlayButtonClick.bind(this));

        // сохранить кнопку Reset в свойство и подписаться на событие `click`
        this.resetButton = this.element.querySelector('#reset-button');
        this.resetButton.addEventListener('click', this.handleResetButtonClick.bind(this));

        // сохранить кнопку Random в свойство и подписаться на событие `click`
        this.randomButton = this.element.querySelector('#randomize-button');
        this.randomButton.addEventListener('click', this.handleRandomizeButtonClick.bind(this));

        // сохранить слайдер Speed в свойство и подписаться на событие `input`
        this.speedButton = this.element.querySelector('#speed-slider');
        this.speedButton.addEventListener('input', this.handleSpeedSliderChange.bind(this));
    }

    play() {
        // отметить что игра в процессе
        this.playGame = true;

        // изменить содержимое кнопки Play на pause (название икноки)
        this.playButton.textContent = 'pause';

        // высчитать следующее поколение клеток
        this.grid.next();
    }

    pause() {
        // отметить что игра присотановлена
        this.playGame = false;

        // изменить содержимое кнопки Play на play_arrow (название икноки)
        this.playButton.textContent = 'play_arrow';

        // очистить интервал
        clearInterval(this.interval);
    }

    reset() {
        // отметить что игра присотановлена
        this.playGame = false;

        // изменить содержимое кнопки Play на play_arrow (название икноки)
        this.playButton.textContent = 'play_arrow';

        // сбросить состояние клетки
        this.grid.reset();

        // обнулить слайдер
        this.speedButton.value = 0;

        // обнулить скорость
        this.speed = 0;

        // очистить интервал
        clearInterval(this.interval);
    }

    randomize() {
        // если игра в процсее, то ничего делать не нужно
        // сбросить игру
        // опредлить случайное сосояние сетки
        if (this.playGame) {} else {
            this.reset();
            this.grid.randomize();
        }
    }

    handlePlayButtonClick(event) {
        if (this.playGame) {
            this.pause();
        } else {
            this.play();
            this.interval = setInterval(this.play.bind(this), 1000 - this.speed);
        }
    }

    handleResetButtonClick(event) {
        // обнулить игру
        this.reset();
    }

    handleRandomizeButtonClick(event) {
        // определить случайное состояние для игры
        this.randomize();
    }

    handleSpeedSliderChange(event) {
        // получить значение слайдера
        let currentValueSlider = Number(event.target.value);
        this.speed = currentValueSlider;

        // очистить интервал
        // запустить интервал с новой скоростью
        clearInterval(this.interval);
        this.interval = setInterval(this.play.bind(this), 1000 - this.speed);
    }
}