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

    private menuTab:SimpleTab;

    protected createChildren() {
        super.createChildren();

        this.initMenuTab();
    }

    private initMenuTab() {
        var arr = [
            new MenuTabButton(this.btnHome, "menu_food_png"),
            new MenuTabButton(this.btnBuilding, "menu_build_png"),
            new MenuTabButton(this.btnTechnology, "menu_technology_png"),
            new MenuTabButton(this.btnCamp, "menu_war_png"),
            new MenuTabButton(this.btnAlliance, "menu_union_png"),
            new MenuTabButton(this.btnShop, "menu_shop_png"),
            new MenuTabButton(this.btnSetting, "menu_setting_png")
        ];
        this.menuTab = new SimpleTab(arr);

        this.menuTab.selectIndex = 0;
    }
}