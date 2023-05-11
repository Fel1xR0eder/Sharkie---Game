class Pufferfish extends MovableObject {

    IMAGES_SWIMMING = [
        './img/2.Enemy/1.Puffer fish (3 color options)/1.Swim/1.swim1.png',
        './img/2.Enemy/1.Puffer fish (3 color options)/1.Swim/1.swim2.png',
        './img/2.Enemy/1.Puffer fish (3 color options)/1.Swim/1.swim3.png',
        './img/2.Enemy/1.Puffer fish (3 color options)/1.Swim/1.swim4.png',
        './img/2.Enemy/1.Puffer fish (3 color options)/1.Swim/1.swim5.png',
    ]

    IMAGES_TRANSITION = [
        './img/2.Enemy/1.Puffer fish (3 color options)/2.transition/1.transition1.png',
        './img/2.Enemy/1.Puffer fish (3 color options)/2.transition/1.transition2.png',
        './img/2.Enemy/1.Puffer fish (3 color options)/2.transition/1.transition3.png',
        './img/2.Enemy/1.Puffer fish (3 color options)/2.transition/1.transition4.png',
        './img/2.Enemy/1.Puffer fish (3 color options)/2.transition/1.transition5.png'
    ]

    IMAGES_ATTACK = [
        './img/2.Enemy/1.Puffer fish (3 color options)/3.Bubbleeswim/1.bubbleswim1.png',
        './img/2.Enemy/1.Puffer fish (3 color options)/3.Bubbleeswim/1.bubbleswim2.png',
        './img/2.Enemy/1.Puffer fish (3 color options)/3.Bubbleeswim/1.bubbleswim3.png',
        './img/2.Enemy/1.Puffer fish (3 color options)/3.Bubbleeswim/1.bubbleswim4.png',
        './img/2.Enemy/1.Puffer fish (3 color options)/3.Bubbleeswim/1.bubbleswim5.png'
    ]

    IMAGES_DEAD = [
        './img/2.Enemy/1.Puffer fish (3 color options)/4.DIE/Dead1.png',
        './img/2.Enemy/1.Puffer fish (3 color options)/4.DIE/Dead2.png',
        './img/2.Enemy/1.Puffer fish (3 color options)/4.DIE/Dead3.png'
    ]


    health = true;
    dead = false;
    transition = this.IMAGES_SWIMMING;
    pufferAttack = false;

    constructor() {
        super().loadImage('./img/2.Enemy/1.Puffer fish (3 color options)/1.Swim/1.swim1.png');
        this.x = 400 + Math.random() * 2000; // Zahl zwischen 200 & 1200 == (0 & 1) 
        this.y = 50 + Math.random() * 200;
        this.speed = 0.15 + Math.random() * 0.25;
        this.loadImages(this.IMAGES_SWIMMING);
        this.loadImages(this.IMAGES_TRANSITION);
        this.loadImages(this.IMAGES_ATTACK);
        this.loadImages(this.IMAGES_DEAD);
        this.animate();
        this.enemyBubbleDead();
    }


    enemyBubbleDead() {
        setInterval(() => {
            if (!this.health) {
                this.playAnimation(this.IMAGES_DEAD);
                this.speed = 0;
                setTimeout(() => {
                    this.y = 1000;
                }, 1000);
            };
        }, 200);
    }


    enemySlapDead() {
        if (!this.health) {
            this.playAnimation(this.IMAGES_DEAD);
            this.y = 30;        // TEST COORDINATES
            this.x = 0;
            this.speed = 0;
        }
    }
    

    bigAtCollision() {
        this.pufferAttack = true;
        setTimeout(() => {
            this.pufferAttack = false;
        }, 1500);
    }


    animate() {
        setInterval(() => {
            this.moveLeft();
        }, 1000 / 60);

        setInterval(() => {
            if (this.transition == this.IMAGES_SWIMMING) {
                this.playAnimation(this.IMAGES_TRANSITION);
                this.transition = this.IMAGES_TRANSITION;
            } else if (this.pufferAttack == true) {
                this.playAnimation(this.IMAGES_ATTACK);
            } else {
                this.playAnimation(this.IMAGES_SWIMMING);
                this.transition = this.IMAGES_SWIMMING;
            }
        }, 1000);
    }
}