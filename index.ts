import ctx from './js/ctx.js';
import Game from './js/game.js';

const game = new Game(ctx);
(window as any).game = game;

window.requestAnimationFrame(tick);

function tick(timestamp : number) : void {
  game.tick(timestamp);
  requestAnimationFrame(tick);
}