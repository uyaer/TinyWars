/**
 * 时间管理器
 */
class DateTimer {
    private static _instance:DateTimer;

    public constructor() {
        if (DateTimer._instance) {
            throw new Error("DateTimer使用单例");
        }
    }

    public static get instance():DateTimer {
        if (!DateTimer._instance) {
            DateTimer._instance = new DateTimer();
        }
        return DateTimer._instance;
    }

    /**
     * 时间差
     * @type {number}
     * @private
     */
    private _deltaTime:number = 0;

    /**
     * 同步服务器时间
     * @param val
     */
    public updateServerTime(val:number) {
        this._deltaTime = Date.now() - val;
    }

    /**
     * 获取当前服务器时间
     */
    public get now() {
        return Date.now() - this._deltaTime;
    }

    /**
     * 启动同步数据的计时器
     */
    public runSyncTicker() {
        var timer:egret.Timer = new egret.Timer(5000);
        timer.addEventListener(egret.TimerEvent.TIMER, this.onSyncTimer, this);
    }

    private onSyncTimer() {
        Player.instance.saveToNet();
    }
}