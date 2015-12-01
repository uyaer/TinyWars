/**
 * 玩家数据
 */
var Player = (function () {
    function Player() {
        this._vo = new UserVo();
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
        this._vo.resource.parse(data["resource"]);
        this._vo.building.parse(data["building"]);
    };
    /**
     * 网络保存
     */
    p.saveToNet = function () {
        UserNet.instance.save(JSON.stringify(this._vo));
    };
    /**
     * 获取资源数量
     * @param type
     * @returns {number}
     */
    p.getResourceCount = function (type) {
        return this._vo.resource.get(type) || 0;
    };
    return Player;
})();
egret.registerClass(Player,"Player");
