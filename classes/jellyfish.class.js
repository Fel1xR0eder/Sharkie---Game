class Jellyfish extends MovableObject {

    IMAGES_SWIMMING = [
        './img/2.Enemy/2 Jelly fish/Regular damage/Yellow 1.png',
        './img/2.Enemy/2 Jelly fish/Regular damage/Yellow 2.png',
        './img/2.Enemy/2 Jelly fish/Regular damage/Yellow 3.png',
        './img/2.Enemy/2 Jelly fish/Regular damage/Yellow 4.png'
    ];

    IMAGES_DEAD = [
        './img/2.Enemy/2 Jelly fish/Dead/Yellow/y1.png',
        './img/2.Enemy/2 Jelly fish/Dead/Yellow/y2.png',
        './img/2.Enemy/2 Jelly fish/Dead/Yellow/y3.png',
        './img/2.Enemy/2 Jelly fish/Dead/Yellow/y4.png'
    ]

    IMAGES_SHOCK = [
        './img/2.Enemy/2 Jelly fish/S｣per dangerous/Green 1.png',
        './img/2.Enemy/2 Jelly fish/S｣per dangerous/Green 2.png',
        './img/2.Enemy/2 Jelly fish/S｣per dangerous/Green 3.png',
        './img/2.Enemy/2 Jelly fish/S｣per dangerous/Green 4.png'
    ]

    health = true;


    constructor() {
        super().loadImage(this.IMAGES_SWIMMING[0]);
        this.x = 200 + Math.random() * 2000;
        this.y = 0 + Math.random() * 200;
        this.speed = 0.1 + Math.random() * 0.1;
        this.loadImages(this.IMAGES_SWIMMING);
        this.loadImages(this.IMAGES_DEAD);
        this.animate();
        this.enemyBubbleDead();
        //this.slapShock();
    }

    enemyBubbleDead() {
        setInterval(() => {
            if (!this.health) {
                this.playAnimation(this.IMAGES_DEAD);
                this.speed = 0;
                this.y = 1000;
            };
        }, 200);
    }



    // slapShock() {
    //     if (this.character.isColliding(this.Jellyfish)) {
    //         this.character.hit();
    //         setInterval(() => {
    //             this.playAnimation(this.IMAGES_SHOCK);
    //         }, 500);
    //     }
    // }


    animate() {
        setInterval(() => {
            this.playAnimation(this.IMAGES_SWIMMING);
        }, 100);

        setInterval(() => {
            this.moveLeft();
        }, 3000 / 60);
    }
}
