/**
 * 建筑页面总页面
 */
class BuildingGroupPanel extends SlidePanelBase {
    private typeTab:SimpleTab;

    public constructor() {
        super();

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
            item.x = 10 + 100 * i;
            item.y = 10;
            this.addChild(item);
            itemArr.push(item);
        }
        this.typeTab = new SimpleTab(arr);
        this.typeTab.itemChangeCallback = this.onTypeTabItemChange.bind(this);
    }


    /**
     * 初始化数量操作按钮
     */
    private initNumberModeButton() {

    }


    private onTypeTabItemChange(index:number) {
        //TODO build type change
    }
}