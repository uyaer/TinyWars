class Util {

    /**
     * 获取从min-max之间的值
     * @param min
     * @param max
     */
    public static rang(min:number, max:number):number {
        return Math.round(Math.random() * (max - min) + min);
    }

    /**
     * 判断是否在范围
     * @param val
     * @param min
     * @param max
     * @returns {boolean}
     */
    public static isRang(val:number, min:number, max:number):boolean {
        return val >= min && val <= max;
    }

    /**
     * 将val的值限制起来
     * @param val
     * @param min
     * @param max
     * @returns {number}
     */
    public static limit(val:number, min:number, max:number):number {
        return Math.max(min, Math.min(max, val));
    }

    /**
     * 角度转化弧度
     * @param val
     */
    public static ang2rad(val:number):number {
        return val / 180 * Math.PI;
    }

    /**
     * 弧度转化角度
     * @param val
     */
    public static rad2ang(val:number):number {
        return val / Math.PI * 180;
    }

    /**
     * 返回大数据的显示方式
     * @param num
     * @returns {string}
     */
    static getBigNumberShow(num:number):string {
        if (num < 10000) {
            return num + "";
        } else {
            num /= 1000;
            return num.toFixed(1) + "K";
        }
    }

    /**
     * 时间格式化
     * @param num (毫秒)
     * @returns {string}
     */
    static getBigTimeShow(num:number):string {
        var s = Math.round(num / 1000);
        if (s > 3600) {
            var h = int(s / 3600);
            s = s % 3600;
            var m = Math.round(s / 60);
            return h + "H" + m + "M";
        } else if (s > 60) {
            var m = int(s / 60);
            s = s % 60;
            return m + "M" + s + "S";
        } else {
            return s + "S";
        }
    }

    /**
     * 元素是否包含在Array里
     * @param el
     * @param arr
     * @returns {boolean}
     */
    static isElinArr(el:any, arr:any[]) {
        return arr.indexOf(el) > -1;
    }

    /**
     * 2个Array是否有相交元素
     * @param arr1
     * @param arr2
     */
    static isArrCrossing(arr1:any[], arr2:any[]) {
        for (var i = 0; i < arr1.length; i++) {
            if (Util.isElinArr(arr1[i], arr2)) {
                return true;
            }
        }
        return false;
    }
}