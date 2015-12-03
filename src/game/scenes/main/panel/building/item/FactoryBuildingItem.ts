class FactoryBuildingItem extends BuildingItemBase {
    public constructor(type:number) {
        super(type);

        this.skinName = new FactoryBuildingItemSkin();
    }

    private effectDescTF:eui.Label;

    protected createChildren() {
        super.createChildren();

        this.effectDescTF.text = this.vo.eff_desc;
        var num:number = Player.instance.vo.building.get(this.type, 0) * this.vo.value;
        //TODO 有加成的哦
        this.effectTF.text = Util.getBigNumberShow(num) + "/s";
    }
}