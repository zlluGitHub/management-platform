
let express = require('express');
let router = express.Router();
let connection = require('../connect');
let tools = require('../public/javascripts/tools');

let addSql = 'INSERT INTO words(id,uid,type,author,title,img_url,date,content,state) VALUES(0,?,?,?,?,?,?,?,?)';  //插入数据
//添加数据
router.post('/', (req, res, next) => {
    //获取当前信息
    let dateTime = tools.dateTime();
    let uuid = tools.getUid();
    //插入内容
    let body = req.body;
    let addSqlParams = [uuid, body.type, body.author, body.title, body.img_url, dateTime, body.content, body.state];
    connection.query(addSql, addSqlParams, (err, result) => {
        if (err) {
            console.log('错误信息：', err.message);
            return;
        } else {
            res.json({ result: true, code: 200 });
        }
    });
    //   };
    // });
});
module.exports = router;