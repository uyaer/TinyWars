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

    private _vo:UserVo;
    private get vo() {
        return this._vo;
    }

    public dealLoginSuccess(data) {
        this._vo = new UserVo();
        this._vo.food = data["food"];
        this._vo.wood = data["wood"];
        this._vo.stone = data["stone"];
        this._vo.crystal = data["crystal"];
        this._vo.fur = data["fur"];
        this._vo.horse = data["horse"];
        this._vo.metal = data["metal"];
        this._vo.cup = data["cup"];
        this._vo.gold = data["gold"];
        this._vo.gem = data["gem"];
        this._vo.building.parse(data["building"]);
    }

    /**
     * 网络保存
     */
    public saveToNet() {
        UserNet.instance.save(JSON.stringify(this._vo));
    }
}