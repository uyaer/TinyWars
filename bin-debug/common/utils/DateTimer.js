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
     * 同步服务器时间
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
    /**
     * 启动同步数据的计时器
     */
    p.runSyncTicker = function () {
        var timer = new egret.Timer(15000);
        timer.addEventListener(egret.TimerEvent.TIMER, this.onSyncTimer, this);
        timer.start();
    };
    p.onSyncTimer = function () {
        Player.instance.saveToNet();
    };
    return DateTimer;
})();
egret.registerClass(DateTimer,"DateTimer");
