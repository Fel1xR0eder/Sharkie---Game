class DrawableObject {

    img;
    imagecache = {};
    currentImage = 0;
    x = 50;
    y = 50;
    height = 80;
    width = 100;


    /**
    * Draws the objects on the canvas.
    * @param {Canvas} ctx - The canvas context to draw on.
    */
    draw(ctx) {
        ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
    }

/**
 * loads one image
 * @param {Image} path  
 */
    loadImage(path) {
        this.img = new Image();
        this.img.src = path;
    }


    /**
     * loads images in the imagecache.
     * @param {json} arr - array of images
     */
    loadImages(arr) {
        arr.forEach((path) => {
            let img = new Image();
            img.src = path;
            img.style = 'transform: scaleX(-1)';
            this.imagecache[path] = img;
        });
    }
}