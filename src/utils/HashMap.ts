class HashMap<K,V> {
    private data:Object = {};

    public set(K, V):void {
        this.data[K] = V;
    }

    public put(K, V):void {
        this.set(K, V);
    }

    /**
     * 根据Key获得数据，可以传入默认值
     * @param K
     * @param V
     * @returns {any}
     */
    public get(K, V?):V {
        if (arguments.length == 1) {
            return this.data[K];
        } else {
            if (this.has(K)) {
                return this.data[K];
            } else {
                return V;
            }
        }
    }

    /**
     * 追加，但是V必须是number的时候才有效
     * @param K
     * @param V {number}
     */
    public add(K, V):void {
        if (isNumber(V)) {
            var num = this.get(K, 0) + V;
            this.put(K, num);
        }
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

    public values():V[]{
        var arr:V[] = [];
        for (var key in this.data) {
            arr.push(this.data[key]);
        }
        return arr;
    }

    /**
     * 重新设置
     * @param obj
     */
    public reset(obj) {
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