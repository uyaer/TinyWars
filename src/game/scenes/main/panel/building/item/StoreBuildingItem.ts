class StoreBuildingItem extends BuildItemBase {
    public constructor(type) {
        super(type);

        this.skinName = new StoreBuildingItemSkin();
    }
}