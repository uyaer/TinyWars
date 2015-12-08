class TechnologyItem extends BuildItemBase {
    protected vo:TechnologyVo;

    private costItemArr:CostResItem[];

    public constructor(type) {
        super(type);

        this.vo = TechnologyDataManager.instance.technologyDataBaseMap.get(type);

        this.skinName = new TechnologyItemSkin();
    }

    /**
     * @override
     */
    protected createChildren() {
        super.createChildren();

        this.icon.source = this.vo.icon;
        this.nameTF.text = this.vo.name;
        this.descTF.text = this.vo.desc;
        this.effectTF.x = this.descTF.x + this.descTF.width + 10;
        var val = this.vo.value;
        if (val > 0) {
            if (val < 1) {
                this.effectTF.text = "+" + (val * 100) + "%";
            } else {
                this.effectTF.text = "+" + val;
            }
        } else {
            this.effectTF.text = "";
        }

        //cost
        this.costItemArr = [];
        var left = 0;
        for (var i = 0; i < this.vo.cost.length; i++) {
            var cvo:ResourceCostVo = this.vo.cost[i];
            var item:CostResItem = new CostResItem(cvo.propId, true);
            item.updateView(cvo.costNum);
            item.x = left;
            left += item.width + 10;
            this.costGroup.addChild(item);
            this.costItemArr.push(item);
        }

        this.updateBuildNumber();

        //查询是否有建造队列
        var qvo:BuildQueueVo = Player.instance.getBuildQueue(GameModule.TECHNOLOGY, this.type);
        if (qvo && qvo.needTime > 1000) { //存在建造队列,并且
            this.addBuildProgress(qvo);
        }
    }

    /**
     * @override
     */
    protected onBuildClick() {
        //建造数量
        var cd = this.vo.cd_time * 1000;
        var qvo:BuildQueueVo = Player.instance.addBuidQueue(GameModule.TECHNOLOGY, this.vo.id, cd, 1, true);
        if (qvo) {
            // 建筑按钮状态
            this.addBuildProgress(qvo);
        }

        //扣除资源
        Player.instance.addResourceCountBatch(this.vo.costIdArr, this.vo.costCacheValue);
    }

    /**
     * 当资源有变化当时候
     * @override
     */
    protected onResourceChange(e:egret.Event) {
        var types:number[] = e.data;
        //只有包含消耗资源变化的时候才进行刷新
        if (Util.isArrCrossing(types, this.vo.costIdArr)) {
            //更新显示
            this.updateBuildNumber();
        }
    }

    /**
     * 更新可以建筑的等级次数
     * @override
     */
    public updateBuildNumber() {
        var isCanUp:boolean = true;
        //cost item
        if (this.costItemArr) {
            var left:number = 0;
            for (var i = 0; i < this.vo.cost.length; i++) {
                var cvo:ResourceCostVo = this.vo.cost[i];
                var hasNum:number = Player.instance.getResourceCount(cvo.propId);
                var item = this.costItemArr[i];
                item.updateView(cvo.costNum);
                item.x = left;
                left += item.width + 10;
                if (hasNum < cvo.costNum) {
                    isCanUp = false;
                }
            }

            //update View
            this.buildBtn.enabled = isCanUp;
        }
    }

}