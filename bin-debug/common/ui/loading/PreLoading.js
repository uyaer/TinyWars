/**
 * 第一次场景预加载
 */
var PreLoading = (function (_super) {
    __extends(PreLoading, _super);
    function PreLoading() {
        _super.call(this);
        if (PreLoading._instance) {
            throw new Error("PreLoading使用单例");
        }
        this.skinName = new PreloadingSkin();
        this.init();
    }
    var d = __define,c=PreLoading;p=c.prototype;
    d(PreLoading, "instance"
        ,function () {
            if (!PreLoading._instance) {
                PreLoading._instance = new PreLoading();
            }
            return PreLoading._instance;
        }
    );
    p.init = function () {
        var bg = new egret.Bitmap(RES.getRes("pgreenbg_png"));
        bg.width = Const.WIN_W + 100;
        bg.height = Const.WIN_H + 100;
        bg.x = bg.y = -50;
        this.addChildAt(bg, 0);
        this.background = bg;
    };
    p.createChildren = function () {
        _super.prototype.createChildren.call(this);
        this.sCir2.visible = this.pBg.visible = this.pFront.visible = this.logo.visible = this.leaf.visible = false;
        this.pTF.text = "";
        this.start();
    };
    p.load = function (resGroup, cls) {
        this.resGroup = resGroup;
        this.enterSceneCls = cls;
        GameLayerManager.instance.tipLayer.addChild(this);
    };
    p.start = function () {
        this.ballDown();
    };
    /**
     * 小球下落
     */
    p.ballDown = function () {
        egret.Tween.get(this.sCir1)
            .to({ y: this.sCir2.y + 26 }, 250)
            .to({ y: this.sCir2.y }, 50)
            .call(this.ballExchange, this);
    };
    /**
     * 2个白球相互摩擦
     */
    p.ballExchange = function () {
        this.sCir2.visible = true;
        egret.Tween.get(this.sCir2)
            .to({ x: this.sCir2.x + 30, alpha: 0.5 }, 300)
            .to({ x: this.sCir2.x, alpha: 1 }, 300)
            .call(UIUtils.removeSelf, this, [this.sCir2]);
        egret.Tween.get(this.sCir1)
            .to({ x: this.sCir1.x - 30, alpha: 0.5 }, 300)
            .to({ x: this.sCir1.x, alpha: 1 }, 300)
            .call(this.logoGrow, this)
            .to({ scaleX: 0, scaleY: 0, alpha: 0 }, 200)
            .call(UIUtils.removeSelf, this, [this.sCir1]);
        //白线变成
        this.pBg.visible = true;
        this.pBg.width = 0;
        egret.Tween.get(this.pBg)
            .to({ width: 400 }, 800)
            .call(this.beganLoadResGroup, this);
    };
    /**
     * logo生长环节
     */
    p.logoGrow = function () {
        this.logo.visible = true;
        this.logo.scaleX = this.logo.scaleY = 0;
        this.logo.skewX = 90;
        egret.Tween.get(this.logo)
            .to({ scaleX: 1, skewX: 0 }, 200, egret.Ease.backOut);
        egret.Tween.get(this.logo)
            .to({ scaleY: 1 }, 200);
    };
    /**
     * 开始加载资源
     */
    p.beganLoadResGroup = function () {
        this.pFront.visible = true;
        RES.addEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onResourceLoadComplete, this);
        RES.addEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR, this.onResourceLoadComplete, this);
        RES.addEventListener(RES.ResourceEvent.GROUP_PROGRESS, this.onResourceProgress, this);
        RES.loadGroup(this.resGroup);
    };
    p.onResourceLoadComplete = function (e) {
        if (e.groupName == this.resGroup) {
            RES.removeEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onResourceLoadComplete, this);
            RES.removeEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR, this.onResourceLoadComplete, this);
            RES.removeEventListener(RES.ResourceEvent.GROUP_PROGRESS, this.onResourceProgress, this);
            this.onResourceLoadOver();
        }
    };
    /**
     * preload资源组加载进度
     * loading process of preload resource
     */
    p.onResourceProgress = function (e) {
        if (e.groupName == this.resGroup) {
            var p = e.itemsLoaded / e.itemsTotal;
            var w = p * 400;
            this.pTF.text = Math.floor(p * 100) + "%";
            egret.Tween.removeTweens(this.pFront);
            egret.Tween.get(this.pFront)
                .to({ width: w }, 250, egret.Ease.sineOut);
        }
    };
    p.onResourceLoadOver = function () {
        var _this = this;
        egret.Tween.removeTweens(this.pFront);
        egret.Tween.get(this.pFront)
            .to({ width: 400 }, 250, egret.Ease.sineOut)
            .call(function () {
            UIUtils.removeSelf(_this.pBg);
            _this.pLabelMoveRight();
            _this.lineMoveRight();
            _this.logoRotation();
            _this.leafMove();
        }, this);
    };
    p.lineMoveRight = function () {
        this.pFront.horizontalCenter = NaN;
        egret.Tween.get(this.pFront)
            .to({ x: 1200 }, 50);
    };
    p.pLabelMoveRight = function () {
        this.pTF.horizontalCenter = NaN;
        egret.Tween.get(this.pTF)
            .to({ x: 700, alpha: 0 }, 50);
    };
    p.logoRotation = function () {
        egret.Tween.get(this.logo)
            .wait(100)
            .to({ rotation: -15 }, 50)
            .wait(350)
            .call(this.removeAllElements, this);
    };
    p.leafMove = function () {
        this.leaf.visible = true;
        this.leaf.rotation = -35;
        egret.Tween.get(this.leaf)
            .to({ rotation: -10 }, 100);
    };
    p.removeAllElements = function () {
        var _this = this;
        egret.Tween.get(this.leaf)
            .to({ rotation: 80 }, 350)
            .call(UIUtils.removeSelf, this, [this.leaf]);
        egret.Tween.get(this.logo)
            .to({ scaleX: 0, scaleY: 0 }, 350)
            .call(UIUtils.removeSelf, this, [this.leaf]);
        egret.Tween.get(this.background)
            .to({ alpha: 0 }, 450)
            .call(UIUtils.removeSelf, this, [this.background])
            .call(function () {
            UIUtils.removeSelf(_this);
            RES.destroyRes("preload");
            SceneManager.instance.runScene(_this.enterSceneCls);
        });
    };
    return PreLoading;
})(eui.Panel);
egret.registerClass(PreLoading,"PreLoading");
