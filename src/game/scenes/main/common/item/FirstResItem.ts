class FirstResItem extends ResItemBase {

    public constructor(type:number) {
        super(type);

        this.skinName = new FirstResItemSkin();
    }

    private addNumTF:eui.Label;

    public update() {
        super.update();
        var numRate = Player.instance.getResourceAddRate(this.resType);
        this.addNumTF.text = "+" + numRate + "/s";
        if (numRate >= 0) {
            this.addNumTF.textColor = 0x4CD00A;
        } else {
            this.addNumTF.textColor = 0xE91138;
        }

        //数量颜色
        var num = Player.instance.getResourceCount(this.resType);
        var max = Player.instance.getResourceCapacity(this.resType);
        if (num < max) {
            this.numTF.textColor = 0x4CD00A;
        } else {
            this.numTF.textColor = 0xE91138;
        }
    }
}