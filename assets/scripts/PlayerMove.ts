import { Input, KeyCode, director } from "cc";
import { EventKeyboard } from "cc";
import { input } from "cc";
import { _decorator, Component, Node, RigidBody, Vec3 } from "cc";
const { ccclass, property } = _decorator;

@ccclass("PlayerMove")
export class PlayerMove extends Component {
  @property(RigidBody)
  rigidBody: RigidBody;

  /**
   * 施加前方向的力
   */
  @property
  forwardForce: number = 0;

  /**
   * 施加侧方向的力
   */
  @property
  sideForce: number = 0;

  private isLeftDown: boolean = false;
  private isRightDown: boolean = false;

  onLoad() {
    input.on(Input.EventType.KEY_DOWN, this.onKeyDown, this);
    input.on(Input.EventType.KEY_UP, this.onKeyUp, this);
  }

  start() {}

  update(deltaTime: number) {
    // 每秒施加前方向forwardForce牛的力
    this.rigidBody.applyForce(new Vec3(0, 0, -this.forwardForce * deltaTime));

    if (this.isLeftDown) {
      this.rigidBody.applyForce(new Vec3(-this.sideForce * deltaTime, 0, 0));
    }
    if (this.isRightDown) {
      this.rigidBody.applyForce(new Vec3(this.sideForce * deltaTime, 0, 0));
    }

    // 滑动求球低于y方向0位置，游戏失败
    if (this.node.position.y < 0) {
      console.log("Failure");
      this.enabled = false;
      // 抛出失败事件
      director.getScene().emit("gameFailure");
    }
  }

  onDestroy() {
    input.off(Input.EventType.KEY_DOWN, this.onKeyDown, this);
    input.off(Input.EventType.KEY_UP, this.onKeyUp, this);
  }

  private onKeyDown(event: EventKeyboard) {
    switch (event.keyCode) {
      case KeyCode.KEY_A:
        this.isLeftDown = true;
        break;
      case KeyCode.KEY_D:
        this.isRightDown = true;
        break;
    }
  }

  private onKeyUp(event: EventKeyboard) {
    switch (event.keyCode) {
      case KeyCode.KEY_A:
        this.isLeftDown = false;
        break;
      case KeyCode.KEY_D:
        this.isRightDown = false;
        break;
    }
  }
}
