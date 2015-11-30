class SceneBase extends eui.Panel {
    /**
     * 需要销毁的资源
     */
    protected resGroup:string;

    public constructor() {
        super();

        this.touchEnabled = true;
        this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchTap, this);
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
        this.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchTap, this);
        UIUtils.removeButtonScaleEffects(this);

        this.destroy();
    }

    /**
     * 销毁
     */
    protected destroy() {
        if (this.resGroup) {
            RES.destroyRes(this.resGroup);
        }
    }

    protected createChildren() {
        super.createChildren();

        UIUtils.addButtonScaleEffects(this);

    }

    protected onTouchTap(e:egret.TouchEvent) {

    }

}