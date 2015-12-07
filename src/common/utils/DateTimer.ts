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
     * TODO 同步服务器时间
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

    public run() {
        //TODO 网络同步
        //this.runSyncTicker();
        this.run1sTicker();
    }

    /**
     * ========================== 网络动画同步 ========================
     */

    /**
     * 启动同步数据的计时器
     */
    private runSyncTicker() {
        var timer:egret.Timer = new egret.Timer(15000);
        timer.addEventListener(egret.TimerEvent.TIMER, this.onSyncTimer, this);
        timer.start();
    }

    private onSyncTimer() {
        Player.instance.saveToNet();
    }

    /**
     * ========================== 1s动画 ========================
     */


    /**
     * 启动1s计时器
     */
    private run1sTicker() {
        var timer:egret.Timer = new egret.Timer(1000);
        timer.addEventListener(egret.TimerEvent.TIMER, this.onOneSecondTimer, this);
        timer.start();
    }


    private onOneSecondTimer() {
        //刷新建筑cd
        Player.instance.updateBuildQueue();
        //自动产出资源
        Player.instance.autoOutputResource();

        //1s定时器更新
        OneTimerTicker.instance.update();
    }

}