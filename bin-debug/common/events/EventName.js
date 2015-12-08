var EventName = (function () {
    function EventName() {
    }
    var d = __define,c=EventName;p=c.prototype;
    /**
     * 金币改变
     * @type {string}
     */
    EventName.RESOURCE_CHANGE = "resource_change";
    /**
     * 科技改变
     * @type {string}
     */
    EventName.TECHNOLOGY_CHANGE = "technology_change";
    return EventName;
})();
egret.registerClass(EventName,"EventName");
