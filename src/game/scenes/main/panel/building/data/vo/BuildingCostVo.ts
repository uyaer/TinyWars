
/**
 * 建筑里的消耗
 * [{"prop":104,"par1":400,"par2":-200,"par3":0},{"prop":105,"par1":400,"par2":-200,"par3":0}]
 */
class BuildingCostVo {
    /**资源id**/
    public propId:number;
    public par1:number;
    public par2:number;
    public par3:number;
    /**
     * 建筑你类型
     */
    private buildType:number;
    /**
     * 缓存消耗的数量
     * @type {number}
     */
    public cacheCostCount:number = 0;

    public constructor(obj, type) {
        this.buildType = type;
        this.propId = obj["prop"];
        this.par1 = obj["par1"];
        this.par2 = obj["par2"];
        this.par3 = obj["par3"];
    }

}