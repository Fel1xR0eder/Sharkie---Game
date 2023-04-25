class Jellyfish extends MovableObject {

    IMAGES_SWIMMING = [
        './img/2.Enemy/2 Jelly fish/Regular damage/Yellow 1.png',
        './img/2.Enemy/2 Jelly fish/Regular damage/Yellow 2.png',
        './img/2.Enemy/2 Jelly fish/Regular damage/Yellow 3.png',
        './img/2.Enemy/2 Jelly fish/Regular damage/Yellow 4.png'
    ];

    IMAGES_DEAD = [
        'img/2.Enemy/2 Jelly fish/Dead/Yellow/y1.png',
        'img/2.Enemy/2 Jelly fish/Dead/Yellow/y2.png',
        'img/2.Enemy/2 Jelly fish/Dead/Yellow/y3.png',
        'img/2.Enemy/2 Jelly fish/Dead/Yellow/y4.png'
    ]

    health = true;


    constructor() {
        super().loadImage(this.IMAGES_SWIMMING[0]);
        this.x = 200 + Math.random() * 1000; 
        this.y = 50 + Math.random() * 200;
        this.speed = 0.1 + Math.random() * 0.1;
        this.loadImages(this.IMAGES_SWIMMING);
        this.loadImages(this.IMAGES_DEAD);
        this.animate();
    }


    animate() {
        setInterval(() => {
            this.playAnimation(this.IMAGES_SWIMMING);
        }, 100);

        setInterval(() => {
            this.moveLeft();
        }, 3000 / 60);
    }
}
