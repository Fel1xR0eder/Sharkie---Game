class Coin extends MovableObject {

    height = 50;
    width = 50;
    y = 100;

    IMAGES_SWIMMING = [
        './img/4. Markers/1. Coins/1.png',
        './img/4. Markers/1. Coins/2.png',
        './img/4. Markers/1. Coins/3.png',
        './img/4. Markers/1. Coins/4.png'
    ];

    constructor() {
        super().loadImage(this.IMAGES_SWIMMING[0]);
        this.x = 250 * 2;
        this.loadImages(this.IMAGES_SWIMMING);
        this.animate();
        console.log('AL COINS IN');
    }

    animate() {

        setInterval(() => {
            this.playAnimation(this.IMAGES_SWIMMING);
        }, 100);
    }
}