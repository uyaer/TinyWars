class BuildItemBase extends eui.ItemRenderer implements IUpdate {
    protected type:number;
    /**
     * 建造最大值是否是固定的
     * @type {boolean}
     */
    protected fixedMax:boolean = false;

    public constructor(type) {
        super();

        this.type = type;

        this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAdded, this);
    }

    /**
     * 当添加到舞台上
     */
    protected  onAdded() {
        this.removeEventListener(egret.Event.ADDED_TO_STAGE, this.onAdded, this);

        this.addEventListener(egret.Event.REMOVED_FROM_STAGE, this.onRemoved, this);
        if (!this.fixedMax) { //最大建造
            EventManager.instance.addEvent(EventName.RESOURCE_CHANGE,
                this.onResourceChange, this);
        }

        OneTimerTicker.instance.add(this);
    }

    /**
     * 当添加到舞台上
     */
    protected onRemoved() {
        this.removeEventListener(egret.Event.REMOVED_FROM_STAGE, this.onRemoved, this);
        if (!this.fixedMax) {
            EventManager.instance.removeEvent(EventName.RESOURCE_CHANGE,
                this.onResourceChange, this);
        }
        UIUtils.removeButtonScaleEffects(this);

        OneTimerTicker.instance.remove(this);

        this.destroy();
    }

    /**
     * 销毁 (需要重新自己的逻辑)
     */
    protected destroy() {

    }

    /**
     * 更新 (需要重新)
     */
    public update() {

    }

    protected icon:eui.Image;
    protected nameTF:eui.Label;
    protected descTF:eui.Label;
    protected effectTF:eui.Label;
    protected lvTF:eui.Label;
    protected costGroup:eui.Group;
    protected buildBtn:eui.Button;

    protected createChildren() {
        super.createChildren();

        UIUtils.addButtonScaleEffects(this);

        if (!this.fixedMax) {
            this.updateBuildNumber();
        }

        this.buildBtn.addEventListener(egret.TouchEvent.TOUCH_TAP,
            this.onBuildClick, this);
    }

    protected onBuildClick() {

    }

    /**
     * 当资源有变化当时候 （需要重写）
     */
    protected onResourceChange(e:egret.Event) {

    }

    /**
     * 更新可以建筑的等级次数（需要重写）
     */
    public updateBuildNumber() {

    }
}