class BuildProgressBar extends eui.ProgressBar {
    public constructor(maxVal:number) {
        super();

        this.maximum = maxVal;
        this.minimum = 0;
        this.value = 0;

        this.skinName = new BuildProgressBarSkin();
    }

    private smartSp:eui.Group;

    protected createChildren() {
        super.createChildren();

        egret.Tween.get(this.smartSp, {loop: true})
            .to({rotation: 45}, 250)
            .to({rotation: 0}, 250)

        this.addEventListener(egret.Event.REMOVED_FROM_STAGE, this.onRemoved, this);
    }


    /**
     * 当移除舞台
     */
    protected onRemoved() {
        this.removeEventListener(egret.Event.REMOVED_FROM_STAGE, this.onRemoved, this);

        egret.Tween.removeTweens(this.smartSp);
    }
}