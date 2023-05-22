let canvas;
let world;
let keyboard = new Keyboard();
let playMusic = false;
let fullscreen = false;
let audioPlayer;
let showGameOver = 0;
let audio = new Sound;
let landscape = false;
let gameStart = false;
const allAudios = [];


/**
 * Initalizes everything in the game
 * character, world 
 */
function init() {
    initLevel();
    OpenCanvas();
    canvas = document.getElementById('canvas');
    world = new World(canvas, keyboard);
    gameStart = true;
}


/**
 * Preloads the game
 */
function initOnload() {
    audio.pushAllAudios();
    initResponsive();
    touchEvents();
    stopGameOverScreen();
    checkDeviceRotation();
}


/**
 * toggles fullscreen on
 * @param {div} element - div container
 */
function enterFullscreen(element) {
    if (element.requestFullscreen) {               // most browser
        element.requestFullscreen();
    } else if (element.msRequestFullscreen) {      // IE11
        element.msRequestFullscreen();
    } else if (element.webkitRequestFullscreen) {  // iOS Safari
        element.webkitRequestFullscreen();
    }
}


/**
 * toggles fullscreen off
 */
function exitFullscreen() {
    if (document.exitFullscreen) {
        document.exitFullscreen();
    } else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen();
    }
}


/**
 * toggles fullscreen on or off
 */
function changeFullscreen() {
    if (!fullscreen) {
        let fullCanvas = document.getElementById('full-div');
        document.getElementById('fullscreen').innerHTML = 'Exit Fullscreen'
        enterFullscreen(fullCanvas);
        fullscreen = true;
    } else {
        document.getElementById('fullscreen').innerHTML = 'Fullscreen'
        exitFullscreen();
        fullscreenBoo = false;
    }
}


/**
 * starts the game and open the canvas
 */
function OpenCanvas() {
    document.getElementById('canvas').style.display = 'block';
    document.getElementById('play-bar').style.display = 'none';
    document.getElementById('body').style.backgroundImage = `url('./img/3. Background/background.jpg')`;
    document.getElementById('credits').style.display = 'none';
    allAudios[0].pause();   // normal sound
    allAudios[1].play();    // gamesound 
}


/**
 * shows the endscreen
 */
function stopGameOverScreen() {
    showGameOver++;
    if (showGameOver > 1) {
        document.getElementById('img-element').style.display = 'none';
    } else {
        document.getElementById('img-element').style.display = 'unset';
    }
}


/**
 * toggle music on or off
 */
function toggleMusic() {
    let musicButton = document.getElementById('music-switch');
    if (playMusic == true) {
        musicButton.innerHTML = 'TURN MUSIC OFF';
        playMusic = false;
    } else {
        musicButton.innerHTML = 'TURN MUSIC ON';
        playMusic = true;
        muteAllAudios();
    }
}


/**
 * mute all sounds during the game
 */
function muteAllAudios() {
    allAudios.forEach((audio) => {
        setInterval(() => {
            audio.volume = 0.0;
        }, 500);
    })
    console.log('MUTE ALL SOUNDS', audio);
}


/**
 * plays the intro sound before starting the game
 */
function playIntroSound() {
    if (!playMusic) {
        allAudios[0].play();
    }
}


/**
 * shows the help container
 */
function help() {
    document.getElementById('help-div').style.display = 'flex';
    document.getElementById('play-bar').style.display = 'none';
    document.getElementById('credits').style.display = 'none';
}


/**
 * exits from the help container
 */
function backToMenu() {
    document.getElementById('help-div').style.display = 'none';
    document.getElementById('play-bar').style.display = 'flex';
}


/**
 * allows to restart the game
 */
function playAgain() {
    location.reload();
}


/**
 * gives the keyboard keys a function on keydown
 */
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


/**
 * 
 * gives the keyboard keys a function on keyup
 */
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


/**
 * gives the touch buttons a function
 */
function touchEvents() {
    const keyboardButtons = {
        arrowUp: {
            key: 'UP',
            element: document.getElementById('touch-event-up'),
        },
        arrowLeft: {
            key: 'LEFT',
            element: document.getElementById('touch-event-left'),
        },
        arrowDown: {
            key: 'DOWN',
            element: document.getElementById('touch-event-down'),
        },
        arrowRight: {
            key: 'RIGHT',
            element: document.getElementById('touch-event-right'),
        },
        attackTouch: {
            key: 'D',
            element: document.getElementById('bubble-attack-touch'),
        },
    };
    

    function handleTouchEvent(e, button) {
        e.preventDefault();
        keyboard[button.key] = e.type === 'touchstart';
    }

    Object.values(keyboardButtons).forEach((button) => {
        const { key, element} = button;
        element.addEventListener('touchstart', (e) => handleTouchEvent(e, button));
        element.addEventListener('touchend', (e) => handleTouchEvent(e, button));
    });
}


/**
 * hide or show elements depending on the device
 */
function initResponsive() {
    setInterval(() => {
        if (!gameStart) { hideTouchElements();}    // No start
        else if (gameStart && landscape) { showTouchElements(), hideHeadline(); }  // Phone start no headline
        else if (gameStart) { hideTouchElements(); } // Normal start
    }, 100);
}


/**
 * check the device size
 */
function checkDeviceRotation() {
    let canvas = document.getElementById('canvas');
    setInterval(() => {
        if (window.matchMedia("(orientation: landscape)").matches) {
            if (window.innerHeight < 480 || window.innerWidth < 720) {
                newHeight = window.innerHeight;
                canvas.style.height = `${newHeight}px`;
                landscape = true;
            } else {
                landscape = false;
            }
        } else {
            canvas.style.height = `100%`;
            landscape = false;
        }
    }, 500);
}


/**
 * hides touch elements when not needed
 */
function hideTouchElements() {
    document.getElementById('hud').style.display = 'none';
}


/**
 * hides headline when not needed
 */
function hideHeadline() {
    document.getElementById('h1').style.display = 'none';
}


/**
 * shows the touch elements
 */
function showTouchElements() {
    document.getElementById('hud').style.display = 'flex';
}