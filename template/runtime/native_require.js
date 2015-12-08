
var game_file_list = [
    //以下为自动修改，请勿修改
    //----auto game_file_list start----
	"libs/modules/egret/egret.js",
	"libs/modules/egret/egret.native.js",
	"libs/modules/eui/eui.js",
	"libs/modules/res/res.js",
	"libs/modules/game/game.js",
	"libs/modules/game/game.native.js",
	"libs/modules/tween/tween.js",
	"libs/plugins/bmob-min.js",
	"libs/user/user_util.js",
	"libs/loader/loader.js",
	"bin-debug/AssetAdapter.js",
	"bin-debug/LoadingUI.js",
	"bin-debug/Main.js",
	"bin-debug/ThemeAdapter.js",
	"bin-debug/common/Const.js",
	"bin-debug/common/events/EventManager.js",
	"bin-debug/common/events/EventName.js",
	"bin-debug/common/i18n/Lang.js",
	"bin-debug/common/net/IClient.js",
	"bin-debug/common/net/Net.js",
	"bin-debug/common/net/http/HttpClient.js",
	"bin-debug/common/net/module/UserNet.js",
	"bin-debug/common/net/websocket/WebSocketClient.js",
	"bin-debug/common/player/BuildQueueVo.js",
	"bin-debug/common/player/Player.js",
	"bin-debug/common/player/ResourceCostVo.js",
	"bin-debug/common/player/UserVo.js",
	"bin-debug/common/player/enum/BuildingType.js",
	"bin-debug/common/player/enum/ConstName.js",
	"bin-debug/common/player/enum/GameModule.js",
	"bin-debug/common/player/enum/ResType.js",
	"bin-debug/common/player/enum/TechnologyType.js",
	"bin-debug/common/scenes/SceneBase.js",
	"bin-debug/common/scenes/SceneManager.js",
	"bin-debug/common/ui/GameLayerManager.js",
	"bin-debug/common/ui/PanelBase.js",
	"bin-debug/common/ui/PanelName.js",
	"bin-debug/common/ui/UIManager.js",
	"bin-debug/common/ui/loading/NetLoading.js",
	"bin-debug/common/ui/loading/PanelLoading.js",
	"bin-debug/common/ui/loading/PreLoading.js",
	"bin-debug/common/ui/loading/SceneLoading.js",
	"bin-debug/common/ui/tab/ISimpleTabItem.js",
	"bin-debug/common/ui/tab/SimpleTab.js",
	"bin-debug/common/ui/tip/SimpleTip.js",
	"bin-debug/common/ui/tip/ToastTip.js",
	"bin-debug/common/utils/DateTimer.js",
	"bin-debug/common/utils/preload/PreLoadQueue.js",
	"bin-debug/common/utils/preload/ResQueueNode.js",
	"bin-debug/common/utils/update/IUpdate.js",
	"bin-debug/common/utils/update/OneTimerTicker.js",
	"bin-debug/game/scenes/login/LoginScene.js",
	"bin-debug/game/scenes/main/MainScene.js",
	"bin-debug/game/scenes/main/common/button/CDTimeGoldButton.js",
	"bin-debug/game/scenes/main/common/button/SimpleTabItemButton.js",
	"bin-debug/game/scenes/main/common/button/WrapTabItemButton.js",
	"bin-debug/game/scenes/main/common/item/BuildProgressBar.js",
	"bin-debug/game/scenes/main/common/item/CostResItem.js",
	"bin-debug/game/scenes/main/common/item/ResItemBase.js",
	"bin-debug/game/scenes/main/common/item/FirstResItem.js",
	"bin-debug/game/scenes/main/common/item/SecondResItem.js",
	"bin-debug/game/scenes/main/common/item/ThirdResItem.js",
	"bin-debug/game/scenes/main/common/scene/Landscape.js",
	"bin-debug/game/scenes/main/common/scene/LandscapePart.js",
	"bin-debug/game/scenes/main/panel/SlidePanelBase.js",
	"bin-debug/game/scenes/main/panel/building/BuildingGroupPanel.js",
	"bin-debug/game/scenes/main/panel/building/data/BuildingDataManager.js",
	"bin-debug/game/scenes/main/panel/building/data/vo/BuildingCostVo.js",
	"bin-debug/game/scenes/main/panel/building/data/vo/BuildingVo.js",
	"bin-debug/game/scenes/main/panel/common/item/BuildItemBase.js",
	"bin-debug/game/scenes/main/panel/building/item/BuildingItemBase.js",
	"bin-debug/game/scenes/main/panel/building/item/FactoryBuildingItem.js",
	"bin-debug/game/scenes/main/panel/building/item/ResBuildingItem.js",
	"bin-debug/game/scenes/main/panel/building/item/StoreBuildingItem.js",
	"bin-debug/game/scenes/main/panel/building/item/WarBuildingItem.js",
	"bin-debug/game/scenes/main/panel/common/list/BuildGroupList.js",
	"bin-debug/game/scenes/main/panel/res/ClickResPanel.js",
	"bin-debug/game/scenes/main/panel/technology/TechnologyGroupPanel.js",
	"bin-debug/game/scenes/main/panel/technology/data/TechnologyDataManager.js",
	"bin-debug/game/scenes/main/panel/technology/data/TechnologyVo.js",
	"bin-debug/game/scenes/main/panel/technology/item/TechnologyItem.js",
	"bin-debug/game/scenes/main/panel/war/WarGroupPanel.js",
	"bin-debug/game/scenes/main/panel/war/data/ArmyDataManager.js",
	"bin-debug/game/scenes/main/panel/war/data/ArmyVo.js",
	"bin-debug/game/scenes/main/panel/war/item/WarItem.js",
	"bin-debug/utils/HashMap.js",
	"bin-debug/utils/UIUtils.js",
	"bin-debug/utils/Util.js",
	"bin-debug/utils/md5.js",
	//----auto game_file_list end----
];

var window = {};

egret_native.setSearchPaths([""]);

egret_native.requireFiles = function () {
    for (var key in game_file_list) {
        var src = game_file_list[key];
        require(src);
    }
};

egret_native.egretInit = function () {
    egret_native.requireFiles();
    egret.TextField.default_fontFamily = "/system/fonts/DroidSansFallback.ttf";
    //egret.dom为空实现
    egret.dom = {};
    egret.dom.drawAsCanvas = function () {
    };
};

egret_native.egretStart = function () {
    var option = {
        //以下为自动修改，请勿修改
        //----auto option start----
		entryClassName: "Main",
		frameRate: 30,
		scaleMode: "showAll",
		contentWidth: 640,
		contentHeight: 960,
		showPaintRect: false,
		showFPS: false,
		fpsStyles: "x:0,y:0,size:30,textColor:0x00c200,bgAlpha:0.9",
		showLog: false,
		logFilter: "",
		maxTouches: 2,
		textureScaleFactor: 1
		//----auto option end----
    };

    egret.native.NativePlayer.option = option;
    egret.runEgret();
    egret_native.Label.createLabel(egret.TextField.default_fontFamily, 20, "", 0);
    egret_native.EGTView.preSetOffScreenBufferEnable(true);
};