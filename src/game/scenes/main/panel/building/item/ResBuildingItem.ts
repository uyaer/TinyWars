class ResBuildingItem extends BuildingItemBase {
    public constructor(type) {
        super(type);

        this.skinName = new ResBuildingItemSkin();
    }

    protected createChildren() {
        super.createChildren();
        var num:number = Player.instance.vo.building.get(this.type, 0) * this.vo.value;
        //TODO 有加成的哦
        this.effectTF.text = Util.getBigNumberShow(num) + "/s";
    }
}