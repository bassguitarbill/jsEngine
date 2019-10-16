import Game, { Drawable, Tickable } from "./game.js";

export default class Ball implements Drawable, Tickable {
  velocity: Point = {x: Math.random() * 20 - 10, y: 0};
  color = randomColor();
  constructor(
    readonly game: Game,
    readonly center: Point,
    readonly radius: number,
  ) {}
  
  draw(timestamp: number, ctx: CanvasRenderingContext2D): void {
    this.drawOutline(ctx);
    ctx.beginPath();
    ctx.fillStyle = this.color;
    ctx.arc(this.center.x, this.center.y, this.radius, 0, 6.28);
    ctx.fill();
  }

  drawOutline(ctx: CanvasRenderingContext2D) {
    ctx.beginPath();
    ctx.fillStyle = 'black';
    ctx.arc(this.center.x, this.center.y, this.radius + 3, 0, 6.28);
    ctx.fill();
  }

  tick(dt: number): void {
    this.velocity.x += this.game.gravity.x * dt / 1000;
    this.velocity.y += this.game.gravity.y * dt / 1000;

    this.center.x += this.velocity.x * dt / 100;
    this.center.y += this.velocity.y * dt / 100;

    if(this.center.y + this.radius > this.game.bottom) {
      this.center.y = this.game.bottom - this.radius;
      this.velocity.y = -this.velocity.y + 5;
    }
  }
}

function randomColor() {
  return `rgb(${Math.random() * 255},${Math.random() * 255},${Math.random() * 255})`;
}

interface Point {
  x: number,
  y: number,
}