class Endboss extends MovableObject {

    height = 600;
    width = 500;
    y = -180;
    bossAttack = false;
    bossDead = false;
    bossDisplayed = false;

    offset = {
        top: 250,
        left: 0,
        right: 50,
        bottom: 100,
    }

    IMAGES_ENDBOSS_FLOATING = [
        './img/2.Enemy/3 Final Enemy/2.floating/1.png',
        './img/2.Enemy/3 Final Enemy/2.floating/2.png',
        './img/2.Enemy/3 Final Enemy/2.floating/3.png',
        './img/2.Enemy/3 Final Enemy/2.floating/4.png',
        './img/2.Enemy/3 Final Enemy/2.floating/5.png',
        './img/2.Enemy/3 Final Enemy/2.floating/6.png',
        './img/2.Enemy/3 Final Enemy/2.floating/7.png',
        './img/2.Enemy/3 Final Enemy/2.floating/8.png',
        './img/2.Enemy/3 Final Enemy/2.floating/9.png',
        './img/2.Enemy/3 Final Enemy/2.floating/10.png',
        './img/2.Enemy/3 Final Enemy/2.floating/11.png',
        './img/2.Enemy/3 Final Enemy/2.floating/12.png',
        './img/2.Enemy/3 Final Enemy/2.floating/13.png'
    ]

    IMAGES_ENDBOSS_INTRO = [
        'img/2.Enemy/3 Final Enemy/1.Introduce/1.png',
        'img/2.Enemy/3 Final Enemy/1.Introduce/2.png',
        'img/2.Enemy/3 Final Enemy/1.Introduce/3.png',
        'img/2.Enemy/3 Final Enemy/1.Introduce/4.png',
        'img/2.Enemy/3 Final Enemy/1.Introduce/5.png',
        'img/2.Enemy/3 Final Enemy/1.Introduce/6.png',
        'img/2.Enemy/3 Final Enemy/1.Introduce/7.png',
        'img/2.Enemy/3 Final Enemy/1.Introduce/8.png',
        'img/2.Enemy/3 Final Enemy/1.Introduce/9.png',
        'img/2.Enemy/3 Final Enemy/1.Introduce/10.png'
    ]

    IMAGES_ENDBOSS_ATTACK = [
        'img/2.Enemy/3 Final Enemy/Attack/1.png',
        'img/2.Enemy/3 Final Enemy/Attack/2.png',
        'img/2.Enemy/3 Final Enemy/Attack/3.png',
        'img/2.Enemy/3 Final Enemy/Attack/4.png',
        'img/2.Enemy/3 Final Enemy/Attack/5.png',
        'img/2.Enemy/3 Final Enemy/Attack/6.png'
    ];

    IMAGES_ENDBOSS_DEAD = [
        'img/2.Enemy/3 Final Enemy/Dead/Mesa de trabajo 2 copia 6.png',
        'img/2.Enemy/3 Final Enemy/Dead/Mesa de trabajo 2 copia 7.png',
        'img/2.Enemy/3 Final Enemy/Dead/Mesa de trabajo 2 copia 8.png',
        'img/2.Enemy/3 Final Enemy/Dead/Mesa de trabajo 2 copia 9.png',
        'img/2.Enemy/3 Final Enemy/Dead/Mesa de trabajo 2 copia 10.png'
    ];

    IMAGES_ENDBOSS_HURT = [
        'img/2.Enemy/3 Final Enemy/Hurt/1.png',
        'img/2.Enemy/3 Final Enemy/Hurt/2.png',
        'img/2.Enemy/3 Final Enemy/Hurt/3.png',
        'img/2.Enemy/3 Final Enemy/Hurt/4.png'
    ];



    constructor() {
        super().loadImage(this.IMAGES_ENDBOSS_INTRO[0]);
        this.loadImages(this.IMAGES_ENDBOSS_INTRO);
        this.loadImages(this.IMAGES_ENDBOSS_FLOATING);
        this.loadImages(this.IMAGES_ENDBOSS_ATTACK);
        this.loadImages(this.IMAGES_ENDBOSS_DEAD);
        this.loadImages(this.IMAGES_ENDBOSS_HURT);
        this.animate();
        this.endbossAttack();
        this.x = 2400;
    }


    endbossAttack() {
        setInterval(() => {
            if (world.character.x >= 2150) {
                this.bossAttack = true;
                this.bossHealth -= 20;
                this.x -= 5;
                if (this.bossAttack == false) {
                    this.bossAttack = true;
                    this.currentImage = 0;
                }
            }
        }, 100);
    }


    endbossDead() {
        if (!this.bossDead) {
            this.bossHealth = true;
            this.currentImage = 0;
            setInterval(() => {
                this.speed = 10;
                this.y += this.speed;
                if (this.y >= 280) {
                    this.speed = 0;
                    this.y = 280;
                }
            }, 100);
        };
    }


    animate() {
        let bossInterval =
            setInterval(() => {
                if (this.isDead()) {
                    this.playAnimation(this.IMAGES_ENDBOSS_DEAD);
                    if (this.currentImage >= this.IMAGES_ENDBOSS_DEAD.length) {
                        this.bossDead = false;
                        this.endbossDead();
                    }
                } else if (this.isHurt()) {
                    this.playAnimation(this.IMAGES_ENDBOSS_HURT);
                } else if (world.character.x >= 2050 && this.bossDisplayed == false) {
                    setTimeout(() => {
                        this.playAnimation(this.IMAGES_ENDBOSS_INTRO);
                        this.currentImage = 0;
                        this.bossDisplayed = true;
                    }, 500);
                } else if (this.bossAttack || this.bossDisplayed) {
                    this.playAnimation(this.IMAGES_ENDBOSS_ATTACK);
                    if (this.currentImage >= this.IMAGES_ENDBOSS_ATTACK.length) {
                        this.bossAttack = false;
                    }
                } else if (world.character.x > 2100 || this.bossDisplayed) {
                    this.playAnimation(this.IMAGES_ENDBOSS_FLOATING);
                } else {
                    this.loadImage(this.IMAGES_ENDBOSS_INTRO[0]);
                }
            }, 150);
        ;
    }
}

// setTimeout(() => {
        //     console.log('ATTACK');
        //     if (this.playAnimation(this.IMAGES_ENDBOSS_ATTACK)) {
        //         clearInterval(bossInterval);
        //         console.log('Clear Interval');
        //     } else {
        //         this.animate();
        //     }
        // }, 5000);