var express = require('express');
var router = express.Router();
var User = require('./../sql/col/users');
var sql = require('./../sql');
var bcrypt = require('bcryptjs');
var uuid = require('node-uuid');
var utils = require('./../utils')
var jwt = require('jsonwebtoken');
/**
 * @api {post} /api/users/register 注册接口
 * @apiDescription 注册接口
 * @apiName /api/users/register
 * @apiGroup users
 * @apiParam {string} username 用户名
 * @apiParam {string} tel 联系方式
 * @apiParam {string} password 密码
 * @apiSuccess {json} data
 * @apiSuccessExample {json} Success-Response:
 * // 注册成功
 * {
 *    code: '10002',
 *    message: '注册成功'
 *  }
 *  // 注册失败
 * {
 *    code: '10003',
 *    message: '注册失败'
 *  }
 *  // 用户已注册
 * {
 *    code: '10001',
 *    message: '用户已注册'
 *  }
 * @apiSampleRequest http://localhost:3000/api/users/register
 * @apiVersion 1.0.0
 */
router.post('/register', (req, res, next) => {
  let { username, password, tel } = req.body;
  sql.find(User, { tel }, { _id: 0 }).then(data => {
    if (data.length === 0) {
      // res.send('可以注册')
      // 密码加密和强度
      var salt = bcrypt.genSaltSync(10);
      password = bcrypt.hashSync(password, salt);
      // res.send(password)
      // 要插入的数据
      let insertData = {
        userid: 'user_' + uuid.v1(),
        username,
        tel,
        password,
        birthday: '',
        sex: -1,
        email: ''
      }
      // 插入数据库
      sql.insert(User, insertData).then(() => {
        res.send({
          code: '10002',
          message: '注册成功5'
        })
      }).catch(() => {
        res.send({
          code: '10003',
          message: '注册失败5'
        })
      })
    } else {
      res.send({
        code: '10001',
        message: '用户已存在'
      })
    }
  })
})

// 发送短信验证码
/**
 * @api {get} /api/users/sendCode 发送短信验证码
 * @apiDescription 发送短信验证码
 * @apiName /api/users/sendCode
 * @apiGroup users
 * @apiParam {string} tel 联系方式
 * @apiSuccess {json} data
 * @apiSuccessExample {json} Success-Response:
 * // 发送成功
 * {
 *    code: '10004',
 *    message: '发送验证码成功'
 *    data: code
 *  }
 *  // 发送失败
 * {
 *    code: '10005',
 *    message: '发送失败'
 *  }
 *  // 用户已注册
 * {
 *    code: '10001',
 *    message: '用户已注册'
 *  }
 * @apiSampleRequest http://localhost:3000/api/users/sendCode
 * @apiVersion 1.0.0
 */
router.get('/sendCode', (req, res, next) => {
  // 获取电话
  let { tel } = req.query;
  // 判断是否已经注册
  sql.find(User, { tel }, { _id: 0 }).then(data => {
    if (data.length === 0) {
      let code = Math.floor(Math.random() * 900000 + 100000)
      // 生成随机验证码，最小100000
      utils.sendCode(tel, code).then(() => {
        res.send({
          code: '10004',
          message: '验证码发送成功',
          code: code
        })
      }).catch(() => {
        res.send({
          code: '10005',
          message: '发送失败',
          code: code
        })

      })
    } else {
      res.send({
        code: '10001',
        message: '重复号码'
      })
    }
  })
})

/**
 * @api {get} /api/users/sendCode2 发送短信验证码2
 * @apiDescription 发送短信验证码2
 * @apiName /api/users/sendCode2
 * @apiGroup users
 * @apiParam {string} tel 联系方式
 * @apiSuccess {json} data
 * @apiSuccessExample {json} Success-Response:
 * // 发送成功
 * {
 *    code: '10004',
 *    message: '发送验证码成功'
 *    data: code
 *  }
 *  // 发送失败
 * {
 *    code: '10005',
 *    message: '发送验证码失败'
 *  }
 *  // 用户已注册
 * {
 *    code: '10001',
 *    message: '用户已注册'
 *  }
 * @apiSampleRequest http://localhost:3000/api/users/sendCode2
 * @apiVersion 1.0.0
 */
router.get('/sendCode2', (req, res, next) => {
  // 1、获取手机号
  let { tel } = req.query;
  // 2、判断有没有该用户
  
    
      // 2.1 没有该用户，可以发送
      // 3、生成随机验证码
      let code = Math.floor(Math.random() * 900000 + 100000) // 10000-99999
      // 4、发送验证码
      utils.sendCode(tel, code).then(() => {
        // 4.1 发送成功
        res.send({
          code: '10004',
          message: '发送验证码成功',
          data: code
        })
      }).catch(() => {
        // 4.2 发送失败
        res.send({
          code: '10005',
          message: '发送验证码失败',
          data: code
        })
      })
    
  
})



// 登录
// 登陆接口
/**
 * @api {post} /api/users/login 登陆接口
 * @apiDescription 登陆接口
 * @apiName /api/users/login
 * @apiGroup users
 * @apiParam {string} tel 联系方式
 * @apiParam {string} password 密码
 * @apiSuccess {json} data
 * @apiSuccessExample {json} Success-Response:
 * // 登陆成功
 * {
 *    code: '10008',
 *    message: '登陆成功',
 *    data: {
 *      userid: '',
 *      username: '',
 *      token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0ZWwiOiIxODgxMzAwNzgxNCIsImlhdCI6MTU3NTM0NDIzMCwiZXhwIjoxNTc1NDMwNjMwfQ.Tst5MC5Rvu-oDugnUUc3ze067hiosLOxC20MnMCWtIQ"
 *    }
 *  }
 *  // 密码错误
 * {
 *    code: '10007',
 *    message: '密码错误'
 *  }
 *  // 用户未注册
 * {
 *    code: '10006',
 *    message: '用户未注册'
 *  }
 * @apiSampleRequest http://localhost:3000/api/users/login
 * @apiVersion 1.0.0
 */
router.post('/login', (req, res, next) => {
  let { tel, password } = req.body;
  // 获取电话，密码
  // 判断是否存在电话
  sql.find(User, { tel }, { _id: 0 }).then(data => {
    if (data.length === 0) {
      res.send({
        code: '10006',
        message: '未注册'
      })
    } else {
      // 验证密码 hash 数据库中的密码
      let pwd = data[0].password;
      // 对比
      let flag = bcrypt.compareSync(password, pwd);

      // 判断flag真假
      if (flag) {
        let token = jwt.sign({ tel }, 'daxunxun', {
          expiresIn: 60*60*24*7// 授权时效7天
        })
        // 允许登录，返回信息
        res.send({
          code: '10008',
          message: '登陆成功',
          data: {
            userid: data[0].userid,
            username: data[0].username,
            token
          }
        })
      } else {
        // 密码错
        res.send({
          code: '10007',
          message: '密码错误'
        })
      }

    }
  })
})

// 个人中心
/**
 * @api {post} /api/users/update 修改个人中心
 * @apiDescription 修改个人中心
 * @apiName /api/users/update
 * @apiGroup users
 * @apiParam {string} userid 用户id
 * @apiParam {string} password 密码
//  * @apiParam {number} sex 性别 （1 表示男  0 表示女）
//  * @apiParam {string} email 邮箱
 * @apiSuccess {json} data
 * @apiSuccessExample {json} Success-Response:
 * // 修改个人信息成功
 * {
 *    code: '10009',
 *    message: '修改个人信息成功'
 *  }
 *  // 修改个人信息失败
 * {
 *    code: '10010',
 *    message: '修改个人信息失败'
 *  }
 * @apiSampleRequest http://localhost:3000/api/users/update
 * @apiVersion 1.0.0
 */
router.post('/update', (req, res, next) => {
  // 1、获取相关字段,userid为修改的条件，其余的为修改的值
  let { userid, password, } = req.body;
  // 2、依据userid 获取数据库中的数据，如果用户没有传递，则不修改
  sql.find(User, { userid }, { _id: 0 }).then(data => {
    // 2.1 获取原先的数据，如果传递的有值，用传递的值，没有则用数据库中值 --- 默认值为数据库中的值
    // username = username || data[0].username;
    // tel = tel || data[0].tel;
    password = password || data[0].password;
    // sex = sex * 1 || data[0].sex * 1;
    // birthday = birthday || data[0].birthday;
    // email = email || data[0].email;
    // 3、修改数据
    console.log(password)
    console.log(typeof password)
    var salt = bcrypt.genSaltSync(10);
      // 4.2 密码加密
    password = bcrypt.hashSync(password, salt);
    sql.update(User, { userid }, { $set: { password }}).then(() => {
      // 3.1修改成功
      
      res.send({
        code: '10009',
        message: '修改个人信息成功'
      })
    }).catch(() => {
      // 3.2修改失败
      res.send({
        code: '10010',
        message: '修改个人信息失败'
      })
    })
  })
})

/**
 * @api {post} /api/users/register2 注册接口2
 * @apiDescription 注册接口2
 * @apiName /api/users/register2
 * @apiGroup users
 * @apiParam {string} tel 联系方式
 * @apiSuccess {json} data
 * @apiSuccessExample {json} Success-Response:
 * // 注册成功
 * {
 *    code: '10002',
 *    message: '注册成功'
 *  }
 *  // 注册失败
 * {
 *    code: '10003',
 *    message: '注册失败'
 *  }
 *  // 用户已注册
 * {
 *    code: '10001',
 *    message: '用户已注册'
 *  }
 * @apiSampleRequest http://localhost:3000/api/users/register2
 * @apiVersion 1.0.0
 */
router.post('/register2', (req, res, next) => {
  let { tel } = req.body;
  sql.find(User, { tel }, { _id: 0 }).then(data => {
    if (data.length === 0) {
      // res.send('可以注册')
      // 密码加密和强度
      // res.send(password)
      // 要插入的数据
      let insertData = {
        // userid: 'user_' + uuid.v1(),
        // username,
        // password,
        tel
      }
      // 插入数据库
      sql.insert(User, insertData).then(() => {
        res.send({
          code: '10002',
          message: '注册成功5'
        })
      }).catch(() => {
        res.send({
          code: '10003',
          message: '注册失败5'
        })
      })
    } else {
      res.send({
        code: '10001',
        message: '用户已存在'
      })
    }
  })
})



/**
 * @api {post} /api/users/update2 修改个人中心2
 * @apiDescription 修改个人中心2
 * @apiName /api/users/update2
 * @apiGroup users
 * @apiParam {string} userid 用户id
 * @apiParam {string} tel 联系方式
 * @apiParam {string} username 用户名
 * @apiParam {string} password 密码
 * @apiSuccess {json} data
 * @apiSuccessExample {json} Success-Response:
 * // 修改个人信息成功
 * {
 *    code: '10009',
 *    message: '修改个人信息成功'
 *  }
 *  // 修改个人信息失败
 * {
 *    code: '10010',
 *    message: '修改个人信息失败'
 *  }
 * @apiSampleRequest http://localhost:3000/api/users/update2
 * @apiVersion 1.0.0
 */
router.post('/update2', (req, res, next) => {
  // 1、获取相关字段,userid为修改的条件，其余的为修改的值
  let { userid, username, tel, password, } = req.body;
  // 2、依据userid 获取数据库中的数据，如果用户没有传递，则不修改
  sql.find(User, { userid }, { _id: 0 }).then(data => {
    // 2.1 获取原先的数据，如果传递的有值，用传递的值，没有则用数据库中值 --- 默认值为数据库中的值
    username = username || data[0].username;
    tel = tel || data[0].tel;
    password = password || data[0].password;
    // sex = sex * 1 || data[0].sex * 1;
    // birthday = birthday || data[0].birthday;
    // email = email || data[0].email;
    // 3、修改数据
    console.log(password)
    console.log(typeof password)
    var salt = bcrypt.genSaltSync(10);
      // 4.2 密码加密
    password = bcrypt.hashSync(password, salt);
    sql.update(User, { userid }, { $set: { username, tel, password }}).then(() => {
      // 3.1修改成功
      
      res.send({
        code: '10009',
        message: '修改个人信息成功'
      })
    }).catch(() => {
      // 3.2修改失败
      res.send({
        code: '10010',
        message: '修改个人信息失败'
      })
    })
  })
})



// 获取用户信息
/**
 * @api {get} /api/users/getInfo 获取用户信息
 * @apiDescription 获取用户信息
 * @apiName /api/users/getInfo
 * @apiGroup users
 * @apiParam {string} userid 用户id
 * @apiParam {string} token token
 * @apiSuccess {json} data
 * @apiSuccessExample {json} Success-Response:
 * // 未登录
 * res.send({ 
    code: '10119', 
    message: '没有找到token.' 
  });
 * 
 * res.send({
      code: '200',
      message: '获取用户的信息',
      data: {
        username, tel, sex, birthday, email, userid
      }
    })
 * @apiSampleRequest http://localhost:3000/api/users/getInfo
 * @apiVersion 1.0.0
 */
router.get('/getInfo', (req, res, next) => {
  utils.validateToken(req, res, next).then(() => {
  // 获取userid
  let { userid } = req.query;
  // 查数据
  sql.find(User, { userid }, { _id: 0 }).then(data => {
    let { username, tel, sex, birthday, email, userid } = data[0]
    res.send({
      code: '200',
      message: '获取用户信息成功',
      data: {
        username, tel, sex, birthday, email, userid
      }
    })
  })
}).catch(() => {
  res.send({ 
    code: '10119', 
    message: '没有找到token.' 
  })
})
})
module.exports = router;
