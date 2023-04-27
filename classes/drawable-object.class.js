class DrawableObject {

    img;
    imagecache = {};
    currentImage = 0;
    x = 50;
    y = 50;
    height = 80;
    width = 100;



    draw(ctx) {
        ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
    }


    drawFrame(ctx) {

        if (this instanceof Character || this instanceof Coin || this instanceof ThrowableObject
            || this instanceof Poison || this instanceof Pufferfish
            || this instanceof Jellyfish || this instanceof Endboss) {
            ctx.beginPath();
            ctx.lineWidth = '3';
            ctx.strokeStyle = 'black';
            ctx.rect(this.x + this.offset.left,
                this.y + this.offset.top,
                this.width - this.offset.left - this.offset.right,
                this.height - this.offset.top - this.offset.bottom
             );
            ctx.stroke();
        }
    }


    loadImage(path) {
        this.img = new Image();
        this.img.src = path;
    }


    loadImages(json) {
        json.forEach((path) => {
            let img = new Image();
            img.src = path;
            img.style = 'transform: scaleX(-1)';
            this.imagecache[path] = img;
        });
    }
}