class Jellyfish extends MovableObject {


    health = true;
    jellyShock = false;
    moveTop = false;
    moveBottom = false;


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


    constructor() {
        super().loadImage(this.IMAGES_SWIMMING[0]);
        this.x = 400 + Math.random() * 2000;
        this.y = 0 + Math.random() * 200;
        this.speed = 0.1 + Math.random() * 0.1;
        this.loadAllImages();
        this.animate();
        this.enemyBubbleDead();
        this.moveToBottom();
    }


    /**
     * load all images of the jellyfish
     */
    loadAllImages() {
        this.loadImages(this.IMAGES_SWIMMING);
        this.loadImages(this.IMAGES_SHOCK);
        this.loadImages(this.IMAGES_DEAD);
    }


    /**
     * when jellyfish is dead moves out of canvas
     */
    enemyBubbleDead() {
        setInterval(() => {
            if (!this.health) {
                this.speed = 0;
                setTimeout(() => {
                    this.y = 1000;
                }, 1000);
            };
        }, 200);
    }


    /**
     * jellyfish animates shock when character collides
     */
    shockAtCollision() {
        this.jellyShock = true;
        setTimeout(() => {
            this.jellyShock = false;
        }, 1500);
        this.playBuzzHurt();
    }


    /**
     * play electric shock music and stop it after one second
     */
    playBuzzHurt() {
        allAudios[2].play();    // buzz sound
        setTimeout(() => {
            allAudios[2].pause();   // buzz sound
        }, 1000);
    }


    /**
     * jellyfish moves up in an interval
     */
    moveToTop() {
        if(this.moveTop == true) {
            setTimeout(() => {
                setInterval(() => {
                    this.moveUp();
                }, 1000 / 60);
                this.moveBottom = false;
                this.moveTop = false;
                this.moveToBottom();
            }, 4000);
        }
    }


    /**
     * jellyfish moves down in an interval
     */
    moveToBottom() {
        if (this.moveBottom == false) {
            setTimeout(() => {
                setInterval(() => {
                    this.moveDown();
                }, 1000 / 60);
                this.moveBottom = true;
                this.moveTop = true;
                this.moveToTop();
            }, 2000);
        }
    }


    /**
     * plays the animations depending on the condition
     */
    animate() {
        setInterval(() => {
            if (this.jellyShock == true) {
                this.playAnimation(this.IMAGES_SHOCK);
            } else if (!this.health) {
                this.playAnimation(this.IMAGES_DEAD);
            } else {
                this.playAnimation(this.IMAGES_SWIMMING);
            }
        }, 200);
    }
}
