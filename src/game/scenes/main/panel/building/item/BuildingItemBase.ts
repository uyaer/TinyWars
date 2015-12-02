class BuildingItemBase extends eui.ItemRenderer {
    protected buildingType:number;

    public constructor(type) {
        super();

        this.buildingType = type;

        this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAdded, this);
        this.addEventListener(egret.Event.REMOVED_FROM_STAGE, this.onRemoved, this);
    }

    /**
     * 当添加到舞台上
     */
    protected  onAdded() {
        this.removeEventListener(egret.Event.ADDED_TO_STAGE, this.onAdded, this);
    }

    /**
     * 当添加到舞台上
     */
    protected onRemoved() {
        this.removeEventListener(egret.Event.REMOVED_FROM_STAGE, this.onRemoved, this);
        UIUtils.removeButtonScaleEffects(this);

        this.destroy();
    }

    /**
     * 销毁
     */
    protected destroy() {

    }

    private nameTF:eui.Label;
    private descTF:eui.Label;
    private lvTF:eui.Label;
    private costGroup:eui.Group;
    protected buildBtn:eui.Button;

    protected createChildren() {
        super.createChildren();

        UIUtils.addButtonScaleEffects(this);

        this.buildBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBuildClick, this);
    }

    private onBuildClick() {

    }
}