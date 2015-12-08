class ArmyDataManager {
    private static _instance:ArmyDataManager;

    public constructor() {
        if (ArmyDataManager._instance) {
            throw new Error("ArmyDataManager使用单例");
        }
    }

    public static get instance():ArmyDataManager {
        if (!ArmyDataManager._instance) {
            ArmyDataManager._instance = new ArmyDataManager();
        }
        return ArmyDataManager._instance;
    }

    /**
     * 士兵基础数据
     * @type {HashMap<number, ArmyVo>}
     */
    public armyDataBaseMap:HashMap<number,ArmyVo> = new HashMap<number,ArmyVo>();
    /**
     * 士兵可以生产的次数
     * @type {HashMap<number, number>}
     */
    public armyCanCreateNumber:HashMap<number,number> = new HashMap<number,number>();
    /**
     * 士兵是否可以生产
     * @type {HashMap<number, number>}
     */
    public armyIsCanCreate:HashMap<number,boolean> = new HashMap<number,boolean>();

    /**
     * 初始化资源
     * @param obj
     */
    public init(arr:any[]) {
        for (var i = 0; i < arr.length; i++) {
            var vo:ArmyVo = new ArmyVo(arr[i]);
            this.armyDataBaseMap.set(vo.id + "_" + vo.level, vo);
        }
    }

    public getArmyVo(armyId:number, lv?:number) {
        var lv = lv || Player.instance.getArmyLevel(armyId);
        return this.armyDataBaseMap.get(armyId + "_" + lv);
    }

    public refreshCost = function () {
        var count = Math.min(10000, Player.instance.buildMax);
        var arr:number[] = ResCategory.armyGroup;
        for (var i = 0; i < arr.length; i++) {
            this.refreshCostOne(arr[i], count);
        }
    }

    private refreshCostOne(armyId:number, maxCount:number) {
        var armyVo = this.getArmyVo(armyId);
        var capacity:number = Player.instance.getResourceCapacity(armyId);
        var hasNum:number = Player.instance.getResourceCount(armyId);
        var costArr = armyVo.cost;
        var i = 0;
        ///是否能够修建
        var isCanBuilding = true;
        //能够创建的最小值
        var minNum = Math.min(maxCount, capacity - hasNum);
        for (i; i < costArr.length; i++) {
            var costVo:ResourceCostVo = costArr[i];
            var hasNum:number = Player.instance.getResourceCount(costVo.propId);
            var canCreateNum = int(hasNum / costVo.costNum);
            if (canCreateNum < minNum) {
                minNum = canCreateNum;
            }
        }
        if (minNum <= 0) {
            minNum = 1;
            isCanBuilding = false;
        }
        //将值设置到缓存
        this.armyIsCanCreate.set(armyId, isCanBuilding);
        this.armyCanCreateNumber.set(armyId, minNum);
    }


}