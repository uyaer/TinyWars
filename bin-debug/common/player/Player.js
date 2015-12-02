/**
 * 玩家数据
 */
var Player = (function () {
    function Player() {
        this._vo = new UserVo();
        /**
         * 点击资源可以获得的数量
         * //TODO 登录后需要根据科技来刷新值
         * @type {number}
         */
        this.clickResCount = 1;
        /**
         * 资源增加速率
         * @type {HashMap<number, number>}
         */
        this.resourceAddRate = new HashMap();
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
        this._vo.resource.reset(data["resource"]);
        this._vo.building.reset(data["building"]);
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
    /**
     * 添加资源数量 (也可能是减少)
     * @param type
     * @returns {number}
     */
    p.addResourceCount = function (type, num) {
        var count = this._vo.resource.get(type) || 0;
        this._vo.resource.set(type, count + num);
    };
    /**
     * 计算资源增加速率
     */
    p.calResourceAddRate = function () {
    };
    /**
     * 获取某一资源的增加速率
     * @param type
     * @returns {number}
     */
    p.getResourceAddRate = function (type) {
        return this.resourceAddRate.get(type) || 0;
    };
    return Player;
})();
egret.registerClass(Player,"Player");
