/**
 * Flappo is the monster that tries to fly through pipes.
 */
export class Flappo {
    constructor(p, height, flappoIMG) {
        this.p = p;
        this.y = height / 2;
        this.x = 64;
        this.gravity = 0.6;
        this.lift = -10;
        this.velocity = 0;
        this.icon = flappoIMG;
        this.flappoWidth = 64;
        this.flappoHeight = 64;
    }

    show() {
        this.p.image(this.icon,
            this.x - this.flappoWidth / 2,
            this.y - this.flappoHeight / 2,
            this.flappoWidth,
            this.flappoHeight);
    }

    up() {
        this.velocity = this.lift;
    }

    update() {
        this.velocity += this.gravity;
        this.y += this.velocity;
        if (this.y >= this.p.height - this.flappoHeight / 2) {
            this.y = this.p.height - this.flappoHeight / 2;
            this.velocity = 0;
        }
        if (this.y <= this.flappoHeight / 2) {
            this.y = this.flappoHeight / 2;
            this.velocity = 0;
        }
    }
}
