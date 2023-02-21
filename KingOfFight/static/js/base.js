import { GameMap } from '/static/js/game_map/base.js';
import { Player } from './player/base.js';
import { Kyo } from './player/kyo.js';
class KOF {
    constructor(id) {
        console.log("构建了游戏")
        //找到标签
        this.$kof = $('#' + id);

        //创建地图
        this.game_map = new GameMap(this);
        //创建两名角色
        this.players = [
            new Kyo(this, {
                id: 0,
                x: 0,
                y: 0,
                width: 150,
                height: 200,
                color: 'blue'
            }),
            new Kyo(this, {
                id: 1,
                x: 500,
                y: 0,
                width: 150,
                height: 200,
                color: 'red'
            })
        ]

    }
}


export {
    KOF
}