class World {

    character = new Character();
    level = level1;
    canvas;
    ctx;
    keyboard;
    camera_x = 0;
    statusBarHealth = new StatusBarHealth();
    statusBarCoins = new StatusBarCoins();

    constructor(canvas, keyboard) {
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.keyboard = keyboard;
        this.draw();
        this.setWorld();
        this.checkCollisions();
    };

    setWorld() {
        this.character.world = this;
    };

    checkCollisions() {

     // #####    HIT BY ENEMY    ##### //
        setInterval(() => {
            this.level.enemies.forEach((enemy) => {
                if (this.character.isColliding(enemy)) {
                    this.character.hit();
                    this.statusBarHealth.setPercentage(this.character.energy);
                };
            });
        }, 500);

     // #####    COLLECT A COIN    ##### //
        setInterval(() => {
            this.level.coins.forEach((coins) => {
                if (this.character.isColliding(coins)) {
                    this.statusBarCoins.setPercentageCoin(this.character.money);
                    this.character.collectCoin();
                };
            });
        }, 200);
    };

    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        this.ctx.translate(this.camera_x, 0);
        this.addObjectsToMap(this.level.backgroundObjects);
        this.addObjectsToMap(this.level.lights);           

        this.ctx.translate(-this.camera_x, 0);
        // ##### FIXED OBJECTS HERE ##### //
        this.addToMap(this.statusBarHealth);
        this.addToMap(this.statusBarCoins);
        //this.addToMap(this.statusBarPoison);
        this.ctx.translate(this.camera_x, 0);  


        this.addToMap(this.character);               
        this.addObjectsToMap(this.level.enemies);          
        //this.addObjectsToMap(this.level.coins);          
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