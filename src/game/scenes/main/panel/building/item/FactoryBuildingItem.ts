class FactoryBuildingItem extends BuildItemBase {
    public constructor(type:number) {
        super(type);

        this.skinName = new FactoryBuildingItemSkin();
    }
}