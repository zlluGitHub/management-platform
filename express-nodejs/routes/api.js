let express = require('express');
let router = express.Router();
let connection = require('../connect');
let tools = require('../public/javascripts/tools');
/* 
动态获取参数
1、请求地址：http://localhost:3000/api/component/asdasdas
   请求方法：/component/:id
   获取参数：req.params.id 
   输出： asdasdas

2、请求地址：http://localhost:3000/api/component?id=asdasdas
   请求方法：/component
   获取参数：req.query.id
   输出： asdasdas
*/

let sql = 'SELECT * FROM component'; //获取数据
let addSql = 'INSERT INTO component(id,uid,tags,title,author,img_url,source_url,show_url,date,api_code,is_public,important_code,all_code,other) VALUES(0,?,?,?,?,?,?,?,?,?,?,?,?,?)';  //插入数据
let updateSql =  'UPDATE component SET tags = ?,title = ?,author = ?,img_url = ?,source_url = ?,show_url = ?,api_code = ?,is_public = ?,important_code = ?,all_code = ?,other = ? WHERE uid = ?';  //更新数据
//查询全部数据
router.get('/component', (req, res, next) => {
  //获取数据表中数据的总条数
  let count = 0;
  connection.query('SELECT count(*) AS count from component;', function (err, rows) {
    if (err) throw err;
    count = rows[0].count;
  });
  //根据类型筛选
  if (req.query.tags && req.query.tags !== '默认') {
    let sqls = sql + " where tags = '" + req.query.tags + "'";
    connection.query(sqls, (err, result) => {
      if (err) {
        console.log('[SELECT ERROR] - ', err.message);
        res.json({ result: false, code: 500 });
        return;
      } else {
        res.json({ result: true, code: 200, count, data: result });
      };
    });
  } else if (req.query.uid) {
    let sqls = sql + " where uid = '" + req.query.uid + "'";
    connection.query(sqls, (err, result) => {
      if (err) {
        console.log('[SELECT ERROR] - ', err.message);
        res.json({ result: false, code: 500 });
        return;
      } else {
        res.json({ result: true, code: 200, count, data: result });
      };
    });
  } else {
    connection.query(sql, (err, result) => {
      if (err) {
        console.log('[SELECT ERROR] - ', err.message);
        res.json({ result: false, code: 500 });
        return;
      } else {
        res.json({ result: true, code: 200, count, data: result });
      };
    });
  }
});

//添加数据
router.post('/component', (req, res, next) => {
  // connection.query(sql, (err, result) => {
  //   if (err) {
  //     console.log('[SELECT ERROR] - ', err.message);
  //     res.json({ result: false, code: 500 });
  //     return;
  //   } else {
  //获取当前信息
  let dateTime = tools.dateTime();
  let uuid = tools.getUid();
  //插入内容
  let body = req.body;
  let addSqlParams = [uuid, body.tags, body.title, body.author, body.img_url, body.source_url, body.show_url, dateTime, body.api_code, body.is_public, body.important_code, body.all_code, body.other];
  connection.query(addSql, addSqlParams, function (err, result) {
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

//更新数据
router.post("/update", (req, res, next) => {
  let body = req.body;
 let updateSqlParams = [body.tags, body.title, body.author, body.img_url, body.source_url, body.show_url, body.api_code, body.is_public, body.important_code, body.all_code, body.other,body.uid];
  connection.query(updateSql,updateSqlParams, (err, rows) => {
    if (!err) {
      res.json({ result: true, code: 200 });
    } else {
      console.log('错误信息：', err.message);
      return;
    }
  });
});

// let delSql = 'DELETE FROM account where id=3';
//删除数据
// connection.query(delSql,function (err, result) {
//     if(err){
//         console.log('[DELETE ERROR] - ',err.message);
//         return;
//     }

//     console.log('--------------------------DELETE----------------------------');
//     console.log('DELETE affectedRows',result.affectedRows);
//     console.log('-----------------------------------------------------------------\n\n');
// });


module.exports = router;
