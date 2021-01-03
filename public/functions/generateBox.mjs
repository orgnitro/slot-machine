export default function generateBox(x, y, w, h, color, rounding) {
  const box = new PIXI.Container();
  const graph = new PIXI.Graphics()
  .beginFill(color)
  .drawRoundedRect(x, y, w, h, rounding)
  .endFill();
  box.addChild(graph);
  return box;
}