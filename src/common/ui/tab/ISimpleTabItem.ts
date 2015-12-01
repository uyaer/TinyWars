/**
 * 简单的Tab 子元素项
 */
interface ISimpleTabItem {
    /**
     * 设置选中
     * @param val
     */
    setSelected(val:boolean);
    /**
     * 是否被选中
     */
    isSelected():boolean;
    /**
     * 获取对象
     */
    getTarget():eui.Button;
    /**
     * 添加事件
     * @param type
     * @param callback
     * @param thisObj
     */
    addEvent(type:string, callback:Function, thisObj:any);
    /**
     * 移除事件
     * @param type
     * @param callback
     * @param thisObj
     */
    removeEvent(type:string, callback:Function, thisObj:any);
}