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
    public popPanel(name:string, startPos:egret.Point):void {
        switch (name) {
            case PanelName.SHOP:
                //this.currPanel = new ShopPanel();
                break;
        }
        //this.currPanel.init(startPos);
        GameLayerManager.instance.uiLayer.addChild(this.currPanel);
    }

    /**
     * 显示简单的提示
     * @param txt 文本
     * @param x
     * @param y
     * @param rang 随机范围
     */
    public popSimpleTip(txt:string, x:number, y:number, rang:number = 16) {
        SimpleTip.popTip(txt, x, y, rang);
    }

    /**
     * 显示重要提示
     * @param txt
     */
    public popTip(txt:string) {
        ToastTip.popTip(txt);
    }
}