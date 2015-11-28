class GameLayerManager{
    private static _instance:GameLayerManager;

    public static get instance():GameLayerManager{
        if(!GameLayerManager._instance){
            GameLayerManager._instance = new GameLayerManager();
        }
        return GameLayerManager._instance;
    }

    private _gameLayer:eui.Group;
    private _uiLayer:eui.Group;
    private _popLayer:eui.Group;
    private _tipLayer:eui.Group;

    public get gameLayer(){
        return this._gameLayer;
    }
    public get uiLayer(){
        return this._uiLayer;
    }
    public get popLayer(){
        return this._popLayer;
    }
    public get tipLayer(){
        return this._tipLayer;
    }

    public init(parent:eui.UILayer){
        this._gameLayer = new eui.Group();
        this._uiLayer = new eui.Group();
        this._popLayer = new eui.Group();
        this._tipLayer = new eui.Group();

        parent.addChild(this._gameLayer);
        parent.addChild(this._uiLayer);
        parent.addChild(this._popLayer);
        parent.addChild(this._tipLayer);
    }

}