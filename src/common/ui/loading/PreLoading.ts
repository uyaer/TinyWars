/**
 * 第一次场景预加载
 */
class PreLoading extends eui.Panel {
    private static _instance:PreLoading;

    private enterSceneCls:any;
    private resGroup:string;

    private background:egret.Bitmap;

    public constructor() {
        super();
        if (PreLoading._instance) {
            throw new Error("PreLoading使用单例");
        }

        this.skinName = new PreloadingSkin();

        this.init();
    }

    public static get instance():PreLoading {
        if (!PreLoading._instance) {
            PreLoading._instance = new PreLoading();
        }
        return PreLoading._instance;
    }

    private init() {
        var bg:egret.Bitmap = new egret.Bitmap(RES.getRes("pgreenbg_png"));
        bg.width = Const.WIN_W + 100;
        bg.height = Const.WIN_H + 100;
        bg.x = bg.y = -50;
        this.addChildAt(bg, 0);
        this.background = bg;
    }

    private sCir1:eui.Group;
    private sCir2:eui.Group;
    private pBg:eui.Rect;
    private pFront:eui.Rect;
    private logo:eui.Group;
    private leaf:eui.Group;

    protected createChildren() {
        super.createChildren();

        this.sCir2.visible = this.pBg.visible = this.pFront.visible = this.logo.visible = this.leaf.visible = false;

        this.start();
    }


    public load(resGroup:string, cls:any) {
        this.resGroup = resGroup;
        this.enterSceneCls = cls;

        GameLayerManager.instance.tipLayer.addChild(this);
    }

    private start() {
        this.ballDown();
    }

    /**
     * 小球下落
     */
    private ballDown() {
        egret.Tween.get(this.sCir1)
            .to({y: this.sCir2.y + 26}, 250)
            .to({y: this.sCir2.y}, 50)
            .call(this.ballExchange, this);
    }

    /**
     * 2个白球相互摩擦
     */
    private ballExchange() {
        this.sCir2.visible = true;
        egret.Tween.get(this.sCir2)
            .to({x: this.sCir2.x + 30, alpha: 0.5}, 300)
            .to({x: this.sCir2.x, alpha: 1}, 300)
            .call(UIUtils.removeSelf, this, [this.sCir2]);
        egret.Tween.get(this.sCir1)
            .to({x: this.sCir1.x - 30, alpha: 0.5}, 300)
            .to({x: this.sCir1.x, alpha: 1}, 300)
            .call(this.logoGrow, this)
            .to({scaleX: 0, scaleY: 0, alpha: 0}, 200)
            .call(UIUtils.removeSelf, this, [this.sCir1]);

        //白线变成
        this.pBg.visible = true;
        this.pBg.width = 0;
        egret.Tween.get(this.pBg)
            .to({width: 400}, 800)
            .call(this.beganLoadResGroup, this);
    }

    /**
     * logo生长环节
     */
    private logoGrow() {
        this.logo.visible = true;
        this.logo.scaleX = this.logo.scaleY = 0;
        this.logo.skewX = 90;
        egret.Tween.get(this.logo)
            .to({scaleX: 1, skewX: 0}, 200, egret.Ease.backOut);
        egret.Tween.get(this.logo)
            .to({scaleY: 1}, 200)
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
                UIUtils.removeSelf(this.pBg);
                this.lineMoveRight();
                this.logoRotation();
                this.leafMove();
            }, this);
    }

    private lineMoveRight() {
        this.pFront.horizontalCenter = NaN;
        egret.Tween.get(this.pFront)
            .to({x: 1200}, 50);
    }

    private logoRotation() {
        egret.Tween.get(this.logo)
            .wait(100)
            .to({rotation: -15}, 50)
            .wait(350)
            .call(this.removeAllElements, this);
    }

    private leafMove() {
        this.leaf.visible = true;
        this.leaf.rotation = -35;
        egret.Tween.get(this.leaf)
            .to({rotation: -10}, 100);
    }

    private removeAllElements() {
        egret.Tween.get(this.leaf)
            .to({rotation: 80}, 200)
            .call(UIUtils.removeSelf, this, [this.leaf]);
        egret.Tween.get(this.logo)
            .to({scaleX: 0, scaleY: 0}, 200)
            .call(UIUtils.removeSelf, this, [this.leaf]);
        egret.Tween.get(this.background)
            .to({alpha: 0}, 300)
            .call(UIUtils.removeSelf, this, [this.background])
            .call(()=> {
                UIUtils.removeSelf(this);
                RES.destroyRes("preload");
                SceneManager.instance.runScene(this.enterSceneCls);
            });
    }
}