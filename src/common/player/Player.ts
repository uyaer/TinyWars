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