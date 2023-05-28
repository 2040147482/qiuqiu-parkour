import { _decorator, Component, Node } from "cc";
import { PlayerMove } from "./PlayerMove";
const { ccclass, property } = _decorator;

@ccclass("NewComponent")
export class NewComponent extends Component {
  @property(PlayerMove)
  playMove: PlayerMove;

  start() {}

  update(deltaTime: number) {}

  onBtnStart() {
    this.playMove.enabled = true;
    this.node.active = false;
  }
}
