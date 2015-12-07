class CDTimeGoldButton extends eui.Button {
    public constructor() {
        super();

        this.skinName = new CDTimeGoldButtonSkin();
    }

    private cdTimeTF:eui.Label;
    private goldTF:eui.Label;

    private needTime:number = 0;

    protected createChildren() {
        super.createChildren();

        this.updateView(this.needTime);
    }

    public updateView(needTime:number) {
        if (this.goldTF) {
            this.needTime = needTime;
            this.cdTimeTF.text = Util.getBigTimeShow(needTime);
            //TODO 金币消除cd
        }
    }
}