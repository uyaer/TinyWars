class CostResItem extends eui.Component {
    public resType:number;
    public num:number = -1;

    public constructor(resType:number) {
        super();

        this.resType = resType;

        this.skinName = new CostResItemSkin();
    }

    private numTF:eui.Label;
    private icon:eui.Image;

    protected createChildren() {
        super.createChildren();

        if (this.num > 0) {
            this.updateView(this.num);
        }
    }

    public updateView(num:number) {
        this.num = num;
        if (this.numTF) {
            this.numTF.text = "-" + Util.getBigNumberShow(num);
            this.icon.source = "res_icon_" + this.resType + "_png";
        }
    }
}