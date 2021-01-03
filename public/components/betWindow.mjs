import generateBox from '../functions/generateBox.mjs';
import { app, global } from './main.mjs';


export default function betWindow() {
  const box = generateBox(0, 0, 
    global.bgSize[0] * 0.15, global.bgSize[1] * 0.15, 0x004D4D, 0);

  box.x = global.bgSize[0]* 0.83;
  box.y = global.bgSize[1] * 0.66;
  app.stage.addChild(box);
  global.betWindow = box;

  const filter = new PIXI.filters.AlphaFilter();
  filter.alpha = 0.85;
  box.filters = [filter];

  const boxText =  new PIXI.Text(`MONEY: ${global.money}\nBET: ${global.bet}\nWIN: ${global.win}`, {
    fontFamily : 'Arial', 
    fontSize: box.width * 0.12, 
    fill : 0xffffff,
  });
  
  boxText.x = box.width * 0.1;
  boxText.y = box.height * 0.15;
  box.addChild(boxText);
}