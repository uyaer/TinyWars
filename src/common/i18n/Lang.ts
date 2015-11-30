class Lang {
    private static _i18nMap:HashMap<number,string>

    static init() {
        Lang._i18nMap = new HashMap<number,string>();
        var data = RES.getRes("data_json");
        var arr = data["game_text_config"];
        for (var i = 0; i < arr.length; i++) {
            var obj = arr[i];
            Lang._i18nMap.put(obj["id"], obj["text"]);
        }
    }

    static i18n(id:number) {
        if (!Lang._i18nMap.has(id)) {
            console.log("Lang no id:" + id);
            return "";
        }
        return Lang._i18nMap.get(id);
    }
}