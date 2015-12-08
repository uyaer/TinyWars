/**
 * 资源消耗结构体
 */
class ResourceCostVo {
    /**
     * 升级需要的道具id
     */
    propId:number;
    /**
     * 升级需要的数量
     */
    costNum:number;

    public constructor(id:number, num:number) {
        this.propId = id;
        this.costNum = num;
    }


}