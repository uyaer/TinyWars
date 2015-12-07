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
        //更新建造进度条
        if (this.progressBar) {
            var time = this.buildQueueVo.pastTime;
            this.progressBar.value = time;
            this.buildLockBtn.updateView(this.buildQueueVo.needTime);
            if (DateTimer.instance.now >= this.buildQueueVo.endTime) {
                UIUtils.removeSelf(this.progressBar);
                this.costGroup.visible = true;
                this.progressBar = null;
                this.buildQueueVo = null;
                UIUtils.removeSelf(this.buildLockBtn);
                this.buildBtn.visible = true;
                this.buildLockBtn = null;
                this.updateView();
            }
        }
    }

    protected icon:eui.Image;
    protected nameTF:eui.Label;
    protected descTF:eui.Label;
    protected effectTF:eui.Label;
    protected lvTF:eui.Label;
    protected costGroup:eui.Group;
    protected buildBtn:eui.Button;
    protected buildLockBtn:CDTimeGoldButton;
    protected progressBar:BuildProgressBar;
    protected buildQueueVo:BuildQueueVo;

    protected createChildren() {
        super.createChildren();

        UIUtils.addButtonScaleEffects(this);

        if (!this.fixedMax) {
            this.updateBuildNumber();
        }

        this.updateView();

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

    /**
     * 更新特有的视图 (不同模块需要重写)
     */
    protected updateView() {

    }

    /**
     * 更新建造状态 (需要重写)
     */
    protected addBuildProgress(vo:BuildQueueVo) {
        egret.callLater(()=> {
            this.buildQueueVo = vo;
            this.progressBar = new BuildProgressBar(vo.totalTime);
            this.progressBar.value = vo.pastTime;
            this.progressBar.x = this.costGroup.x;
            this.progressBar.y = this.costGroup.y - 8;
            this.addChild(this.progressBar);
            this.costGroup.visible = false;

            //按钮
            this.buildLockBtn = new CDTimeGoldButton();
            this.buildLockBtn.x = this.buildBtn.x;
            this.buildLockBtn.y = this.buildBtn.y;
            this.addChild(this.buildLockBtn);
            this.buildLockBtn.updateView(vo.needTime);
            this.buildBtn.visible = false;
        }, this);

    }
}