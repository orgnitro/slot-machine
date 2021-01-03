import {winOrLose} from '../components/winOrLose.mjs';
import randomIndex from './randomIndex.mjs';
import { app,  global, alias } from '../components/main.mjs';
import makeBet from '../components/makeBet.mjs';


export default function startAnimation(btnActive, btnInactive) {
  if (global.bet === 0) {
    makeBet();
    return;
  }

  btnActive.visible = false;
  btnInactive.visible = true;

  let inc = 0.1 * (global.imgWidth);
  const incDecrease = setInterval(() => {
    inc = (inc > global.margin / 20) ? inc*= 0.75 : inc;
    if ((inc < global.margin / 5) &&((Math.abs(global.reelsArr[2][1][0].y - (global.imgWidth + global.margin*2)) <= global.margin / 5))) {
      inc = 0;
      clearInterval(incDecrease);
      alias.ticker.stop();
      alias.ticker.remove(rotation);
      winOrLose(global.reelsArr);
      btnActive.visible = true;
      btnInactive.visible = false;
    }
  }, 400);
  const rotation = () => {rotateReels(inc, incDecrease);
  };
  alias.ticker.add(rotation);
}

const rotateReels = (inc) => {
  global.reelsArr.forEach((reel, index) => {
    let shift = inc * (index + 1);
    if ((inc < global.margin / 3)&&(Math.abs(reel[1][0].y - (global.imgWidth + global.margin*2))<global.margin / 5) && (index !== 2)) {
      shift = 0;
  }
    reel[0][0].y += shift;
    reel[1][0].y += shift;
    reel[2][0].y += shift;
    reel[3][0].y += shift;

    if (reel[3][0].y > 536) {
      const reelItem = new PIXI.Sprite(alias.Cache[`${randomIndex()}.png`]);
      reelItem.position.set(reel[3][0].x, reel[0][0].y - 170);
      app.stage.addChild(reelItem);
      app.stage.removeChild(reel[3][0]);
      reel.unshift([reelItem, reelItem.texture.textureCacheIds[0]]);
      reel.pop();
    }
  });
}