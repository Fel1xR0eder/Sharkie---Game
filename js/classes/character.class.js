class Character extends MovableObject {

    height = 300;
    width = 250;
    //world;
    IMAGES_SWIMMING = ['/img/1.Sharkie/1.IDLE/1.png',
        '/img/1.Sharkie/1.IDLE/2.png',
        '/img/1.Sharkie/1.IDLE/3.png',
        '/img/1.Sharkie/1.IDLE/4.png',
        '/img/1.Sharkie/1.IDLE/5.png',
        '/img/1.Sharkie/1.IDLE/6.png',
        '/img/1.Sharkie/1.IDLE/7.png',
        '/img/1.Sharkie/1.IDLE/8.png',
        '/img/1.Sharkie/1.IDLE/9.png',
        '/img/1.Sharkie/1.IDLE/10.png',
        '/img/1.Sharkie/1.IDLE/11.png',
        '/img/1.Sharkie/1.IDLE/12.png',
        '/img/1.Sharkie/1.IDLE/13.png',
        '/img/1.Sharkie/1.IDLE/14.png',
        '/img/1.Sharkie/1.IDLE/15.png',
        '/img/1.Sharkie/1.IDLE/16.png',
        '/img/1.Sharkie/1.IDLE/17.png',
        '/img/1.Sharkie/1.IDLE/18.png'];



    constructor() {     // super() = Funktion aus übergeordneter Klasse((extends)MovableObject)
        super().loadImage('/img/1.Sharkie/1.IDLE/1.png');
        this.loadImages(this.IMAGES_SWIMMING);

        this.animate();
    }


    animate() {
        setInterval(() => {

           // if (this.world.keyboard.RIGHT) {
                let i = this.currentImage % this.IMAGES_SWIMMING.length;    // Modulu(s) =  i = 0,1,2,3,4,5,0,1,2,3,4,5, ...
                let path = this.IMAGES_SWIMMING[i];
                this.img = this.imagecache[path];
                this.currentImage++;
        //    }
        }, 100);
    }

}