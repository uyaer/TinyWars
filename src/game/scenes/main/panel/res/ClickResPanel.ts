class ClickResPanel extends SlidePanelBase {
    public constructor() {
        super();

        this.uiSkinName = new ClickResPanelSkin();

        this.init("clickres");
    }

    private btnFood:eui.Button;
    private btnStone:eui.Button;
    private btnWood:eui.Button;
}