// https://medium.com/front-end-weekly/learning-the-p5-canvas-drawing-library-in-es6-and-webpack-bf514a679544

import $ from "jquery";
import "./styles.css";
import p5 from "p5/lib/p5.js";
import {defineHTML} from "./lib/html/divDefinition";
import {Pipe} from "./lib/game/pipe";
import {Flappo} from "./lib/game/flappo";


let flappo;
let pipes;
let backgroundIMG;
let flappoIMG;
let pipeBodyIMG;
let pipePeakIMG;
let bgX;
let score = 0;
let isOver = false;
let touched = false;
let prevTouched = touched;

const parallax = 0.8;

let p;

let width = 800;
let height = 600;

export function main($element, layout) {
    try {
        defineHTML($, $element);

        let sketch = (sk) => {
            sk.preload = () => {
                preloadGraphics(sk);
            };

            sk.setup = () => {
                sk.createCanvas(width, height).parent("flappyData");
                reset(layout, sk);
            };

            sk.draw = () => {
                sk.background(0);
                sk.image(backgroundIMG, bgX, 0, backgroundIMG.width, height);
                bgX -= pipes[0].speed * parallax;

                // this handles the "infinite loop" by checking if the right
                // edge of the image would be on the screen, if it is draw a
                // second copy of the image right next to it
                // once the second image gets to the 0 point, we can reset bgX to
                // 0 and go back to drawing just one image.
                if (bgX <= -backgroundIMG.width + width) {
                    sk.image(backgroundIMG, bgX + backgroundIMG.width, 0, backgroundIMG.width, height);
                    if (bgX <= -backgroundIMG.width) {
                        bgX = 0;
                    }
                }

                for (let i = 0; i <= pipes.length - 1 ; i++) {
                    pipes[i].update();
                    pipes[i].show();

                    if (pipes[i].pass(flappo)) {
                        score++;
                    }

                    if (pipes[i].hits(flappo)) {
                        gameover();
                    }

                    if (pipes[i].offscreen()) {
                        debugger;
                        pipes.shift();
                    }
                }

                flappo.update();
                flappo.show();

            };

            sk.keyPressed = () => {
                console.log("KeyPressed", sk.key);
                if (sk.key === " ") {
                    flappo.up();
                    if (isOver) reset(); //you can just call reset() in Machinelearning if you die, because you cant simulate keyPress with code.
                }
            };

            sk.touchStarted = () => {
                if (isOver) reset();
            };
        };
        p = new p5(sketch);
        console.log("P", p);
    } catch (e) {
        console.error(e);
    }
    innerPaint($element, layout);
}

async function innerPaint($element, layout) {
    console.log(layout);
}

function preloadGraphics(p) {
    backgroundIMG = p.loadImage("/content/default/background.png");
    flappoIMG = p.loadImage("/content/default/train.png");
    pipeBodyIMG = p.loadImage("/content/default/pipe_marshmallow_fix.png");
    pipePeakIMG = p.loadImage("/content/default/pipe_marshmallow_fix.png");
}

function reset(layout, p) {
    flappo = new Flappo(p, height, flappoIMG);
    pipes = [];
    layout.qHyperCube.qDataPages[0].qMatrix.forEach((dataRow) => {
        pipes.push(new Pipe(p, dataRow[1].qNum, height, pipeBodyIMG, pipePeakIMG));
    });
    console.log("Pipes", pipes);
    isOver = false;
    bgX = 0;
    p.loop();
}

function gameover(p) {
    p.textSize(64);
    p.textAlign(p.CENTER, p.CENTER);
    p.text("GAMEOVER", width / 2, height / 2);
    p.textAlign(p.LEFT, p.BASELINE);
    isOver = true;
    p.noLoop();
}