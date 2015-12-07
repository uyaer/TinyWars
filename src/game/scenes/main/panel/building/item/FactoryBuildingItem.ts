class FactoryBuildingItem extends BuildingItemBase {
    public constructor(type:number) {
        super(type);

        this.skinName = new FactoryBuildingItemSkin();
    }

    private effectDescTF:eui.Label;
    private openBtn:eui.ToggleButton;

    protected createChildren() {
        super.createChildren();

        this.effectDescTF.text = this.vo.eff_desc;

        //开放状态
        this.openBtn.selected = Player.instance.vo.factory.get(this.type, false);

        this.openBtn.addEventListener(egret.Event.CHANGE, this.onOpenBarClick, this);
    }

    private onOpenBarClick() {
        var flag:boolean = this.openBtn.selected;
        Player.instance.changeFactoryOpenState(this.type, flag);
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