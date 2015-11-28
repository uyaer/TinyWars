class HashMap<K,V> {
    private data:Object = {};

    public set(K, V):void {
        this.data[K] = V;
    }

    public get(K):V {
        return this.data[K];
    }

    public has(K):boolean {
        return this.data.hasOwnProperty(K);
    }

    public keys():K[]{
        var arr:K[] = [];
        for(var key in this.data){
            arr.push(key);
        }
        return arr;
    }
}