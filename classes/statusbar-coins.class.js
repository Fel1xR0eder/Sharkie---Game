class StatusbarCoins extends DrawableObject {
    IMAGES_COINS = [
        'img/4. Markers/green/Coin/0_  copia 4.png',
        'img/4. Markers/green/Coin/20_  copia 2.png',
        'img/4. Markers/green/Coin/40_  copia 4.png',
        'img/4. Markers/green/Coin/60_  copia 4.png',
        'img/4. Markers/green/Coin/80_  copia 4.png',
        'img/4. Markers/green/Coin/100_ copia 4.png'
    ];

    constructor() {
        super();
        this.loadImages(this.IMAGES_COINS);
        this.y = 20;
        this.x = 10;
        this.width = 200;
        this.height = 70;
    }
}