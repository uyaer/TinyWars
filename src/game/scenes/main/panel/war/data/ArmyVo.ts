class ArmyVo {
    /**
     * baseId
     */
    id:number;
    /**
     * 等级
     */
    level:number;
    /**
     * 名称
     */
    name:string;
    /**
     * 图标
     */
    private _icon:string;
    /**
     * 死亡概率
     */
    die_rate:number;
    /**
     * 攻击力
     */
    power:number;
    /**
     * 消耗
     */
    cost:ResourceCostVo[];
    /**
     * 升级时间(s)
     */
    cd_time:number;
    /**
     * 获得的经验
     */
    exp:number;
    /**
     * 消耗道具id的数组
     */
    costIdArr:number[];

    public constructor(obj) {
        this.id = obj["id"];
        this.name = obj["name"];
        this._icon = obj["icon"];
        this.level = obj["level"];
        this.power = obj["power"];
        this.die_rate = obj["die_rate"];
        this.cost = this.getCost(obj["cost"]);
        this.cd_time = obj["cd_time"];
        this.exp = obj["exp"];
    }

    private getCost(cost):ResourceCostVo[] {
        var arr:ResourceCostVo[] = [];
        this.costIdArr = [];
        for (var i = 0; i < cost.length; i++) {
            var data = cost[i];
            var cvo:ResourceCostVo = new ResourceCostVo(data["prop"], data["num"]);
            arr.push(cvo);
            this.costIdArr.push(cvo.propId);
        }

        return arr;
    }

    public get icon() {
        return "resource/assets/icon/army/" + this._icon;
    }
}