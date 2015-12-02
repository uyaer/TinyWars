class SlidePanelBase extends PanelBase {
    public constructor(viewParent:any) {
        super(viewParent);
    }

    protected onShow() {
        this.x = Const.WIN_W;
        egret.Tween.get(this).to({
            x: 0,
        }, 200);
    }

    protected onHide() {
        var toX = -Const.WIN_W;
        egret.Tween.get(this).to({
            x: toX,
        }, 200).call(UIUtils.removeSelf, this, [this]);
    }
}