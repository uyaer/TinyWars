var NetLoading = (function (_super) {
    __extends(NetLoading, _super);
    function NetLoading() {
        _super.call(this);
        this.cubeH = 14;
        if (NetLoading._instance) {
            throw new Error("NetLoading使用单例");
        }
        this.init();
    }
    var d = __define,c=NetLoading;p=c.prototype;
    d(NetLoading, "instance"
        ,function () {
            if (!NetLoading._instance) {
                NetLoading._instance = new NetLoading();
            }
            return NetLoading._instance;
        }
    );
    p.init = function () {
        var bg = new eui.Rect(Const.WIN_W, Const.WIN_H, 0x0f9294);
        bg.alpha = 0.41;
        this.addChildAt(bg, 0);
        this.cubeArr = [this.makeCube(0)];
        for (var i = 1; i <= 2; i++) {
            this.cubeArr.push(this.makeCube(i * 10));
            this.cubeArr.push(this.makeCube(-i * 10));
        }
    };
    p.makeCube = function (x) {
        var cube = new eui.Rect(6, this.cubeH, 0xffffff);
        cube.x = Const.WIN_W / 2 + x;
        cube.y = Const.WIN_H / 2 - this.cubeH / 2;
        this.addChild(cube);
        return cube;
    };
    p.cubeLoopRun = function (cube, delay1, delay2) {
        egret.Tween.get(cube, { loop: true })
            .wait(delay1)
            .to({ height: this.cubeH * 4, y: Const.WIN_H / 2 - this.cubeH * 2 }, 50)
            .to({ height: this.cubeH, y: Const.WIN_H / 2 - this.cubeH / 2 }, 600)
            .wait(delay2);
    };
    p.show = function () {
        this.start();
    };
    p.hide = function () {
        this.stop();
    };
    p.start = function () {
        var cube = this.cubeArr[0];
        this.cubeLoopRun(cube, 0, 300);
        var cube = this.cubeArr[1];
        this.cubeLoopRun(cube, 150, 150);
        var cube = this.cubeArr[2];
        this.cubeLoopRun(cube, 150, 150);
        var cube = this.cubeArr[3];
        this.cubeLoopRun(cube, 300, 0);
        var cube = this.cubeArr[4];
        this.cubeLoopRun(cube, 300, 0);
        GameLayerManager.instance.tipLayer.addChild(this);
    };
    p.stop = function () {
        for (var i = 0; i < this.cubeArr.length; i++) {
            egret.Tween.removeTweens(this.cubeArr[i]);
        }
        UIUtils.removeSelf(this);
    };
    return NetLoading;
})(eui.Group);
egret.registerClass(NetLoading,"NetLoading");
