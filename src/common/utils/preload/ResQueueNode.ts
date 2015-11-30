class ResQueueNode {
    public url:string;
    public priority:number = 0;

    public constructor(url:string, priority?:number = 0) {
        this.url = url;
        this.priority = priority;
    }

}