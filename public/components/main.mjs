import startAnimation from '../functions/startAnimation.mjs';
import randomIndex from '../functions/randomIndex.mjs';
import betWindow from './betWindow.mjs';

export const alias = {
  Cache: PIXI.utils.TextureCache,
  ticker: PIXI.Ticker.shared
}

export let global = {
  bet: 0,
  money: 1000,
  win: 0,
  bgSize: [960, 536], 
  imgWidth: 155,
  margin: 20,
  reelsArr: [[], [], []],
  vw: Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0),
  vh: Math.max(document.documentElement.clientHeight || 0, window.innerHeight || 0),
  betWindow: undefined
};

export const app = new PIXI.Application({
  width: global.bgSize[0], height: global.bgSize[1],
  antialiasing: true, transparent: false, resolution: 1
});
document.getElementById('container').appendChild(app.view);
app.stage.interactive = true;

PIXI.loader
.add("../images/images.json")
.load(setup);

function setup() {
  const bg = new PIXI.Sprite(alias.Cache["BG.png"]);
  app.stage.addChild(bg);

  bg.width = global.bgSize[0];
  bg.height = global.bgSize[1];
  const btnInactive = new PIXI.Sprite(alias.Cache["btn-inactive.png"]);
  const btnActive = new PIXI.Sprite(alias.Cache["btn-active.png"]);
  app.stage.addChild(btnInactive);
  app.stage.addChild(btnActive);

  btnActive.position.set(825, 220);
  btnInactive.position.set(825, 220);
  btnInactive.visible = false;
  btnActive.interactive = true;

  const boundedFunc = startAnimation.bind(this, btnActive, btnInactive);
  btnActive.on("click", boundedFunc);
  btnActive.on("touchStart", boundedFunc);

  for (let i=0; i<=11; i++) {
    const reelItem = new PIXI.Sprite(alias.Cache[`${randomIndex()}.png`]);
    reelItem.x = 70 + (Math.floor(i / 4) * 240);
    reelItem.y = -global.imgWidth + (i % 4 * (global.imgWidth+global.margin));
    app.stage.addChild(reelItem);

    global.reelsArr[Math.floor((i) / 4)].push([reelItem, reelItem.texture.textureCacheIds[0]]);
  }
  betWindow();
}