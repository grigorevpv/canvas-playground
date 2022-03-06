import { canvasIdsArr, canvasIdsArrType } from "../constants";
import { drawCanvasItem, stopDrawingCanvasItem } from "./loader"

function onPreviewClick(button: HTMLElement) {
    try {
        const canvasId = button.dataset.canvasId as canvasIdsArrType;

        if (canvasIdsArr.includes(canvasId)) {
            drawCanvasItem(canvasId);
        } else {
            throw Error("Unknown canvas id");
        }
    } catch(err) {
        console.error(err);
    }
}

function onResetClick(button: HTMLElement) {
    const canvasId = button.dataset.canvasId as canvasIdsArrType;
    stopDrawingCanvasItem(canvasId);
}

window.onPreviewClick = onPreviewClick;
window.onResetClick = onResetClick;

declare global {
    interface Window {
        onPreviewClick: (el: HTMLElement) => void;
        onResetClick: (el: HTMLElement) => void;
    }
}