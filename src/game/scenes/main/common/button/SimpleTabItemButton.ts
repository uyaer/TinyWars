/**
 * 简单类型的Tab item，需要手动进行new，如果在舞台上的按钮请使用WrapTabItemButton
 */
class SimpleTabItemButton extends eui.Button implements ISimpleTabItem {

    public constructor(title:string) {
        super();
        this.label = title;
    }

    /**
     * 设置选中
     * @param val
     */
    setSelected(val:boolean) {
        this.enabled = !val;
    }

    /**
     * 是否被选中
     */
    isSelected():boolean {
        return !this.enabled;
    }

    /**
     * 获取对象
     */
    getTarget():eui.Button {
        return this;
    }

    /**
     * 添加事件
     * @param type
     * @param callback
     * @param thisObj
     */
    addEvent(type:string, callback:Function, thisObj:any) {
        this.addEventListener(type, callback, thisObj);
    }

    /**
     * 移除事件
     * @param type
     * @param callback
     * @param thisObj
     */
    removeEvent(type:string, callback:Function, thisObj:any) {
        this.removeEventListener(type, callback, thisObj);
    }
}