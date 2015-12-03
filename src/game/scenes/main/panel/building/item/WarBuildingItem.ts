class WarBuildingItem extends BuildItemBase {
    public constructor(type) {
        super(type);

        this.skinName = new WarBuildingItemSkin();
    }
}