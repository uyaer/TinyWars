class WebSocketClient implements IClient {
    //private callbackList:HashMap<number,Function> = new HashMap<number,Function>();
    //
    //private logger:GameLogger = new GameLogger("WebSocketClient");
    //
    //private socket:egret.WebSocket;
    //
    //public constructor() {
    //    this.initWebSocket();
    //}
    //
    //private initWebSocket():void {
    //    //创建 WebSocket 对象
    //    this.socket = new egret.WebSocket();
    //    //设置数据格式为二进制，默认为字符串
    //    this.socket.type = egret.WebSocket.TYPE_BINARY;
    //    //添加收到数据侦听，收到数据会调用此方法
    //    this.socket.addEventListener(egret.ProgressEvent.SOCKET_DATA, this.onReceiveMessage, this);
    //    //添加链接打开侦听，连接成功会调用此方法
    //    this.socket.addEventListener(egret.Event.CONNECT, this.onSocketOpen, this);
    //    //添加链接关闭侦听，手动关闭或者服务器关闭连接会调用此方法
    //    this.socket.addEventListener(egret.Event.CLOSE, this.onSocketClose, this);
    //    //添加异常侦听，出现异常会调用此方法
    //    this.socket.addEventListener(egret.IOErrorEvent.IO_ERROR, this.onSocketError, this);
    //    //连接服务器
    //    this.socket.connect("echo.websocket.org", 80);
    //}
    //
    //private onSocketOpen():void {
    //    this.logger.log("socket open..");
    //    if (this.blockSendMessage && this.blockSendMessage.length > 0) {
    //        this.send(this.blockSendMessage[0], this.blockSendMessage[1], this.blockSendMessage[2]);
    //    }
    //}
    //
    //private onSocketClose():void {
    //    this.logger.log("socket Close..");
    //}
    //
    //private onSocketError():void {
    //    this.logger.log("socket Error..");
    //}
    //
    //private onReceiveMessage(e:egret.Event):void {
    //    //创建 ByteArray 对象
    //    var byte:egret.ByteArray = new egret.ByteArray();
    //    //读取数据
    //    this.socket.readBytes(byte);
    //    //读取字符串信息
    //    var msg:string = byte.readUTF();
    //    console.log("收到的数据" + msg);
    //}
    //
    //private blockSendMessage:any[];
    //
    //public send(url:string, data:Object, callback:Function) {
    //    if (this.socket.connected) {
    //        //创建 ByteArray 对象
    //        var byte:egret.ByteArray = new egret.ByteArray();
    //        //写入字符串信息
    //        var dataStr:string = JSON.stringify(data);
    //        this.logger.log("发送数据：" + dataStr);
    //        byte.writeUTF(dataStr);
    //        byte.position = 0;
    //        //发送数据
    //        this.socket.writeBytes(byte, 0, byte.bytesAvailable);
    //    } else {
    //        this.blockSendMessage = [url, data, callback];
    //    }
    //}



    send(url:string, data:Object, callback:Function){}

}