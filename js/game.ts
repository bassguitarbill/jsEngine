import Ball from "./ball.js";

export default class Game {

  started = false;
  lastTimestamp = 0;
  balls: Array<Ball> = [];
  gravity = {x: 0, y: 9.8};
  count = 0;
  readonly bottom : number;
  constructor(readonly ctx : CanvasRenderingContext2D) {
    this.bottom = ctx.canvas.height;
  }

  tick(timestamp : number) {
    let dt = timestamp - this.lastTimestamp;
    dt = Math.min(dt, 50);
    this.count++;
    if(this.count % 3 === 0) this.balls.push(new Ball(this, {x: Math.random() * 400 + 200, y: 50}, Math.random() * 40 + 5));
    this.balls.forEach(b => b.tick(dt));
    this.draw(timestamp);
    this.lastTimestamp = timestamp;
  }

  draw(timestamp : number) {
    this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
    this.balls.forEach(b => b.draw(timestamp, this.ctx));
  }
}

export interface Drawable {
  draw(timestamp: number, ctx: CanvasRenderingContext2D) : void,
}

export interface Tickable {
  tick(dt: number) : void,
}