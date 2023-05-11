class Endboss extends MovableObject {

    height = 600;
    width = 500;
    y = -180;
    distance_char_boss = 0;
    bossAttack = false;
    bossDead = false;
    bossHurt = false;
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
        './img/2.Enemy/3 Final Enemy/1.Introduce/1.png',
        './img/2.Enemy/3 Final Enemy/1.Introduce/2.png',
        './img/2.Enemy/3 Final Enemy/1.Introduce/3.png',
        './img/2.Enemy/3 Final Enemy/1.Introduce/4.png',
        './img/2.Enemy/3 Final Enemy/1.Introduce/5.png',
        './img/2.Enemy/3 Final Enemy/1.Introduce/6.png',
        './img/2.Enemy/3 Final Enemy/1.Introduce/7.png',
        './img/2.Enemy/3 Final Enemy/1.Introduce/8.png',
        './img/2.Enemy/3 Final Enemy/1.Introduce/9.png',
        './img/2.Enemy/3 Final Enemy/1.Introduce/10.png'
    ]

    IMAGES_ENDBOSS_ATTACK = [
        './img/2.Enemy/3 Final Enemy/Attack/1.png',
        './img/2.Enemy/3 Final Enemy/Attack/2.png',
        './img/2.Enemy/3 Final Enemy/Attack/3.png',
        './img/2.Enemy/3 Final Enemy/Attack/4.png',
        './img/2.Enemy/3 Final Enemy/Attack/5.png',
        './img/2.Enemy/3 Final Enemy/Attack/6.png'
    ];

    IMAGES_ENDBOSS_DEAD = [
        './img/2.Enemy/3 Final Enemy/Dead/Mesa de trabajo 2 copia 6.png',
        './img/2.Enemy/3 Final Enemy/Dead/Mesa de trabajo 2 copia 7.png',
        './img/2.Enemy/3 Final Enemy/Dead/Mesa de trabajo 2 copia 8.png',
        './img/2.Enemy/3 Final Enemy/Dead/Mesa de trabajo 2 copia 9.png',
        './img/2.Enemy/3 Final Enemy/Dead/Mesa de trabajo 2 copia 10.png'
    ];

    IMAGES_ENDBOSS_HURT = [
        './img/2.Enemy/3 Final Enemy/Hurt/1.png',
        './img/2.Enemy/3 Final Enemy/Hurt/2.png',
        './img/2.Enemy/3 Final Enemy/Hurt/3.png',
        './img/2.Enemy/3 Final Enemy/Hurt/4.png'
    ];



    constructor() {
        super().loadImage(this.IMAGES_ENDBOSS_INTRO[0]);
        this.loadAllImages();
        this.animate();
        this.endbossAttack();
        this.x = 2900;
        this.distanceOf();
    }

    loadAllImages() {
        this.loadImages(this.IMAGES_ENDBOSS_INTRO);
        this.loadImages(this.IMAGES_ENDBOSS_FLOATING);
        this.loadImages(this.IMAGES_ENDBOSS_ATTACK);
        this.loadImages(this.IMAGES_ENDBOSS_DEAD);
        this.loadImages(this.IMAGES_ENDBOSS_HURT);
    }


    distanceOf() {
        setInterval(() => {
            this.distance_char_boss = this.x - world.character.x;
            return this.distance_char_boss;
        }, 100);
    }


    endbossAttack() {
        setInterval(() => {
            if (this.distance_char_boss <= 400) {
                this.bossAttack = true;
                this.x -= 2;
                if (this.bossAttack == false) {
                    this.bossAttack = true;
                    this.currentImage = 0;
                }
            }
        }, 100);
    }


    endbossDeadAnimation() {
        setInterval(() => {
            if (this.bossDead) {
                this.speed = 0;
                this.y += 20;

                if (this.y >= 100) {
                    this.y = 100;
                    this.speed = 0;
                    this.x = this.x;
                    clearInterval(this.bossinterval); // Bossinterval = 19;
                }
            }
            setTimeout(() => {
                this.gameOver();
            }, 1200);
        }, 200)
    }


    animate() {
        let i = 0;
        let bossinterval = setInterval(() => {
            if (this.characterNearBoss(i)) { this.playAnimation(this.IMAGES_ENDBOSS_INTRO); }
            else if (this.bossDead) { this.playBossDeadAnimation(); }
            else if (this.bossHurt) { this.playBossHurtAnimation(); }
            else if (this.bossAttack && this.bossDisplayed) { this.playBossAttackAnimation(); }
            else if (this.bossDisplayed) {this.playBossFloatingAnimation(); }
            if (this.distance_char_boss <= 600 && !this.bossDisplayed) {i++, this.BossIntro(i); }
        }, 150);
    }


    characterNearBoss(i) {
        return i < 7 && this.distance_char_boss <= 700;
    }


    playBossDeadAnimation() {
        clearInterval(19);
        this.playAnimation(this.IMAGES_ENDBOSS_DEAD);
        this.endbossDeadAnimation();
    }


    playBossHurtAnimation() {
        this.playAnimation(this.IMAGES_ENDBOSS_HURT);
        setTimeout(() => {
            this.bossHurt = false;
        }, 800);
    }


    playBossAttackAnimation() {
        this.playAnimation(this.IMAGES_ENDBOSS_ATTACK);
        if (this.currentImage >= this.IMAGES_ENDBOSS_ATTACK.length) {
        setTimeout(() => {
                this.bossAttack = false;
                this.currentImage = 0;
            }, 2000);
        }
    }


    playBossFloatingAnimation() {
        this.playAnimation(this.IMAGES_ENDBOSS_FLOATING);
        this.x -= 2;
    }
    

    BossIntro(i) {
        setTimeout(() => {
            i = 0;
            this.bossDisplayed = true;
        }, 1000);
    }
}