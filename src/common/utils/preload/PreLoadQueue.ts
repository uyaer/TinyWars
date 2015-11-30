/**
 * 后台加载加载队列
 */
class PreLoadQueue {
    private static _instance:PreLoadQueue;

    public constructor() {
        if (PreLoadQueue._instance) {
            throw new Error("PreLoadQueue使用单例");
        }
    }

    public static get instance():PreLoadQueue {
        if (!PreLoadQueue._instance) {
            PreLoadQueue._instance = new PreLoadQueue();
        }
        return PreLoadQueue._instance;
    }

    /**
     * 组中的队列
     * @type {Array}
     */
    private queue:ResQueueNode[] = [];
    /**
     * 已经加载过的url
     * @type {Array}
     */
    private loadedURL:string[] = [];

    public pushGroup(name:string, priority:number = 0) {
        if (!RES.isGroupLoaded(name)) {
            var arr:RES.ResourceItem[] = RES.getGroupByName(name);
            for (var i = 0; i < arr.length; i++) {
                var item = arr[i];
                if (!item.loaded && this.loadedURL.indexOf(item.url) == -1) {
                    this.replaceURLNode(item.url, priority);
                }
            }
        }
    }

    public pushURL(url:string, priority:number = 0) {
        this.queue.push(new ResQueueNode(url, priority));
        //排序
        this.queue.sort((node1, node2)=> {
            return node1.priority - node2.priority;
        });
        //判断加载
        if (this.isRun && !this.isLoading) {
            this.loopLoad();
        }
    }

    private replaceURLNode(url:string, priority:number):void {
        for (var i = 0; i < this.queue.length; i++) {
            var node = this.queue[i];
            if (node.url == url) {
                if (node.priority < priority) {
                    node.priority = priority;
                }
                return;
            }
        }
        this.pushURL(url, priority);
    }

    /**
     * 是否需要加载
     * @type {boolean}
     */
    private isRun:boolean = false;
    /**
     * 是否正在加载
     * @type {boolean}
     */
    private isLoading:boolean = false;

    /**
     * 运行加载
     */
    public run() {
        this.isRun = true;
        this.loopLoad();
    }

    /**
     * 暂停加载
     */
    public pause() {
        this.isRun = false;
    }

    private loopLoad() {
        if (this.isRun && this.queue.length > 0) {
            this.isLoading = true;
            var node = this.queue.pop();
            RES.getResByUrl(node.url, this.onLoadURLSuccess, this);
        }
    }

    private onLoadURLSuccess(data, url) {
        this.isLoading = false;
        this.loadedURL.push(url);
        this.loopLoad();
    }
}