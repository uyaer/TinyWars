var HashMap = (function () {
    function HashMap() {
        this.data = {};
    }
    var d = __define,c=HashMap;p=c.prototype;
    p.set = function (K, V) {
        this.data[K] = V;
    };
    p.get = function (K) {
        return this.data[K];
    };
    p.has = function (K) {
        return this.data.hasOwnProperty(K);
    };
    p.keys = function () {
        var arr = [];
        for (var key in this.data) {
            arr.push(key);
        }
        return arr;
    };
    return HashMap;
})();
egret.registerClass(HashMap,"HashMap");
