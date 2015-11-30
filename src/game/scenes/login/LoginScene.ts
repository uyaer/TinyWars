class LoginScene extends SceneBase {
    public constructor() {
        super();

        this.resGroup = "login";
        this.skinName = new LoginSceneSkin();
    }

    private loginBtn:eui.Button;

    protected onTouchTap(e:egret.TouchEvent) {
        var btn:eui.Button = e.target;
        if (btn == this.loginBtn) {

            SceneLoading.instance.load("main",MainScene);

            //TODO login
            //UserNet.instance.login("123", (user)=> {
            //    var dataStr = user.get("dataStr");
            //    if (dataStr) {
            //        Player.instance.dealLoginSuccess(JSON.parse(dataStr));
            //    }
            //
            //    ///数据同步计时器启动
            //    DateTimer.instance.runSyncTicker();
            //})
        }
    }
}