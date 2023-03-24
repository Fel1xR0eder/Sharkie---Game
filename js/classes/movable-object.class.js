class MovableObject {
    x = 50;
    y = 25;        // Pufferfish height = 175 = same height;
    img;
    height = 100;
    width = 100;

    imagecache = {};


    loadImage(path) {
        this.img = new Image();
        this.img.src = path;
    }


    loadImages(json) {
        json.forEach(path => {
            let img = new Image();
            img.src = path;
            this.imagecache[path] = path;
        });
    }

    moveRight() {
        console.log('Moving right');
    }

    moveLeft() {

    }
}