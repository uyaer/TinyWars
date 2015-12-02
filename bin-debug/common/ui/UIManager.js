var UIManager = (function () {
    function UIManager() {
    }
    var d = __define,c=UIManager;p=c.prototype;
    d(UIManager, "instance"
        ,function () {
            if (!UIManager._instance) {
                UIManager._instance = new UIManager();
            }
            return UIManager._instance;
        }
    );
    /**
     * 显示面板
     * @param name
     * @param startPos
     */
    p.popPanel = function (name, startPos) {
        switch (name) {
            case PanelName.SHOP:
                //this.currPanel = new ShopPanel();
                break;
        }
        //this.currPanel.init(startPos);
        GameLayerManager.instance.uiLayer.addChild(this.currPanel);
    };
    /**
     * 显示简单的提示
     * @param txt 文本
     * @param x
     * @param y
     * @param rang 随机范围
     */
    p.popSimpleTip = function (txt, x, y, rang) {
        if (rang === void 0) { rang = 16; }
        SimpleTip.popTip(txt, x, y, rang);
    };
    /**
     * 显示重要提示
     * @param txt
     */
    p.popTip = function (txt) {
        ToastTip.popTip(txt);
    };
    return UIManager;
})();
egret.registerClass(UIManager,"UIManager");
