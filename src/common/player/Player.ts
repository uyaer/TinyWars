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
        this._vo.resource.parse(data["resource"]);
        this._vo.building.parse(data["building"]);
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
}