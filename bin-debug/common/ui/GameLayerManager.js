var GameLayerManager = (function () {
    function GameLayerManager() {
    }
    var d = __define,c=GameLayerManager;p=c.prototype;
    d(GameLayerManager, "instance"
        ,function () {
            if (!GameLayerManager._instance) {
                GameLayerManager._instance = new GameLayerManager();
            }
            return GameLayerManager._instance;
        }
    );
    d(p, "gameLayer"
        ,function () {
            return this._gameLayer;
        }
    );
    d(p, "uiLayer"
        ,function () {
            return this._uiLayer;
        }
    );
    d(p, "popLayer"
        ,function () {
            return this._popLayer;
        }
    );
    d(p, "tipLayer"
        ,function () {
            return this._tipLayer;
        }
    );
    p.init = function (parent) {
        this._gameLayer = new eui.Group();
        this._uiLayer = new eui.Group();
        this._popLayer = new eui.Group();
        this._tipLayer = new eui.Group();
        parent.addChild(this._gameLayer);
        parent.addChild(this._uiLayer);
        parent.addChild(this._popLayer);
        parent.addChild(this._tipLayer);
        this._tipLayer.touchChildren = this._tipLayer.touchEnabled = false;
    };
    return GameLayerManager;
})();
egret.registerClass(GameLayerManager,"GameLayerManager");
