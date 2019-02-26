export class Pipe {
    constructor(p, top, height, pipeBodyIMG, pipePeakIMG) {
        this.p = p;
        this.spacing = 200;
        this.top = top;

        this.x = x;
        this.w = 80;
        this.speed = 3;

        this.height = height;
        this.pipeBodyIMG = pipeBodyIMG;
        this.pipePeakIMG = pipePeakIMG;
        this.bottom = this.top + this.spacing;
    }

    hits(flappo) {
        let halfBirdHeight = flappo.height / 2;
        let halfBirdWidth = flappo.width / 2;
        if (flappo.y - halfBirdHeight < this.top || flappo.y + halfBirdHeight > this.bottom) {
            //if this.w is huge, then we need different collision model
            if (flappo.x + halfBirdWidth > this.x && flappo.x - halfBirdWidth < this.x + this.w) {
                this.highlight = true;
                this.passed = true;
                return true;
            }
        }
        this.highlight = false;
        return false;
    }

    pass(flappo) {
        if (flappo.x > this.x && !this.passed) {
            this.passed = true;
            return true;
        }
        return false;
    }

    drawHalf() {
        let howManyNedeed = 0;
        let peakRatio = this.pipePeakIMG.height / this.pipePeakIMG.width;
        let bodyRatio = this.pipeBodyIMG.height / this.pipeBodyIMG.width;
        //this way we calculate, how many tubes we can fit without stretching
        howManyNedeed = Math.round(this.height / (this.w * bodyRatio));
        //this <= and start from 1 is just my HACK xD But it's working
        for (let i = 0; i < howManyNedeed; ++i) {
            let offset = this.w * (i * bodyRatio + peakRatio);
            this.p.image(this.pipeBodyIMG, -this.w / 2, offset, this.w, this.w * bodyRatio);
        }
        this.p.image(this.pipePeakIMG, -this.w / 2, 0, this.w, this.w * peakRatio);
    }

    show() {
        this.p.push();
        this.p.translate(this.x + this.w / 2, this.bottom);
        this.drawHalf();
        this.p.translate(0, -this.spacing);
        this.p.rotate(this.p.PI);
        this.drawHalf();
        this.p.pop();
    }

    update() {
        this.x -= this.speed;
    }

    offscreen() {
        return (this.x < -this.w);
    }
}