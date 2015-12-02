class ResBuildingItem extends BuildingItemBase {
    public constructor(type) {
        super(type);

        this.skinName = new ResBuildingItemSkin();
    }
}