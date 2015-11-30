/**
 * 用户各种数据
 */
var UserVo = (function () {
    function UserVo() {
        /****食物****/
        this.food = 0;
        /****木头****/
        this.wood = 0;
        /****石头****/
        this.stone = 0;
        /****龙晶****/
        this.crystal = 0;
        /****皮革****/
        this.fur = 0;
        /****马匹****/
        this.horse = 0;
        /****金属****/
        this.metal = 0;
        /****金币****/
        this.gold = 0;
        /****奖杯****/
        this.cup = 0;
        /****神石****/
        this.gem = 0;
        /****** 建筑 *******/
        this.building = new HashMap();
    }
    var d = __define,c=UserVo;p=c.prototype;
    return UserVo;
})();
egret.registerClass(UserVo,"UserVo");
