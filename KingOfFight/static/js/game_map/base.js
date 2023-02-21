import { AcGameObject } from '/static/js/ac_game_object/base.js'
import { Controller } from '../controller/base.js';


class GameMap extends AcGameObject {
    //构造地图
    constructor(root) {
        console.log("构建了地图")
        //继承所有游戏对象
        super();
        //root参数用来索引,因为创建他的时候,需要传入初始根
        this.root = root;
        //通过创建canvas来构造地图
        this.$canvas = $('<canvas width="1280" height = "720" tabindex=0></canvas>');
        //将canvas引用给地图
        this.ctx = this.$canvas[0].getContext('2d');
        //将地图引用给整个游戏界面
        this.root.$kof.append(this.$canvas);
        //给canvas加上聚焦功能,能够接收键鼠输入
        this.$canvas.focus();
        //给地图加上控制器,对地图上的canvas进行事件监听
        this.controller = new Controller(this.$canvas);
        //给地图加血条
        this.root.$kof.append($(
            `<div class="kof-head">
                <div class="kof-head-hp-0"><div><div></div></div></div>
                <div class="kof-head-timer">80</div>
                <div class="kof-head-hp-1"><div><div></div></div></div>
            </div>
            `
        ));

        this.time_left = 80000; //ms
        this.$timer = this.root.$kof.find(".kof-head-timer");
    }

    start() {

    }

    update() {
        this.time_left -= this.timedelta;
        if (this.time_left < 0) {
            this.time_left = 0;

            let [a, b] = this.root.players;
            if (a.status !== 6 && b.status !== 6) {

                a.status = b.status = 6;
                a.frame_current_cnt = b.frame_current_cnt = 0;
                a.vx = b.vx = 0;
            }
            if (this.root.$kof.find(`.kof-btn`).length === 0) {
                this.root.$kof.append($(`
                <div class="kof-ko">K.O</div>
                <div class = "kof-btn">Try Again<div>
                `));
                this.root.$kof.find(`.kof-btn`).click(function () {
                    location.reload();
                })
            }

        }

        this.$timer.text(parseInt(this.time_left / 1000));
        this.render();
    }

    render() {
        //清理幕布,将地图清除
        this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
        // this.ctx.fillStyle = 'black';
        // this.ctx.fillRect(0, 0, this.$canvas.width(), this.$canvas.height());


    }
}


export {
    GameMap
}