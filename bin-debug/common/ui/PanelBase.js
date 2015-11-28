var PanelBase = (function (_super) {
    __extends(PanelBase, _super);
    function PanelBase() {
        _super.call(this);
        /**
         * 资源是否加载完成
         * @type {boolean}
         * @private
         */
        this._isResLoaded = false;
        this.touchEnabled = true;
        this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchTap, this);
        this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAdded, this);
        this.addEventListener(egret.Event.REMOVED_FROM_STAGE, this.onRemoved, this);
    }
    var d = __define,c=PanelBase;p=c.prototype;
    /**
     * 当添加到舞台上
     */
    p.onAdded = function () {
        this.removeEventListener(egret.Event.ADDED_TO_STAGE, this.onAdded, this);
    };
    /**
     * 当添加到舞台上
     */
    p.onRemoved = function () {
        this.removeEventListener(egret.Event.REMOVED_FROM_STAGE, this.onRemoved, this);
        this.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchTap, this);
        this.destroy();
    };
    /**
     * 销毁
     */
    p.destroy = function () {
    };
    p.init = function (resGroup) {
        this._resGroup = resGroup;
        this._isResLoaded = false;
        egret.setTimeout(this.showPreLoading, this, 1);
        RES.addEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onGroupResourceLoaded, this);
        RES.addEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR, this.onGroupResourceLoaded, this);
        RES.loadGroup(resGroup);
    };
    p.showPreLoading = function () {
        if (!this._isResLoaded) {
            PanelLoading.instance.show();
        }
    };
    d(p, "animate_startPos",undefined
        /**
         * 设置动画起始位置
         * @param val
         */
        ,function (val) {
            if (val) {
                this._startPos = val;
            }
        }
    );
    p.onGroupResourceLoaded = function (event) {
        if (event.groupName == this._resGroup) {
            this._isResLoaded = true;
            PanelLoading.instance.hide();
            RES.removeEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onGroupResourceLoaded, this);
            RES.removeEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR, this.onGroupResourceLoaded, this);
            this.skinName = null;
            this.skinName = this.uiSkinName;
            GameLayerManager.instance.uiLayer.addChild(this);
        }
    };
    p.createChildren = function () {
        _super.prototype.createChildren.call(this);
        UIUtils.addButtonScaleEffects(this);
        this.onShow();
    };
    p.onTouchTap = function (e) {
        var target = e.target;
        if (target == this.closeBtn) {
            this.onHide();
        }
    };
    p.onShow = function () {
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
    };
    p.onHide = function () {
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
    };
    return PanelBase;
})(eui.Panel);
egret.registerClass(PanelBase,"PanelBase");
