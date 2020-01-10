var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

// 后台管理系统的路由
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var proRouter = require('./routes/pro');
var bannerRouter = require('./routes/banner');
var cartRouter = require('./routes/cart');
var orderRouter = require('./routes/order');

// 后台接口的路由
var proApi = require('./api/pro');
var usersApi = require('./api/users');
var cartApi = require('./api/cart');
var orderApi = require('./api/order');
var addressApi = require('./api/address');
var kindApi = require('./api/kind');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// 后台管理系统的路由
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/pro', proRouter);
app.use('/banner', bannerRouter);
app.use('/cart', cartRouter);
app.use('/order', orderRouter);

// 后台接口的路由
app.use('/api/pro', proApi);
app.use('/api/users', usersApi);
app.use('/api/cart', cartApi);
app.use('/api/order', orderApi);
app.use('/api/address', addressApi);
app.use('/api/kind', kindApi);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

var process = require('process')

var port = (function () {
  if (typeof (process.argv[2]) !== 'undefined') { // 如果输入了端口号，则提取出来
    if (isNaN(process.argv[2])) { // 如果端口号不为数字，提示格式错误
      throw 'Please write a correct port number.'
    } else { // 如果端口号输入正确，将其应用到端口
      return process.argv[2]
    }
  } else { // 如果未输入端口号，则使用下面定义的默认端口
    return 3010
  }
})();
app.listen(port, function () {
  console.log('Example app listening on port ' + port + ' !')
})

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
