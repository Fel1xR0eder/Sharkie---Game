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



    constructor() {
        super();
        this.loadAllImages();
        this.animate();
        this.playSound();
    }


    loadAllImages() {
        this.loadImage(this.IMAGES_IDLE[0]);
        this.loadImages(this.IMAGES_IDLE);
        this.loadImages(this.IMAGES_SWIMMING);
        this.loadImages(this.IMAGES_DEAD);
        this.loadImages(this.IMAGES_HURT);
        this.loadImages(this.IMAGES_HURT_SHOCK);
        this.loadImages(this.IMAGES_BUBBLES);
        this.loadImages(this.IMAGES_FINSLAP);
    }


    animate() {
        setInterval(() => this.moveCharacter(), 1000 / 60);
        setInterval(() => this.playCharacter(), 100);
    }


    moveCharacter() {
        if (this.canMoveRight()) { this.moveRight(); }
        else if (this.canMoveLeft()) { this.moveLeft(); }
        else if (this.canMoveUp()) { this.moveUp(); }
        else if (this.canMoveDown()) { this.moveDown(); }
        else if (this.world.keyboard.D) { this.throwBubble(); }
        else if (this.world.keyboard.A) { this.world.finslapAttack(); }
        this.world.camera_x = -this.x + 100;
    }

    canMoveRight() {
        return this.world.keyboard.RIGHT && this.x < this.world.level.level_end_x;
    }

    playSound() {
        allAudios.forEach(sound => {
            if (!playMusic) {
                sound.volume = 1;
                audio.ambience_sound.volume = 0; // wieder laut stellen => .5
            } else {
                sound.volume = 0.0;
            }
            console.log(sound.volume);
        });
    }


    moveRight() {
        this.bubbleDirection = false;
        this.otherDirection = false;
        super.moveRight();
    }

    canMoveLeft() {
        return this.world.keyboard.LEFT && this.x > 0;
    }

    moveLeft() {
        audio.swimming_sound.volume = 1;
        super.moveLeft();
        this.bubbleDirection = true;
        this.otherDirection = true;
        audio.swimming_sound.volume = 0;
    }

    canMoveUp() {
        return this.world.keyboard.UP && this.y > this.world.level.level_end_y_top;
    }

    moveUp() {
        audio.swimming_sound.volume = 1;
        super.moveUp();
        audio.swimming_sound.volume = 0;
    }

    canMoveDown() {
        return this.world.keyboard.DOWN && this.y < this.world.level.level_end_y_bottom;
    }

    moveDown() {
        audio.swimming_sound.volume = 1;
        super.moveDown();
        audio.swimming_sound.volume = 0;
    }


    playCharacter() {
        if (this.isDead()) { this.playDeadAnimation(); }
        else if (this.shock) { this.playShockAnimation(); }
        else if (this.isHurt()) { this.playAnimation(this.IMAGES_HURT); }
        else if (this.canSwimming()) { this.playAnimation(this.IMAGES_SWIMMING); }
        else if (this.slap) { this.playSlapAnimation(); }
        else if (this.bubble) { this.playBubbleAnimation(); }
        else { this.playAnimation(this.IMAGES_IDLE); }
    }


    playDeadAnimation() {
        this.playAnimation(this.IMAGES_DEAD);
        this.deadAnimation();
    }

    playShockAnimation() {
        this.playAnimation(this.IMAGES_HURT_SHOCK);
        if (this.currentImage >= this.IMAGES_HURT_SHOCK.length) {
            setTimeout(() => {
                this.shock = false;
            }, 1000);
        }
    }

    canSwimming() {
        return this.world.keyboard.RIGHT || this.world.keyboard.LEFT;
    }

    playSlapAnimation() {
        this.playAnimation(this.IMAGES_FINSLAP);
        if (this.currentImage >= this.IMAGES_FINSLAP.length) {
            this.slap = false;
        }
    }

    playBubbleAnimation() {
        this.playAnimation(this.IMAGES_BUBBLES);
        if (this.currentImage >= this.IMAGES_BUBBLES.length) {
            this.bubble = false;
        }
    }


    deadAnimation() {
        if (!this.dead) {
            this.characterIsDead();
            setTimeout(() => { this.showEndScreen(); }, 2000);
            //Sound.ambience_sound.pause();
            //Sound.gameover_sound.play();
        }
    }

    characterIsDead() {
        this.dead = true;
        this.currentImage = 0;
        setInterval(() => {
            this.speed = 10;
            this.y += this.speed;
            if (this.y >= 290) {
                this.speed = 0;
            }
        }, 100);
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
        // setTimeout(() => {
        //     Sound.bubble_sound.play();
        // }, 500);
    }
}