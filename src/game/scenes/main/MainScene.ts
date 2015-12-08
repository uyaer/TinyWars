class MainScene extends SceneBase {
    public constructor() {
        super();

        this.initCommonConfig();

        this.skinName = new MainSceneSkin();
    }

    /**
     * 初始化配置表
     */
    private initCommonConfig() {
        var data = RES.getRes("data_json");
        //建筑数据
        BuildingDataManager.instance.init(data["building"]);
        //科技数据
        TechnologyDataManager.instance.init(data["technology"]);
        //军队数据
        ArmyDataManager.instance.init(data["army"]);


        Player.instance.init();
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

    protected createChildren() {
        super.createChildren();

        this.initMenuTab();
        this.initResItem();
        this.initLandscape();
        this.initUpdateEvent();
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
     * 添加资源更新事件
     */
    private initUpdateEvent() {
        EventManager.instance.addEvent(EventName.RESOURCE_CHANGE, this.onResourceUpdate, this);
    }

    /**
     * 每一秒的时间计时器执行
     */
    private onResourceUpdate(e:egret.Event) {
        var types:number[] = e.data;
        var len = this.resItemArr.length;
        for (var i = 0; i < len; i++) {
            var item = this.resItemArr[i];
            if (Util.isElinArr(item.resType, types)) {
                item.update();
            }
        }
    }


    private onMenuTabItemChange(index:number) {
        var arr = [ClickResPanel, BuildingGroupPanel, TechnologyGroupPanel,
            WarGroupPanel];
        if (this.viewPanel) {
            this.viewPanel.hide();
        }
        this.viewPanel = new arr[index](this);
        this.viewPanel.y = 320;
    }


    protected destroy() {
        this.menuTab.destroy();
        this.landscape.destroy();
        EventManager.instance.removeEvent(EventName.RESOURCE_CHANGE,
            this.onResourceUpdate, this);
    }
}