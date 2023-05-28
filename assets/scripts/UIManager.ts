import { _decorator, Component, director, Node } from "cc";
const { ccclass, property } = _decorator;

@ccclass("UIManager")
export class UIManager extends Component {
  @property(Node)
  uiFailure: Node;

  @property(Node)
  uiSuccess: Node;

  start() {
    director.getScene().on("gameFailure", this.onShowFailure, this);
    director.getScene().on("gameSuccess", this.onShowSuccess, this);
  }
  onShowFailure() {
    this.uiFailure.active = true;
  }

  onShowSuccess() {
    this.uiSuccess.active = true;
  }

  // 重新挑战
  onBtnRetry() {
    director.loadScene(director.getScene().name);
  }

  // 返回主菜单
  onBtnToMenu() {
    director.loadScene("menu");
  }

  // 下一关
  onBtnNextLevel() {
    let level = director.getScene().name;
    if (level == "level01") {
      director.loadScene("level02");
    }
    if (level == "level02") {
      console.log("恭喜全过关！!!后面关卡敬请期待，感谢");
    }
  }

  update(deltaTime: number) {}
}
