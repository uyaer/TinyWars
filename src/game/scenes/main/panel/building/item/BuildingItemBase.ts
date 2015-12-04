class BuildingItemBase extends BuildItemBase {
    protected vo:BuildingVo;

    private costItemArr:CostResItem[];

    public constructor(type) {
        super(type);

        this.fixedMax = false;

        this.vo = BuildingDataManager.instance.buildingDataBaseMap.get(type);
    }


    protected createChildren() {
        super.createChildren();

        this.icon.source = "building_icon_" + this.type + "_png";
        this.nameTF.text = this.vo.name;
        this.descTF.text = this.vo.desc;
        this.lvTF.text = "Lv." + Player.instance.vo.building.get(this.type, 0);

        //cost
        this.costItemArr = [];
        var left = 0;
        for (var i = 0; i < this.vo.cost.length; i++) {
            var cvo:BuildingCostVo = this.vo.cost[i];
            var item:CostResItem = new CostResItem(cvo.propId);
            item.updateView(cvo.cacheCostCount);
            item.x = left;
            left += item.width + 10;
            this.costGroup.addChild(item);
            this.costItemArr.push(item);
        }
    }

    /**
     * 当资源有变化当时候
     */
    protected onResourceChange(e:egret.Event) {
        var types:number[] = e.data;
        if (Util.isArrCrossing(types, this.vo.costIdArr)) {
            //计算数据
            BuildingDataManager.instance.refreshCost();
            //更新显示
            this.updateBuildNumber();
        }
    }

    /**
     * 更新可以建筑的等级次数
     */
    public updateBuildNumber() {
        if (this.fixedMax)return;
        // 计算最大值
        var maxNum:number = BuildingDataManager.instance.buildingCanUpLevel.get(this.type, 1);
        var isCanUp:boolean = BuildingDataManager.instance.buildingIsCanUpLevel.get(this.type);

        //update View
        this.buildBtn.label = "+" + maxNum;
        this.buildBtn.enabled = isCanUp;

        //cost item
        if (this.costItemArr) {
            for (var i = 0; i < this.vo.cost.length; i++) {
                var cvo:BuildingCostVo = this.vo.cost[i];
                var item = this.costItemArr[i];
                item.updateView(cvo.cacheCostCount);
            }
        }
    }

}