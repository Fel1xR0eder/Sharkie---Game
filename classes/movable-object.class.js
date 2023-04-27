class MovableObject extends DrawableObject {

    speed = 0.15;
    otherDirection = false;
    speedY = 0;
    acceleration = 2.5;
    energy = 100;
    lastHit = 0;
    money = 0;
    poison = 0;
    dead = false;

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
        this.energy -= 5;
        if (this.energy < 0) {
            this.energy = 0;
        } else {
            this.lastHit = new Date().getTime();
        }
        //console.log('Energy =', this.energy);
    }


    isDead() {
        return this.energy == 0;
    }


    collectCoin() {
        this.money += 20;
        if (this.money >= 100) {
            this.money = 100;
        }
    }


    collectPoison() {
        this.poison += 20;
        if (this.poison >= 100) {
            this.poison = 100;
        }
    }


    isHurt() {
        let timePassed = new Date().getTime() - this.lastHit;
        timePassed = timePassed / 1000;
        return timePassed < 1;
    }


    moveRight() {
        this.x += this.speed;
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


    // jump() {
    //     this.speedY = 30;
    // }

    // if(character.x + character.width > chicken.x &&
    // character.y + character.height > chicken.y &&
    // character.x < chicken.x && character.y < chicken.y + chicken.height
    // )
}