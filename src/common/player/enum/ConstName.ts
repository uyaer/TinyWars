class BuildingName {
    private static _resBuildingName = ["", "小小农场", "伐木累", "采石场"];
    private static _storeBuildingName = ["", "谷仓", "木料存储棚", "石料存储棚"];
    private static _factoryBuildingName = ["", "冶炼厂", "皮革制造厂", "马厩", "高科技聚合冶炼研究所"];
    private static _warBuildingName = ["", "屌丝炮灰营", "冷库的射手训练基地", "冲锋骑兵大营", "高大上的龙穴"];

    /**
     * 获取资源建筑名称
     * @param type
     * @returns {string}
     */
    public static getResBuildingName(type:number) {
        return BuildingName._resBuildingName[type - 100];
    }

    /**
     * 获取仓库建筑名称
     * @param type
     * @returns {string}
     */
    public static getStoreBuildingName(type:number) {
        return BuildingName._storeBuildingName[type - 200];
    }

    /**
     * 获取工业建筑名称
     * @param type
     * @returns {string}
     */
    public static getFactoryBuildingName(type:number) {
        return BuildingName._factoryBuildingName[type - 300];
    }

    /**
     * 获取军事建筑名称
     * @param type
     * @returns {string}
     */
    public static getWarBuildingName(type:number) {
        return BuildingName._warBuildingName[type - 400];
    }
}

/**
 * 资源名称
 */
class ResName {
    private static _name = ["", "食物", "木头", "石头", "金属", "皮革", "马匹", "龙晶", "奖杯", "金币", "神石"];

    public static getName(type:number) {
        return ResName._name[type];
    }
}