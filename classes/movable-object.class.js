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
            if (this.isAboveGround() || this.speedY > 0) {           // Richtigen Y Wert finden 
                this.y -= this.speedY;
                this.speedY -= this.acceleration;
            }
        }, 1000 / 25);
    }

    isAboveGround() {
        return this.y < 30;
    }


        //isColliding (obj) {
      //  return  (this.X + this.width) >= obj.X && this.X <= (obj.X + obj.width) && 
      //          (this.Y + this.offsetY + this.height) >= obj.Y &&
      //          (this.Y + this.offsetY) <= (obj.Y + obj.height) && 
      //          obj.onCollisionCourse;

    draw(ctx) {
        ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
    }

    drawFrame(ctx) {
        if (this instanceof Character || this instanceof Pufferfish) {
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
}