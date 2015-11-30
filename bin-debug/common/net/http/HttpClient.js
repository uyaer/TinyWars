/**
 * Http 请求
 */
var HttpClient = (function () {
    function HttpClient() {
        this.callbackList = new HashMap();
    }
    var d = __define,c=HttpClient;p=c.prototype;
    p.send = function (url, data, callback) {
        var loader = new egret.URLLoader();
        this.callbackList.set(loader.hashCode, callback);
        loader.dataFormat = egret.URLLoaderDataFormat.TEXT;
        loader.addEventListener(egret.Event.COMPLETE, this.onPostComplete, this);
        var request = new egret.URLRequest(url);
        request.method = egret.URLRequestMethod.POST;
        var argsArr = [];
        for (var key in data) {
            argsArr.push(key + "=" + data[key]);
        }
        request.data = new egret.URLVariables(argsArr.join("&"));
        loader.load(request);
    };
    p.test = function () {
        var req = new egret.HttpRequest();
        req.responseType = egret.HttpResponseType.TEXT;
        req.open("http://www.bmob.cn/app/runcloud/65830/_e/test/method/post", egret.HttpMethod.POST);
        //var buff:egret.ByteArray = new egret.ByteArray();
        //buff.writeUTF("a=123");
        //buff.position = 0;
        //req.send(buff);
        req.send("a=1");
    };
    p.test2 = function () {
        var Bmob = window["Bmob"];
        var key = "uyaer";
        var timestamp = Math.floor(Date.now() / 1000) + "";
        var data = "{a:123,b:321}";
        var vertify = new md5().hex_md5(key + timestamp + data);
        var sendData = {
            "vertify": vertify,
            "data": data,
            "timestamp": timestamp
        };
        Bmob.Cloud.run('test', { "data": JSON.stringify(sendData) }, {
            success: function (result) {
                alert(result);
            },
            error: function (error) {
            }
        });
    };
    p.onPostComplete = function (event) {
        var loader = event.currentTarget;
        loader.removeEventListener(egret.Event.COMPLETE, this.onPostComplete, this);
        loader.removeEventListener(egret.IOErrorEvent.IO_ERROR, this.onPostIOError, this);
        var data = JSON.parse(loader.data);
        if (loader._request.url.indexOf("xj_update_res.tr") == -1) {
            console.log("post data : ", data);
        }
        //TODO 错误码判断
        var callback = this.callbackList.get(loader.hashCode);
        if (callback) {
            callback(data);
            this.callbackList.remove(loader.hashCode);
        }
    };
    p.onPostIOError = function (event) {
        egret.error("post error : " + event);
    };
    return HttpClient;
})();
egret.registerClass(HttpClient,"HttpClient",["IClient"]);
