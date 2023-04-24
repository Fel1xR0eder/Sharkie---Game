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
    throwableObjects = [];
    collectableObjects = [];

    constructor(canvas, keyboard) {
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.keyboard = keyboard;
        this.draw();
        this.setWorld();
        this.run();
    };


    setWorld() {
        this.character.world = this;
    };


    run() {
        this.checkHealthCollision();
        this.checkPoisonCollision();
        this.checkCoinCollision();

        setInterval(() => {
            this.checkBubbleAttack();
        }, 100);
    }

    checkBubbleAttack() {
        if (this.keyboard.D && this.character.poison > 0) {
            let poison = new ThrowableObject(this.character.x + 100, this.character.y + 100);
            this.throwableObjects.push(poison);
            this.character.poison -= 20;
        };

        this.statusBarPoison.setPercentagePoison(this.character.poison);
    }

    // checkSlapAttack() {
    //     if(this.keyboard.A && this.character.coins )
    // }


    checkHealthCollision() {
        // #####    HIT BY ENEMY    ##### //
        setInterval(() => {
            this.level.enemies.forEach((enemy) => {
                if (this.character.isColliding(enemy)) {
                    this.character.hit();
                    this.statusBarHealth.setPercentage(this.character.energy);
                };
            });
        }, 500);
    };


    checkCoinCollision() {
        // #####    COLLECT A COIN    ##### //
        setInterval(() => {
            this.level.coins.forEach((coins) => {
                if (this.character.isColliding(coins)) {
                    this.statusBarCoins.setPercentageCoin(this.character.money);
                    this.character.collectCoin();
                    this.level.coins.shift();
                };
            });
        }, 100);
    }


    checkPoisonCollision() {
        // #####    COLLECT POISON    ##### //
        setInterval(() => {
            this.level.poison.forEach((poison) => {
                if (this.character.isColliding(poison)) {
                    this.statusBarPoison.setPercentagePoison(this.character.poison);
                    this.character.collectPoison();
                    this.level.poison.shift();
                };
            });
        }, 100);
    }

    checkBubbleCollision() {
        setInterval(() => {
            this.level.poison.forEach((poison) => {
                if (this.character.isColliding(poison)) {
                    this.statusBarPoison.setPercentagePoison(this.character.poison);
                    this.character.collectPoison();
                    this.throwableObjects.shift();
                };
            });
        }, 100);
 }

    draw() {    // ##### THE LOWER THE LINE, THE LOWER ON CANVAS ##### //
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        this.ctx.translate(this.camera_x, 0);
        this.addObjectsToMap(this.level.lights);
        this.addObjectsToMap(this.level.backgroundObjects);
        this.ctx.translate(-this.camera_x, 0);


        // ##### FIXED OBJECTS HERE ##### //
        this.addToMap(this.statusBarHealth);
        this.addToMap(this.statusBarCoins);
        this.addToMap(this.statusBarPoison);
        this.ctx.translate(this.camera_x, 0);


        this.addObjectsToMap(this.level.enemies);
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


    addObjectsToMap(objects) {
        objects.forEach(o => {
            this.addToMap(o);
        });
    };
}