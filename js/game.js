let canvas;
let world;
let keyboard = new Keyboard();
let playMusic = false;
let fullscreenBoo = false;
let audioPlayer;
let showGameOver = 0;
let audio = new Sound;
let landscape = false;
let gameStart = false;

const allAudios = [];

function init() {
    initLevel();
    OpenCanvas();
    canvas = document.getElementById('canvas');
    world = new World(canvas, keyboard);
}


function initOnload() {
    audio.pushAllAudios();
    initResponsive();
    touchEvents();
    stopGameOverScreen();
    checkDeviceRotation();
}


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
    audio.intro_sound.pause();
    //playGameSound();
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

    if (playMusic == true) {
        musicButton.innerHTML = 'TURN MUSIC OFF';
        playMusic = false;
    } else {
        musicButton.innerHTML = 'TURN MUSIC ON';
        playMusic = true;
        muteAllAudios();
    }
}


function muteAllAudios() {
    allAudios.forEach((audio) => {
        setInterval(() => {
            audio.volume = 0.0;
        }, 500);
    })
    console.log('MUTE ALL SOUNDS', audio);
}


function playIntroSound() {
    if (!playMusic) {
        audio.intro_sound.play();
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
    location.reload();

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

//  ##### TOUCH BUTTONS  ##### //

function touchEvents() {
    const keyboardButtons = {
        arrowUp: {
            key: 'UP',
            element: document.getElementById('touchbtn-up'),
        },
        arrowLeft: {
            key: 'LEFT',
            element: document.getElementById('touchbtn-left'),
        },
        arrowDown: {
            key: 'DOWN',
            element: document.getElementById('touchbtn-down'),
        },
        arrowRight: {
            key: 'RIGHT',
            element: document.getElementById('touchbtn-right'),
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

function initResponsive() {
    showTouchField();
    hideTouchField();

    setInterval(() => {
        if (!gameStart) { hideTouchField(); }
        else if (gameStart && landscape) { showTouchField(), hideElements(); }
        else if (gameStart) { showTouchField(), hideGameTitle(), showElements(); }
    }, 100);
}



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

function hideTouchField() {
    document.getElementById('touch-section-left-over').style.display = 'none';
    document.getElementById('touch-section-right').style.display = 'none';
}

function showTouchField() {
    document.getElementById('touch-section-left-over').style.display = 'flex';
    document.getElementById('touch-section-right').style.display = 'flex';
}