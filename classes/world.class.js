class World {

    character = new Character();
    level = level1;
    canvas;
    ctx;
    keyboard;
    camera_x = 0;
    statusBarHealth = new StatusBarHealth();
    statusBarCoins = new StatusBarCoins();
    statusBarPoison = new StatusBarPoison();
    statusBarBoss = new StatusBarBoss();
    throwableObjects = [];
    bubbleThrown = false;




    constructor(canvas, keyboard) {
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.keyboard = keyboard;
        this.draw();
        this.setWorld();
        this.run();
        this.attackAll();
    };


    /**
     * simplifies variable
     */
    setWorld() {
        this.character.world = this;
    };

    /**
     * summary multiple functions
     */
    attackAll() {
        this.attackJellyfish();
        this.attackPufferfish();
        this.attackEndboss();
    }


    /**
     * Summary multiple functions
     */
    run() {
        setInterval(() => {
            this.bubbleAttack();
        }, 100);
        this.checkHealthCollision();
        this.checkPoisonCollision();
        this.checkCoinCollision();
        this.jellyShock();
        this.pufferfishGoingBig();
        this.flipStatusbar();
    }


    /**
     * flips the statusbar of the endboss in the other direction
     */
    flipStatusbar() {
        this.statusBarBoss.otherDirection = true;
    }


    /**
     * does a bubble attack when the user presses 'D' on keyboard
     *  statusbar poison becomes less
     */
    bubbleAttack() {
        if (this.keyboard.D && this.character.poison > 0 && !this.bubbleThrown) {
            this.bubbleThrown = true;
            setTimeout(() => {
                let bubble = new ThrowableObject(this.character.x + 100, this.character.y + 100);
                this.throwableObjects.push(bubble);
                this.character.poison -= 10;
            }, 500);
            setTimeout(() => this.bubbleThrown = false, 1000);
        };
        this.statusBarPoison.setPercentagePoison(this.character.poison);
    }


    /**
     * check the collision of character and enemies
     * when collided character health becomes less
     * statusbar health become less
     */
    checkHealthCollision() {
        setInterval(() => {
            this.level.pufferfish.forEach((pufferfish) => {
                this.level.jellyfish.forEach((jellyfish) => {
                    this.level.endboss.forEach((endboss) => {
                        if (this.character.isColliding(pufferfish) || this.character.isColliding(jellyfish) || this.character.isColliding(endboss)) {
                            this.character.hit();
                            this.statusBarHealth.setPercentage(this.character.energy);
                        };
                    });
                });
            });
        }, 500);
    };


    /**
     * check the collision of character and coins
     * when collided statusbar coins will be updated
     * deletes the coin
     */
    checkCoinCollision() {
        setInterval(() => {
            this.level.coins.forEach((coin, i) => {
                if (this.character.isColliding(coin)) {
                    this.statusBarCoins.setPercentageCoin(this.character.money);
                    this.character.collectCoin();
                    this.level.coins.splice(i, 1);
                };
            });
        }, 50);
    }


    /**
     * check the collision of character and poison bottles
     * when collided statusbar poison will be updated
     * deletes the poison bottle
     */
    checkPoisonCollision() {
        setInterval(() => {
            this.level.poison.forEach((poison, i) => {
                if (this.character.isColliding(poison)) {
                    this.statusBarPoison.setPercentagePoison(this.character.poison);
                    this.character.collectPoison();
                    this.level.poison.splice(i, 1);
                };
            });
        }, 100);
    }


    /**
     * check the collision of bubble and pufferfish
     * deletes the bubble
     * deletes the enemy
     */
    attackPufferfish() {
        setInterval(() => {
            this.level.pufferfish.forEach((pufferfish) => {
                this.throwableObjects.forEach((bubble) => {
                    if (bubble.isColliding(pufferfish)) {
                        pufferfish.health = false;
                        this.throwableObjects.pop(bubble);
                        pufferfish.enemyBubbleDead();
                    };
                });
            });
        }, 100);
    }


    /**
    * check bubble collides with endboss
    * health bar will be updated.
    * deletes the bubble
    */
    attackEndboss() {
        setInterval(() => {
            this.level.endboss.forEach((boss) => {
                this.throwableObjects.forEach((bubble) => {
                    if (bubble.isColliding(boss)) {
                        boss.bossHurt = true;
                        this.throwableObjects.pop(bubble);
                        this.character.bossHit();
                        this.statusBarBoss.setPercentageBoss(this.character.bossEnergy);
                    };
                });
            });
        }, 50);
    }


    /**
     * check the collision of bubble and jellyfish
     * deletes the bubble
     * deletes the enemy
     */
    attackJellyfish() {
        setInterval(() => {
            this.level.jellyfish.forEach((jellyfish) => {
                this.throwableObjects.forEach((bubble) => {
                    if (bubble.isColliding(jellyfish)) {
                        jellyfish.health = false;
                        this.throwableObjects.pop(bubble);
                        jellyfish.enemyBubbleDead();
                    };
                });
            });
        }, 100);
    }


    /**
     * checks if character collides with jellyfish
     * when they collide, character loses health 
     */
    jellyShock() {
        setInterval(() => {
            this.level.jellyfish.forEach(jellyfish => {
                if (this.character.isColliding(jellyfish)) {
                    this.character.hit();
                    this.character.shock = true;
                    jellyfish.shockAtCollision();
                };
            });
        }, 200);
    }


    /**
     * checks if character collides with pufferfish
     * when they collide, character loses health 
     */
    pufferfishGoingBig() {
        setInterval(() => {
            this.level.pufferfish.forEach(pufferfish => {
                if (this.character.isColliding(pufferfish)) {
                    this.character.hit();
                    pufferfish.bigAtCollision();
                };
            });
        }, 200);
    }



    /**
     * clears all intervals
     */
    clearAllIntervals() {
        for (let i = 1; i < 9999; i++) window.clearInterval(i);
    }


    /**
    * draws all objects and status bars on the canvas.
    */
    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.ctx.translate(this.camera_x, 0);
        this.addObjectsToMap(this.level.backgroundObjects);
        this.addObjectsToMap(this.level.lights);
        this.ctx.translate(-this.camera_x, 0);

        // ##### FIXED OBJECTS HERE ##### //
        this.addToMap(this.statusBarBoss);
        this.addToMap(this.statusBarHealth);
        this.addToMap(this.statusBarCoins);
        this.addToMap(this.statusBarPoison);
        this.ctx.translate(this.camera_x, 0);

        this.addObjectsToMap(this.level.pufferfish);
        this.addObjectsToMap(this.level.jellyfish);
        this.addObjectsToMap(this.level.endboss);
        this.addObjectsToMap(this.level.coins);
        this.addObjectsToMap(this.level.poison);
        this.addObjectsToMap(this.throwableObjects);
        this.addToMap(this.character);
        this.ctx.translate(-this.camera_x, 0);

        let self = this;
        requestAnimationFrame(function () {
            self.draw();
        });
    };


    /**
    * adds the moving object to the map.
    * @param {MovingObject} mo - The moving object to add to the map.
    */
    addToMap(mo) {
        if (mo.otherDirection) {
            this.flipImage(mo);
        }
        mo.draw(this.ctx);
        if (mo.otherDirection) {
            this.flipImageBack(mo);
        }
    };


    /**
     * adds a list of objects to the map and draw them on the canvas.
     * @param {Objects} objects - The list of game objects to add and draw.
     */
    addObjectsToMap(objects) {
        objects.forEach(o => {
            this.addToMap(o);
        });
    };


    /**
    * flips the image of the moving object.
    * @param {MovingObject} mo - object to flip the image.
    */
    flipImage(mo) {
        this.ctx.save();
        this.ctx.translate(mo.width, 0);
        this.ctx.scale(-1, 1);
        mo.x = mo.x * -1;
    };


    /**
    * flips the image of the moving object back to the original state after flipping it.
    * @param {MovingObject} mo - object to flip the image back to its original.
    */
    flipImageBack(mo) {
        mo.x = mo.x * -1;
        this.ctx.restore();
    };
}