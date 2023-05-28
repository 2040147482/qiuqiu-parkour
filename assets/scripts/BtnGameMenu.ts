import { _decorator, Component, director, Node } from "cc";
const { ccclass, property } = _decorator;

@ccclass("BtnGameMenu")
export class BtnGameMenu extends Component {
  start() {}

  update(deltaTime: number) {}

  onBtnStart() {
    director.loadScene("level01");
  }
}
