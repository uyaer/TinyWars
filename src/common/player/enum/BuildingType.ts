
/**
 * 资源建筑
 */
class BuildingType {
    /**
     * 农场
     * @type {number}
     */
    static RES_FOOD:number = 101;
    /**
     * 伐木场
     * @type {number}
     */
    static RES_WOOD:number = 102;
    /**
     * 采石场
     * @type {number}
     */
    static RES_STONE:number = 103;
    /**
     * 冶炼厂
     * @type {number}
     */
    static FACTORY_METAL:number = 104;
    /**
     * 皮革制造厂
     * @type {number}
     */
    static FACTORY_FUR:number = 105;
    /**
     * 马厩
     * @type {number}
     */
    static FACTORY_HORSE:number = 106;
    /**
     * 高科技聚合冶炼研究所
     * @type {number}
     */
    static FACTORY_CRYSTAL:number = 107;
    /**
     * 谷仓
     * @type {number}
     */
    static STORE_FOOD:number = 108;
    /**
     * 木料存储棚
     * @type {number}
     */
    static STORE_WOOD:number = 109;
    /**
     * 石料存储棚
     * @type {number}
     */
    static STORE_STONE:number = 110;

    /**
     * 步兵(剑)
     * @type {number}
     */
    static WAR_SWORD:number = 111;
    /**
     * 弓箭兵
     * @type {number}
     */
    static WAR_ARCHER:number = 112;
    /**
     * 骑兵
     * @type {number}
     */
    static WAR_KNIGHT:number = 113;
    /**
     * 龙
     * @type {number}
     */
    static WAR_DRAGON:number = 114;
}

class BuildingCategory {
    /**
     * 资源
     * @type {number}
     */
    static RES:number = 1;
    /**
     * 工业
     * @type {number}
     */
    static FACTORY:number = 2;
    /**
     * 仓库
     * @type {number}
     */
    static STORE:number = 3;
    /**
     * 军事
     * @type {number}
     */
    static WAR:number = 4;

    static resGroup:number[] = [BuildingType.RES_FOOD, BuildingType.RES_WOOD, BuildingType.RES_STONE];
    static factoryGroup:number[] = [BuildingType.FACTORY_METAL, BuildingType.FACTORY_FUR, BuildingType.FACTORY_HORSE, BuildingType.FACTORY_CRYSTAL];
    static storeGroup:number[] = [BuildingType.STORE_FOOD, BuildingType.STORE_WOOD, BuildingType.STORE_STONE];
    static warGroup:number[] = [BuildingType.WAR_SWORD, BuildingType.WAR_ARCHER, BuildingType.WAR_KNIGHT, BuildingType.WAR_DRAGON];
}
