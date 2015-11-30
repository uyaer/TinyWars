/**
 * Created by Administrator on 2015/11/11 0011.
 */
var Net = (function () {
    //static baseURL: string = "http://192.168.100.130:8080/WeChatServer/";
    function Net() {
        this.client = new HttpClient();
        //this.client = new WebSocketClient();
    }
    var d = __define,c=Net;p=c.prototype;
    d(Net, "instance"
        ,function () {
            if (!Net._instance) {
                Net._instance = new Net();
            }
            return Net._instance;
        }
    );
    /**
     * net请求
     * @param code {NetModule}里的地址
     * @param data {Object|null} 数据
     * @param callback {Function} 回调
     */
    p.send = function (code, data, callback) {
        if (this.client instanceof HttpClient) {
            var url = Net.baseURL + code;
            this.client.send(url, data, callback);
        }
        else {
            this.client.send("", data, null);
        }
    };
    Net.baseURL = "http://115.159.4.113/WeChatServer/";
    return Net;
})();
egret.registerClass(Net,"Net");
