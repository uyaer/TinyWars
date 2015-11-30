var Lang = (function () {
    function Lang() {
    }
    var d = __define,c=Lang;p=c.prototype;
    Lang.init = function () {
        Lang._i18nMap = new HashMap();
        var data = RES.getRes("data_json");
        var arr = data["game_text_config"];
        for (var i = 0; i < arr.length; i++) {
            var obj = arr[i];
            Lang._i18nMap.put(obj["id"], obj["text"]);
        }
    };
    Lang.i18n = function (id) {
        if (!Lang._i18nMap.has(id)) {
            console.log("Lang no id:" + id);
            return "";
        }
        return Lang._i18nMap.get(id);
    };
    return Lang;
})();
egret.registerClass(Lang,"Lang");
