// https://medium.com/front-end-weekly/learning-the-p5-canvas-drawing-library-in-es6-and-webpack-bf514a679544

import $ from "jquery";
import "./styles.css";
import p5 from "p5/lib/p5.js";
import {defineHTML} from "./lib/html/divDefinition";

export function main($element, layout) {
    try {
        defineHTML($, $element);

        let sketch = (sk) => {
            sk.setup = () => {
                sk.createCanvas(400, 400).parent("flappyData");
                sk.background(153);
                sk.stroke(200);
                sk.strokeWeight(3);
            };

            sk.draw = () => {
                sk.ellipse(50, 50, 80, 80);
            };
        };
        console.log("Main",sketch);
        const p = new p5(sketch);
        console.log(p5, p);
    } catch (e) {
        console.error(e);
    }
    innerPaint($element, layout);
}

async function innerPaint($element, layout) {
    console.log(layout);
}

