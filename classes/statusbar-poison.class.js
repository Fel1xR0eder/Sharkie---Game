class StatusBarPoison extends DrawableObject {

    IMAGES_POISON = [
        'img/4. Markers/green/poisoned bubbles/100_ copia 3.png',
        'img/4. Markers/green/poisoned bubbles/80_ copia 2.png',
        'img/4. Markers/green/poisoned bubbles/60_ copia 2.png',
        'img/4. Markers/green/poisoned bubbles/40_ copia 2.png',
        'img/4. Markers/green/poisoned bubbles/20_ copia 3.png',
        'img/4. Markers/green/poisoned bubbles/0_ copia 2.png'
    ];

    percentagePoison = [];
    //percentagePoison = 0;

    constructor() {
        super();
        this.loadImage(this.IMAGES_POISON[5]);
        this.loadImages(this.IMAGES_POISON);
        this.y = 50;
        this.x = 10;
        this.width = 230;
        this.height = 80;
        this.setPercentagePoison();
    }


    setPercentagePoison(percentagePoison) {
        this.percentagePoison = percentagePoison;
        let path = this.IMAGES_POISON[this.resolvePoisonImageIndex()];
        this.img = this.imagecache[path];
    }


    resolvePoisonImageIndex() {
        if (this.percentagePoison == 0) {
            return 5;
        } else if (this.percentagePoison <= 20) {
            return 4;
        } else if (this.percentagePoison <= 40) {
            return 3;
        } else if (this.percentagePoison <= 60) {
            return 2;
        } else if (this.percentagePoison <= 80) {
            return 1;
        } else {
            return 0;
        }
    }
}