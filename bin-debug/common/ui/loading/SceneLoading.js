/**
 * 场景转换时候的资源加载
 */
var SceneLoading = (function (_super) {
    __extends(SceneLoading, _super);
    function SceneLoading() {
        _super.call(this);
        if (SceneLoading._instance) {
            throw new Error("SceneLoading使用单例");
        }
        this.skinName = new SceneLoadingSkin();
    }
    var d = __define,c=SceneLoading;p=c.prototype;
    d(SceneLoading, "instance"
        ,function () {
            if (!SceneLoading._instance) {
                SceneLoading._instance = new SceneLoading();
            }
            return SceneLoading._instance;
        }
    );
    p.load = function (resGroup, cls) {
        this.resGroup = resGroup;
        this.enterSceneCls = cls;
        GameLayerManager.instance.tipLayer.addChild(this);
        SceneManager.instance.removeScene();
        this.beganLoadResGroup();
    };
    p.createChildren = function () {
        _super.prototype.createChildren.call(this);
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
            _this.removeAllElements();
        }, this);
    };
    p.removeAllElements = function () {
        var _this = this;
        egret.Tween.get(this)
            .to({ alpha: 0 }, 400)
            .call(function () {
            UIUtils.removeSelf(_this);
            SceneManager.instance.runScene(_this.enterSceneCls);
        });
    };
    return SceneLoading;
})(eui.Panel);
egret.registerClass(SceneLoading,"SceneLoading");
