var EventName = (function () {
    function EventName() {
    }
    var d = __define,c=EventName;p=c.prototype;
    /**
     * pick击打完成一个周期
     * @type {string}
     */
    EventName.PICK_HURT_OK = "pick_hurt_ok";
    /**
     * 应该要切换地图了
     * @type {string}
     */
    EventName.MAP_CHANGE = "map_change";
    /**
     * 金币改变
     * @type {string}
     */
    EventName.COIN_CHANGE = "coin_change";
    /**
     * 金币增加速率改变
     * @type {string}
     */
    EventName.ADD_COIN_RATE_CHANGE = "add_coin_rate_change";
    /**
     * 宝石
     * @type {string}
     */
    EventName.GEM_CHANGE = "gem_change";
    /**
     * 铁锤等级提升
     * @type {string}
     */
    EventName.PICK_LEVEL_UP = "pick_level_up";
    return EventName;
})();
egret.registerClass(EventName,"EventName");
