class LandscapePart extends egret.Sprite {
    /**
     * 速度减少多少倍
     */
    private speed:number = 0;

    private offX:number = 0;

    /**
     * @param layer 层级，越大越靠下
     * @param speed 值越大，速度越慢
     */
    public constructor(layer:number, speed:number) {
        super();
        if (speed > 0) {
            this.speed = Const.WIN_W / speed;
        }

        for (var i = 0; i < 2; i++) {
            var bg = new egret.Bitmap(RES.getRes("scene" + layer + "_png"));
            bg.x = i * (Const.WIN_W - 0.5);
            this.addChild(bg);
        }

        if (this.speed > 0) {
            this.run();
        }
    }

    private run() {
        egret.Ticker.getInstance().register(this.update, this);
    }

    private update(dt) {
        this.offX -= dt * this.speed;
        if (this.offX <= -Const.WIN_W) {
            this.offX += Const.WIN_W;
        }
        this.x = int(this.offX);
    }

    public destroy() {
        egret.Ticker.getInstance().unregister(this.update, this);
        //egret.Tween.removeTweens(this);
        this.removeChildren();
    }
}