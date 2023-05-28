import { _decorator, Component, Node, Vec3 } from "cc";
const { ccclass, property } = _decorator;

/**
 * 摄像机跟随
 */
@ccclass("FollowTarget")
export class FollowTarget extends Component {
  @property(Node)
  target: Node;

  /**
   * 摄像机跟目标的偏移量
   */
  @property(Vec3)
  offset: Vec3 = new Vec3();

  tmpPos: Vec3 = new Vec3();

  start() {}

  update(deltaTime: number) {
    this.target.getPosition(this.tmpPos);
    this.tmpPos.add(this.offset);

    this.node.position = this.tmpPos;
  }
}
