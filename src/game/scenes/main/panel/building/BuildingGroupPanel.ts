/**
 * 建筑页面总页面
 */
class BuildingGroupPanel extends SlidePanelBase {
    /**
     * 上面的类型切换
     */
    private typeTab:SimpleTab;
    /**
     * 下面的数量切换
     */
    private numberTab:SimpleTab;
    /**
     * 中间的item组
     */
    private groupList:BuildGroupList;

    public constructor(viewParent:any) {
        super(viewParent);

        this.skinName = null;
        this.init("building");

        this.initTypesButton();
        this.initNumberModeButton();
        this.initGroupList();
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
        var arr = ["x1","x10", "x100"];
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
        this.numberTab.selectIndex = Player.instance.buildNumberIndex;
        this.numberTab.itemChangeCallback = this.onNumberTabItemChange.bind(this);
    }

    /**
     * 建筑项目列表
     */
    private initGroupList() {
        this.groupList = new BuildGroupList();
        this.groupList.y = 70;
        this.addChild(this.groupList);
    }


    private onTypeTabItemChange(index:number) {
        // build type change
        var category:any[] = [BuildingCategory.resGroup, BuildingCategory.storeGroup,
            BuildingCategory.factoryGroup, BuildingCategory.warGroup];
        var itemClassArr:any[] = [ResBuildingItem, StoreBuildingItem,
            FactoryBuildingItem, WarBuildingItem];

        this.makeBuildingItem(category[index], itemClassArr[index]);
    }

    private onNumberTabItemChange(index:number) {
        // build number change
        Player.instance.buildNumberIndex = index;
        var num:number = Player.instance.buildMax;
        var len = this.groupList.allItems.length;
        for (var i = 0; i < len; i++) {
            var item = this.groupList.allItems[i];
            item.updateBuildMax(num);
        }
    }

    /**
     * 创建
     */
    private makeBuildingItem(arr:number[], itemClass:any) {
        this.groupList.itemClass = itemClass;
        this.groupList.dataProvider = arr;
    }

    protected onShowAnimateOver() {
        super.onShowAnimateOver();

        this.typeTab.selectIndex = 0;
    }

    protected destroy() {

        this.typeTab.destroy();
        this.numberTab.destroy();

        super.destroy();
    }
}