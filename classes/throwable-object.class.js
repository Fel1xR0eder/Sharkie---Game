class ThrowableObject extends MovableObject {


    speedX = 0;

    constructor(x, y) {
        super();
        this.loadImage('./img/1.Sharkie/4.Attack/Bubble trap/Bubble.png');
        this.x = x;
        this.y = y;
        this.height = 60;
        this.width = 60;
        this.throw();
    }

    throw() {
        setInterval(() => {
            if (!this.otherDirection) {
                this.x += 15;
            } else {
                this.x -= 15;
            }
        }, 50);
    }
}