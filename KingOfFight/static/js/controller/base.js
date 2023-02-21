export class Controller {
    constructor($canvas) {
        this.$canvas = $canvas;

        //通过set存放我们的操作,我们希望,只要set中有操作就执行
        this.pressed_keys = new Set();
        this.start();
    }
    start() {
        //对给的canvas进行添加事件监听
        let outer = this;
        this.$canvas.keydown(function (e) {
            outer.pressed_keys.add(e.key);
        })
        this.$canvas.keyup(function (e) {
            outer.pressed_keys.delete(e.key);
        })
    }
}