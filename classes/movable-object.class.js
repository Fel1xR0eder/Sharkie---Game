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

    /**
     * checks if the object is colliding with another object.
     * @param {Object} mo - the object to check the collision with.
     * @returns {boolean} - returns true when the objects are colliding.
     */
    isColliding(mo) {
        return this.x + this.width - this.offset.right > mo.x + mo.offset.left &&
            this.y + this.height - this.offset.bottom > mo.y + mo.offset.top &&
            this.x + this.offset.left < mo.x + mo.width - mo.offset.right &&
            this.y + this.offset.top < mo.y + mo.height - mo.offset.bottom
    }


    /**
     * reduces the energy of the character when hit by an object.
     */
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

    /**
     * reduces the energy of the endboss when hit by a bubble.
     */
    bossHit() {
        this.bossEnergy -= 20;
        if (this.bossEnergy <= 0) {
            this.bossEnergy = 0;
            world.level.endboss[0].bossDead = true;
        }
    }


    /**
    * checks if the MovableObject is dead
    * @returns {boolean} true when energy is 0
    */
    isDead() {
        return this.energy == 0;
    }


    /**
    * checks if the endboss is dead
    * @returns {boolean} true when energy is 0
    */
    bossIsDead() {
        return this.bossEnergy == 0;
    }


    /**
     * fills up the coin statusbar
     * plays the coin collect sound
     */
    collectCoin() {
        this.money += 20;
        if (this.money >= 100) {
            this.money = 100;
        }
        allAudios[9].volume = 0.3;
        allAudios[9].play();
        setTimeout(() => allAudios[9].pause(), 500);
    }


    /**
     * fills up the poison statusbar
     * plays the poison collect sound
     */
    collectPoison() {
        this.poison += 20;
        if (this.poison >= 100) {
            this.poison = 100;
        }
        allAudios[10].play();
    }


    /**
     * shows the winscreen after win vs endboss
     */
    winScreen() {
        let i = 0;
        const imgElement = document.getElementById('img-element');
        imgElement.style.display = 'unset';
        setInterval(() => {
            imgElement.src = this.IMAGES_ENDSCREEN_WIN[i];
            i = (i + 1) % this.IMAGES_ENDSCREEN_WIN.length;
        }, 700);
        this.restartGame();
    }


    /**
     * shows the gameover screen after failure vs endboss
     */
    showEndScreen() {
        let i = 0;
        const imgElement = document.getElementById('img-element');
        setInterval(() => {
            imgElement.src = this.IMAGES_ENDSCREEN_FAIL[i];
            i = (i + 1) % this.IMAGES_ENDSCREEN_FAIL.length;
        }, 700);
        this.restartGame();
    }


    /**
     * hides the elements which should not be shown
     */
    restartGame() {
        document.getElementById('canvas').style.display = 'none'
        document.getElementById('credits').style.display = 'none'
        document.getElementById('start-game').style.display = 'none'
        document.getElementById('music-switch').style.display = 'none'
        document.getElementById('help').style.display = 'none'
        document.getElementById('fullscreen').style.display = 'none'
        document.getElementById('left-touch-section').style.display = 'none'
        document.getElementById('touch-section-right').style.display = 'none'
        document.getElementById('play-bar').style.display = 'flex';
        document.getElementById('restart').classList.remove('d-none');
    }


    /**
     * checks the time after a collision
     */
    isHurt() {
        let timePassed = new Date().getTime() - this.lastHit;
        timePassed = timePassed / 1000;
        return timePassed < 1;
    }


    /**
     * object moves right
     */
    moveRight() {
        this.x += this.speed;
    }


    /**
     * object moves left
     */
    moveLeft() {
        this.x -= this.speed;
    }


    /**
     * object moves up
     */
    moveUp() {
        this.y -= this.speed;
    }


    /**
     * object moves down
     */
    moveDown() {
        this.y += this.speed;
    }


    /**
     * plays animation of the array in loop
     * @param {Array} images 
     */
    playAnimation(images) {
        let i = this.currentImage % images.length;    // Modulu(s) =  i = 0,1,2,3,4,5,0,1,2,3,4,5, ...
        let path = images[i];
        this.img = this.imagecache[path];
        this.currentImage++;
    }
}