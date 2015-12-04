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
     * 消耗比例
     */
    rate:number;
    /**
     * 效果描述
     */
    eff_desc:string;
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
        this.eff_desc = obj["eff_desc"];
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
