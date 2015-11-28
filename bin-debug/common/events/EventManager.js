var EventManager = (function (_super) {
    __extends(EventManager, _super);
    function EventManager() {
        _super.apply(this, arguments);
    }
    var d = __define,c=EventManager;p=c.prototype;
    d(EventManager, "instance"
        ,function () {
            if (!EventManager._instance) {
                EventManager._instance = new EventManager();
            }
            return EventManager._instance;
        }
    );
    p.addEvent = function (type, callback, targetObj) {
        this.addEventListener(type, callback, targetObj);
    };
    p.removeEvent = function (type, callback, targetObj) {
        this.removeEventListener(type, callback, targetObj);
    };
    p.dispatch = function (type, data) {
        if (data === void 0) { data = null; }
        this.dispatchEventWith(type, false, data);
    };
    return EventManager;
})(egret.EventDispatcher);
egret.registerClass(EventManager,"EventManager");
