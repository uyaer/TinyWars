class StoreBuildingItem extends BuildingItemBase {
    public constructor(type) {
        super(type);

        this.skinName = new StoreBuildingItemSkin();
    }


    protected createChildren() {
        super.createChildren();

        var num:number = (Player.instance.vo.building.get(this.type, 0) + 1) * this.vo.value;
        this.effectTF.text = "存储上限:"+Util.getBigNumberShow(num);
    }
}