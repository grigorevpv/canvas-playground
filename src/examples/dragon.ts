import { dragonId } from "../constants";
import { Example } from "../types";
import { randomRgbColor } from "../utils/color";

let infiniteFillRectStarted = false;
let mouseMoveCbFn = null;

export function stopDrowing() {
    if (mouseMoveCbFn) {
        document.removeEventListener("mousemove", mouseMoveCbFn);
        mouseMoveCbFn = null;
    }

    infiniteFillRectStarted = false;
}

function drow(id: string) {
  const canvas = document.getElementById(id) as HTMLCanvasElement;
  const ctx = canvas.getContext("2d");

  fillRect(ctx, "rgba(0,0,0)");
  mouseMoveCbFn = (e: MouseEvent) => {
    requestAnimationFrame(() => {
      if (!infiniteFillRectStarted) {
        infiniteFillRectStarted = true;
        infiniteFillRect(ctx);
      }

      movePoint(ctx, e);
    });
  };

  document.addEventListener("mousemove", mouseMoveCbFn);
}

function infiniteFillRect(ctx: CanvasRenderingContext2D) {
  fillRect(ctx, "rgba(0,0,0, 0.05)");
  requestAnimationFrame(() => infiniteFillRect(ctx));
}

function fillRect(ctx: CanvasRenderingContext2D, color: string) {
  const {width, height } = ctx.canvas.getBoundingClientRect();

  ctx.fillStyle = color;
  ctx.fillRect(0, 0, width, height);
}

function movePoint(ctx: CanvasRenderingContext2D, e: MouseEvent) {
  const { x, y, width, height, top, left } = ctx.canvas.getBoundingClientRect();
  const scaleX = ctx.canvas.width / width;
  const scaleY = ctx.canvas.height / height;
  const [mx, my] = [e.clientX, e.clientY];

  const xPos = (mx - left) * scaleX;
  const yPos = (my - top) * scaleY;

  if (mx >= x + width || mx <= x || my >= y + height || mx <= y) {
    return;
  }

  ctx.beginPath();
  ctx.arc(xPos, yPos, 5, 0, Math.PI * 2, false);
  ctx.closePath();
  ctx.fillStyle = randomRgbColor();
  ctx.fill();
}

const dragonExample: Example = {
  id: dragonId,
  stopDrowing: stopDrowing,
  drow: drow,
}

export default dragonExample;