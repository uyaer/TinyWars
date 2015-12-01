function isNumber(val) {
    var s = val.constructor.toString();
    return s.indexOf("Number") > 0;
}
function isString(val) {
    var s = val.constructor.toString();
    return s.indexOf("String") > 0;
}
function isArray(val) {
    var s = val.constructor.toString();
    return s.indexOf("Array") > 0;
}

function int(val) {
    return parseInt(val);
}