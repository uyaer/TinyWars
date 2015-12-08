/**
 * 兵营页面总页面
 */
class WarGroupPanel extends SlidePanelBase {
    /**
     * 下面的数量切换
     */
    private numberTab:SimpleTab;

    private groupList:eui.Group;
    private allItems:WarItem[];

    public constructor(viewParent:any) {
        super(viewParent);

        this.skinName = null;
        this.init(null);

        this.initNumberModeButton();
        this.initGroupList();
    }

    /**
     * 初始化数量操作按钮
     */
    private initNumberModeButton() {
        if (this.numberTab) {
            this.numberTab.destroy();
        }
        //var arr = ["x1", "x10", "x100", "x1K", "x10K"];
        var arr = ["x1", "x10", "x100"];
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

        ArmyDataManager.instance.refreshCost();

        this.groupList = new eui.Group();
        this.groupList.y = 20;
        this.addChild(this.groupList);

        this.updateGroupList();
    }

    private onNumberTabItemChange(index:number) {
        // build number change
        Player.instance.buildNumberIndex = index;
        ArmyDataManager.instance.refreshCost();
        var len = this.allItems.length;
        for (var i = 0; i < len; i++) {
            var item = this.allItems[i];
            item.updateBuildNumber();
        }
    }

    private updateGroupList() {
        this.allItems = [];
        this.groupList.removeChildren();
        var armyIdArr = ResCategory.armyGroup;
        for (var i = 0; i < armyIdArr.length; i++) {
            var vo:ArmyVo = ArmyDataManager.instance.getArmyVo(armyIdArr[i]);
            var item:WarItem = new WarItem(vo.id);
            item.y = 10 + 105 * i;
            this.groupList.addChild(item);
            this.allItems.push(item);
        }
    }

}