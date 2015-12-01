class MenuTabButton implements ISimpleTabItem {
    private btn:eui.Button;

    public constructor(btn:eui.Button, icon:string) {

        this.btn = btn;
        this.btn.icon = icon;
    }

    /**
     * 设置选中
     * @param val
     */
    setSelected(val:boolean) {
        this.btn.enabled = !val;
    }

    /**
     * 是否被选中
     */
    isSelected():boolean {
        return !this.btn.enabled;
    }
    /**
     * 获取对象
     */
    getTarget():eui.Button{
        return this.btn;
    }
    /**
     * 添加事件
     * @param type
     * @param callback
     * @param thisObj
     */
    addEvent(type:string, callback:Function,thisObj:any) {
        this.btn.addEventListener(type, callback, thisObj);
    }

    /**
     * 移除事件
     * @param type
     * @param callback
     * @param thisObj
     */
    removeEvent(type:string, callback:Function,thisObj:any) {
        this.btn.removeEventListener(type, callback, thisObj);
    }
}