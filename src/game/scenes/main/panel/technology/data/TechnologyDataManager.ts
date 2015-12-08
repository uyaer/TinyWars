class TechnologyDataManager {
    private static _instance:TechnologyDataManager;

    public constructor() {
        if (TechnologyDataManager._instance) {
            throw new Error("TechnologyDataManager使用单例");
        }
    }

    public static get instance():TechnologyDataManager {
        if (!TechnologyDataManager._instance) {
            TechnologyDataManager._instance = new TechnologyDataManager();
        }
        return TechnologyDataManager._instance;
    }

    /**
     * 科技基础数据
     * @type {HashMap<number, TechnologyVo>}
     */
    public technologyDataBaseMap:HashMap<number,TechnologyVo> = new HashMap<number,TechnologyVo>();

    /**
     * 初始化资源
     * @param obj
     */
    public init(arr:any[]) {
        for (var i = 0; i < arr.length; i++) {
            var vo:TechnologyVo = new TechnologyVo(arr[i]);
            this.technologyDataBaseMap.set(vo.id, vo);
        }
    }

    private cacheCanUpTechnology:TechnologyVo[];

    /**
     * 获取能够提升的科技
     * @returns {TechnologyVo[]}
     */
    public getNowCanUpTechnology():TechnologyVo[] {
        this.cacheCanUpTechnology = [];
        for (var i = 1; i <= 5; i++) {
            var id:number = i * 100 + 1;
            this.loopTechnology(id);
        }

        return this.cacheCanUpTechnology;
    }

    private loopTechnology(id:number) {
        if (id <= 0)return;
        var hasGetTech = Player.instance.vo.technology;
        var vo = this.technologyDataBaseMap.get(id);
        if (vo) {
            //如果有大类直接的关联,并且前置科技没有获得，则条件不满足
            if (vo.condi > 0 && !Util.isElinArr(vo.condi, hasGetTech)) {
                return;
            }
            //小类的条件
            if (!Util.isElinArr(vo.id, hasGetTech)) {
                this.cacheCanUpTechnology.push(vo);
                return;
            } else {
                this.loopTechnology(vo.next_id);
            }
        }
    }

}