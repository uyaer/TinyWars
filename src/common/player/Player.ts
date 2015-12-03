/**
 * 玩家数据
 */
class Player {
    private static _instance:Player;

    public constructor() {
        if (Player._instance) {
            throw new Error("Player使用单例");
        }
    }

    public static get instance():Player {
        if (!Player._instance) {
            Player._instance = new Player();
        }
        return Player._instance;
    }

    /**
     * 最大建造按钮索引
     * @type {number}
     */
    public buildNumberIndex:number = 0;

    /**
     * 获取最大建造数量
     * @returns {number}
     */
    public get buildMax() {
        return Math.pow(10, this.buildNumberIndex);
    }


    private _vo:UserVo = new UserVo();
    public get vo() {
        return this._vo;
    }

    public dealLoginSuccess(data) {
        this._vo.resource.reset(data["resource"]);
        this._vo.building.reset(data["building"]);
    }

    /**
     * 网络保存
     */
    public saveToNet() {
        UserNet.instance.save(JSON.stringify(this._vo));
    }

    /**
     * 获取资源数量
     * @param type
     * @returns {number}
     */
    public getResourceCount(type:number):number {
        return this._vo.resource.get(type) || 0;
    }

    /**
     * 添加资源数量 (也可能是减少)
     * @param type
     * @returns {number}
     */
    public addResourceCount(type:number, num:number) {
        var count:number = this._vo.resource.get(type) || 0;
        this._vo.resource.set(type, count + num);
        EventManager.instance.dispatch(EventName.RESOURCE_CHANGE, [type]);
    }

    /**
     * 避免过多事件，所以批量更新资源数据
     * @param types
     * @param numArr
     */
    public addResourceCountBatch(types:number[], numArr:number[]) {
        if (types.length != numArr.length) {
            throw new Error("数量不匹配");
        }
        for (var i = 0; i < types.length; i++) {
            var type = types[i];
            var num = numArr[i];
            var count:number = this._vo.resource.get(type) || 0;
            this._vo.resource.set(type, count + num);
        }
        EventManager.instance.dispatch(EventName.RESOURCE_CHANGE, types);
    }

    /**
     * 点击资源可以获得的数量
     * //TODO 登录后需要根据科技来刷新值
     * @type {number}
     */
    public clickResCount:number = 1;

    /**
     * 资源增加速率
     * @type {HashMap<number, number>}
     */
    private resourceAddRate:HashMap<number,number> = new HashMap<number,number>();

    /**
     * 计算资源增加速率
     */
    public calResourceAddRate() {

    }

    /**
     * 获取某一资源的增加速率
     * @param type
     * @returns {number}
     */
    public getResourceAddRate(type:number) {
        return this.resourceAddRate.get(type) || 0;
    }
}