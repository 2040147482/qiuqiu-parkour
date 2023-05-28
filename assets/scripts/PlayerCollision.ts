import {
  _decorator,
  Collider,
  Component,
  director,
  ICollisionEvent,
  ITriggerEvent,
  Node,
} from "cc";
import { PlayerMove } from "./PlayerMove";
const { ccclass, property } = _decorator;

/**
 * 检测碰撞、触发 脚本
 */
@ccclass("PlayerCollision")
export class PlayerCollision extends Component {
  start() {
    let collider = this.node.getComponent(Collider);
    // 监听触发事件
    collider.on("onCollisionEnter", this.onCollisionEnter, this);
    collider.on("onTriggerEnter", this.onTriggerEnter, this);
  }

  update(deltaTime: number) {}

  private onCollisionEnter(event: ICollisionEvent) {
    // 碰撞到障碍物 游戏失败
    console.log("@@", event.otherCollider.node.name);
    if (event.otherCollider.node.name == "barrier") {
      console.log("Failure!");
      this.node.getComponent(PlayerMove).enabled = false;
      // 抛出失败事件
      director.getScene().emit("gameFailure");
    }
  }

  // 触发触发器 游戏胜利
  private onTriggerEnter(event: ITriggerEvent) {
    console.log("Victory");
    // 触发成工事件
    director.getScene().emit("gameSuccess");
  }

  onDestroy() {
    let collider = this.node.getComponent(Collider);
    collider.off("onCollisionEnter", this.onCollisionEnter, this);
    collider.off("onTriggerEnter", this.onTriggerEnter, this);
  }
}
