class Level {
    pufferfish;
    jellyfish;
    endboss;
    lights;
    coins;
    poison;
    backgroundObjects;
    level_end_x = 2200;
    level_end_y_top = -50;
    level_end_y_bottom = 250;

    constructor(pufferfish,jellyfish, endboss, lights, coins, poison, backgroundObjects) {
        this.pufferfish = pufferfish;
        this.jellyfish = jellyfish;
        this.endboss = endboss;
        this.lights = lights;
        this.coins = coins;
        this.poison = poison;
        this.backgroundObjects = backgroundObjects;
    }
}