class MainScene extends SceneBase {
    public constructor() {
        super();

        this.skinName = new MainSceneSkin();


    }

    private btnHome:eui.Button;
    private btnBuilding:eui.Button;
    private btnTechnology:eui.Button;
    private btnCamp:eui.Button;
    private btnAlliance:eui.Button;
    private btnShop:eui.Button;
    private btnSetting:eui.Button;
    private topGroup:eui.Group;

    private menuTab:SimpleTab;
    private resItemArr:ResItemBase[];
    private landscape:Landscape;
    private viewPanel:SlidePanelBase;
    /**
     * * 每一秒的时间计时器
     */
    private timer:egret.Timer;


    protected createChildren() {
        super.createChildren();

        this.initMenuTab();
        this.initResItem();
        this.initLandscape();
        this.initUpdateTimer();
    }

    private initMenuTab() {
        var arr = [
            new WrapTabItemButton(this.btnHome, "menu_food_png"),
            new WrapTabItemButton(this.btnBuilding, "menu_build_png"),
            new WrapTabItemButton(this.btnTechnology, "menu_technology_png"),
            new WrapTabItemButton(this.btnCamp, "menu_war_png"),
            new WrapTabItemButton(this.btnAlliance, "menu_union_png"),
            new WrapTabItemButton(this.btnShop, "menu_shop_png"),
            new WrapTabItemButton(this.btnSetting, "menu_setting_png")
        ];
        this.menuTab = new SimpleTab(arr);
        this.menuTab.itemChangeCallback = this.onMenuTabItemChange.bind(this);
        this.menuTab.selectIndex = 0;
    }

    private initResItem() {
        this.resItemArr = [];
        var arr = [ResType.FOOD, ResType.WOOD, ResType.STONE];
        for (var i = 0; i < arr.length; i++) {
            var item:ResItemBase = new FirstResItem(arr[i]);
            item.x = 10 + i * 210;
            item.y = 5;
            this.topGroup.addChild(item);
            this.resItemArr.push(item);
        }
        var arr = [ResType.METAL, ResType.FUR, ResType.HORSE, ResType.CRYSTAL];
        for (var i = 0; i < arr.length; i++) {
            var item:ResItemBase = new SecondResItem(arr[i]);
            item.x = 10 + (i % 2) * 315;
            item.y = 56 + int(i / 2) * 39;
            this.topGroup.addChild(item);
            this.resItemArr.push(item);
        }
        var arr = [ResType.CUP, ResType.GOLD, ResType.GEM];
        for (var i = 0; i < arr.length; i++) {
            var item:ResItemBase = new ThirdResItem(arr[i]);
            item.x = 10 + i * 210;
            item.y = 134;
            this.topGroup.addChild(item);
            this.resItemArr.push(item);
        }
    }

    /**
     * 创建连环场景
     */
    private initLandscape() {
        this.landscape = new Landscape();
        this.landscape.y = 174;
        this.addChild(this.landscape);
    }

    /**
     * 创建刷新界面的计时器
     */
    private initUpdateTimer() {
        this.timer = new egret.Timer(500);
        this.timer.addEventListener(egret.TimerEvent.TIMER, this.onUpdateTimer, this);
        this.timer.start();
    }

    /**
     * 每一秒的时间计时器执行
     */
    private onUpdateTimer() {
        var len = this.resItemArr.length;
        for (var i = 0; i < len; i++) {
            var item = this.resItemArr[i];
            item.update();
        }
    }


    private onMenuTabItemChange(index:number) {
        var arr = [ClickResPanel,BuildingGroupPanel];
        if (this.viewPanel) {
            this.viewPanel.hide();
        }
        this.viewPanel = new arr[index](this);
        this.viewPanel.y = 320;
    }


    protected destroy() {
        this.menuTab.destroy();
        this.landscape.destroy();
        this.timer.removeEventListener(egret.TimerEvent.TIMER, this.onUpdateTimer, this);
        this.timer.stop();
    }
}