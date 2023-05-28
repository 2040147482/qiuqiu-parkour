import { _decorator, Component, Label, Node } from "cc";
const { ccclass, property } = _decorator;

/**
 * 实时显示 移动距离
 */
@ccclass("MoveDistance")
export class MoveDistance extends Component {
  @property(Node)
  player: Node;

  content: Label = null;

  start() {
    this.content = this.node.getComponent(Label);
  }

  update(deltaTime: number) {
    this.content.string = this.player.position.z.toFixed(1).toString();
  }
}
