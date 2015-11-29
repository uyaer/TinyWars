/**
 * 面板加载时候的动画
 */
var PanelLoading = (function (_super) {
    __extends(PanelLoading, _super);
    function PanelLoading() {
        _super.call(this);
        /**
         * 显示的数量，当==0时，才可以关闭
         * @type {number}
         */
        this.count = 0;
        this.loadingTxt = "Loading";
        this.loadingTxtIndex = 7;
        if (PanelLoading._instance) {
            throw new Error("PanelLoading使用单例");
        }
        this.skinName = new PanelLoadingSkin();
        this.init();
    }
    var d = __define,c=PanelLoading;p=c.prototype;
    d(PanelLoading, "instance"
        ,function () {
            if (!PanelLoading._instance) {
                PanelLoading._instance = new PanelLoading();
            }
            return PanelLoading._instance;
        }
    );
    p.init = function () {
        var bg = new eui.Rect(Const.WIN_W, Const.WIN_H, 0x0f9294);
        bg.alpha = 0.41;
        this.addChildAt(bg, 0);
        this.timer = new egret.Timer(150);
        this.timer.addEventListener(egret.TimerEvent.TIMER, this.onTimer, this);
    };
    p.createChildren = function () {
        _super.prototype.createChildren.call(this);
        this.cirGroup.x = Const.WIN_W / 2;
        this.cirGroup.y = Const.WIN_H / 2;
        if (this.count > 0) {
            this.start();
        }
    };
    p.onTimer = function () {
        this.loadingTxtIndex++;
        if (this.loadingTxtIndex > this.loadingTxt.length) {
            this.loadingTxtIndex = 1;
        }
        this.loadTF.text = this.loadingTxt.substr(0, this.loadingTxtIndex);
    };
    p.show = function () {
        this.count++;
        if (!this.cirGroup)
            return;
        if (this.count == 1) {
            this.start();
        }
    };
    p.hide = function () {
        if (this.count <= 0) {
            this.stop();
        }
    };
    p.start = function () {
        egret.Tween.get(this.cirGroup, { loop: true }).to({ rotation: 360 }, 1000);
        this.timer.start();
        GameLayerManager.instance.tipLayer.addChild(this);
    };
    p.stop = function () {
        egret.Tween.removeTweens(this.cirGroup);
        this.timer.stop();
        UIUtils.removeSelf(this);
    };
    return PanelLoading;
})(eui.Panel);
egret.registerClass(PanelLoading,"PanelLoading");
