var express = require('express');
var router = express.Router();
var sql = require('./../sql');
var Order = require('./../sql/col/orders');
var Cart = require('./../sql/col/carts');
var utils = require('./../utils');
var uuid = require('node-uuid');



/**
 * @api {get} /api/order 获取订单中心数据
 * @apiDescription 获取订单中心数据
 * @apiName /api/order
 * @apiGroup order
 * @apiParam {string} token token
 * @apiParam {string} userid 用户id
 * @apiSuccess {json} data
 * @apiSuccessExample {json} Success-Response:
  *  res.send({
          code: '33301',
          message: '没有订单'
        })
    res.send({
      code: '10119',
      message: '无效的token'
    })
    res.send({
      code: '200',
      message: '订单中心的列表数据',
      data
    })
 * @apiSampleRequest http://localhost:3000/api/order
 * @apiVersion 1.0.0
 */
router.get('/', (req, res, next) => {
  utils.validateToken(req, res, next).then(() => {
    let { userid } = req.query
    sql.find(Order, { userid }, { _id: 0 }).then(data => {
      if (data.length === 0) {
        res.send({
          code: '33301',
          message: '没有订单'
        })
      } else {
        console.log(1111111)
        res.send({
          code: '200',
          message: '订单的列表数据',
          data: data
        })
      }
    })
  }).catch(() => {
    res.send({
      code: '10119',
      message: '无效的token'
    })
  })

})



/**
 * @api {post} /api/order/add 提交订单
 * @apiDescription 加入购物车
 * @apiName /api/order/add
 * @apiGroup order
 * @apiParam {string} token token
 * @apiParam {string} userid 用户id
 * @apiParam {array} list 列表的数据
 * @apiSuccess {json} data
 * @apiSuccessExample {json} Success-Response:
 *  res.send({
          code: '10015',
          message: '提交订单成功'
        })
    res.send({
      code: '10119',
      message: '无效的token'
    })
 * @apiSampleRequest http://localhost:3000/api/order/add
 * @apiVersion 1.0.0
 */
router.post('/add', function(req, res, next) {
  // 1、验证用户是否已经登录
  utils.validateToken(req, res, next).then(() => {
    // 2、获取前端提交的数据
    let { userid, list } = req.body
    // 3、修改前端提交的 list的字符串为数组
    list = JSON.parse(list)
    let orderid = 'order_' + uuid.v1()
    // 4、插入数据库
    sql.insert(Order, {
      orderid, 
      userid,
      list,
      status: 0,
      username: '',
      tel: '',
      address: '',
      note: '',
      pay: '' 
    }).then(() => {
      res.send({
        code: '10015',
        message: '提交订单成功',
        data: orderid
      })
    })
  }).catch(() => {
    res.send({
      code: '10119',
      message: '无效的token'
    })
  })
});

/**
 * @api {get} /api/order/detail 订单详情
 * @apiDescription 订单详情
 * @apiName /api/order/detail
 * @apiGroup order
 * @apiParam {string} token token
 * @apiParam {string} orderid 订单id
 * @apiSuccess {json} data
 * @apiSuccessExample {json} Success-Response:
 *  res.send({
        code: '200',
        message: '订单详情',
        data
      })
    res.send({
      code: '10119',
      message: '无效的token'
    })
 * @apiSampleRequest http://localhost:3000/api/order/detail
 * @apiVersion 1.0.0
 */
router.get('/detail', (req, res, next) => {
  utils.validateToken(req, res, next).then(() => {
    let { orderid } = req.query
    sql.find(Order, { orderid }, { _id: 0 }).then(data => {
      res.send({
        code: '200',
        message: '订单详情',
        data: data[0]
      })
    })
  }).catch(() => {
    res.send({
      code: '10119',
      message: '无效的token'
    })
  })
})

/**
 * @api {post} /api/order/updateOrder 修改订单
 * @apiDescription 修改订单
 * @apiName /api/order/updateOrder
 * @apiGroup order
 * @apiParam {string} token token
 * @apiParam {string} orderid 订单id
 * @apiParam {array} cartidarr 购物车id的数据
 * @apiParam {string} username 收件人姓名
 * @apiParam {string} tel 联系方式
 * @apiParam {string} address 地址
 * @apiParam {string} note 备注
 * @apiSuccess {json} data
 * @apiSuccessExample {json} Success-Response:
 *  res.send({
        code: '10019',
        message: '修改订单成功'
      })
    res.send({
      code: '10119',
      message: '无效的token'
    })
 * @apiSampleRequest http://localhost:3000/api/order/updateOrder
 * @apiVersion 1.0.0
 */
router.post('/updateOrder', (req, res, next) => {
  utils.validateToken(req, res, next).then(() => {
    // 获取信息
    let { orderid, cartidarr, username, tel, address, note } = req.body
    let updateData = {
      $set: { username, tel, address, note }
    }
    sql.update(Order, { orderid }, updateData).then(() => {
      // 更新成功--- 删除购物车对应的数据
      let p1 = cartidarr.map(item => {
        console.log(item)
        sql.delete(Cart, { cartid: item })
      })
      return Promise.all(p1)
    }).then(() => {
      res.send({
        code: '10019',
        message: '修改订单成功'
      })
    })
  }).catch(() => {
    res.send({
      code: '10119',
      message: '无效的token'
    })
  })
})
/**
 * @api {get} /api/order/updatepay 修改订单的支付方式
 * @apiDescription 修改订单的支付方式
 * @apiName /api/order/updatepay
 * @apiGroup order
 * @apiParam {string} orderid 订单id
 * @apiParam {array} paytype 支付方式
 * @apiSuccess {json} data
 * @apiSuccessExample {json} Success-Response:
 *  res.send({
        code: '10019',
        message: '修改订单成功'
      })
    res.send({
      code: '10119',
      message: '无效的token'
    })
 * @apiSampleRequest http://localhost:3000/api/order/updatepay
 * @apiVersion 1.0.0
 */
router.get('/updatepay', (req, res, next) => {
  let { orderid, paytype } = req.query
  sql.update(Order, {orderid}, { $set:{pay:paytype}}).then(() => {
    res.send({
      code: '10019',
      message: '修改订单成功'
    })
  })
})


/**
 * @api {get} /api/order/updatestatus 修改订单的状态
 * @apiDescription 修改订单的状态
 * @apiName /api/order/updatestatus
 * @apiGroup order
 * @apiParam {string} orderid 订单id
 * @apiParam {array} status // 0 未支付 1 待收货 2 待评价 3 已完成
 * @apiSuccess {json} data
 * @apiSuccessExample {json} Success-Response:
 *  res.send({
        code: '10019',
        message: '修改订单成功'
      })
    res.send({
      code: '10119',
      message: '无效的token'
    })
 * @apiSampleRequest http://localhost:3000/api/order/updatestatus
 * @apiVersion 1.0.0
 */
router.get('/updatestatus', (req, res, next) => {
  let { orderid, status } = req.query
  sql.update(Order, {orderid}, { $set:{status}}).then(() => {
    res.send({
      code: '10019',
      message: '修改订单成功'
    })
  })
})


/**
 * @api {post} /api/order/updatepaystatus 修改订单付款方式和付款状态
 * @apiDescription 修改订单的状态
 * @apiName /api/order/updatepaystatus
 * @apiGroup order
 * @apiParam {string} token token
 * @apiParam {string} orderid 订单id
 * @apiParam {string} pay 订单付款方式
 * @apiParam {number} status // 0 未支付 1 待收货 2 待评价 3 已完成
 * @apiSuccess {json} data
 * @apiSuccessExample {json} Success-Response:
 *  res.send({
        code: '10019',
        message: '修改订单成功'
      })
 *  res.send({
        code: '33333',
        message: '修改订单付款失败'
      })
    res.send({
      code: '10119',
      message: '无效的token'
    })
 * @apiSampleRequest http://localhost:3000/api/order/updatepaystatus
 * @apiVersion 1.0.0
 */
router.post('/updatepaystatus', (req, res, next) => {
  utils.validateToken(req, res, next).then(() => {
    let { orderid, pay, status } = req.body
    status = status * 1
    let updateData = {
      $set: { pay, status }
    }
    console.log('aaaaaaaaaaaa')
    console.log(orderid)
    console.log(pay)
    console.log(status)
    console.log('aaaaaaaaaaaa')
    sql.update(Order, { orderid }, updateData).then(() => {
      console.log('bbbbbbb')
      res.send({
        code: '10019',
        message: '修改订单成功'
      })
    }).catch(() => {
      console.log('ccccccccccc')
      res.send({
        code: '33333',
        message: '修改订单付款失败'
      })
    })
  }).catch(() => {
    res.send({
      code: '10119',
      message: '无效的token'
    })
  })
})

/* 修改订单评论状态 */
router.post('/updateNote', (req, res, next) => {
  utils.validateToken(req, res, next).then(() => {
    let { orderid, status } = req.body
    status = status * 1
    let updateData = {
      $set: { status }
    }
    sql.update(Order, { orderid }, updateData).then(() => {
      res.send({
        code: '20019',
        message: '修改订单评论状态成功'
      })
    }).catch(() => {
      res.send({
        code: '33333',
        message: '修改订单评论状态失败'
      })
    })
  }).catch(() => {
    res.send({
      code: '10119',
      message: '无效的token'
    })
  })
})



module.exports = router;
