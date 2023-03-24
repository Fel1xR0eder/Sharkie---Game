class Pufferfish extends MovableObject {

    y = 175;
   
    constructor() {     // super() = Funktion aus übergeordneter Klasse((extends)MovableObject)
        super().loadImage('/img/2.Enemy/1.Puffer fish (3 color options)/1.Swim/1.swim1.png');
        this.x = 200 + Math.random() * 500 // Zahl zwischen 200 & 700 === (0 & 1) 
    }
}