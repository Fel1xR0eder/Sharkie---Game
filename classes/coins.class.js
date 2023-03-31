class Coins {

    height = 50;
    width = 50;
    y = 0;
    x = 100;

    IMAGES_COINS = [
        './img/4. Markers/1. Coins/1.png',
        './img/4. Markers/1. Coins/2.png',
        './img/4. Markers/1. Coins/3.png',
        './img/4. Markers/1. Coins/4.png'
    ];

    constructor() {
        this.loadImage(this.IMAGES_COINS[0]);
        this.loadImages(this.IMAGES_COINS);
        this.animate();
        this.x = 500;
        console.log('ALL IN');
    }

    animate() {

        setInterval(() => {
            this.playAnimation(this.IMAGES_COINS);
        }, 100);
    }
}