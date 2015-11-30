/**
 * 玩家数据
 */
var Player = (function () {
    function Player() {
        if (Player._instance) {
            throw new Error("Player使用单例");
        }
    }
    var d = __define,c=Player;p=c.prototype;
    d(Player, "instance"
        ,function () {
            if (!Player._instance) {
                Player._instance = new Player();
            }
            return Player._instance;
        }
    );
    d(p, "vo"
        ,function () {
            return this._vo;
        }
    );
    p.dealLoginSuccess = function (data) {
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
    };
    /**
     * 网络保存
     */
    p.saveToNet = function () {
        UserNet.instance.save(JSON.stringify(this._vo));
    };
    return Player;
})();
egret.registerClass(Player,"Player");
