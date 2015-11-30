/**
 * 用户模块
 */
class UserNet {
    private static _instance:UserNet = new UserNet();

    public constructor() {
        if (UserNet._instance) {
            throw new Error("UserNet 需要使用单例模式");
        }
        UserNet._instance = this;
    }

    public static get instance():UserNet {
        return UserNet._instance;
    }

    public signUp(openId:string, callback:Function) {
        var Bmob = window["Bmob"];
        var user = new Bmob.User();
        user.set("username", openId);
        user.set("password", openId);
        user.set("dataStr", "{}");
        user.signUp(null, {
            success: (user)=> {
                //创建
                this.login(openId, callback);
            },
            error: (user, error)=> {
                console.log("Error: " + error.code + " " + error.message);
            }
        });
    }

    public login(openId, callback:Function) {
        var Bmob = window["Bmob"];
        Bmob.User.logIn(openId, openId, {
            success: (user)=> {
                callback && callback(user);
            },
            error: (user, error) => {
                //没有用户，进行注册
                this.signUp(openId, callback);
            }
        });
    }

    public logOut() {
        var Bmob = window["Bmob"];
        Bmob.User.logOut();
    }

    public save(data) {
        var Bmob = window["Bmob"];
        var user = Bmob.User.current();
        user.set("dataStr", data);
        user.save();
    }

}