class Character extends MovableObject {

    height = 200;
    width = 200;
    y = 100;
    speed = 5;
    world;
    slap = false;
    bubble = false;
    bubbleDirection = false;
    shock = false;
    dead = false;
    HitByBoss = false;
    swimming_sound = new Audio('./audio/underwater_normal.mp3');

    offset = {
        top: 100,
        right: 30,
        bottom: 50,
        left: 30
    };

    IMAGES_IDLE = [
        './img/1.Sharkie/1.IDLE/1.png',
        './img/1.Sharkie/1.IDLE/2.png',
        './img/1.Sharkie/1.IDLE/3.png',
        './img/1.Sharkie/1.IDLE/4.png',
        './img/1.Sharkie/1.IDLE/5.png',
        './img/1.Sharkie/1.IDLE/6.png',
        './img/1.Sharkie/1.IDLE/7.png',
        './img/1.Sharkie/1.IDLE/8.png',
        './img/1.Sharkie/1.IDLE/9.png',
        './img/1.Sharkie/1.IDLE/10.png',
        './img/1.Sharkie/1.IDLE/11.png',
        './img/1.Sharkie/1.IDLE/12.png',
        './img/1.Sharkie/1.IDLE/13.png',
        './img/1.Sharkie/1.IDLE/14.png',
        './img/1.Sharkie/1.IDLE/15.png',
        './img/1.Sharkie/1.IDLE/16.png',
        './img/1.Sharkie/1.IDLE/17.png',
        './img/1.Sharkie/1.IDLE/18.png'
    ];

    IMAGES_SWIMMING = [
        './img/1.Sharkie/3.Swim/1.png',
        './img/1.Sharkie/3.Swim/2.png',
        './img/1.Sharkie/3.Swim/3.png',
        './img/1.Sharkie/3.Swim/5.png',
        './img/1.Sharkie/3.Swim/6.png'
    ];

    IMAGES_DEAD = [
        './img/1.Sharkie/6.dead/1.Poisoned/1.png',
        './img/1.Sharkie/6.dead/1.Poisoned/2.png',
        './img/1.Sharkie/6.dead/1.Poisoned/3.png',
        './img/1.Sharkie/6.dead/1.Poisoned/4.png',
        './img/1.Sharkie/6.dead/1.Poisoned/5.png',
        './img/1.Sharkie/6.dead/1.Poisoned/6.png',
        './img/1.Sharkie/6.dead/1.Poisoned/7.png',
        './img/1.Sharkie/6.dead/1.Poisoned/8.png',
        './img/1.Sharkie/6.dead/1.Poisoned/9.png',
        './img/1.Sharkie/6.dead/1.Poisoned/10.png',
        './img/1.Sharkie/6.dead/1.Poisoned/11.png',
        './img/1.Sharkie/6.dead/1.Poisoned/12.png'
    ];

    IMAGES_HURT = [
        './img/1.Sharkie/5.Hurt/1.Poisoned/1.png',
        './img/1.Sharkie/5.Hurt/1.Poisoned/2.png',
        './img/1.Sharkie/5.Hurt/1.Poisoned/3.png',
        './img/1.Sharkie/5.Hurt/1.Poisoned/4.png'
    ];

    IMAGES_HURT_SHOCK = [
        './img/1.Sharkie/5.Hurt/2.Electric shock/1.png',
        './img/1.Sharkie/5.Hurt/2.Electric shock/2.png',
        './img/1.Sharkie/5.Hurt/2.Electric shock/3.png'
    ];

    IMAGES_BUBBLES = [
        './img/1.Sharkie/4.Attack/Bubble trap/op1 (with bubble formation)/1.png',
        './img/1.Sharkie/4.Attack/Bubble trap/op1 (with bubble formation)/2.png',
        './img/1.Sharkie/4.Attack/Bubble trap/op1 (with bubble formation)/3.png',
        './img/1.Sharkie/4.Attack/Bubble trap/op1 (with bubble formation)/4.png',
        './img/1.Sharkie/4.Attack/Bubble trap/op1 (with bubble formation)/5.png',
        './img/1.Sharkie/4.Attack/Bubble trap/op1 (with bubble formation)/6.png',
        './img/1.Sharkie/4.Attack/Bubble trap/op1 (with bubble formation)/7.png',
        './img/1.Sharkie/4.Attack/Bubble trap/op1 (with bubble formation)/8.png'
    ];

    IMAGES_FINSLAP = [
        './img/1.Sharkie/4.Attack/Fin slap/1.png',
        './img/1.Sharkie/4.Attack/Fin slap/4.png',
        './img/1.Sharkie/4.Attack/Fin slap/5.png',
        './img/1.Sharkie/4.Attack/Fin slap/6.png',
        './img/1.Sharkie/4.Attack/Fin slap/7.png',
        './img/1.Sharkie/4.Attack/Fin slap/8.png'
    ];




    constructor() {     // super() = Funktionen aus übergeordneter Klasse((extends)MovableObject)
        super();
        this.loadImage(this.IMAGES_IDLE[0]);
        this.loadImages(this.IMAGES_IDLE);
        this.loadImages(this.IMAGES_SWIMMING);
        this.loadImages(this.IMAGES_DEAD);
        this.loadImages(this.IMAGES_HURT);
        this.loadImages(this.IMAGES_HURT_SHOCK);
        this.loadImages(this.IMAGES_BUBBLES);
        this.loadImages(this.IMAGES_FINSLAP);
        //this.applyGravity();
        this.animate();
    }


    animate() {
        // ON KEY INTERVALS
        setInterval(() => {
            this.swimming_sound.pause();
            if (this.world.keyboard.RIGHT && this.x < this.world.level.level_end_x) {
                this.moveRight();
                this.bubbleDirection = false;
                this.otherDirection = false;
                this.swimming_sound.play();
            } else if (this.world.keyboard.LEFT && this.x > 0) {
                this.moveLeft();
                this.bubbleDirection = true;
                this.otherDirection = true;
                this.swimming_sound.play();
            } else if (this.world.keyboard.UP && this.y > this.world.level.level_end_y_top) {
                this.moveUp();
                this.swimming_sound.play();
            } else if (this.world.keyboard.DOWN && this.y < this.world.level.level_end_y_bottom) {
                this.moveDown();
                this.swimming_sound.play();
            } else if (this.world.keyboard.D) {
                this.throwBubble();
            } else if (this.world.keyboard.A) {
                this.world.finslapAttack();
            }
            this.world.camera_x = -this.x + 100;
        }, 1000 / 60);

        setInterval(() => {
        // NO KEY INTERVALS
            if (this.isDead()) {
                this.playAnimation(this.IMAGES_DEAD);
                if (this.currentImage >= this.IMAGES_DEAD.length) {
                    this.dead = false;
                    this.deadAnimation();
                }
            } else if (this.shock) {
                this.playAnimation(this.IMAGES_HURT_SHOCK);
                if (this.currentImage >= this.IMAGES_HURT_SHOCK.length) {
                    setTimeout(() => {
                        this.shock = false;
                    }, 1000);
                }
            } else if (this.isHurt()) {
                this.playAnimation(this.IMAGES_HURT);
            } else if (this.world.keyboard.RIGHT || this.world.keyboard.LEFT) {
                this.playAnimation(this.IMAGES_SWIMMING);
            } else if (this.slap) {
                this.playAnimation(this.IMAGES_FINSLAP);
                if (this.currentImage >= this.IMAGES_FINSLAP.length) {
                    this.slap = false;
                }
            } else if (this.bubble) {
                this.playAnimation(this.IMAGES_BUBBLES);
                if (this.currentImage >= this.IMAGES_BUBBLES.length) {
                    this.bubble = false;
                }
            } else
                this.playAnimation(this.IMAGES_IDLE);
        }, 100);
    }


    deadAnimation() {

        if (!this.dead) {
            this.dead = true;
            this.currentImage = 0;
            setInterval(() => {
                this.speed = 10;
                this.y += this.speed;
                if (this.y >= 280) {
                    this.speed = 0;
                    this.y = 280;
                }
            }, 100);
            console.log('GAME OVER');
        }
    }


    slapAnimation() {
        if (this.slap == false) {
            this.slap = true;
            this.currentImage = 0;
        }
    }


    throwBubble() {
        if (this.bubble == false) {
            this.bubble = true;
            this.currentImage = 0;
        }
    }
}