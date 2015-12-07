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
        var num:number = Player.instance.vo.building.get(this.type, 0) * this.vo.value;
        //TODO 有加成的哦
        this.effectTF.text = Util.getBigNumberShow(num) + "/s";

        //开放状态
        this.openBtn.selected = Player.instance.vo.factory.get(this.type, false);

        this.openBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onOpenBarClick, this);
    }

    private onOpenBarClick() {
        var flag:boolean = !this.openBtn.selected;
        this.openBtn.selected = flag;
        Player.instance.changeFactoryOpenState(this.type, flag);
    }
}