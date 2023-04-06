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


    applyGravity() {
        setInterval(() => {
            if (this.isAboveGround() || y > 30) {           // Richtigen Y Wert finden
                this.y -= this.speedY;
                this.speedY -= this.acceleration;
            }
        }, 1000 / 25);
    }


    isAboveGround() {
        return this.y < 30;
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

    moveLeft() {
        setInterval(() => {
            this.x -= this.speed;
        }, 1000 / 60);
    }

    playAnimation(images) {
        let i = this.currentImage % images.length;    // Modulu(s) =  i = 0,1,2,3,4,5,0,1,2,3,4,5, ...
        let path = images[i];
        this.img = this.imagecache[path];
        this.currentImage++;
    }
}