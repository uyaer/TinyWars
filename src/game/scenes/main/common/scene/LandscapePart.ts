class LandscapePart extends egret.Sprite {
    /**
     * 速度减少多少倍
     */
    private speed:number;

    /**
     * @param layer 层级，越大越靠下
     * @param speed 值越大，速度越慢
     */
    public constructor(layer:number, speed:number) {
        super();

        this.speed = speed;

        for (var i = 0; i < 2; i++) {
            var bg = new egret.Bitmap(RES.getRes("scene" + layer + "_png"));
            bg.x = i * Const.WIN_W;
            this.addChild(bg);
        }

        this.run();
    }

    private run() {
        egret.Tween.get(this, {loop: true})
            .to({x: -Const.WIN_W}, this.speed)
            .to({x: 0}, 0)
    }

    public destroy() {
        egret.Tween.removeTweens(this);
        this.removeChildren();
    }
}