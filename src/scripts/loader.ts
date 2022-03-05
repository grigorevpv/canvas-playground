import { dragonId, canvasIdsArr } from "../constants";

const examples = {
    [dragonId]: () => import("../examples/dragon"),
}

export function drawCanvasItem(canvasId: typeof canvasIdsArr[number]) {
    examples[canvasId]()
        .then(({ draw }) => draw(canvasId));
}
