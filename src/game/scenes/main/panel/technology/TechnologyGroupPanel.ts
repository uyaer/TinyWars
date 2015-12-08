/**
 * 科技页面总页面
 */
class TechnologyGroupPanel extends SlidePanelBase {

    private groupList:eui.Group;

    public constructor(viewParent:any) {
        super(viewParent);

        this.skinName = null;
        this.init(null);

        this.initGroupList();
    }


    /**
     * 建筑项目列表
     */
    private initGroupList() {
        this.groupList = new eui.Group();
        this.groupList.y = 20;
        this.addChild(this.groupList);

        this.updateGroupList();
    }

    private updateGroupList() {
        this.groupList.removeChildren();
        var techArr = TechnologyDataManager.instance.getNowCanUpTechnology();
        for (var i = 0; i < techArr.length; i++) {
            var vo:TechnologyVo = techArr[i];
            var item:TechnologyItem = new TechnologyItem(vo.id);
            item.y = 10 + 105 * i;
            this.groupList.addChild(item);
        }
    }

    protected onShowAnimateOver() {
        super.onShowAnimateOver();

        EventManager.instance.addEvent(EventName.TECHNOLOGY_CHANGE, this.updateGroupList, this);
    }

    /**
     * 销毁
     */
    protected destroy() {
        super.destroy();

        EventManager.instance.removeEvent(EventName.TECHNOLOGY_CHANGE, this.updateGroupList, this);
    }

}