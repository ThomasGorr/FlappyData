import $ from "jquery";
import "./styles.css";
import {defineHTML} from "./lib/html/divDefinition";
import picasso from "./../node_modules/picasso.js/dist/picasso";
import picassoQ from "./../node_modules/picasso-plugin-q/dist/picasso-q";
import {dompoint} from "./lib/picassoUtils/dompoint";
import {getUpdateConfig} from "./lib/picassoUtils/chartConfig";

export function main($element, layout) {
    try {
        picasso.use(picassoQ);
        picasso.component("dompoint", dompoint);
    } catch (e) {
        console.error(e);
    }
    innerPaint($element, layout);
}

async function innerPaint($element, layout) {
    defineHTML($, $element);

    const pChart = picasso.chart({
        element: $element[0].querySelector("#scatter"),
        data: [],
    });

    const updateConfig = getUpdateConfig(layout);
    pChart.update(updateConfig);

}