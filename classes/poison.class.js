class Poison extends MovableObject {

    height = 50;
    width = 50;
    y = 300;
    x = 300;

    IMAGES_POISON = [
        'img/4. Markers/Poison/Animada/1.png',
        'img/4. Markers/Poison/Animada/2.png',
        'img/4. Markers/Poison/Animada/3.png',
        'img/4. Markers/Poison/Animada/4.png',
        'img/4. Markers/Poison/Animada/5.png',
        'img/4. Markers/Poison/Animada/6.png',
        'img/4. Markers/Poison/Animada/7.png',
        'img/4. Markers/Poison/Animada/8.png'
    ];

    constructor() {
        super().loadImage(this.IMAGES_POISON[0]);
        this.loadImages(this.IMAGES_POISON);
        this.animate();
    }


    animate() {
        setInterval(() => {
            this.playAnimation(this.IMAGES_POISON);
        }, 100);
    }
}