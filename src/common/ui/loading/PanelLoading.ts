/**
 * 面板加载时候的动画
 */
class PanelLoading extends eui.Panel {
    private static _instance:PanelLoading;
    /**
     * 显示的数量，当==0时，才可以关闭
     * @type {number}
     */
    private count:number = 0;

    private loadingTxt:string = "Loading";
    private loadingTxtIndex:number = 7;

    private timer:egret.Timer;

    public constructor() {
        super();
        if (PanelLoading._instance) {
            throw new Error("PanelLoading使用单例");
        }

        this.skinName = new PanelLoadingSkin();

        this.init();
    }

    public static get instance():PanelLoading {
        if (!PanelLoading._instance) {
            PanelLoading._instance = new PanelLoading();
        }
        return PanelLoading._instance;
    }

    private cirGroup:eui.Group;
    private loadTF:eui.Label;

    private init() {
        var bg:eui.Rect = new eui.Rect(Const.WIN_W, Const.WIN_H, 0x0f9294);
        bg.alpha = 0.41;
        this.addChildAt(bg, 0);

        this.timer = new egret.Timer(150);
        this.timer.addEventListener(egret.TimerEvent.TIMER, this.onTimer, this);
    }

    protected createChildren() {
        super.createChildren();

        this.cirGroup.x = Const.WIN_W / 2;
        this.cirGroup.y = Const.WIN_H / 2;

        if (this.count > 0) {
            this.start();
        }
    }

    private onTimer() {
        this.loadingTxtIndex++;
        if (this.loadingTxtIndex > this.loadingTxt.length) {
            this.loadingTxtIndex = 1;
        }
        this.loadTF.text = this.loadingTxt.substr(0, this.loadingTxtIndex);
    }


    public show() {
        this.count++;
        if (!this.cirGroup)return;
        if (this.count == 1) {
            this.start();
        }
    }

    public hide() {
        if (this.count <= 0) {
            this.stop();
        }
    }

    private start() {
        egret.Tween.get(this.cirGroup, {loop: true}).to({rotation: 360}, 1000);
        this.timer.start();
        GameLayerManager.instance.tipLayer.addChild(this);
    }

    private stop() {
        egret.Tween.removeTweens(this.cirGroup);
        this.timer.stop();
        UIUtils.removeSelf(this);
    }
}