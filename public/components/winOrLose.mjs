import betWindow from './betWindow.mjs';
import { app, global, alias} from './main.mjs';
import checkForWin from '../functions/checkForWin.mjs';
import generateBox from '../functions/generateBox.mjs';


export function winOrLose(arr) {
  const result = checkForWin(arr);
  if (result) {
    const container = generateBox(global.margin* 2, global.margin , 
      global.bgSize[0] * 0.8, global.bgSize[1] * 0.95, 0x004D4D, 0);

    const filter = new PIXI.filters.AlphaFilter();
    filter.alpha = 0.85;
    container.filters = [filter];
  
    const msg = new PIXI.Text("YOU WON!", {
      fontFamily: "Futura",
      fontSize: 64,
      fill: "white"
    });
    const betLine = new PIXI.Sprite(alias.Cache["bet-line.png"]);
    app.stage.addChild(betLine);
    betLine.position.set(45, (global.imgWidth + global.margin) * (result + 1))

    setTimeout(() => {
      app.stage.removeChild(betLine);
      app.stage.addChild(container);
      container.addChild(msg);
      msg.anchor.set(0.5);
      msg.x = (container.width ) / 2;
      msg.y = (container.height ) / 2;
    }, 1000);
    setTimeout(() => {
      app.stage.removeChild(container);
    }, 4000);
    global.money += global.bet * 3;
    global.win += global.bet * 2;
  } else {
    global.bet = 0;
    global.win === 0 ? global.win : global.win - global.bet;
    app.stage.removeChild(global.betWindow);
    betWindow();
  }
}