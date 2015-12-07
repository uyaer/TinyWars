/**
 * 建筑队列结构
 */
class BuildQueueVo {
    /**
     * 模块
     */
    module:number;
    /**
     * 子类id
     */
    id:number;
    /**
     * 开始时间
     */
    startTime:number;
    /**
     * 结束时间
     */
    endTime:number;
    /**
     * 增加的数量
     */
    value:number;

    public constructor(module:any, id?:number, startTime?:number, endTime?:number, value?:number) {
        if (arguments.length == 1) {
            var obj = module;
            this.module = obj["module"];
            this.id = obj["id"];
            this.startTime = obj["startTime"];
            this.endTime = obj["endTime"];
            this.value = obj["value"];
        } else {
            this.module = module;
            this.id = id;
            this.startTime = startTime;
            this.endTime = endTime;
            this.value = value;
        }
    }

    /**
     * 获取总共需要的时间
     * @returns {number}
     */
    public get totalTime() {
        return this.endTime - this.startTime;
    }

    /**
     *  过去的时间
     * @returns {number}
     */
    public get pastTime() {
        return DateTimer.instance.now - this.startTime;
    }

    /**
     * 剩余的时间
     * @returns {number}
     */
    public get needTime() {
        return this.endTime - DateTimer.instance.now;
    }
}