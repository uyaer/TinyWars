class ClickResPanel extends SlidePanelBase {
    public constructor() {
        super();

        this.uiSkinName = new ClickResPanelSkin();

        this.init("clickres");
    }

    private btnFood:eui.Button;
    private btnStone:eui.Button;
    private btnWood:eui.Button;

    protected onTouchTap(e:egret.TouchEvent) {
        var btn:eui.Button = e.target;
        switch (btn) {
            case this.btnFood:
                Player.instance.addResourceCount(ResType.FOOD, Player.instance.clickResCount);
                this.showGetResTip(btn);
                break;
            case this.btnStone:
                Player.instance.addResourceCount(ResType.STONE, Player.instance.clickResCount);
                this.showGetResTip(btn);
                break;
            case this.btnWood:
                Player.instance.addResourceCount(ResType.WOOD, Player.instance.clickResCount);
                this.showGetResTip(btn);
                break;
        }
    }

    private showGetResTip(btn:eui.Button) {
        var pos:egret.Point = btn.localToGlobal(btn.width / 2, btn.height / 2);
        UIManager.instance.popSimpleTip("+" + Player.instance.clickResCount, pos.x, pos.y);
    }
}