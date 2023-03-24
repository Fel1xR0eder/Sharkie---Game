let canvas;

function init() {
    canvas = document.getElementById('canvas');
    let world = new World(canvas);

    console.log('My character is', world.character);
    console.log('My Enemies are', world.enemies);
    console.log('My Light is', world.lights);
    console.log('My Background is', world.backgroundObjects);
}