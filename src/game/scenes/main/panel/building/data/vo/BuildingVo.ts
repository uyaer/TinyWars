class BuildingVo {
    /**
     * id
     */
    id:number;
    /**
     * 名称
     */
    name:string;
    /**
     * 秒杀
     */
    desc:string;
    /**
     * 建筑类型
     */
    stype:number;
    /**
     * 效果值
     */
    value:number;
    /**
     * 升级消耗公式
     */
    cost:BuildingCostVo[];
    /**
     * 升级1级所需时间
     */
    cd_time:number;
    /**
     * 获得经验
     */
    exp:number;
    /**
     * ？？？
     */
    rate:number;
    /**
     * 消耗道具id的数组
     */
    costIdArr:number[];

    public constructor(obj) {
        this.id = obj["id"];
        this.name = obj["name"];
        this.desc = obj["desc"];
        this.stype = obj["stype"];
        this.value = obj["value"];
        this.cost = this.getCost(obj["cost"]);
        this.cd_time = obj["cd_time"];
        this.exp = obj["exp"];
        this.rate = obj["rate"];
    }

    private getCost(arr:any[]):BuildingCostVo[] {
        var costArr:BuildingCostVo[] = [];
        this.costIdArr = [];
        for (var i = 0; i < arr.length; i++) {
            var vo = new BuildingCostVo(arr[i], this.id);
            costArr.push(vo);
            this.costIdArr.push(vo.propId);
        }
        return costArr;
    }
}


/**
 * 建筑里的消耗
 * [{"prop":104,"par1":400,"par2":-200,"par3":0},{"prop":105,"par1":400,"par2":-200,"par3":0}]
 */
class BuildingCostVo {
    /**资源id**/
    propId:number;
    private par1:number;
    private par2:number;
    private par3:number;
    /**
     * 建筑你类型
     */
    private buildType:number;

    public constructor(obj, type) {
        this.buildType = type;
        this.propId = obj["prop"];
        this.par1 = obj["par1"];
        this.par2 = obj["par2"];
        this.par3 = obj["par3"];
    }

    public getCount(level?:number):number {
        //TODO 根据公式计算需要材料的数量
        if (!level) {
            level = Player.instance.vo.building.get(this.buildType, 0);
        }

        return 1;
    }
}