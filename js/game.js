let canvas;
let world;
let keyboard = new Keyboard();
let switchMusic = true;
let fullscreenBoo = false;
let ambience_sound = new Audio('./audio/gamesound.mp3');
let intro_sound = new Audio('./audio/underwater_normal.mp3');
let audioPlayer;
let showGameOver = 0;

const allAudios = [];

function init() {
    initLevel();
    //pushAllAudios();
    OpenCanvas();
    stopGameOverScreen();
    canvas = document.getElementById('canvas');
    world = new World(canvas, keyboard);
}

function initial() {
    console.log('pushen');
    Audio.pushAllAudios();
}


// function pushAllAudios() {
//     allAudios.push(ambience_sound);
//     allAudios.push(intro_sound);
// }


function enterFullscreen(element) {
    if (element.requestFullscreen) {
        element.requestFullscreen();
    } else if (element.msRequestFullscreen) {      // for IE11
        element.msRequestFullscreen();
    } else if (element.webkitRequestFullscreen) {  // iOS Safari
        element.webkitRequestFullscreen();
    }
}


function exitFullscreen() {
    if (document.exitFullscreen) {
        document.exitFullscreen();
    } else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen();
    }
}



function changeFullscreen() {
    if (!fullscreenBoo) {
        let fullCanvas = document.getElementById('full-div');
        document.getElementById('fullscreen').innerHTML = 'Exit Fullscreen'
        enterFullscreen(fullCanvas);
        fullscreenBoo = true;
    } else {
        document.getElementById('fullscreen').innerHTML = 'Fullscreen'
        exitFullscreen();
        fullscreenBoo = false;
    }
}

function OpenCanvas() {
    document.getElementById('canvas').style.display = 'block';
    document.getElementById('play-bar').style.display = 'none';
    document.getElementById('body').style.backgroundImage = `url('../img/3. Background/background.jpg')`;
    document.getElementById('credits').style.display = 'none';
    intro_sound.pause();
    playGameSound();
}

function stopGameOverScreen() {
    showGameOver++;
    if (showGameOver > 1) {
        document.getElementById('img-element').style.display = 'none';
    } else {
        document.getElementById('img-element').style.display = 'unset';
    }
}


function toggleMusic() {
    let musicButton = document.getElementById('music-switch');

    if (switchMusic == true) {
        musicButton.innerHTML = 'TURN MUSIC ON';
        switchMusic = false;
    } else {
        musicButton.innerHTML = 'TURN MUSIC OFF';
        switchMusic = true;
        pauseAllAudio();
    }
}


function pauseAllAudio() {
    console.log('geht');
    allAudios.forEach((audio) => {
        console.log(audio);
        audio.pause();
    })
}


function playIntroSound() {
    intro_sound.play();
}


function playGameSound() {
    if (switchMusic) {
        ambience_sound.play();
    }
}


function help() {
    document.getElementById('help-div').style.display = 'flex';
    document.getElementById('play-bar').style.display = 'none';
    document.getElementById('credits').style.display = 'none';
}


function backToMenu() {
    document.getElementById('help-div').style.display = 'none';
    document.getElementById('play-bar').style.display = 'flex';
}


function playAgain() {
    document.getElementById('restart')
}


window.addEventListener("keydown", (e) => {

    if (e.key == 'ArrowRight') {
        keyboard.RIGHT = true;
    }

    if (e.key == 'ArrowLeft') {
        keyboard.LEFT = true;
    }

    if (e.key == 'ArrowUp') {
        keyboard.UP = true;
    }

    if (e.key == 'ArrowDown') {
        keyboard.DOWN = true;
    }

    if (e.key == ' ') {
        keyboard.SPACE = true;
    }

    if (e.key == 'd') {
        keyboard.D = true;
    }

    if (e.key == 'a') {
        keyboard.A = true;
    }
});

window.addEventListener("keyup", (e) => {

    if (e.key == 'ArrowRight') {
        keyboard.RIGHT = false;
    }

    if (e.key == 'ArrowLeft') {
        keyboard.LEFT = false;
    }

    if (e.key == 'ArrowUp') {
        keyboard.UP = false;
    }

    if (e.key == 'ArrowDown') {
        keyboard.DOWN = false;
    }

    if (e.key == ' ') {
        keyboard.SPACE = false;
    }

    if (e.key == 'd') {
        keyboard.D = false;
    }

    if (e.key == 'a') {
        keyboard.A = false;
    }
});