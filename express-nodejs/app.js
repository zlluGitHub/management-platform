let createError = require('http-errors');
let express = require('express');
let path = require('path');
let cookieParser = require('cookie-parser');
let logger = require('morgan');

let apiRouter = require('./routes/api');
let usersRouter = require('./routes/users');
let uploadRouter = require('./routes/upload');
let journalRouter = require('./routes/journal');
let wordsRouter = require('./routes/words');

let app = express();
// 引入json解析中间件
// 解决上传内容太多失败
let bodyParser = require('body-parser');
app.use(bodyParser.json({limit: '5000000mb'}));
app.use(bodyParser.urlencoded({limit: '5000000mb', extended: true}));
// app.use(express.json({limit: '500mb'}));
// path.join(__dirname, 'public') 表示工程路径后面追加 public
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'static')));

//解决跨域
// app.all('*', function (req, res, next) {
//   res.header('Access-Control-Allow-Origin', '*');
//   res.header('Access-Control-Allow-Headers', 'Content-Type,Content-Length, Authorization,Origin,Accept,X-Requested-With');
//   res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
//   res.header('X-Powered-By', '3.2.1');
//   res.header('Content-Type', 'application/json;charset=utf-8');
//   next();
// });


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');


app.use('/api', apiRouter);
app.use('/users', usersRouter);
app.use('/upload', uploadRouter);
app.use('/journal', journalRouter);
app.use('/words', wordsRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});


//链接数据库
let connection = require('./connect');
connection.connect((err, result) => {
  if (err) {
    console.log(err);
    console.log("数据库连接失败！");
    return;
  }
  console.log(result);
  console.log("数据库连接成功！");
});
// connection.end();

module.exports = app;
