/**
 * 资源常量
 */
class ResType {
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
     *
     */

    /****金币****/
    static GOLD:number = 101;
    /****奖杯****/
    static CUP:number = 102;
    /****食物****/
    static FOOD:number = 103;
    /****木头****/
    static WOOD:number = 104;
    /****石头****/
    static STONE:number = 105;
    /****金属****/
    static METAL:number = 106;
    /****皮革****/
    static FUR:number = 107;
    /****马匹****/
    static HORSE:number = 108;
    /****龙晶****/
    static CRYSTAL:number = 109;
    /****神石****/
    static GEM:number = 110;
    /****战士****/
    static ARMY_SWORD:number = 111;
    /****弓箭手****/
    static ARMY_ARCHER:number = 112;
    /****骑士****/
    static ARMY_KING:number = 113;
    /****龙****/
    static ARMY_DRAGON:number = 114;

}

class ResCategory {
    /**
     * 基础资源
     * @type {any[]}
     */
    static baseGroup:number[] = [ResType.FOOD, ResType.WOOD, ResType.STONE];
    /**
     * 合成资源
     * @type {any[]}
     */
    static complexGroup:number[] = [ResType.METAL, ResType.FUR, ResType.HORSE, ResType.CRYSTAL];
    /**
     * 士兵资源
     * @type {any[]}
     */
    static armyGroup:number[] = [ResType.ARMY_SWORD, ResType.ARMY_ARCHER, ResType.ARMY_KING, ResType.ARMY_DRAGON];
}
