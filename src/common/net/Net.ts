/**
 * Created by Administrator on 2015/11/11 0011.
 */
class Net {
    private static _instance:Net;
    private client:IClient;

    static baseURL:string = "http://115.159.4.113/WeChatServer/";
    //static baseURL: string = "http://192.168.100.130:8080/WeChatServer/";

    public constructor() {
        this.client = new HttpClient();
        //this.client = new WebSocketClient();
    }

    public static get instance():Net {
        if (!Net._instance) {
            Net._instance = new Net();
        }
        return Net._instance;
    }

    /**
     * net请求
     * @param code {NetModule}里的地址
     * @param data {Object|null} 数据
     * @param callback {Function} 回调
     */
    public send(code:string, data:Object, callback:Function) {
        if (this.client instanceof HttpClient) {
            var url = Net.baseURL + code;
            this.client.send(url, data, callback);
        } else {
            this.client.send("", data, null);
        }
    }
}
