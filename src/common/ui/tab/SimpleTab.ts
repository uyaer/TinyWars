/**
 * 简单的tab组
 */
class SimpleTab {

    /**
     * ISimpleTabItem类型
     */
    private itemArr:ISimpleTabItem[];

    public itemChangeCallback:Function;

    private _selectIndex:number = -1;

    public constructor(arr:any[]) {

        this.itemArr = arr;

        for (var i = 0; i < this.itemArr.length; i++) {
            var item = this.itemArr[i];
            item.addEvent(egret.TouchEvent.TOUCH_TAP, this.onItemClick, this);
        }
    }

    private onItemClick(e:egret.TouchEvent) {
        var target = e.currentTarget;
        for (var i = 0; i < this.itemArr.length; i++) {
            var item = this.itemArr[i];
            if (target == item.getTarget()) {
                if (!item.isSelected()) {
                    item.setSelected(true);
                    this._selectIndex = i;
                    this.itemChangeCallback && this.itemChangeCallback(i);
                }
            } else {
                item.setSelected(false);
            }
        }
    }

    public get selectIndex() {
        return this._selectIndex;
    }

    public set selectIndex(val:number) {
        if (val == this._selectIndex)return;
        for (var i = 0; i < this.itemArr.length; i++) {
            var item = this.itemArr[i];
            if (i == val) {
                item.setSelected(true);
                this._selectIndex = i;
                this.itemChangeCallback && this.itemChangeCallback(i);
            } else {
                item.setSelected(false);
            }
        }
    }

    /**
     * 获取所有的item
     * @returns {ISimpleTabItem[]}
     */
    public get menuItemArr() {
        return this.itemArr;
    }

    /**
     * 销毁
     */
    public destroy() {
        for (var i = 0; i < this.itemArr.length; i++) {
            var item = this.itemArr[i];
            item.removeEvent(egret.TouchEvent.TOUCH_TAP, this.onItemClick, this);
        }
        this.itemChangeCallback = null;
        this.itemArr = null;
    }
}