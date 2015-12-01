class Landscape extends egret.Sprite {
    private partArr:LandscapePart[];

    public constructor() {
        super();

        this.partArr = [];
        var speedArr = [20000, 17000, 14000, 10000, 8000, 0];
        for (var i = 6; i > 0; i--) {
            var part:LandscapePart = new LandscapePart(i, speedArr[6-i]);
            this.addChild(part);
            this.partArr.push(part);
        }
    }

    public destroy() {
        for (var i = 0; i < this.partArr.length; i++) {
            var part:LandscapePart = this.partArr[i];
            part.destroy();
        }

        this.partArr = [];
        this.removeChildren();
    }
}