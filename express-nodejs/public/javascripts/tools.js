// 获取当前时间
function dateTime() {
    var date = new Date();
    var seperator1 = "-";
    var seperator2 = ":";
    var month = date.getMonth() + 1;
    var strDate = date.getDate();
    if (month >= 1 && month <= 9) {
        month = "0" + month;
    }
    if (strDate >= 0 && strDate <= 9) {
        strDate = "0" + strDate;
    }
    var currentdate = date.getFullYear() + seperator1 + month + seperator1 + strDate
        + " " + date.getHours() + seperator2 + date.getMinutes()
        + seperator2 + date.getSeconds();
    return currentdate;
};

//生成随机ID
function getUid() {
    function S4() {
        return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
    }
    return (S4() + S4() + "-" + S4() + "-" + S4() + "-" + S4() + "-" + S4() + S4() + S4());
}
/*  
 * 判断图片类型  
 */
function checkImgType(ths) {
    if (ths === "") {
        console.log("请上传图片");
        return false;
    } else {
        if (!/\.(gif|jpg|jpeg|png|GIF|JPG|PNG)$/.test(ths)) {
            return false;
        }
    }
    return true;
}
module.exports = { dateTime, getUid, checkImgType };