class HashMap<K,V> {
    private data:Object = {};

    public set(K, V):void {
        this.data[K] = V;
    }

    public put(K, V):void {
        this.set(K, V);
    }

    public get(K):V {
        return this.data[K];
    }

    public has(K):boolean {
        return this.data.hasOwnProperty(K);
    }

    public remove(K):void {
        this.data[K] = undefined;
        delete this.data[K];
    }

    public keys():K[] {
        var arr:K[] = [];
        for (var key in this.data) {
            arr.push(key);
        }
        return arr;
    }

    /**
     * 重新设置
     * @param obj
     */
    public reset(obj){
        this.data = obj.data || obj;
    }

    /**
     * 将toJSON后的str数据转化回来
     * @param str
     */
    public parse(str:string) {
        var obj = JSON.parse(str);
        this.data = obj.data;
    }

    public toString() {
        return JSON.stringify(this.data);
    }
}