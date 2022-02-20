import { randomRgbColor } from "./utils/color";

let infiniteFillRectStarted = false;

function draw(): void {
  const canvas = document.getElementById("rect") as HTMLCanvasElement;
  const ctx = canvas.getContext("2d");

  fillRect(ctx, "rgba(0,0,0)");
  const movePointCb = movePoint(ctx);

  document.addEventListener("mousemove", (e) => {
    requestAnimationFrame(() => {
      if (!infiniteFillRectStarted) {
        infiniteFillRect(ctx);
      }

      movePointCb(e);
    });
  });
}

function infiniteFillRect(ctx) {
  infiniteFillRectStarted = true
  fillRect(ctx, "rgba(0,0,0, 0.05)");
  requestAnimationFrame(() => infiniteFillRect(ctx));
}

function fillRect(ctx: CanvasRenderingContext2D, color: string): void {
  const {width, height } = ctx.canvas.getBoundingClientRect();

  ctx.fillStyle = color;
  ctx.fillRect(0, 0, width, height);
}

function movePoint(ctx: CanvasRenderingContext2D) {
  const { x, y, width, height } = ctx.canvas.getBoundingClientRect();
  let prevPosition = {
    x: width / 2,
    y: height / 2,
  }
  return (e: MouseEvent) => {
    const [mx, my] = [e.clientX, e.clientY];

    if (mx >= x + width || mx <= x || my >= y + height || mx <= y) {
      return;
    }

    prevPosition.x = mx;
    prevPosition.y = my;

    ctx.beginPath();
    ctx.arc(mx, my, 5, 0, Math.PI * 2, true);
    ctx.closePath();
    ctx.fillStyle = randomRgbColor();
    ctx.fill();
  }
}

draw();