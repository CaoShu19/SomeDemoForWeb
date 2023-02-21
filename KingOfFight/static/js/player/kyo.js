import { Player } from "./base.js";
import { GIF } from "/static/js/utils/gif.js";

export class Kyo extends Player {
    constructor(root, info) {
        super(root, info);
        this.init_animations();
    }
    //初始化动画
    init_animations() {
        let outer = this;
        let offset = [0, -22, -22, -140, 0, 0, 0];
        //将7帧动作加载出来
        for (let i = 0; i < 7; i++) {
            //从gif加载帧的轮子
            let gif = GIF();
            //加载帧
            gif.load(`/static/images/player/kyo/${i}.gif`);
            //将帧放到动作存储器中
            this.animations.set(i, {
                gif: gif,
                frame_cnt: 0,
                frame_rate: 5, //每5帧后再渲染
                offset_y: offset[i], // y方向偏移量
                loaded: false, //是否加载完成
                scale: 2, //放大倍数
            });
            //从动作存储器取到帧
            gif.onload = function () {
                let obj = outer.animations.get(i);
                obj.frame_cnt = gif.frames.length;
                obj.loaded = true;
                if (i === 3) {
                    obj.frame_rate = 4;
                }
            }
        }
    }
}