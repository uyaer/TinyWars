var UIUtils = (function () {
    function UIUtils() {
    }
    var d = __define,c=UIUtils;p=c.prototype;
    UIUtils.addButtonScaleEffects = function (p) {
        if (!p)
            return;
        if (egret.is(p, egret.getQualifiedClassName(eui.Button))) {
            p.addEventListener(egret.TouchEvent.TOUCH_BEGIN, function (e) {
                var btn = e.target;
                egret.Tween.get(btn).to({ scaleX: 0.9, scaleY: 0.9 }, 50).to({ scaleX: 1, scaleY: 1 }, 50);
            }, p);
        }
        else {
            var len = p.numChildren;
            for (var i = 0; i < len; i++) {
                var ch = p.getChildAt(i);
                UIUtils.addButtonScaleEffects(ch);
            }
        }
    };
    UIUtils.removeSelf = function (p) {
        if (p && p.parent) {
            p.parent.removeChild(p);
        }
    };
    return UIUtils;
})();
egret.registerClass(UIUtils,"UIUtils");
