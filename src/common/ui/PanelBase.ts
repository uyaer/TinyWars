class PanelBase extends eui.Panel {
    protected uiSkinName:any;
    /**
     * 设置父对象
     */
    public viewParent:any;

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
        RES.destroyRes(this._resGroup);
    }


    private closeBtn:eui.Button;
    private _startPos:egret.Point;
    /**
     * 资源分组
     */
    private _resGroup:string;
    /**
     * 资源是否加载完成
     * @type {boolean}
     * @private
     */
    private _isResLoaded:boolean = false;

    public init(resGroup:string) {
        this._resGroup = resGroup;
        this._isResLoaded = false;
        egret.setTimeout(this.showPreLoading, this, 1);
        RES.addEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onGroupResourceLoaded, this);
        RES.addEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR, this.onGroupResourceLoaded, this);
        RES.loadGroup(resGroup);
    }

    private showPreLoading() {
        if (!this._isResLoaded) {
            PanelLoading.instance.show();
        }
    }

    /**
     * 设置动画起始位置
     * @param val
     */
    public set animate_startPos(val:egret.Point) {
        if (val) {
            this._startPos = val;
        }
    }

    private onGroupResourceLoaded(event:RES.ResourceEvent) {
        if (event.groupName == this._resGroup) {
            this._isResLoaded = true;
            PanelLoading.instance.hide();
            RES.removeEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onGroupResourceLoaded, this);
            RES.removeEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR, this.onGroupResourceLoaded, this);
            this.skinName = null;
            this.skinName = this.uiSkinName;
            this.viewParent.addChild(this);
        }
    }

    protected createChildren() {
        super.createChildren();

        UIUtils.addButtonScaleEffects(this);

        this.onShow();
    }

    protected onTouchTap(e:egret.TouchEvent) {
        var target = <eui.Button>e.target;
        if (target == this.closeBtn) {
            this.onHide();
        }
    }

    protected onShow() {
        this.x = Const.WIN_W;
        this.y = Const.WIN_H / 2;
        if (this._startPos) {
            this.x = this._startPos.x;
            this.y = this._startPos.y;
        }
        var toX = (Const.WIN_W - this.width) / 2;
        var toY = (Const.WIN_H - this.height) / 2;
        this.scaleX = this.scaleY = 0;
        egret.Tween.get(this).to({
            x: toX,
            y: toY,
            scaleX: 1,
            scaleY: 1
        }, 250, egret.Ease.backOut);
    }

    protected onHide() {
        var toX = Const.WIN_W;
        var toY = Const.WIN_H / 2;
        if (this._startPos) {
            toX = this._startPos.x;
            toY = this._startPos.y;
        }
        egret.Tween.get(this).to({
            x: toX,
            y: toY,
            scaleX: 0,
            scaleY: 0
        }, 250, egret.Ease.backIn).call(UIUtils.removeSelf, this, [this]);
    }

    public hide(){
        this.onHide();
    }
}