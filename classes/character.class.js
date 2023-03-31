class Character extends MovableObject {

    height = 300;
    width = 250;
    speed = 8;
    world;
    swimming_sound = new Audio('./audio/underwater_normal.mp3');

    IMAGES_SWIMMING = ['./img/1.Sharkie/1.IDLE/1.png',
    './img/1.Sharkie/1.IDLE/2.png',
        './img/1.Sharkie/1.IDLE/3.png',
        './img/1.Sharkie/1.IDLE/4.png',
        './img/1.Sharkie/1.IDLE/5.png',
        './img/1.Sharkie/1.IDLE/6.png',
        './img/1.Sharkie/1.IDLE/7.png',
        './img/1.Sharkie/1.IDLE/8.png',
        './img/1.Sharkie/1.IDLE/9.png',
        './img/1.Sharkie/1.IDLE/10.png',
        './img/1.Sharkie/1.IDLE/11.png',
        './img/1.Sharkie/1.IDLE/12.png',
        './img/1.Sharkie/1.IDLE/13.png',
        './img/1.Sharkie/1.IDLE/14.png',
        './img/1.Sharkie/1.IDLE/15.png',
        './img/1.Sharkie/1.IDLE/16.png',
        './img/1.Sharkie/1.IDLE/17.png',
        './img/1.Sharkie/1.IDLE/18.png'
    ];



    constructor() {     // super() = Funktion aus übergeordneter Klasse((extends)MovableObject)
        super().loadImage('./img/1.Sharkie/1.IDLE/1.png');
        this.loadImages(this.IMAGES_SWIMMING);
        this.animate();
    }


    animate() {

        setInterval(() => {
            this.swimming_sound.pause();
            if (this.world.keyboard.RIGHT && this.x < this.world.level.level_end_x) {
                this.x += this.speed;
                this.otherDirection = false;
                this.swimming_sound.play();
            }

            if (this.world.keyboard.LEFT && this.x > 0) {
                this.x -= this.speed;
                this.otherDirection = true;
                this.swimming_sound.play();
            }

            this.world.camera_x = -this.x + 100;
        }, 1000 / 60);

        setInterval(() => {

            if (this.world.keyboard.RIGHT || this.world.keyboard.LEFT) {
                this.playAnimation(this.IMAGES_SWIMMING);
            }
        }, 100);
    }

}