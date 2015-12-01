class SlidePanelBase extends PanelBase {
    public constructor() {
        super();
    }

    protected onShow() {
        this.x = Const.WIN_W;
        egret.Tween.get(this).to({
            x: 0,
        }, 350, egret.Ease.backOut);
    }

    protected onHide() {
        var toX = -Const.WIN_W;
        egret.Tween.get(this).to({
            x: toX,
        }, 350, egret.Ease.backIn).call(UIUtils.removeSelf, this, [this]);
    }
}