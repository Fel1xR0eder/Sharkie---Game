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
    slappableDistance = 20;



    constructor(canvas, keyboard) {
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.keyboard = keyboard;
        this.draw();
        this.setWorld();
        this.run();
        this.attackAll();
    };


    setWorld() {
        this.character.world = this;
    };


    attackAll() {
        this.attackJellyfish();
        this.attackPufferfish();
        this.attackEndboss();
    }


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


    flipStatusbar() {
        this.statusBarBoss.otherDirection = true;
    }


    bubbleAttack() {
        if (this.keyboard.D && this.character.poison > 0) {
            setTimeout(() => {
                let bubble = new ThrowableObject(this.character.x + 100, this.character.y + 100);
                this.throwableObjects.push(bubble);
                this.character.poison -= 10;
            }, 500);
        };
        this.statusBarPoison.setPercentagePoison(this.character.poison);
    }


    checkHealthCollision() {
        // #####    HIT BY ENEMY    ##### //
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


    checkCoinCollision() {
        // #####    COLLECT A COIN    ##### //
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


    checkPoisonCollision() {
        // #####    COLLECT POISON BOTTLE    ##### //
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


    attackPufferfish() {
        // #####    BUBBLE COLLIDES WITH ENEMY    ##### //
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


    attackEndboss() {
        // #####    BUBBLE COLLIDES WITH FINAL    ##### //

        setInterval(() => {
            this.level.endboss.forEach((boss) => {
                this.throwableObjects.forEach((bubble) => {
                    if (bubble.isColliding(boss)) {
                        this.level.endboss.bossHurt = true;
                        console.log(this.level.endboss.bossHurt, 'bosshurt');
                        this.throwableObjects.pop(bubble);
                        this.character.bossHit();
                        this.statusBarBoss.setPercentageBoss(this.character.bossEnergy);
                    };
                });
            });
        }, 50);
    }


    attackJellyfish() {
        // #####    BUBBLE COLLIDES WITH ENEMY    ##### //
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


    finslapAttack() {
        this.character.slapAnimation();
        this.level.pufferfish.forEach(pufferfish => {
            if (this.character.isColliding(pufferfish)) {
                pufferfish.health = false;
                pufferfish.enemySlapDead();
            }
        });
    }

    clearAllIntervals() {
        for (let i = 1; i < 9999; i++) window.clearInterval(i);
    }


    draw() {    // ##### THE LOWER THE LINE, THE LOWER ON CANVAS ##### //
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


    addToMap(mo) {
        if (mo.otherDirection) {
            this.flipImage(mo);
        }
        mo.draw(this.ctx);
        mo.drawFrame(this.ctx);

        if (mo.otherDirection) {
            this.flipImageBack(mo);
        }
    };


    addObjectsToMap(objects) {
        objects.forEach(o => {
            this.addToMap(o);
        });
    };


    flipImage(mo) {
        this.ctx.save();
        this.ctx.translate(mo.width, 0);
        this.ctx.scale(-1, 1);
        mo.x = mo.x * -1;
    };


    flipImageBack(mo) {
        mo.x = mo.x * -1;
        this.ctx.restore();
    };
}