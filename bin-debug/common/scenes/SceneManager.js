var SceneManager = (function () {
    function SceneManager() {
        if (SceneManager._instance) {
            throw new Error("SceneManager使用单例");
        }
    }
    var d = __define,c=SceneManager;p=c.prototype;
    d(SceneManager, "instance"
        ,function () {
            if (!SceneManager._instance) {
                SceneManager._instance = new SceneManager();
            }
            return SceneManager._instance;
        }
    );
    p.runScene = function (cls, color) {
        var scene = new cls();
        this.currScene = scene;
        GameLayerManager.instance.gameLayer.addChild(scene);
        if (color != null) {
            var transition = new eui.Rect(Const.WIN_W, Const.WIN_H, 0x1EF7E8);
            GameLayerManager.instance.gameLayer.addChild(transition);
            egret.Tween.get(transition)
                .to({ alpha: 0 }, 350)
                .call(UIUtils.removeSelf, this, [transition]);
        }
    };
    p.removeScene = function () {
        if (this.currScene) {
            UIUtils.removeSelf(this.currScene);
            this.currScene = null;
        }
    };
    return SceneManager;
})();
egret.registerClass(SceneManager,"SceneManager");
