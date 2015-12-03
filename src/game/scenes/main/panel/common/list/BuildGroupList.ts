class BuildGroupList extends eui.Group {
    private itemArr:BuildItemBase[] = [];
    /**
     * 项目的类型
     */
    private _itemClass:any;
    /**
     * 数据适配器
     */
    private _dataProvider:any[];
    /**
     * 间距
     */
    private _padding:number = 100;

    public constructor() {
        super();

        this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAdded, this);
        this.addEventListener(egret.Event.REMOVED_FROM_STAGE, this.onRemoved, this);
    }

    /**
     * 当添加到舞台上
     */
    protected  onAdded() {
        this.removeEventListener(egret.Event.ADDED_TO_STAGE, this.onAdded, this);
    }

    /**
     * 当添加到舞台上
     */
    protected onRemoved() {
        this.removeEventListener(egret.Event.REMOVED_FROM_STAGE, this.onRemoved, this);

        this.destroy();
    }

    /**
     * 销毁
     */
    protected destroy() {
        var len = this.itemArr.length;
        for (var i = 0; i < len; i++) {
            egret.Tween.removeTweens(this.itemArr[i]);
            UIUtils.removeSelf(this.itemArr[i]);
        }
        this.itemArr.length = 0;
    }

    public set itemClass(val:any) {
        this._itemClass = val;
    }

    /**
     * 项目的间距
     * @param val
     */
    public set padding(val:any) {
        this._padding = val;
    }

    /**
     * 设置数据后会立即刷新界面，所以应该最后设置数据
     * @param val
     */
    public set dataProvider(val:any[]) {
        this._dataProvider = val;

        this.hideOldItems();
    }

    private hideOldItems() {
        var len = this.itemArr.length;
        if (len > 0) {
            for (var i = 0; i < len; i++) {
                var item = this.itemArr[i];
                egret.Tween.get(item)
                    .wait(100 * i)
                    .to({x: -Const.WIN_W}, 200)
                    .call(UIUtils.removeSelf, this, [item]);
            }

            //延迟
            egret.setTimeout(this.showNewItems, this, len * 50);
        } else {
            this.showNewItems();
        }
    }

    private showNewItems() {
        this.itemArr = [];
        for (var i = 0; i < this._dataProvider.length; i++) {
            var item = new this._itemClass(this._dataProvider[i]);
            item.x = Const.WIN_W;
            item.y = this._padding * i;
            this.addChild(item);
            this.itemArr.push(item);

            egret.Tween.get(item)
                .wait(100 * i)
                .to({x: 0}, 200)
        }
    }

    /**
     * 获取所有当item
     * @returns {BuildItemBase[]}
     */
    public get allItems(){
        return this.itemArr;
    }
}