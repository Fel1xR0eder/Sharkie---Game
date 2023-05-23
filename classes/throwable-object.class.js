class ThrowableObject extends MovableObject {

    thrownBubble = false;
    bubbleShoot = true;
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


    /**
     * throw a bubble
     * bubble moves in the direction of the character
     */
    throw() {
        if (!world.character.bubbleDirection && this.bubbleShoot)  {
            setInterval(() => {
                this.bubbleShoot = false;
                this.thrownBubble = true;
                this.x += 15;
            }, 50);
        } else { setInterval(() => this.x -= 15, 50);}

        setTimeout(() => this.bubbleShoot = true, 3000);
    }
}