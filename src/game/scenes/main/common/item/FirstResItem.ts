class FirstResItem extends ResItemBase {

    public constructor(type:number) {
        super(type);

        this.skinName = new FirstResItemSkin();
    }

    private addNumTF:eui.Label;

    public update() {
        super.update();
        var num = Player.instance.getResourceAddRate(this.resType);
        this.addNumTF.text = "+" + num + "/s";
        if (num >= 0) {
            this.addNumTF.textColor = 0x4CD00A;
        } else {
            this.addNumTF.textColor = 0xE91138;
        }
    }
}