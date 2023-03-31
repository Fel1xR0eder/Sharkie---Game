class Jellyfish extends MovableObject {
    y = 175;

    IMAGES_SWIMMING = [
        './img/2.Enemy/2 Jelly fish/Regular damage/Yellow 1.png',
        './img/2.Enemy/2 Jelly fish/Regular damage/Yellow 2.png',
        './img/2.Enemy/2 Jelly fish/Regular damage/Yellow 3.png',
        './img/2.Enemy/2 Jelly fish/Regular damage/Yellow 4.png'
    ];

    constructor() {
        super().loadImage(this.IMAGES_SWIMMING[0]);
        this.x = 200 + Math.random() * 500; // Zahl zwischen 200 & 700 === (0 & 1) 
        this.speed = 0.1 + Math.random() * 0.1;
        this.loadImages(this.IMAGES_SWIMMING);
        this.animate();
    }

    animate() {
        setInterval(() => {
            this.playAnimation(this.IMAGES_SWIMMING);
        }, 100);
    }
}
