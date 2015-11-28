class NetLoading extends eui.Group {
    private static _instance:NetLoading;

    private cubeArr:eui.Rect[];
    private cubeH:number = 14;

    public constructor() {
        super();
        if (NetLoading._instance) {
            throw new Error("NetLoading使用单例");
        }
        this.init();
    }

    public static get instance():NetLoading {
        if (!NetLoading._instance) {
            NetLoading._instance = new NetLoading();
        }
        return NetLoading._instance;
    }


    private init() {
        var bg:eui.Rect = new eui.Rect(Const.WIN_W, Const.WIN_H, 0x0f9294);
        bg.alpha = 0.41;
        this.addChildAt(bg, 0);

        this.cubeArr = [this.makeCube(0)];
        for (var i = 1; i <= 2; i++) {
            this.cubeArr.push(this.makeCube(i * 10));
            this.cubeArr.push(this.makeCube(-i * 10));
        }

    }

    private makeCube(x:number):eui.Rect {
        var cube = new eui.Rect(6, this.cubeH, 0xffffff);
        cube.x = Const.WIN_W / 2 + x;
        cube.y = Const.WIN_H / 2 - this.cubeH / 2;
        this.addChild(cube);
        return cube;
    }

    private cubeLoopRun(cube:eui.Rect, delay1:number, delay2:number) {
        egret.Tween.get(cube, {loop: true})
            .wait(delay1)
            .to({height: this.cubeH * 4, y: Const.WIN_H / 2 - this.cubeH * 2}, 50)
            .to({height: this.cubeH, y: Const.WIN_H / 2 - this.cubeH / 2}, 600)
            .wait(delay2)
    }

    public show() {
        this.start();
    }

    public hide() {
        this.stop();
    }

    private start() {
        var cube:eui.Rect = this.cubeArr[0];
        this.cubeLoopRun(cube, 0, 300);
        var cube:eui.Rect = this.cubeArr[1];
        this.cubeLoopRun(cube, 150, 150);
        var cube:eui.Rect = this.cubeArr[2];
        this.cubeLoopRun(cube, 150, 150);
        var cube:eui.Rect = this.cubeArr[3];
        this.cubeLoopRun(cube, 300, 0);
        var cube:eui.Rect = this.cubeArr[4];
        this.cubeLoopRun(cube, 300, 0);

        GameLayerManager.instance.tipLayer.addChild(this);
    }

    private stop() {
        for (var i = 0; i < this.cubeArr.length; i++) {
            egret.Tween.removeTweens(this.cubeArr[i]);
        }
        UIUtils.removeSelf(this);
    }
}