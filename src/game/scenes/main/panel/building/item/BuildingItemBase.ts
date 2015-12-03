class BuildingItemBase extends BuildItemBase {
    private vo:BuildingVo;

    public constructor(type) {
        super(type);

        this.vo = BuildingDataManager.instance.buildingDataBaseMap.get(type);
    }


    protected createChildren() {
        super.createChildren();

        this.icon.source = "building_icon_" + this.type + "_png";
        this.nameTF.text = this.vo.name;
        this.descTF.text = this.vo.desc;
        this.lvTF.text = "Lv." + Player.instance.vo.building.get(this.type);
    }

    public updateBuildButton() {

    }

}