class Level {
    enemies;
    lights;
    coins;
    backgroundObjects;
    level_end_x = 2200;
    level_end_y_top = -50;
    level_end_y_bottom = 250;

    constructor(enemies, lights, coins, backgroundObjects) {
        this.enemies = enemies;
        this.lights = lights;
        this.coins = coins;
        this.backgroundObjects = backgroundObjects;
    }
}