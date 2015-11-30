/**
 * Created by Administrator on 2015/11/11 0011.
 */
interface IClient {
    /**
     *
     * @param url 服务器地址
     * @param data 请求数据
     * @param callback 回调方法
     */
    send(url:string, data:Object, callback:Function);
}