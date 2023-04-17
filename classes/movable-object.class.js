class MovableObject {
    x = 50;
    y = 25;
    img;
    height = 100;
    width = 100;
    speed = 0.15;
    otherDirection = false;
    speedY = 0;
    acceleration = 2.5;
    imagecache = {};
    currentImage = 0;
    energy = 100;


    applyGravity() {
        setInterval(() => {
            if (this.isAboveGround() || this.speedY > 0) {           // Richtigen Y Wert finden 
                this.y -= this.speedY;
                this.speedY -= this.acceleration;
            }
        }, 1000 / 25);
    }

    isAboveGround() {
        return this.y < 30;
    }


    hit() {
        this.energy -= 5;
        if(this.energy < 0) {
            this.energy = 0;
        }
    }

    isDead() {
        return this.energy == 0;
    }

    draw(ctx) {
        ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
    }

    drawFrame(ctx) {
        if (this instanceof Character || this instanceof Pufferfish || this instanceof Jellyfish) {
            ctx.beginPath();
            ctx.lineWidth = '3';
            ctx.strokeStyle = 'black';
            ctx.rect(this.x, this.y, this.width, this.height);
            ctx.stroke();
        }
    }

    loadImage(path) {
        this.img = new Image();
        this.img.src = path;
    }


    loadImages(json) {
        json.forEach(path => {
            let img = new Image();
            img.src = path;
            this.imagecache[path] = img;
        });
    }

    moveRight() {
        this.x += this.speed;
    }

    moveLeft() {
        this.x -= this.speed;
    }

    playAnimation(images) {
        let i = this.currentImage % images.length;    // Modulu(s) =  i = 0,1,2,3,4,5,0,1,2,3,4,5, ...
        let path = images[i];
        this.img = this.imagecache[path];
        this.currentImage++;
    }

    jump() {
        this.speedY = 30;
    }

    // if(character.x + character.width > chicken.x &&
    // character.y + character.height > chicken.y &&
    // character.x < chicken.x && character.y < chicken.y + chicken.height
    // )

    isColliding(mo) {
        return this.x + this.width > mo.x &&
            this.y + this.height > mo.y &&
            this.x < mo.x &&
            this.y < mo.y + mo.height
    }

    // (this.x + this.width) >= mo.x && this.x <= (mo.x + mo.width) &&
    // (this.y + this.offsety + this.height) >= mo.y &&
    // (this.y + this.offsety) <= (mo.y + mo.height);
}