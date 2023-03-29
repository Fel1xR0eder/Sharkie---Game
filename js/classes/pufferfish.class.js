class Pufferfish extends MovableObject {

    y = 175;
    IMAGES_SWIMMING = ['img/2.Enemy/1.Puffer fish (3 color options)/1.Swim/1.swim1.png',
        'img/2.Enemy/1.Puffer fish (3 color options)/1.Swim/1.swim2.png',
        'img/2.Enemy/1.Puffer fish (3 color options)/1.Swim/1.swim3.png',
        'img/2.Enemy/1.Puffer fish (3 color options)/1.Swim/1.swim4.png',
        'img/2.Enemy/1.Puffer fish (3 color options)/1.Swim/1.swim5.png',
    ];

    constructor() {     // super() = Funktion aus übergeordneter Klasse((extends)MovableObject)
        super().loadImage('/img/2.Enemy/1.Puffer fish (3 color options)/1.Swim/1.swim1.png');
        this.x = 200 + Math.random() * 500; // Zahl zwischen 200 & 700 === (0 & 1) 
        this.speed = 0.15 + Math.random() * 0.25;
        this.loadImages(this.IMAGES_SWIMMING);
        this.animate();
    }

    animate() {
        this.moveLeft();
        setInterval(() => {
            let i = this.currentImage % this.IMAGES_SWIMMING.length;    // Modulu(s) =  i = 0,1,2,3,4,5,(!) 0,1,2,3,4,5, ...
            let path = this.IMAGES_SWIMMING[i];
            this.img = this.imagecache[path];
            this.currentImage++;
        }, 100);
    }
}