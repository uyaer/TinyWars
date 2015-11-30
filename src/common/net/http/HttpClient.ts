/**
 * Http 请求
 */
class HttpClient implements IClient {

    private callbackList:HashMap<number,Function> = new HashMap<number,Function>();

    public send(url:string, data:Object, callback:Function) {

        var loader:egret.URLLoader = new egret.URLLoader();
        this.callbackList.set(loader.hashCode, callback);
        loader.dataFormat = egret.URLLoaderDataFormat.TEXT;
        loader.addEventListener(egret.Event.COMPLETE, this.onPostComplete, this);

        var request:egret.URLRequest = new egret.URLRequest(url);
        request.method = egret.URLRequestMethod.POST;
        var argsArr = [];
        for (var key in data) {
            argsArr.push(key + "=" + data[key]);
        }
        request.data = new egret.URLVariables(argsArr.join("&"));
        loader.load(request);

    }

    public test() {
        var req:egret.HttpRequest = new egret.HttpRequest();
        req.responseType = egret.HttpResponseType.TEXT;
        req.open("http://www.bmob.cn/app/runcloud/65830/_e/test/method/post", egret.HttpMethod.POST);
        //var buff:egret.ByteArray = new egret.ByteArray();
        //buff.writeUTF("a=123");
        //buff.position = 0;
        //req.send(buff);
        req.send("a=1");
    }
    public test2() {
        var Bmob = window["Bmob"];
        var key = "uyaer";
        var timestamp = Math.floor(Date.now()/1000)+"";
        var data = "{a:123,b:321}";
        var vertify = new md5().hex_md5(key+timestamp+data);
        var sendData = {
            "vertify":vertify,
            "data":data,
            "timestamp":timestamp
        }
        Bmob.Cloud.run('test', {"data":JSON.stringify(sendData)}, {
            success: function(result) {
                alert(result);
            },
            error: function(error) {
            }
        })
    }

    private onPostComplete(event:egret.Event):void {
        var loader = <egret.URLLoader>event.currentTarget;
        loader.removeEventListener(egret.Event.COMPLETE, this.onPostComplete, this);
        loader.removeEventListener(egret.IOErrorEvent.IO_ERROR, this.onPostIOError, this);

        var data = JSON.parse(loader.data);
        if (loader._request.url.indexOf("xj_update_res.tr") == -1) {
            console.log("post data : ", data);
        }
        //TODO 错误码判断
        var callback:Function = this.callbackList.get(loader.hashCode);
        if (callback) {
            callback(data);
            this.callbackList.remove(loader.hashCode);
        }
    }

    private onPostIOError(event:egret.IOErrorEvent):void {
        egret.error("post error : " + event);
    }
}