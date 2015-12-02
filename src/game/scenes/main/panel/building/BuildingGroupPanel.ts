/**
 * 建筑页面总页面
 */
class BuildingGroupPanel extends SlidePanelBase {
    private typeTab:SimpleTab;
    private numberTab:SimpleTab;

    public constructor(viewParent:any) {
        super(viewParent);

        this.skinName = null;
        this.viewParent = viewParent;

        this.initTypesButton();
        this.initNumberModeButton();
    }

    /**
     * 初始化建筑类型选择按钮
     */
    private initTypesButton() {
        var arr = ["资源", "仓库", "工厂", "军事"];
        var itemArr:SimpleTabItemButton[] = [];
        for (var i = 0; i < arr.length; i++) {
            var item = new SimpleTabItemButton(arr[i]);
            item.skinName = new TypeTabItemButtonSkin();
            item.x = 10 + 135 * i;
            item.y = 20;
            this.addChild(item);
            itemArr.push(item);
        }
        this.typeTab = new SimpleTab(itemArr);
        this.typeTab.itemChangeCallback = this.onTypeTabItemChange.bind(this);
    }


    /**
     * 初始化数量操作按钮
     */
    private initNumberModeButton() {
        if (this.numberTab) {
            this.numberTab.destroy();
        }
        //var arr = ["x1", "x10", "x100", "x1K", "x10K"];
        var arr = ["x1"];
        var len = arr.length;
        var w = len * 115 + (len - 1) * 10;
        var left = (Const.WIN_W - w) / 2;
        var itemArr:SimpleTabItemButton[] = [];
        for (var i = 0; i < len; i++) {
            var item = new SimpleTabItemButton(arr[i]);
            item.skinName = new NumberTabItemButtonSkin();
            item.x = left + 125 * i;
            item.y = 480;
            this.addChild(item);
            itemArr.push(item);
        }
        this.numberTab = new SimpleTab(itemArr);
        this.numberTab.itemChangeCallback = this.onNumberTabItemChange.bind(this);
    }


    private onTypeTabItemChange(index:number) {
        //TODO build type change
        if(index ==0){
            this.makeResBuildingItem();
        }
    }

    private onNumberTabItemChange(index:number) {
        //TODO build number change
    }

    /**
     * 创建
     */
    private makeResBuildingItem(){
        var arr = []
    }

    protected onShowAnimateOver() {
        super.onShowAnimateOver();

        this.typeTab.selectIndex = 0;
    }

    protected destroy() {
        super.destroy();

        this.typeTab.destroy();
        this.numberTab.destroy();
    }
}