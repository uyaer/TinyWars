e.commonBarBtnClick = function (target) {
    Log.trace("commonBarBtnClick");
    var factorys = [this.foodFactory, this.woodFactory, this.stoneFactory, this.foodStore, this.woodStore, this.stoneStore, this.metalFactory, this.skinFactory, this.horseFactory, this.jadeFactory, this.footStore, this.bowStore, this.knightStore, this.dragoneStore];
    var buildingTypes = [101, 102, 103, 108, 109, 110, 104, 105, 106, 107, 111, 112, 113, 114];
    var resTypes = [MatConst.Food, MatConst.Wood, MatConst.Stone, MatConst.Food, MatConst.Wood, MatConst.Stone, MatConst.Metal, MatConst.Skin, MatConst.Horse, MatConst.Jade, MatConst.Foot, MatConst.Bow, MatConst.Knight, MatConst.Dragon];
    var buildingBtns = [this.baseBtn, this.baseBtn, this.baseBtn, this.storeBtn, this.storeBtn, this.storeBtn, this.factoryBtn, this.factoryBtn, this.factoryBtn, this.factoryBtn, this.armyBtn, this.armyBtn, this.armyBtn, this.armyBtn];
    //获取次数CommonTimesChooseSkin.getTimes();
    for (var i = 0; i < factorys.length; i++) {
        if (null != factorys[i] && target == factorys[i].btn) {
            //获取某一个建筑
            var buildingCfg = App.GameConfig.getConfigById(buildingTypes[i], App.GameConfig.arch);
            var resVo = App.UserInfo.getManagerByKey(resTypes[i]);
            var buildingEventResult = factorys[i].SetBuildEvent(1, buildingTypes[i], factorys[i].makeCount, buildingCfg.cd_time * factorys[i].makeCount, buildingCfg.cd_time * factorys[i].makeCount, buildingBtns[i], this.setBuildType, this);
            Log.trace("makecount", buildingEventResult);
            if (0 < buildingEventResult) {
                if (1 == buildingCfg.ptype) {
                    this.buildCost(buildingCfg.need, resVo.getLevel(), buildingEventResult)
                } else {
                    if (2 == buildingCfg.ptype) {
                        this.buildCost(buildingCfg.need, resVo.getStoreLevel(), buildingEventResult);
                        if (1 == buildingEventResult) {
                            App.UserInfo.buildDone(1, factorys[i].buildInfo);
                            App.ViewManager.getViewByKey(ViewConst.Main).refresh();
                            this.refresh();
                        }
                    }
                }
            }
        }
    }
};
e.buildCost = function (need, startLevel, count) {
    var resVoArr = [],
        costArr = [0, 0, 0],
        canLvArr = [0, 0, 0];
    for (var i = 0; i < need.length; i++) {
        var endLv = startLevel;
        resVoArr[i] = App.UserInfo.getManagerByKey(need[i].prop);
        var num = 0;
        for (var j = 0; j < 5; j++) {
            if (num < count) {
                var phaseLV = Math.ceil((endLv + 1) / 200);
                var costNum = need[i].par1 * phaseLV * phaseLV + need[i].par2 * phaseLV + need[i].par3;
                if (costNum > 100) {
                    (costNum -= costNum % 100);
                }
                phaseLV = Math.min(200 * phaseLV, startLevel + count) - endLv;
                canLvArr[i] += phaseLV;
                costArr[i] += phaseLV * costNum;
                endLv += phaseLV;
                num += phaseLV
            }
        }
    }
    var flag = true;
    for (i = 0; i < canLvArr.length; i++) {
        if (0 < canLvArr[i] && resVoArr[i].getNum() < costArr[i]) {
            (flag = false);
        }
    }
    Log.trace("buildcost", flag, resVoArr[0], canLvArr[0]);
    if (flag) {
        for (i = 0; i < canLvArr.length; i++) {
            Log.trace(i, canLvArr[i]);
            if (0 < costArr[i]) {
                Log.trace("delete", resVoArr[i].getNum());
                resVoArr[i].numChange(0 - costArr[i]);
            }
        }
    }
    return flag
};
e.setCommonCostLayer = function (factory, need, resLv, count) {
    if (null != factory && !factory.bLock) {
        var i = 0;
        Log.trace("setCommonCostLayer", need, resLv, count);
        var f = !0,
            m = factory.makeCount,
            h = 99999,
            k = [0, 0, 0],
            l = [0, 0, 0];
        for (i; i < need.length; i++) {
            var j = 0;
            var endLv = resLv;
            var hasNum = App.UserInfo.getManagerByKey(need[i].prop).getNum();
            for (j; j < 6; j++) {
                if (k[i] < count) {
                    var phaseLv = Math.ceil((endLv + 1) / 200);
                    var costNum = need[i].par1 * phaseLv * phaseLv + need[i].par2 * phaseLv + need[i].par3;
                    if (100 < costNum) {
                        (costNum -= costNum % 100);
                    }
                    phaseLv = Math.min(200 * phaseLv, resLv + count) - endLv;
                    if (l[i] + phaseLv * costNum > hasNum) {
                        j = Math.floor((hasNum - l[i]) / costNum);
                        k[i] += j;
                        l[i] += j * costNum;
                        break
                    } else k[i] += phaseLv, l[i] += phaseLv * costNum, endLv += phaseLv
                }
            }
        }
        for (i = 0; i < need.length; i++) {
            if (k[i] < h) {
                (h = k[i]);
            }
        }
        if (99999 == h || 0 == h) {
            h = 1, f = !1;
        }
        k = [0, 0, 0];
        l = [0, 0, 0];
        for (i = 0; i < need.length; i++) {
            for (j = 0, endLv = resLv, j; 5 > j; j++) {
                if (k[i] < h) {
                    phaseLv = Math.ceil((endLv + 1) / 200);
                    costNum = need[i].par1 * phaseLv * phaseLv + need[i].par2 * phaseLv + need[i].par3;
                    if (100 < costNum) {
                        (costNum -= costNum % 100);
                        phaseLv = Math.min(200 * phaseLv, resLv + h) - endLv;
                        k[i] += phaseLv;
                        Log.trace("cal", costNum, phaseLv);
                        l[i] += phaseLv * costNum;
                        endLv += phaseLv;
                    }
                }
            }
        }
        Log.trace("setCommonCostLayer", h, m);
        if (h != m || 1 == h) {
            for (factory.costLayer.removeAllElements(), factory.makeCount = h, resLv = 5, i = 0; i < need.length; i++) {
                var tf = new egret.gui.Label;
                Log.trace("cacaca", l[i], CommonUtils.getInstance().NumberToDisplayString(l[i]));
                tf.text = "-" + CommonUtils.getInstance().NumberToDisplayString(l[i]);
                tf.size = 18;
                tf.fontFamily = "微软雅黑";
                if (App.UserInfo.getManagerByKey(need[i].prop).getNum() < l[i]) {
                    (tf.textColor = 15275285);
                    tf.x = resLv;
                    tf.y = 5;
                    tf.measure();
                    factory.costLayer.addElement(tf);
                    resLv = resLv + tf.measuredWidth + 5;
                    var icon = App.GameConfig.getConfigById(need[i].prop, App.GameConfig.prop).icon;
                    var img = new egret.gui.UIAsset(icon, !1);
                    img.x = resLv, img.scaleX = img.scaleY = 0.7;
                    factory.costLayer.addElement(img);
                    resLv = resLv + 30 + 8;
                    factory.btnLabel.text = "+" + h.toString();
                }
            }
        }
        if (factory.timer.isActive()) {
            factory.btn.enabled = !0
        } else {
            factory.btn.enabled = f ? !0 : !1;
        }
        Log.trace("setCommonCostLayer", this.nowType, factory.mat);
        if (this.nowType == BuildConst.StoreType && null != factory.mat && factory.mat.getNum() >= factory.mat.getMax()) {
            factory.desc1.textColor = 15275285
        } else {
            if (this.nowType != BuildConst.FactoryType) {
                factory.desc1.textColor = 16777215;
            }
        }
    }
};
e.refresh = function () {
    Log.trace("buildbiew refresh");
    var count = Math.min(10000, CommonTimesChooseSkin.getTimes());
    Log.trace("buildTimes", count);
    if (this.nowType == BuildConst.BaseType) { //资源生产
        var buildingCfg = App.GameConfig.getConfigById(101, App.GameConfig.arch);
        var resVo = App.UserInfo.getManagerByKey(MatConst.Food);
        this.setCommonCostLayer(this.foodFactory, buildingCfg.need, resVo.getLevel(), count);
        buildingCfg = App.GameConfig.getConfigById(102, App.GameConfig.arch);
        resVo = App.UserInfo.getManagerByKey(MatConst.Wood);
        this.setCommonCostLayer(this.woodFactory, buildingCfg.need, resVo.getLevel(), count);
        buildingCfg = App.GameConfig.getConfigById(103, App.GameConfig.arch);
        resVo = App.UserInfo.getManagerByKey(MatConst.Stone);
        this.setCommonCostLayer(this.stoneFactory, buildingCfg.need, resVo.getLevel(), count)
    } else {
        if (this.nowType == BuildConst.StoreType) { //仓库
            buildingCfg = App.GameConfig.getConfigById(108, App.GameConfig.arch);
            resVo = App.UserInfo.getManagerByKey(MatConst.Food);
            this.setCommonCostLayer(this.foodStore, buildingCfg.need, resVo.getStoreLevel(), count);
            buildingCfg = App.GameConfig.getConfigById(109, App.GameConfig.arch);
            resVo = App.UserInfo.getManagerByKey(MatConst.Wood);
            this.setCommonCostLayer(this.woodStore, buildingCfg.need, resVo.getStoreLevel(), count);
            buildingCfg = App.GameConfig.getConfigById(110, App.GameConfig.arch);
            resVo = App.UserInfo.getManagerByKey(MatConst.Stone);
            this.setCommonCostLayer(this.stoneStore, buildingCfg.need, resVo.getStoreLevel(), count);
        } else {
            if (this.nowType == BuildConst.FactoryType) { //工厂类型
                buildingCfg = App.GameConfig.getConfigById(104, App.GameConfig.arch);
                resVo = App.UserInfo.getManagerByKey(MatConst.Metal);
                Log.trace("1");
                this.setCommonCostLayer(this.metalFactory, buildingCfg.need, resVo.getLevel(), count);
                buildingCfg = App.GameConfig.getConfigById(105, App.GameConfig.arch);
                resVo = App.UserInfo.getManagerByKey(MatConst.Skin);
                Log.trace("2");
                this.setCommonCostLayer(this.skinFactory, buildingCfg.need, resVo.getLevel(), count);
                buildingCfg = App.GameConfig.getConfigById(106, App.GameConfig.arch);
                resVo = App.UserInfo.getManagerByKey(MatConst.Horse);
                this.setCommonCostLayer(this.horseFactory, buildingCfg.need, resVo.getLevel(), count);

                buildingCfg = App.GameConfig.getConfigById(107, App.GameConfig.arch);
                resVo = App.UserInfo.getManagerByKey(MatConst.Jade);
                this.setCommonCostLayer(this.jadeFactory, buildingCfg.need, resVo.getLevel(), count);
            } else {
                if (this.nowType == BuildConst.ArmyType) {
                    buildingCfg = App.GameConfig.getConfigById(111, App.GameConfig.arch);
                    resVo = App.UserInfo.getManagerByKey(MatConst.Foot);
                    this.setCommonCostLayer(this.footStore, buildingCfg.need, resVo.getStoreLevel(), count);
                    buildingCfg = App.GameConfig.getConfigById(112, App.GameConfig.arch);
                    resVo = App.UserInfo.getManagerByKey(MatConst.Bow);
                    this.setCommonCostLayer(this.bowStore, buildingCfg.need, resVo.getStoreLevel(), count);
                    buildingCfg = App.GameConfig.getConfigById(113, App.GameConfig.arch);
                    resVo = App.UserInfo.getManagerByKey(MatConst.Knight);
                    this.setCommonCostLayer(this.knightStore, buildingCfg.need, resVo.getStoreLevel(), count);
                    buildingCfg = App.GameConfig.getConfigById(114, App.GameConfig.arch);
                    resVo = App.UserInfo.getManagerByKey(MatConst.Dragon);
                    this.setCommonCostLayer(this.dragoneStore, buildingCfg.need, resVo.getStoreLevel(), count);
                }
            }
        }
    }
    if (null != this.timesBar) {
        this.timesBar.refresh(!1)
    }
};