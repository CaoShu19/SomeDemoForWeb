import { AcGameObject } from '/static/js/ac_game_object/base.js'

export class Player extends AcGameObject {
    constructor(root, info) {
        super();

        this.root = root;
        this.ctx = this.root.game_map.ctx;

        //大小,坐标,颜色
        this.id = info.id;
        this.x = info.x;
        this.y = info.y;
        this.width = info.width;
        this.height = info.height;
        this.color = info.color;
        //方向
        this.direction = 1;
        //速度
        this.vx = 0;
        this.vy = 0;
        //重力模拟,向下速度
        this.gravity = 50;

        //操作移动速度
        this.speedx = 400;
        this.speedy = -1000;

        //存放操作的按键
        this.pressed_keys = this.root.game_map.controller.pressed_keys;


        //状态机 0:idle; 1:向前; 2:向后; 3:跳跃；4:攻击; 5:被攻击; 6:死亡
        this.status = 3;

        //存放角色的动画帧
        this.animations = new Map();
        //帧数记录
        this.frame_current_cnt = 0;

        //血量
        this.hp = 100;
        //找到血条控制div节点
        this.$hp = this.root.$kof.find(`.kof-head-hp-${this.id}>div`)
        this.$hp_div = this.root.$kof.find(`.kof-head-hp-${this.id}>div>div`)
    }

    start() {

    }


    update_move() {
        this.vy += this.gravity;

        this.x += this.vx * this.timedelta / 1000;
        this.y += this.vy * this.timedelta / 1000;
        if (this.y > 450) {
            this.y = 450;
            this.vy = 0;

            if (this.status === 3) {
                this.status = 0;
            }
        }

        if (this.x < 0) {
            this.x = 0;
        } else if (this.x + this.width > this.root.game_map.$canvas.width()) {
            this.x = this.root.game_map.$canvas.width() - this.width;
        }
    }
    update_control() {
        let w, a, d, space;
        if (this.id === 0) {
            w = this.pressed_keys.has('w');
            a = this.pressed_keys.has('a');
            d = this.pressed_keys.has('d');
            space = this.pressed_keys.has(' ');
        } else {
            w = this.pressed_keys.has('ArrowUp');
            a = this.pressed_keys.has('ArrowLeft');
            d = this.pressed_keys.has('ArrowRight');
            space = this.pressed_keys.has('Enter');
        }
        if (this.status === 0 || this.status === 1) {
            if (space) {
                this.status = 4;
                this.vx = 0;
                this.frame_current_cnt = 0;
            } else if (w) {//按住w后
                if (d) {
                    this.vx = this.speedx;
                } else if (a) {
                    this.vx = -this.speedx;
                } else {
                    this.vx = 0;
                }
                this.vy = this.speedy;
                this.status = 3;
                this.frame_current_cnt = 0;
            } else if (d) {
                this.vx = this.speedx;
                this.status = 1;
            } else if (a) {
                this.vx = -this.speedx;
                this.status = 1;
            }
            else {
                this.vx = 0;
                this.status = 0;
            }
        }
    }
    update_direction() {
        if (this.status === 6) return;
        let players = this.root.players;
        if (players[0] && players[1]) {
            let me = this;
            let you = players[1 - this.id];
            if (me.x < you.x) me.direction = 1;
            else me.direction = -1;
        }
    }

    //被攻击
    is_attack() {
        if (this.status === 6) return;
        this.status = 5;
        this.frame_current_cnt = 0;
        this.hp = Math.max(this.hp - 30, 0);

        //给节点标签扣血
        this.$hp.animate({
            width: this.$hp.parent().width() * this.hp / 100
        }, 800)
        this.$hp_div.animate({
            width: this.$hp.parent().width() * this.hp / 100
        }, 300)

        if (this.hp <= 0) {
            this.status = 6;
            this.frame_current_cnt = 0;
            this.vx = 0;

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
    }

    //判断两个矩阵是否有交集, 碰撞检测
    is_collision(r1, r2) {
        if (Math.max(r1.x1, r2.x1) > Math.min(r1.x2, r2.x2))
            return false;
        if (Math.max(r1.y1, r2.y1) > Math.min(r1.y2, r2.y2))
            return false;
        return true;
    }

    update_attack() {
        if (this.status === 4 && this.frame_current_cnt === 18) {
            let me = this;
            let you = this.root.players[1 - this.id];
            let r1;
            if (this.direction > 0) {
                r1 = {
                    x1: me.x + 120,
                    y1: me.y + 40,
                    x2: me.x + 120 + 100,
                    y2: me.y + 40 + 20,
                }
            } else {
                r1 = {
                    x1: me.x - 120 - 100 + this.width,
                    y1: me.y + 40,
                    x2: me.x - 120 - 100 + this.width + 100,
                    y2: me.y + 40 + 20,
                }
            }
            let r2 = {
                x1: you.x,
                y1: you.y,
                x2: you.x + you.width,
                y2: you.y + you.height
            };

            //碰撞检测
            if (this.is_collision(r1, r2)) {
                you.is_attack();
            }

        }
    }
    update() {
        //更新控制参数
        this.update_control();
        //更新位置参数
        this.update_move();
        //更新方向
        this.update_direction();
        //更新攻击检测
        this.update_attack();
        //绘制图形
        this.render();
    }

    render() {
        // //碰撞模型显示
        // this.ctx.fillStyle = 'blue';
        // this.ctx.fillRect(this.x, this.y, this.width, this.height);
        // //攻击模型显示
        // if (this.direction > 0) {
        //     this.ctx.fillStyle = 'red';
        //     this.ctx.fillRect(this.x + 120, this.y + 70, 100, 30);
        // } else {
        //     this.ctx.fillStyle = 'red';
        //     this.ctx.fillRect(this.x - 120 - 100 + this.width, this.y + 70, 100, 30);
        // }


        let status = this.status;

        if (this.status === 1 && this.direction * this.vx < 0) {
            status = 2;
        }

        let obj = this.animations.get(status);

        //如果加载图片成功且动作池中有动画
        if (obj && obj.loaded) {

            if (this.direction > 0) {
                //获得当前应该渲染第几个帧率
                let k = parseInt(this.frame_current_cnt / obj.frame_rate) % obj.frame_cnt;
                //得到当前帧的图片
                let image = obj.gif.frames[k].image;
                //将图片画到canvas上
                this.ctx.drawImage(image, this.x, this.y + obj.offset_y, image.width * obj.scale, image.height * obj.scale);
            } else {
                this.ctx.save();
                this.ctx.scale(-1, 1);
                this.ctx.translate(-this.root.game_map.$canvas.width(), 0);

                //获得当前应该渲染第几个帧率
                let k = parseInt(this.frame_current_cnt / obj.frame_rate) % obj.frame_cnt;
                //得到当前帧的图片
                let image = obj.gif.frames[k].image;
                //将图片画到canvas上
                this.ctx.drawImage(image, this.root.game_map.$canvas.width() - this.x - this.width, this.y + obj.offset_y, image.width * obj.scale, image.height * obj.scale);

                this.ctx.restore();
            }

        }
        if (status === 4 || status === 5 || status === 6) {
            // console.log("当前帧", parseInt(this.frame_current_cnt / obj.frame_rate) % obj.frame_cnt)
            // console.log("总帧", (obj.frame_cnt - 1))
            // if ((parseInt(this.frame_current_cnt / obj.frame_rate) % obj.frame_cnt) + 1 === (obj.frame_cnt)) {
            //     this.status = 0;
            //     console.log("444444");
            // }

            // if (status === 3 || status === 4) {
            if (this.frame_current_cnt == obj.frame_rate * (obj.frame_cnt - 1)) {
                if (status === 6) {
                    this.frame_current_cnt--;
                } else {
                    this.status = 0;
                }

            }
            // }
        }
        this.frame_current_cnt++;
    }
}