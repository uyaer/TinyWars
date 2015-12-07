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
        if (num < 10000) {
            return num + "";
        }
        else {
            num /= 1000;
            return num.toFixed(1) + "K";
        }
    };
    /**
     * 元素是否包含在Array里
     * @param el
     * @param arr
     * @returns {boolean}
     */
    Util.isElinArr = function (el, arr) {
        return arr.indexOf(el) > -1;
    };
    /**
     * 2个Array是否有相交元素
     * @param arr1
     * @param arr2
     */
    Util.isArrCrossing = function (arr1, arr2) {
        for (var i = 0; i < arr1.length; i++) {
            if (Util.isElinArr(arr1[i], arr2)) {
                return true;
            }
        }
        return false;
    };
    return Util;
})();
egret.registerClass(Util,"Util");
