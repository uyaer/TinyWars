/**
 * 士兵item
 */
class WarItem extends BuildItemBase {
    protected vo:ArmyVo;

    private costItemArr:CostResItem[];

    /**
     * @param type 士兵资源id
     */
    public constructor(type) {
        super(type);

        this.vo = ArmyDataManager.instance.getArmyVo(type);

        this.skinName = new WarItemSkin();
    }

    private numTF:eui.Label;

    /**
     * @override
     */
    protected createChildren() {
        super.createChildren();

        this.icon.source = this.vo.icon;
        this.nameTF.text = this.vo.name;
        this.descTF.text = "战斗力：" + this.vo.power;

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
        var qvo:BuildQueueVo = Player.instance.getBuildQueue(GameModule.WAR, this.type);
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
        var value = ArmyDataManager.instance.armyCanCreateNumber.get(this.type, 1);
        var qvo:BuildQueueVo = Player.instance.addBuidQueue(GameModule.WAR, this.vo.id, cd, value, cd > 1000);
        if (qvo) {
            // 建筑按钮状态
            this.addBuildProgress(qvo);
        } else {
            this.updateView();
        }

        var costValue:number[] = [];
        for (var i = 0; i < this.vo.cost.length; i++) {
            costValue.push(-value * this.vo.cost[i].costNum);
        }

        //扣除资源
        Player.instance.addResourceCountBatch(this.vo.costIdArr, costValue);
    }

    /**
     * 当资源有变化当时候
     * @override
     */
    protected onResourceChange(e:egret.Event) {
        var types:number[] = e.data;
        //只有包含消耗资源变化的时候才进行刷新
        if (Util.isArrCrossing(types, this.vo.costIdArr)) {
            //计算数据
            ArmyDataManager.instance.refreshCost();
            //更新显示
            this.updateBuildNumber();
        }
    }

    /**
     * 更新可以建筑的等级次数
     * @override
     */
    public updateBuildNumber() {
        // 计算最大值
        var maxNum:number = ArmyDataManager.instance.armyCanCreateNumber.get(this.type, 1);
        var isCanUp:boolean = ArmyDataManager.instance.armyIsCanCreate.get(this.type);

        //update View
        this.buildBtn.label = "+" + maxNum;
        this.buildBtn.enabled = isCanUp;

        //cost item
        if (this.costItemArr) {
            var left:number = 0;
            for (var i = 0; i < this.vo.cost.length; i++) {
                var cvo:ResourceCostVo = this.vo.cost[i];
                var item = this.costItemArr[i];
                item.updateView(cvo.costNum * maxNum);
                item.x = left;
                left += item.width + 10;
            }
        }
    }

    /**
     * @override
     */
    protected updateView() {
        super.updateView();

        var maxNum = Player.instance.getResourceCapacity(this.type);
        var num = Player.instance.getResourceCount(this.type);
        this.effectTF.text = "上限：" + maxNum;
        if (num < maxNum) {
            this.effectTF.textColor = 0xFFFFFF;
        } else {
            this.effectTF.textColor = Const.RED;
        }

        this.numTF.text = Util.getBigNumberShow(Player.instance.getResourceCount(this.type));
    }
}