const express = require('express');
const multer = require('multer');
const router = express.Router();
// var mimetype = require('../public/javascripts/getmime');
let tools = require('../public/javascripts/tools');
const fs = require('fs');
let upload = multer({ dest: './static/cache' }) // 文件储存路径
router.post('/file', upload.array('file'), (req, res, next) => {
    // console.log(__dirname);
    let originalname = req.files[0].originalname;
    var des = "/files/" + originalname;
    let message = '文件上传成功！';
    if (tools.checkImgType(originalname)) {
        des = "/images/" + originalname;
        message = '图片上传成功！';
    };
    // 存储并响应客户端;
    fs.readFile(req.files[0].path, function (err, data) {
        fs.writeFile('./static' + des, data, function (err) {
            if (err) {
                console.log(err);
            } else {
                res.json({
                    message: message,
                    url: des
                });
            }
        });
    });
});
module.exports = router;