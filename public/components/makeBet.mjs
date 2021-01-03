import { app, global } from "./main.mjs";
import generateBox from '../functions/generateBox.mjs';
import betWindow from './betWindow.mjs';

export default function makeBet() {
  const container = generateBox(global.bgSize[0]* 0.2, global.bgSize[1] * 0.2, 
    global.bgSize[0] * 0.5, global.bgSize[1] * 0.5, 0x004D4D, 0);
  app.stage.addChild(container);

  const balance = generateBox(0, 0, container.width * 0.6, container.height * 0.2, 0x004D4D, 0);
  container.addChild(balance);
  balance.x = container.width * 0.4;
  balance.y = container.height * 0.4
  const balanceText =  new PIXI.Text(`YOUR BALANCE: ${global.money}`, {
    fontFamily : 'Arial', 
    fontSize: balance.width * 0.1, 
    fill : 0xffffff, 
  });
  balance.addChild(balanceText);

  const input = new PIXI.TextInput({
		input: {
			fontFamily: 'Arial',
			fontSize: '16px',
			padding: '14px 14px',
			width: `${container.width * 0.5}`,
			color: 'white'
		},
		box: {
        default: {fill: 0x001A1A, rounded: 16},
        focused: {fill: 0x003333, rounded: 16},
        disabled: {fill: 0xDBDBDB, rounded: 16}
    }
  });

  container.addChild(input);
  input.placeholder = 'ENTER YOUR BET...';
	input.x = container.width * 0.45;
  input.y = container.height * 0.55;
  input.htmlInput.type = "number";
  input.htmlInput.min = "0";
  input.on("input", () => {
    input.htmlInput.value = Math.abs(input.htmlInput.value);
  })
  
  const submitBtn = generateBox(0, 0, container.width * 0.2, 
    container.height * 0.2, 0x001A1A, 5);
  submitBtn.interactive = true;

  const submitText = new PIXI.Text("SUBMIT", {
    fontFamily : 'Arial', 
    fontSize: submitBtn.width * 0.2, 
    fill : 0xffffff, 
  });
  submitText.x = (submitBtn.width - submitText.width) * 0.5;
  submitText.y = (submitBtn.height - submitText.height)* 0.5;
  submitBtn.addChild(submitText);
  container.addChild(submitBtn);

  submitBtn.position.set(container.width * 0.35, container.height * 0.75);
  submitBtn.on("click", () => {
    const currentBet = input.htmlInput.value;
    if (['', '0'].includes(currentBet) || currentBet > global.money) {
      return;
    } else {
    global.bet = +currentBet;
    global.money -= currentBet;
    app.stage.removeChild(container);
    app.stage.removeChild(global.betWindow);
    betWindow();
    }
  });
  
  const cancelBtn = generateBox(0, 0, container.width * 0.2, 
    container.height * 0.2, 0x001A1A, 5);
  cancelBtn.interactive = true;

  const cancelText = new PIXI.Text("CANCEL", {
    fontFamily : 'Arial', 
    fontSize: cancelBtn.width * 0.2, 
    fill : 0xffffff, 
  });
  cancelText.position.set((cancelBtn.width - cancelText.width) * 0.5, (cancelBtn.height - cancelText.height) * 0.5);
  cancelBtn.addChild(cancelText);
  container.addChild(cancelBtn);
  cancelBtn.position.set(container.width * 0.8, container.height * 0.75);
  cancelBtn.on("click", () => {app.stage.removeChild(container)});
}