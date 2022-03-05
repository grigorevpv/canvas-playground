export const dragonId = "dragonId" as const;

export const canvasIdsArr = [dragonId] as const;

export type canvasIdsArrType = typeof canvasIdsArr[number];
