let canvas;
let world;
let keyboard = new Keyboard();

function init() {
    canvas = document.getElementById('canvas');
    world = new World(canvas, keyboard);

    console.log('My character is', world.character);
    console.log('My Enemies are', world.enemies);
    console.log('My Light is', world.lights);
    console.log('My Background is', world.backgroundObjects);
}

window.addEventListener("keydown", (e) => {
    if (e.keycode == 39) {
        keyboard.RIGHT = true;
    }

    if (e.keycode == 37) {
        keyboard.LEFT = true;
    }

    if (e.keycode == 38) {
        keyboard.UP = true;
    }

    if (e.keycode == 40) {
        keyboard.DOWN = true;
    }

    if (e.keycode == 32) {
        keyboard.SPACE = true;
    }

    console.log(e);
});

// window.addEventListener("keyup", (e) => {
//     if (e.keycode == 39) {
//         keyboard.RIGHT = false;
//     }

//     if (e.keycode == 37) {
//         keyboard.LEFT = false;
//     }

//     if (e.keycode == 38) {
//         keyboard.UP = false;
//     }

//     if (e.keycode == 40) {
//         keyboard.DOWN = false;
//     }

//     if (e.keycode == 32) {
//         keyboard.SPACE = false;
//     }
// });