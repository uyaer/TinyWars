class UIManager {
    private static _instance:UIManager;

    public static get instance():UIManager {
        if (!UIManager._instance) {
            UIManager._instance = new UIManager();
        }
        return UIManager._instance;
    }

    private currPanel:PanelBase;

    /**
     * 显示面板
     * @param name
     * @param startPos
     */
    public showPanel(name:string, startPos:egret.Point):void {
        switch (name) {
            case PanelName.SHOP:
                //this.currPanel = new ShopPanel();
                break;
        }
        //this.currPanel.init(startPos);
        GameLayerManager.instance.uiLayer.addChild(this.currPanel);
    }
}