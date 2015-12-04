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

    /**
     * 建筑基础数据
     * @type {HashMap<number, BuildingVo>}
     */
    public buildingDataBaseMap:HashMap<number,BuildingVo> = new HashMap<number,BuildingVo>();
    /**
     * 建筑可以升级的次数
     * @type {HashMap<number, number>}
     */
    public buildingCanUpLevel:HashMap<number,number> = new HashMap<number,number>();
    /**
     * 建筑是否可以升级
     * @type {HashMap<number, number>}
     */
    public buildingIsCanUpLevel:HashMap<number,boolean> = new HashMap<number,boolean>();

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

    /**
     * 当前显示的建筑类型
     * @type {number}
     */
    private nowType:number = 1;
    public refreshCost = function (type?:number) {
        if (type) {
            this.nowType = type;
        }
        var count = Math.min(10000, Player.instance.buildMax);
        var arr:number[];
        if (this.nowType == BuildingCategory.RES) { //资源生产
            arr = BuildingCategory.resGroup;
        } else if (this.nowType == BuildingCategory.FACTORY) { //工厂
            arr = BuildingCategory.factoryGroup;
        } else if (this.nowType == BuildingCategory.STORE) { //仓库
            arr = BuildingCategory.storeGroup;
        } else if (this.nowType == BuildingCategory.WAR) { //工厂
            arr = BuildingCategory.warGroup;
        }
        for (var i = 0; i < arr.length; i++) {
            this.refreshCostOne(arr[i], count);
        }
    }

    private refreshCostOne(buildingId:number, maxUpCount:number) {
        var buildingVo = this.buildingDataBaseMap.get(buildingId);
        var costArr = buildingVo.cost;
        var i = 0;
        ///是否能够修建
        var isCanBuilding = true;
        var makeCount = 1;
        //能够升级的最小值
        var minLv = 99999;
        //消耗分别能够升的等级
        var canUpLvArr = [0, 0, 0];
        //已经消耗的资源数量
        var hasCostResNum = [0, 0, 0];
        for (i; i < costArr.length; i++) {
            var costVo:BuildingCostVo = costArr[i];
            var lv = Player.instance.vo.building.get(buildingId, 0);
            var hasNum:number = Player.instance.getResourceCount(costVo.propId);
            for (var j = 0; j < 51; j++) {
                if (canUpLvArr[i] < maxUpCount) {
                    var phase = Math.ceil((lv + 1) / 200);
                    var costOne = costVo.par1 * phase * phase + costArr[i].par2 * phase + costArr[i].par3;
                    //确保是100的倍数
                    if (costOne > 100) {
                        (costOne -= costOne % 100);
                    }
                    //当前阶段可以升级的级数，有可能不满200
                    var canUpLvPhase = Math.min(200 * phase, lv + maxUpCount) - lv;
                    if (hasCostResNum[i] + canUpLvPhase * costOne > hasNum) {//资源数量不够，计算够的级数
                        var onlyLv = Math.floor((hasNum - hasCostResNum[i]) / costOne);
                        canUpLvArr[i] += onlyLv;
                        hasCostResNum[i] += onlyLv * costOne;
                        break;
                    } else {
                        canUpLvArr[i] += canUpLvPhase;
                        hasCostResNum[i] += canUpLvPhase * costOne;
                        lv += canUpLvPhase;
                    }
                } else {
                    break;
                }
            }
        }
        //查找能够升级的最小值
        for (i = 0; i < costArr.length; i++) {
            if (canUpLvArr[i] < minLv) {
                (minLv = canUpLvArr[i]);
            }
        }
        if (99999 == minLv || 0 == minLv) {
            minLv = 1;
            isCanBuilding = false;
        }
        this.buildingIsCanUpLevel.set(buildingId, isCanBuilding);

        //重新计算消耗
        canUpLvArr = [0, 0, 0];
        hasCostResNum = [0, 0, 0];
        maxUpCount = minLv;
        for (i=0; i < costArr.length; i++) {
            var costVo:BuildingCostVo = costArr[i];
            var lv = Player.instance.vo.building.get(buildingId, 0);
            for (var j = 0; j < 51; j++) {
                if (canUpLvArr[i] < maxUpCount) {
                    var phase = Math.ceil((lv + 1) / 200);
                    var costOne = costVo.par1 * phase * phase + costArr[i].par2 * phase + costArr[i].par3;
                    //确保是100的倍数
                    if (costOne > 100) {
                        (costOne -= costOne % 100);
                    }
                    //当前阶段可以升级的级数，有可能不满200
                    var canUpLvPhase = Math.min(200 * phase, lv + maxUpCount) - lv;
                    canUpLvArr[i] += canUpLvPhase;
                    hasCostResNum[i] += canUpLvPhase * costOne;
                    lv += canUpLvPhase;
                } else {
                    //设置缓存
                    costVo.cacheCostCount = hasCostResNum[i];
                    break;
                }
            }
        }

        //将值设置到缓存
        this.buildingCanUpLevel.set(buildingId, minLv);
    }
}