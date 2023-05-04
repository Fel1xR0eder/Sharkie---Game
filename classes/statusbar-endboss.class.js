class StatusBarBoss extends DrawableObject {

    IMAGES_BOSS_HEALTH = [
        './img/4. Markers/Purple/0_ .png',
        './img/4. Markers/Purple/20_ .png',
        './img/4. Markers/Purple/40_ .png',
        './img/4. Markers/Purple/60_ .png',
        './img/4. Markers/Purple/80_ .png',
        './img/4. Markers/Purple/100_ .png'

    ];


    percentage = 100;


    constructor() {
        super();
        this.loadImage(this.IMAGES_BOSS_HEALTH[6]);
        this.loadImages(this.IMAGES_BOSS_HEALTH);
        this.y = 0;
        this.x = 510;
        this.width = 200;
        this.height = 80;
        this.setPercentageBoss(100);
    }
    

    setPercentageBoss(percentage) {
        this.percentage = percentage;
        let path = this.IMAGES_BOSS_HEALTH[this.resolveImageIndex()];
        this.img = this.imagecache[path];
    }


    resolveImageIndex() {
        if (this.percentage == 100) {
            return 5;
        } else if (this.percentage > 80) {
            return 4;
        } else if (this.percentage > 60) {
            return 3;
        } else if (this.percentage > 40) {
            return 2;
        } else if (this.percentage > 20) {
            return 1;
        } else {
            return 0;
        }
    }
}