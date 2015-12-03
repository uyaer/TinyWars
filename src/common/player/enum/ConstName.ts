
/**
 * 资源名称
 */
class ResName {
    /**
     * {"id":101,"name":"金币","icon":"mater_101_png","ptype":1},
     {"id":102,"name":"奖杯","icon":"mater_102_png","ptype":1},
     {"id":103,"name":"食物","icon":"mater_103_png","ptype":2},
     {"id":104,"name":"木头","icon":"mater_104_png","ptype":2},
     {"id":105,"name":"石头","icon":"mater_105_png","ptype":2},
     {"id":106,"name":"金属","icon":"mater_106_png","ptype":2},
     {"id":107,"name":"皮革","icon":"mater_107_png","ptype":2},
     {"id":108,"name":"马匹","icon":"mater_108_png","ptype":2},
     {"id":109,"name":"龙晶","icon":"mater_109_png","ptype":2},
     {"id":110,"name":"圣石","icon":"mater_110_png","ptype":2}
     */
    private static _name = ["", "金币", "奖杯", "食物", "木头", "石头", "金属", "皮革", "战马", "龙晶", "神石"];

    public static getName(type:number) {
        return ResName._name[type - 100];
    }
}