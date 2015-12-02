class WarBuildingItem extends BuildingItemBase {
    public constructor(type) {
        super(type);

        this.skinName = new WarBuildingItemSkin();
    }
}