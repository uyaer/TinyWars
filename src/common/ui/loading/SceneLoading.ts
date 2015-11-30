/**
 * 场景转换时候的资源加载
 */
class SceneLoading extends eui.Panel {
    private static _instance:SceneLoading;

    private enterSceneCls:any;
    private resGroup:string;

    public constructor() {
        super();
        if (SceneLoading._instance) {
            throw new Error("SceneLoading使用单例");
        }

        this.skinName = new SceneLoadingSkin();
    }

    public static get instance():SceneLoading {
        if (!SceneLoading._instance) {
            SceneLoading._instance = new SceneLoading();
        }
        return SceneLoading._instance;
    }

    public load(resGroup:string, cls:any) {
        this.resGroup = resGroup;
        this.enterSceneCls = cls;

        GameLayerManager.instance.tipLayer.addChild(this);
        SceneManager.instance.removeScene();

        this.beganLoadResGroup();
    }

    private pBg:eui.Rect;
    private pFront:eui.Rect;
    private pTF:eui.Label;
    private logo:eui.Group;

    protected createChildren() {
        super.createChildren();


    }

    /**
     * 开始加载资源
     */
    private beganLoadResGroup() {
        this.pFront.visible = true;
        RES.addEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onResourceLoadComplete, this);
        RES.addEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR, this.onResourceLoadComplete, this);
        RES.addEventListener(RES.ResourceEvent.GROUP_PROGRESS, this.onResourceProgress, this);
        RES.loadGroup(this.resGroup);
    }

    private onResourceLoadComplete(e:RES.ResourceEvent):void {
        if (e.groupName == this.resGroup) {
            RES.removeEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onResourceLoadComplete, this);
            RES.removeEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR, this.onResourceLoadComplete, this);
            RES.removeEventListener(RES.ResourceEvent.GROUP_PROGRESS, this.onResourceProgress, this);
            this.onResourceLoadOver();
        }
    }

    /**
     * preload资源组加载进度
     * loading process of preload resource
     */
    private onResourceProgress(e:RES.ResourceEvent):void {
        if (e.groupName == this.resGroup) {
            var p = e.itemsLoaded / e.itemsTotal;
            var w = p * 400;
            this.pTF.text = Math.floor(p * 100) + "%";
            egret.Tween.removeTweens(this.pFront);
            egret.Tween.get(this.pFront)
                .to({width: w}, 250, egret.Ease.sineOut);
        }
    }

    private onResourceLoadOver() {
        egret.Tween.removeTweens(this.pFront);
        egret.Tween.get(this.pFront)
            .to({width: 400}, 250, egret.Ease.sineOut)
            .call(()=> {
                this.removeAllElements();
            }, this);
    }

    private removeAllElements() {
        egret.Tween.get(this)
            .to({alpha: 0}, 400)
            .call(()=> {
                UIUtils.removeSelf(this);
                SceneManager.instance.runScene(this.enterSceneCls);
            });
    }
}