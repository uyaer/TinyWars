class BuildingDataManager {
    private static _instance:BuildingDataManager;

    public constructor() {
        if (BuildingDataManager._instance) {
            throw new Error("BuildingDataManager使用单例");
        }
    }

    public static get instance():BuildingDataManager {
        if (!BuildingDataManager._instance) {
            BuildingDataManager._instance = new BuildingDataManager();
        }
        return BuildingDataManager._instance;
    }

    public buildingDataBaseMap:HashMap<number,BuildingVo> = new HashMap<number,BuildingVo>();

    /**
     * 初始化资源
     * @param obj
     */
    public init(arr:any[]) {
        for (var i = 0; i < arr.length; i++) {
            var vo:BuildingVo = new BuildingVo(arr[i]);
            this.buildingDataBaseMap.set(vo.id, vo);
        }
    }

}