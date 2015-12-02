/**
 * 已经在舞台上的按钮包裹一层协议
 */
class WrapTabItemButton implements ISimpleTabItem {
    private btn:eui.Button;

    public constructor(btn:eui.Button, icon:string) {

        this.btn = btn;
        if(this.btn.iconDisplay){
            this.btn.icon = icon;
        }else{
            this.btn.label = icon;
        }
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