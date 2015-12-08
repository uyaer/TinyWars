class TechnologyVo {
    id:number;
    name:string;
    private _icon:string;
    desc:string;
    /**
     * 小类的关联
     */
    next_id:number;
    /**
     * 大类的关联
     */
    condi:number;
    /**
     * 分类id
     */
    ptype:number;
    /**
     * 效果对应的id
     */
    pValueId:number;
    /**
     * 效果值
     */
    value:number;
    /**
     * 倒计时
     */
    cd_time:number;
    /**
     * 能够获得经验
     */
    exp:number;
    /**
     * 道具的消耗
     */
    cost:ResourceCostVo[];
    /**
     * 道具的消耗id数组
     */
    costIdArr:number[];
    /**
     * 道具的消耗数量数组
     */
    costCacheValue:number[];

    public constructor(obj) {
        this.id = obj["id"];
        this.name = obj["name"];
        this._icon = obj["icon"];
        this.desc = obj["desc"];
        this.next_id = obj["next_id"];
        this.condi = obj["condi"];
        this.cost = this.getCost(obj["cost"]);
        this.ptype = obj["ptype"];
        this.pValueId = obj["pValueId"];
        this.value = obj["value"];
        this.cd_time = obj["cd_time"];
        this.exp = obj["exp"];
    }

    private getCost(cost):ResourceCostVo[] {
        var arr:ResourceCostVo[] = [];
        this.costIdArr = [];
        this.costCacheValue = [];
        for (var i = 0; i < cost.length; i++) {
            var data = cost[i];
            var cvo:ResourceCostVo = new ResourceCostVo(data["prop"], data["num"]);
            arr.push(cvo);
            this.costIdArr.push(cvo.propId);
            this.costCacheValue.push(cvo.costNum);
        }

        return arr;
    }

    public get icon() {
        return "resource/assets/icon/technology/" + this._icon;
    }
}