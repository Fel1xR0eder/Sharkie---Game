class Level {
    enemies;
    coins;
    lights;
    backgroundObjects;
    level_end_x = 2200;
    level_end_y_top = -50;
    level_end_y_bottom = 250;

    constructor(enemies, coins, lights, backgroundObjects) {
        this.enemies = enemies;
        this.coins = coins;
        this.lights = lights;
        this.backgroundObjects = backgroundObjects;
    }
}