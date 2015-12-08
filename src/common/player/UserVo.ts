/**
 * 用户各种数据 (专门用于服务器数据同步)
 */
class UserVo {

    /****** 资源 *******/
    public resource:HashMap<number,number> = new HashMap<number,number>();
    /****** 建筑 *******/
    public building:HashMap<number,number> = new HashMap<number,number>();
    /****** 工厂开工情况(key是工厂id) *******/
    public factory:HashMap<number,boolean> = new HashMap<number,boolean>();
    /****** 已经升级了的科技 *******/
    public technology:number[] = [];
    /****** 建筑队列 *******/
    public buildQueue:BuildQueueVo[] = [];


}