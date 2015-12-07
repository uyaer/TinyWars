/**
 * 时间管理器
 */
var DateTimer = (function () {
    function DateTimer() {
        /**
         * 时间差
         * @type {number}
         * @private
         */
        this._deltaTime = 0;
        if (DateTimer._instance) {
            throw new Error("DateTimer使用单例");
        }
    }
    var d = __define,c=DateTimer;p=c.prototype;
    d(DateTimer, "instance"
        ,function () {
            if (!DateTimer._instance) {
                DateTimer._instance = new DateTimer();
            }
            return DateTimer._instance;
        }
    );
    /**
     * TODO 同步服务器时间
     * @param val
     */
    p.updateServerTime = function (val) {
        this._deltaTime = Date.now() - val;
    };
    d(p, "now"
        /**
         * 获取当前服务器时间
         */
        ,function () {
            return Date.now() - this._deltaTime;
        }
    );
    p.run = function () {
        //TODO 网络同步
        //this.runSyncTicker();
        this.run1sTicker();
    };
    /**
     * 启动同步数据的计时器
     */
    p.runSyncTicker = function () {
        var timer = new egret.Timer(15000);
        timer.addEventListener(egret.TimerEvent.TIMER, this.onSyncTimer, this);
        timer.start();
    };
    /**
     * 启动1s计时器
     */
    p.run1sTicker = function () {
        var timer = new egret.Timer(1000);
        timer.addEventListener(egret.TimerEvent.TIMER, this.onOneSecondTimer, this);
        timer.start();
    };
    p.onSyncTimer = function () {
        Player.instance.saveToNet();
    };
    p.onOneSecondTimer = function () {
        //刷新建筑cd
        Player.instance.updateBuildQueue();
        //自动产出资源
        Player.instance.autoOutputResource();
    };
    return DateTimer;
})();
egret.registerClass(DateTimer,"DateTimer");
