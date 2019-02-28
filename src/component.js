// https://medium.com/front-end-weekly/learning-the-p5-canvas-drawing-library-in-es6-and-webpack-bf514a679544

import $ from "jquery";
import "./styles.css";
import p5 from "p5/lib/p5.js";
import {defineHTML} from "./lib/html/divDefinition";
import {Pipe} from "./lib/game/pipe";
import {Flappo} from "./lib/game/flappo";


export function main($element, layout) {
    let p;
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

    if (p) {
        p.remove();
    }

    let windowWidth = 800;
    let windowHeight = 600;
    try {
        $element.empty();
        defineHTML($, $element);

        let sketch = (sk) => {
            sk.preload = () => {
                preloadGraphics(sk);
            };

            sk.setup = () => {
                console.log("SETUP");
                sk.remove();
                sk.createCanvas(windowWidth, windowHeight).parent("flappyData");
                reset(layout, sk);
            };

            sk.draw = () => {
                sk.background(0);
                sk.image(backgroundIMG, bgX, 0, backgroundIMG.width, windowHeight);
                if (pipes.length > 0) {
                    bgX -= pipes[0].speed * parallax;

                    // this handles the "infinite loop" by checking if the right
                    // edge of the image would be on the screen, if it is draw a
                    // second copy of the image right next to it
                    // once the second image gets to the 0 point, we can reset bgX to
                    // 0 and go back to drawing just one image.
                    if (bgX <= -backgroundIMG.width + windowWidth) {
                        sk.image(backgroundIMG, bgX + backgroundIMG.width, 0, backgroundIMG.width, windowHeight);
                        if (bgX <= -backgroundIMG.width) {
                            bgX = 0;
                        }
                    }

                    for (let i = 0; i <= pipes.length - 1; i++) {

                        if (pipes[i]) {
                            pipes[i].update();
                            pipes[i].show();
                        }

                        if (pipes[i].pass(flappo)) {
                            score++;
                        }

                        if (pipes[i].hits(flappo)) {
                            gameover();
                        }

                        if (pipes[i].offscreen()) {
                            console.log("SHIFT");
                            pipes.shift();
                        }
                    }
                } else {
                    gameWin(sk);
                }

                flappo.update();
                flappo.show();

            };

            sk.keyPressed = () => {
                console.log("KeyPressed", sk.key);
                if (sk.key === " ") {
                    flappo.up();
                    if (isOver) reset(layout, sk);
                }
            };

            sk.touchStarted = () => {
                if (isOver) reset(layout, sk);
            };
        };
        p = new p5(sketch);
    } catch (e) {
        console.error(e);
    }

    function preloadGraphics(p) {
        backgroundIMG = p.loadImage("/content/default/background.png");
        flappoIMG = p.loadImage("/content/default/unicorn.png");
        pipeBodyIMG = p.loadImage("/content/default/pipe_marshmallow_fix.png");
        pipePeakIMG = p.loadImage("/content/default/pipe_marshmallow_fix.png");
    }

    function reset(layout, p) {
        p.noLoop();
        flappo = null;
        flappo = new Flappo(p, windowHeight, flappoIMG);
        pipes = [];
        layout.qHyperCube.qDataPages[0].qMatrix.forEach((dataRow, index) => {
            let x = 0;
            if (index === 0) {
                x = windowWidth;
            } else {
                // Always 3 full pipes on the screen
                x = windowWidth * index / 3;
            }
            const text = dataRow[0].qText + ": " + dataRow[1].qNum;
            pipes.push(new Pipe(p, dataRow[1].qNum, windowHeight, x, pipeBodyIMG, pipePeakIMG, text));
        });
        console.log("Pipes", pipes);
        isOver = false;
        touched = false;
        bgX = 0;
        p.loop();
    }

    function gameover(p) {
        p.textSize(64);
        p.textAlign(p.CENTER, p.CENTER);
        p.text("GAMEOVER", windowWidth / 2, windowHeight / 2);
        p.textAlign(p.LEFT, p.BASELINE);
        isOver = true;
        p.noLoop();
    }

    function gameWin(p) {
        p.textSize(64);
        p.textAlign(p.CENTER, p.CENTER);
        p.text("You won the game!", windowWidth / 2, windowHeight / 2);
        p.textAlign(p.LEFT, p.BASELINE);
        isOver = true;
        p.noLoop();
    }
}

