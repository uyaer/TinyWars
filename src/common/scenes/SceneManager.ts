class SceneManager {
    private static _instance:SceneManager;

    public constructor() {
        if (SceneManager._instance) {
            throw new Error("SceneManager使用单例");
        }
    }

    public static get instance():SceneManager {
        if (!SceneManager._instance) {
            SceneManager._instance = new SceneManager();
        }
        return SceneManager._instance;
    }

    private currScene:SceneBase;

    public runScene(cls:any, color?:number) {
        var scene:any = new cls();
        this.currScene = scene;
        GameLayerManager.instance.gameLayer.addChild(scene);

        if (color != null) {
            var transition = new eui.Rect(Const.WIN_W, Const.WIN_H, 0x1EF7E8);
            GameLayerManager.instance.gameLayer.addChild(transition);
            egret.Tween.get(transition)
                .to({alpha: 0}, 350)
                .call(UIUtils.removeSelf, this, [transition]);
        }
    }

    public removeScene() {
        if (this.currScene) {
            UIUtils.removeSelf(this.currScene);
            this.currScene = null;
        }
    }
}