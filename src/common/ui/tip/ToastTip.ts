class ToastTip extends eui.Group {
    private static _pool:ToastTip[] = [];

    private label:eui.Label;
    private bg:eui.Image;

    public constructor() {
        super();

        this.touchChildren = false;
        this.touchEnabled = false;
        var bg:eui.Image = new eui.Image(RES.getRes("top_input_png"));
        bg.scale9Grid = new egret.Rectangle(25, 17, 1, 1);
        this.addChild(bg);
        bg.horizontalCenter = 0;
        bg.verticalCenter = 0;
        this.bg = bg;
        var tf:eui.Label = new eui.Label();
        tf.textColor = 0xffffff;
        tf.horizontalCenter = 0;
        tf.verticalCenter = 0;
        this.label = tf;
        this.addChild(tf);
    }

    private updateTxt(txt:string) {
        this.label.text = txt;
        this.label.x = -this.label.width / 2;
        this.label.y = 20;
        this.bg.width = this.label.width + 30;
        this.bg.height = 54;
    }

    static popTip(txt:string) {
        var tip:ToastTip;
        if (ToastTip._pool.length > 0) {
            tip = ToastTip._pool.pop();
            tip.alpha = 1;
        } else {
            tip = new ToastTip();
        }
        tip.updateTxt(txt);
        tip.x = (Const.WIN_W - tip.bg.width) / 2;
        tip.y = Const.WIN_H / 2;
        GameLayerManager.instance.tipLayer.addChild(tip);
        egret.Tween.get(tip).to({y: tip.y - 50}, 100, egret.Ease.backOut)
            .wait(1000)
            .to({y: tip.y - 180, alpha: 0}, 200)
            .call(()=> {
                if (ToastTip._pool.length < 50) {
                    UIUtils.removeSelf(tip);
                    ToastTip._pool.push(tip);
                }
            });
    }
}