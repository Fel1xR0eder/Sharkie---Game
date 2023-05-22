class Light extends MovableObject {

    y = 0;
    width = 750;
    height = 200;

    constructor() {
        super().loadImage('./img/3. Background/Layers/1. Light/full.png');
        this.x = Math.random() * 500;
        this.animate();
    }

    /**
     * the light moves to the left side
     */
    animate() {
        this.moveLeft();
    }
}   