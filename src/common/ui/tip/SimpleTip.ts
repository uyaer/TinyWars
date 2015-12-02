class SimpleTip {
    private static _pool:eui.Label[] = [];

    static popTip(txt:string, x:number, y:number, rang:number) {
        var tf:eui.Label;
        if (SimpleTip._pool.length > 0) {
            tf = SimpleTip._pool.pop();
        } else {
            tf = new eui.Label();
        }
        tf.touchEnabled = false;
        tf.text = txt;
        tf.size = 30;
        tf.x = x + Util.rang(-rang, rang);
        tf.y = y + Util.rang(-rang, rang);
        GameLayerManager.instance.tipLayer.addChild(tf);
        egret.Tween.get(tf)
            .to({y: tf.y - 100}, 400)
            .call(()=> {
                if (SimpleTip._pool.length < 50) {
                    UIUtils.removeSelf(tf);
                    SimpleTip._pool.push(tf);
                }
            })
    }
}