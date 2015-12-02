class FactoryBuildingItem extends BuildingItemBase {
    public constructor(type:number) {
        super(type);

        this.skinName = new FactoryBuildingItemSkin();
    }
}