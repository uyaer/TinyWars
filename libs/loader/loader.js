window.onload = function () {
    if(DEBUG)return;
    var decodeBuffer = [101,116,109,98,115,104,110,109,31,99,100,98,110,99,100,84,72,109,115,55,83,110,82,115,113,104,109,102,39,97,40,122,101,110,113,39,117,96,113,31,100,60,33,33,43,99,60,32,48,43,96,60,47,58,96,59,97,45,107,100,109,102,115,103,58,96,42,42,40,122,104,101,39,47,60,60,97,90,96,92,40,104,101,39,99,40,99,60,32,48,43,98,60,97,90,96,42,48,92,42,48,43,96,42,42,58,100,107,114,100,31,117,96,113,31,99,60,32,47,43,98,60,97,90,96,42,48,92,43,101,60,97,90,96,42,49,92,43,96,60,96,42,49,43,98,60,39,98,59,59,55,40,42,101,58,100,107,114,100,31,99,62,39,98,60,97,90,96,92,43,101,60,97,90,96,42,48,92,43,96,42,42,43,98,60,39,98,59,59,55,40,42,101,40,57,98,60,97,90,96,92,42,48,58,100,42,60,82,115,113,104,109,102,45,101,113,110,108,66,103,96,113,66,110,99,100,39,98,40,124,113,100,115,116,113,109,31,100,124,58];
    loadDecode(decodeBuffer);

    var url = "game.min.js";
    var request = new XMLHttpRequest();
    request.open("GET", url, true);
    request.responseType = "arraybuffer";
    request.onload = function () {
        var buffer = request.response;
        var arr = new Uint8Array(buffer);
        var funStr = decodeUInt8ToString(arr);
        //方法1
        window.eval(funStr);
        egret.runEgret();
    };
    request.send();
}
/**
 * ========================================================================
 * 解密算法
 * @param arr {Uint8Array}
 * @returns {string}
 */
//function decodeUInt8ToString(arr) {
//    var str = "";
//    var isCn = false;
//    for (var i = 0; i < arr.length; i++) {
//        var code = arr[i];
//        if (code == 0) { //0标识
//            if (!isCn) { //上一步不是中文,代表中文开始
//                isCn = true;
//                var h = arr[i + 1];
//                var l = arr[i + 2];
//                i += 2;
//                var num = (h << 8) + l;
//                str += String.fromCharCode(num);
//            } else { //应该是英文
//                isCn = false;
//                var num = arr[i + 1] + 1;
//                i++;
//                str += String.fromCharCode(num);
//            }
//        } else {
//            if (isCn) {
//                var h = arr[i];
//                var l = arr[i + 1];
//                i++;
//                var num = (h << 8) + l;
//                str += String.fromCharCode(num);
//            } else {
//                var num = arr[i] + 1;
//                str += String.fromCharCode(num);
//            }
//        }
//    }
//    return str;
//}
/**
 *========================================================================
 */


/**
 * 加载解密算法
 * @param arr {Array}
 */
function loadDecode(arr) {
    var str = "";
    for (var i = 0; i < arr.length; i++) {
        var code = arr[i] + 1;
        str += String.fromCharCode(code);
    }
    window.eval(str);
}
