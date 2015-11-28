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
    public static  limit(val:number, min:number, max:number):number {
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
        if (num < 1000) {
            return num + "";
        } else if (num < 10000) {
            num /= 1000;
            return num.toFixed(2) + " K";
        } else if (num < 10000000) {
            num /= 10000;
            return num.toFixed(2) + " W";
        } else {
            num /= 10000000;
            return num.toFixed(2) + " KW";
        }
    }
}