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
  const movePointCb = movePoint(ctx);
  mouseMoveCbFn = (e: MouseEvent) => {
    requestAnimationFrame(() => {
      if (!infiniteFillRectStarted) {
        infiniteFillRectStarted = true;
        infiniteFillRect(ctx);
      }

      movePointCb(e);
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

function movePoint(ctx) {
  const { x, y, width, height } = ctx.canvas.getBoundingClientRect();
  const prevPosition = {
    x: width / 2,
    y: height / 2,
  }
  return (e) => {
    const [mx, my] = [e.clientX, e.clientY];

    if (mx >= x + width || mx <= x || my >= y + height || mx <= y) {
      return;
    }

    prevPosition.x = mx;
    prevPosition.y = my;

    ctx.beginPath();
    ctx.arc(mx - 30, my - 25, 5, 0, Math.PI * 2, true);
    ctx.closePath();
    ctx.fillStyle = randomRgbColor();
    ctx.fill();
  }
}

const dragonExample: Example = {
  id: dragonId,
  stopDrowing: stopDrowing,
  drow: drow,
}

export default dragonExample;