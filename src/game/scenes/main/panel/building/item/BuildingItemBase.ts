class BuildingItemBase extends BuildItemBase {
    private vo:BuildingVo;

    public constructor(type) {
        super(type);

        this.buildMax = Player.instance.buildMax;
        this.fixedMax = false;

        this.vo = BuildingDataManager.instance.buildingDataBaseMap.get(type);
    }


    protected createChildren() {
        super.createChildren();

        this.icon.source = "building_icon_" + this.type + "_png";
        this.nameTF.text = this.vo.name;
        this.descTF.text = this.vo.desc;
        this.lvTF.text = "Lv." + Player.instance.vo.building.get(this.type);
    }

    /**
     * 当资源有变化当时候
     */
    protected onResourceChange(e:egret.Event) {
        var types:number[] = e.data;
        if (Util.isArrCrossing(types, this.vo.costIdArr)) {
            this.updateBuildNumber();
        }
    }

    /**
     * 更新可以建筑的等级次数
     */
    protected updateBuildNumber() {
        if (this.fixedMax)return;
        // 计算最大值
        var maxNum:number = this.buildMax;
        for (var i = 0; i < this.vo.cost.length; i++) {
            var cvo:BuildingCostVo = this.vo.cost[i];
            var hasNum:number = Player.instance.getResourceCount(cvo.propId);
            var costNum:number = cvo.getCount();
            var num:number = int(hasNum / costNum);
            if (num < maxNum) {
                maxNum = num;
            }
        }

        //update View
        this.buildBtn.label = "+" + maxNum;
    }

}