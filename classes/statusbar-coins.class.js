class StatusBarCoins extends DrawableObject {

    IMAGES_COINS = [
        'img/4. Markers/green/Coin/100_ copia 4.png',
        'img/4. Markers/green/Coin/80_  copia 4.png',
        'img/4. Markers/green/Coin/60_  copia 4.png',
        'img/4. Markers/green/Coin/40_  copia 4.png',
        'img/4. Markers/green/Coin/20_  copia 2.png',
        'img/4. Markers/green/Coin/0_  copia 4.png'
    ];

    percentageCoin = 0;

    constructor() {
        super();
        this.loadImage(this.IMAGES_COINS[5]);
        this.loadImages(this.IMAGES_COINS);
        this.y = 40;
        this.x = 0;
        this.width = 200;
        this.height = 80;
        this.setPercentageCoin(0);
    }


    /**
     * updates the statusbar by collecting coins
     * @param {number} percentageCoin - the percentage display of the collected coins
     */
    setPercentageCoin(percentageCoin) {
        this.percentageCoin = percentageCoin;
        let path = this.IMAGES_COINS[this.resolveCoinImageIndex()];
        this.img = this.imagecache[path];
    }


    /**
     * 
     * @returns the number of the actual image to display the correct statusbar percent
     */
    resolveCoinImageIndex() {
        if (this.percentageCoin == 0) {
            return 5;
        } else if (this.percentageCoin <= 20) {
            return 4;
        } else if (this.percentageCoin <= 40) {
            return 3;
        } else if (this.percentageCoin <= 60) {
            return 2;
        } else if (this.percentageCoin <= 80) {
            return 1;
        } else {
            return 0;
        }
    }
}