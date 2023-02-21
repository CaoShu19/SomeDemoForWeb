
//存放每一个游戏对象
let AC_GAME_OBJECT = [];

//游戏对象的初始祖宗
class AcGameObject {
    constructor() {
        //构造一个对象就将对象放入对象池
        AC_GAME_OBJECT.push(this);
        //设置本对象的时间间隔为0(物理的60hz)
        this.timedelta = 0;
        //此对象是否调用过start
        this.has_call_start = false;
    }

    start() {

    }
    update() {

    }
    destory() {
        for (let i in AC_GAME_OBJECT) {
            if (AC_GAME_OBJECT[i] == this) {
                AC_GAME_OBJECT.splice(i, 1);
                break;
            }
        }
    }
}
let last_timestamp

//实现将每个对象都刷新执行(一帧执行一次)
let AC_GAME_OBJECT_FRAME = (timestamp) => {
    for (let obj of AC_GAME_OBJECT) {
        if (!obj.has_call_start) {
            obj.start();
            obj.has_call_start = true;
        } else {
            obj.timedelta = timestamp - last_timestamp;

            obj.update();
        }
    }
    last_timestamp = timestamp;
    //每帧执行一遍,对所有对象的刷新
    requestAnimationFrame(AC_GAME_OBJECT_FRAME);
}
//启动执行
requestAnimationFrame(AC_GAME_OBJECT_FRAME)

export {
    AcGameObject
}