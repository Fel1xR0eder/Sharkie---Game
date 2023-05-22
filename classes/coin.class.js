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
        this.x = 450 + Math.random() * 1750; 
        this.y = 50 + Math.random() * 200;
        this.loadImages(this.IMAGES_COIN);
        this.animate();
    }

    /**
     * animates the coins
     */
    animate() {
        setInterval(() => {
            this.playAnimation(this.IMAGES_COIN);
        }, 100);
    }
}