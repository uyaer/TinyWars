class EventManager extends egret.EventDispatcher {
    private static _instance:EventManager;

    public static get instance():EventManager {
        if (!EventManager._instance) {
            EventManager._instance = new EventManager();
        }
        return EventManager._instance;
    }

    public addEvent(type:string, callback:Function, targetObj:any) {
        this.addEventListener(type, callback, targetObj);
    }

    public removeEvent(type:string, callback:Function, targetObj:any) {
        this.removeEventListener(type, callback, targetObj);
    }

    public dispatch(type:string, data:any = null) {
        this.dispatchEventWith(type, false, data);
    }
}