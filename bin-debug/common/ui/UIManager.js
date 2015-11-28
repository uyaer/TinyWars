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
    p.showPanel = function (name, startPos) {
        switch (name) {
            case PanelName.SHOP:
                //this.currPanel = new ShopPanel();
                break;
        }
        //this.currPanel.init(startPos);
        GameLayerManager.instance.uiLayer.addChild(this.currPanel);
    };
    return UIManager;
})();
egret.registerClass(UIManager,"UIManager");
