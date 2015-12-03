class BuildItemBase extends eui.ItemRenderer {
    protected type:number;
    /**
     * 建造最大值是否是固定的
     * @type {boolean}
     */
    protected fixedMax:boolean = false;
    /**
     * 建造最大值
     * @type {number}
     */
    protected buildMax:number = 1;

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

        this.destroy();
    }

    /**
     * 销毁
     */
    protected destroy() {

    }

    protected icon:eui.Image;
    protected nameTF:eui.Label;
    protected descTF:eui.Label;
    protected lvTF:eui.Label;
    protected costGroup:eui.Group;
    protected buildBtn:eui.Button;

    protected createChildren() {
        super.createChildren();

        UIUtils.addButtonScaleEffects(this);


        this.buildBtn.addEventListener(egret.TouchEvent.TOUCH_TAP,
            this.onBuildClick, this);
    }

    private onBuildClick() {

    }

    /**
     * 更新建造最大值（需要重新,跟个类型的逻辑不同）
     * @param max
     */
    public updateBuildMax(max:number) {
        this.buildMax = max;

        this.updateBuildNumber();
    }

    /**
     * 当资源有变化当时候 （需要重写）
     */
    protected onResourceChange(e:egret.Event){

    }

    /**
     * 更新可以建筑的等级次数（需要重写）
     */
    protected updateBuildNumber() {

    }
}