class ResBuildingItem extends BuildingItemBase {
    public constructor(type) {
        super(type);

        this.skinName = new ResBuildingItemSkin();
    }

    protected createChildren() {
        super.createChildren();

    }

    /**
     * @override
     */
    protected updateView(){
        super.updateView();

        var num:number = Player.instance.getResourceAddRate(this.vo.pValueId);
        this.effectTF.text = num + "/s";
    }
}