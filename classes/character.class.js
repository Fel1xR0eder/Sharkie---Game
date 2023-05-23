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
    bubbleShoot = true;

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


    /**
     * creates the main character of the game
     */
    constructor() {
        super();
        this.loadAllImages();
        this.animate();
        this.playSound();
    }

    /**
     * loads all images the character uses
     */
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


    /**
     * animates the images of the character
     */
    animate() {
        setInterval(() => this.moveCharacter(), 1000 / 60);
        setInterval(() => this.playCharacter(), 100);
    }


    /**
     * moving the character in the right direction when if-statements are true
     * play attack animation when if-statements are true
     */
    moveCharacter() {
        if (this.canMoveRight()) { this.moveRight(); }
        else if (this.canMoveLeft()) { this.moveLeft(); }
        else if (this.canMoveUp()) { this.moveUp(); }
        else if (this.canMoveDown()) { this.moveDown(); }
        else if (this.canThrowBubble()) { this.throwBubble(); }
        this.world.camera_x = -this.x + 100;
    }

    canThrowBubble() {
        return this.world.keyboard.D && this.bubbleShoot;
    }


    /**
     * 
     * @returns the condition to move the character right
     */
    canMoveRight() {
        return this.world.keyboard.RIGHT && this.x < this.world.level.level_end_x;
    }


    /**
     * plays gamesounds when enabled
     */
    playSound() {
        allAudios.forEach(sound => {
            if (!playMusic) {
                sound.volume = 0.5;
            } else {
                sound.volume = 0.0;
            }
        });
    }


    /**
     * character moves right &
     * plays the swimming sound
     */
    moveRight() {
        super.moveRight();
        allAudios[7].play(); // swimming sound
        this.bubbleDirection = false;
        this.otherDirection = false;
    }


    /**
         * 
         * @returns the condition to move the character left
         */
    canMoveLeft() {
        return this.world.keyboard.LEFT && this.x > 0;
    }


    /**
     * character moves left &
     * plays the swimming sound
     */
    moveLeft() {
        super.moveLeft();
        allAudios[7].play(); // swimming sound
        this.bubbleDirection = true;
        this.otherDirection = true;
    }

    /**
     * 
     * @returns the condition to move the character up
     */
    canMoveUp() {
        return this.world.keyboard.UP && this.y > this.world.level.level_end_y_top;
    }


    /**
    * character moves up &
    * plays the swimming sound
    */
    moveUp() {
        super.moveUp();
        allAudios[7].play(); // swimming sound
    }


    /**
    * 
    * @returns the condition to move the character down
    */
    canMoveDown() {
        return this.world.keyboard.DOWN && this.y < this.world.level.level_end_y_bottom;
    }


    /**
    * character moves down &
    * plays the swimming sound
    */
    moveDown() {
        super.moveDown();
        allAudios[7].play(); // swimming sound
    }


    /**
     * plays the animations depending on the condition
     */
    playCharacter() {
        if (this.isDead()) { this.playDeadAnimation(); }
        else if (this.shock) { this.playShockAnimation(); }
        else if (this.isHurt()) { this.playAnimation(this.IMAGES_HURT); }
        else if (this.canSwimming()) { this.playAnimation(this.IMAGES_SWIMMING); }
        else if (this.slap) { this.playSlapAnimation(); }
        else if (this.bubble) { this.playBubbleAnimation(); }
        else { this.playAnimation(this.IMAGES_IDLE); }
    }


    /**
    * plays the dead animation when character is dead
    */
    playDeadAnimation() {
        this.playAnimation(this.IMAGES_DEAD);
        this.deadAnimation();
    }


    /**
    * plays the shock animation when character got hit by jellyfish
    */
    playShockAnimation() {
        this.playAnimation(this.IMAGES_HURT_SHOCK);
        if (this.currentImage >= this.IMAGES_HURT_SHOCK.length) {
            setTimeout(() => {
                this.shock = false;
            }, 1000);
        }
    }


    /**
     * 
     * @returns the condition to animate the swimming images from the character
     */
    canSwimming() {
        return this.world.keyboard.RIGHT || this.world.keyboard.LEFT;
    }


    /**
     * plays the bubble attack animation when character do the attack
     */
    playBubbleAnimation() {
        this.playAnimation(this.IMAGES_BUBBLES);
        if (this.currentImage >= this.IMAGES_BUBBLES.length) {
            this.bubble = false;
        }
    }


    /**
     * plays the dead animation and changes the sounds
     */
    deadAnimation() {
        if (!this.dead) {
            this.characterIsDead();
            setTimeout(() => { this.showEndScreen(); }, 2000);
            allAudios[1].pause();   // Gamesound
            allAudios[6].pause(); // Boss attack
            allAudios[11].play();   // Gameover
        }
    }


    /**
     * character falls down when he's dead
     */
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


    /**
     * throws the bubble and makes the bubble sound
     */
    throwBubble() {
        if (!this.bubble) {
            this.bubble = true;
            this.currentImage = 0;
            this.bubbleShoot = false;
        }
        setTimeout(() => allAudios[8].play(), 500);
        setTimeout(() => this.bubbleShoot = true, 3000);
    }
}