class WarBuildingItem extends BuildingItemBase {
    public constructor(type) {
        super(type);

        this.skinName = new WarBuildingItemSkin();
    }

    /**
     * @override
     */
    protected updateView(){
        super.updateView();
//TODO 士兵的存储空间
        //var num:number = Player.instance.getResourceCapacity(this.vo.pValueId);
        //this.effectTF.text = "存储上限:" + Util.getBigNumberShow(num);
    }
}