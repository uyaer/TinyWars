/**
 * 用户各种数据 (专门用于服务器数据同步)
 */
var UserVo = (function () {
    function UserVo() {
        /****** 资源 *******/
        this.resource = new HashMap();
        /****** 建筑 *******/
        this.building = new HashMap();
        /****** 工厂开工情况(key是工厂id) *******/
        this.factory = new HashMap();
        /****** 已经升级了的科技 *******/
        this.technology = [];
        /****** 建筑队列 *******/
        this.buildQueue = [];
    }
    var d = __define,c=UserVo;p=c.prototype;
    return UserVo;
})();
egret.registerClass(UserVo,"UserVo");
