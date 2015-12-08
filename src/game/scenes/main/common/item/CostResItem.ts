class CostResItem extends eui.Component {
    public resType:number;
    public num:number = -1;
    /**
     * 是否需要区分颜色
     * @type {boolean}
     */
    public needColor:boolean = false;

    public constructor(resType:number, needColor:boolean = false) {
        super();

        this.needColor = needColor;
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
            var hasNum:number = Player.instance.getResourceCount(this.resType);
            if (this.needColor) {
                if (hasNum >= num) {
                    this.numTF.textColor = Const.GREEN;
                } else {
                    this.numTF.textColor = Const.RED;
                }
            }
        }
    }
}