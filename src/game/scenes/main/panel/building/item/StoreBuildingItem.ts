class StoreBuildingItem extends BuildingItemBase {
    public constructor(type) {
        super(type);

        this.skinName = new StoreBuildingItemSkin();
    }
}