class ThrowableObject extends MovableObject {


    bubbleDirection = true;

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
            if (world.character.otherDirection == false) {
                world.character.otherDirection = false;
                this.x += 15;
            } else {
                world.character.otherDirection = true;
                this.x -= 15;
            };
        }, 50);
    }
}