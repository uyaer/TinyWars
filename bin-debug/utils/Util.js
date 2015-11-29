var Util = (function () {
    function Util() {
    }
    var d = __define,c=Util;p=c.prototype;
    /**
     * 获取从min-max之间的值
     * @param min
     * @param max
     */
    Util.rang = function (min, max) {
        return Math.round(Math.random() * (max - min) + min);
    };
    /**
     * 判断是否在范围
     * @param val
     * @param min
     * @param max
     * @returns {boolean}
     */
    Util.isRang = function (val, min, max) {
        return val >= min && val <= max;
    };
    /**
     * 将val的值限制起来
     * @param val
     * @param min
     * @param max
     * @returns {number}
     */
    Util.limit = function (val, min, max) {
        return Math.max(min, Math.min(max, val));
    };
    /**
     * 角度转化弧度
     * @param val
     */
    Util.ang2rad = function (val) {
        return val / 180 * Math.PI;
    };
    /**
     * 弧度转化角度
     * @param val
     */
    Util.rad2ang = function (val) {
        return val / Math.PI * 180;
    };
    /**
     * 返回大数据的显示方式
     * @param num
     * @returns {string}
     */
    Util.getBigNumberShow = function (num) {
        if (num < 1000) {
            return num + "";
        }
        else if (num < 10000) {
            num /= 1000;
            return num.toFixed(2) + " K";
        }
        else if (num < 10000000) {
            num /= 10000;
            return num.toFixed(2) + " W";
        }
        else {
            num /= 10000000;
            return num.toFixed(2) + " KW";
        }
    };
    return Util;
})();
egret.registerClass(Util,"Util");
