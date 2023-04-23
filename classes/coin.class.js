class Coin extends MovableObject {

    height = 50;
    width = 50;

    IMAGES_COIN = [
        './img/4. Markers/1. Coins/1.png',
        './img/4. Markers/1. Coins/2.png',
        './img/4. Markers/1. Coins/3.png',
        './img/4. Markers/1. Coins/4.png'
    ];

    constructor() {
        super().loadImage(this.IMAGES_COIN[0]);
        this.x = 200 + Math.random() * 2000; // Zahl zwischen 200 & 1200 === (0 & 1) 
        this.y = 
        this.loadImages(this.IMAGES_COIN);
        this.animate();
    }

    animate() {
        setInterval(() => {
            this.playAnimation(this.IMAGES_COIN);
        }, 100);
    }
}