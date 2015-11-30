/**
 * 用户模块
 */
var UserNet = (function () {
    function UserNet() {
        if (UserNet._instance) {
            throw new Error("UserNet 需要使用单例模式");
        }
        UserNet._instance = this;
    }
    var d = __define,c=UserNet;p=c.prototype;
    d(UserNet, "instance"
        ,function () {
            return UserNet._instance;
        }
    );
    p.signUp = function (openId, callback) {
        var _this = this;
        var Bmob = window["Bmob"];
        var user = new Bmob.User();
        user.set("username", openId);
        user.set("password", openId);
        user.set("dataStr", "");
        user.signUp(null, {
            success: function (user) {
                //创建
                _this.login(openId, callback);
            },
            error: function (user, error) {
                console.log("Error: " + error.code + " " + error.message);
            }
        });
    };
    p.login = function (openId, callback) {
        var _this = this;
        var Bmob = window["Bmob"];
        Bmob.User.logIn(openId, openId, {
            success: function (user) {
                callback && callback(user);
            },
            error: function (user, error) {
                //没有用户，进行注册
                _this.signUp(openId, callback);
            }
        });
    };
    p.logOut = function () {
        var Bmob = window["Bmob"];
        Bmob.User.logOut();
    };
    p.save = function (data) {
        var Bmob = window["Bmob"];
        var user = Bmob.User.current();
        user.set("dataStr", data);
        user.save();
    };
    UserNet._instance = new UserNet();
    return UserNet;
})();
egret.registerClass(UserNet,"UserNet");
