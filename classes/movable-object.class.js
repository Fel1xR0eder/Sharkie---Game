class MovableObject extends DrawableObject {

    speed = 0.15;
    otherDirection = false;
    speedY = 0;
    acceleration = 2.5;
    energy = 100;
    bossEnergy = 100;
    lastHit = 0;
    money = 0;
    poison = 0;
    dead = false;

    IMAGES_ENDSCREEN_FAIL = [
        './img/6.Buttons/Tittles/Game Over/Recurso 9.png',
        './img/6.Buttons/Tittles/Game Over/Recurso 10.png',
        './img/6.Buttons/Tittles/Game Over/Recurso 11.png',
        './img/6.Buttons/Tittles/Game Over/Recurso 12.png',
        './img/6.Buttons/Tittles/Game Over/Recurso 13.png'
    ]


    IMAGES_ENDSCREEN_WIN = [
        './img/6.Buttons/Tittles/You win/Recurso 19.png',
        './img/6.Buttons/Tittles/You win/Recurso 20.png',
        './img/6.Buttons/Tittles/You win/Recurso 21.png',
        './img/6.Buttons/Tittles/You win/Recurso 22.png'
    ]



    offset = {
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
    };

    // applyGravity() {
    //     setInterval(() => {
    //         if (this.isAboveGround() || this.speedY > 0) {           // Richtigen Y Wert finden 
    //             this.y -= this.speedY;
    //             this.speedY -= this.acceleration;
    //         }
    //     }, 1000 / 25);
    // }

    // isAboveGround() {
    //     return this.y < 30;
    // }


    isColliding(mo) {
        return this.x + this.width - this.offset.right > mo.x + mo.offset.left &&
            this.y + this.height - this.offset.bottom > mo.y + mo.offset.top &&
            this.x + this.offset.left < mo.x + mo.width - mo.offset.right &&
            this.y + this.offset.top < mo.y + mo.height - mo.offset.bottom
    }


    hit() {
        if (this.energy > 0) {
            this.energy -= 5;
            if (this.energy < 0) {
                this.energy = 0;
            } else {
                this.lastHit = new Date().getTime();
            }
        }
    }


    bossHit() {
        this.bossEnergy -= 20;
        if (this.bossEnergy <= 0) {
            this.bossEnergy = 0;
            world.level.endboss[0].bossDead = true;
        }
    }


    isDead() {
        return this.energy == 0;
    }


    bossIsDead() {
        return this.bossEnergy == 0;
    }


    collectCoin() {
        this.money += 20;
        if (this.money >= 100) {
            this.money = 100;
        }
        this.earn_coin_sound.play();
    }


    collectPoison() {
        this.poison += 20;
        if (this.poison >= 100) {
            this.poison = 100;
        }
        this.collect_poison_sound.play();
    }


    winScreen() {
        let i = 0;
        const imgElement = document.getElementById('img-element');
        setInterval(() => {
            imgElement.src = this.IMAGES_ENDSCREEN_WIN[i];
            i = (i + 1) % this.IMAGES_ENDSCREEN_WIN.length;
        }, 700);
        this.restartGame();
    }


    showEndScreen() {
        let i = 0;
        const imgElement = document.getElementById('img-element');
        setInterval(() => {
            imgElement.src = this.IMAGES_ENDSCREEN_FAIL[i];
            i = (i + 1) % this.IMAGES_ENDSCREEN_FAIL.length;
        }, 700);
        this.restartGame();
    }

    restartGame() {
        document.getElementById('canvas').style.display = 'none';
        document.getElementById('credits').style.display = 'none';
        document.getElementById('play-bar').style.display = 'flex';
        //document.getElementById('play-bar').style.alignItems = 'flex-end';
        //document.getElementById('start-game').innerHTML = 'RESTART';
        document.getElementById('restart').classList.remove('d-none');
        document.getElementById("start-game").style.display = 'none';
        document.getElementById("music-switch").style.display = 'none';
        document.getElementById("help").style.display = 'none';
        document.getElementById("fullscreen").style.display = 'none';
    }

    isHurt() {
        let timePassed = new Date().getTime() - this.lastHit;
        timePassed = timePassed / 1000;
        return timePassed < 1;
    }


    moveRight() {
        this.x += this.speed;
        audio.swimming_sound.play();
    }


    moveLeft() {
        this.x -= this.speed;
    }


    moveUp() {
        this.y -= this.speed;
    }


    moveDown() {
        this.y += this.speed;
    }


    playAnimation(images) {
        let i = this.currentImage % images.length;    // Modulu(s) =  i = 0,1,2,3,4,5,0,1,2,3,4,5, ...
        let path = images[i];
        this.img = this.imagecache[path];
        this.currentImage++;
    }
}