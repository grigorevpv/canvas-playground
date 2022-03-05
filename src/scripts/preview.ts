import { canvasIdsArr, canvasIdsArrType } from "../constants";
import { drawCanvasItem } from "./loader"

function onPreviewClick(canvasElement: HTMLElement) {
    try {
        const parent = canvasElement.parentElement;
        const canvasId = parent.getElementsByTagName("canvas")[0].id as canvasIdsArrType;

        if (canvasIdsArr.includes(canvasId)) {
            drawCanvasItem(canvasId);
        } else {
            throw Error("Unknown canvas id");
        }
    } catch(err) {
        console.error(err);
    }
}

window.onPreviewClick = onPreviewClick;

declare global {
    interface Window {
        onPreviewClick: (el: HTMLElement) => void;
    }
}