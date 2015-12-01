class ResItemBase extends eui.Component {
    protected resType:number;

    public constructor(type:number) {
        super();

        this.resType = type;

    }

    private icon:eui.Image;
    private numTF:eui.Label;

    protected createChildren() {
        super.createChildren();

        this.icon.source = "res_icon_" + this.resType + "_png";
    }

    public update() {
        var num = Player.instance.getResourceCount(this.resType);
        this.numTF.text = num + "";
    }
}