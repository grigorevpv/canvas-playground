import { dragonId, canvasIdsArr } from "../constants";

const examplesModules = {
    [dragonId]: () => import("../examples/dragon"),
};

const importedExamplesModules = {};

export function drawCanvasItem(canvasId: typeof canvasIdsArr[number]) {
    if (!importedExamplesModules[canvasId]) {
        examplesModules[canvasId]()
            .then((exmpl) => {
                exmpl.default.drow(canvasId);
                importedExamplesModules[canvasId] = exmpl.default;
            });
    }
}

export function stopDrawingCanvasItem(canvasId: typeof canvasIdsArr[number]) {
    if (importedExamplesModules[canvasId]) {
        importedExamplesModules[canvasId].stopDrowing();
        delete importedExamplesModules[canvasId];
    }
}
