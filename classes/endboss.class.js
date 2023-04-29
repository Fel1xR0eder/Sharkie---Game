class Endboss extends MovableObject {
    
    height = 600;
    width = 500;
    y = -180;

    offset = {
        top: 250,
        left: 0,
        right: 50,
        bottom: 100,
    }
    

    IMAGES_ENDBOSS_FLOATING = [
        './img/2.Enemy/3 Final Enemy/2.floating/1.png',
        './img/2.Enemy/3 Final Enemy/2.floating/2.png',
        './img/2.Enemy/3 Final Enemy/2.floating/3.png',
        './img/2.Enemy/3 Final Enemy/2.floating/4.png',
        './img/2.Enemy/3 Final Enemy/2.floating/5.png',
        './img/2.Enemy/3 Final Enemy/2.floating/6.png',
        './img/2.Enemy/3 Final Enemy/2.floating/7.png',
        './img/2.Enemy/3 Final Enemy/2.floating/8.png',
        './img/2.Enemy/3 Final Enemy/2.floating/9.png',
        './img/2.Enemy/3 Final Enemy/2.floating/10.png',
        './img/2.Enemy/3 Final Enemy/2.floating/11.png',
        './img/2.Enemy/3 Final Enemy/2.floating/12.png',
        './img/2.Enemy/3 Final Enemy/2.floating/13.png'
    ]

    constructor() {     
        super().loadImage(this.IMAGES_ENDBOSS_FLOATING[0]);
        this.loadImages(this.IMAGES_ENDBOSS_FLOATING);
        this.animate();
        this.x = 2400;
    }

    animate() {

        setInterval(() => {
            this.playAnimation(this.IMAGES_ENDBOSS_FLOATING);
        }, 100);
    }    
}