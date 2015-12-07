/**
 * 1s时间定时器管理
 */
class OneTimerTicker {
    /**
     * 可更新目标集合
     * @type {Array}
     */
    private allUpdateObjArr:IUpdate[] = [];

    private static _instance:OneTimerTicker;

    public constructor() {
        if (OneTimerTicker._instance) {
            throw new Error("OneTimerTicker使用单例");
        }
    }

    public static get instance():OneTimerTicker {
        if (!OneTimerTicker._instance) {
            OneTimerTicker._instance = new OneTimerTicker();
        }
        return OneTimerTicker._instance;
    }

    public add(target:IUpdate) {
        if (!Util.isElinArr(target, this.allUpdateObjArr)) {
            this.allUpdateObjArr.push(target);
        }
    }

    public remove(target:IUpdate) {
        var len = this.allUpdateObjArr.length;
        for (var i = 0; i < len; i++) {
            if (target == this.allUpdateObjArr[i]) {
                this.allUpdateObjArr.splice(i, 1);
            }
        }
    }

    public update() {
        var len = this.allUpdateObjArr.length;
        for (var i = 0; i < len; i++) {
            this.allUpdateObjArr[i].update();
        }
    }
}