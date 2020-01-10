var express = require('express');
var router = express.Router();
var Pro = require('./../sql/col/pros');
var sql = require('./../sql');
var utils = require('./../utils');
var uuid = require('node-uuid');
/** 产品相关的接口 */
/**
 * @api {get} /api/pro 获取产品列表接口1111
 * @apiDescription 列表
 * @apiName /api/pro
 * @apiGroup pro
 * @apiParam {number} pageCode 页码（从0开始）
 * @apiParam {number} limitNum 每页显示个数（默认为10）
 * @apiSuccess {json} data
 * @apiSuccessExample {json} Success-Response:
 * // 没有更多数据了
 * {
 *  code: '10000',
 *  message: '没有更多数据了'
 * }
 * // 正常
 * {
 *    code: '200',
 *    message: '获取产品的数据',
 *    length: data.length, // 获取到多少条数据
 *    data: data // 获取到的数据
 *  }
 * @apiSampleRequest http://localhost:3000/api/pro
 * @apiVersion 1.0.0
 */
router.get('/', function(req, res, next) {
  let { pageCode, limitNum } = req.query; // 获取页码和每页显示个数
  sql.paging(Pro, {}, { _id: 0 }, pageCode, limitNum).then(data => {
    if (data.length === 0) { // 如果没有数据
      res.send({
        code: '10000',
        message: '没有更多数据了'
      })
    } else { // 有数据
      res.send({
        code: '200',
        message: '获取产品的数据',
        length: data.length, // 获取到多少条数据
        data: data // 获取到的数据
      })
    }
  })
});

/**
 * @api {get} /api/pro/sort 产品排序
 * @apiDescription 产品排序
 * @apiName /api/pro/sort
 * @apiGroup pro
 * @apiParam {string} type 排序规则（price 价格 / stock 库存 / sales 销量 / rating  评分/ flag 推荐）
 * @apiParam {number} num 升序还是降序（num 1 升序）
 * @apiSuccess {json} data
 * @apiSuccessExample {json} Success-Response:
 * // 没有更多数据了
 * {
 *  code: '10000',
 *  message: '没有更多数据了'
 * }
 * // 正常
 * {
 *    code: '200',
 *    message: '获取产品的数据',
 *    length: data.length, // 获取到多少条数据
 *    data: data // 获取到的数据
 *  }
 * @apiSampleRequest http://localhost:3000/api/pro/sort
 * @apiVersion 1.0.0
 */
router.get('/sort', (req, res, next) => {
  let { type, num } = req.query; 
  num = num *= 1
  sql.sort(Pro, {}, { _id: 0 }, { [type]: num }).then(data => {
    if (data.length === 0) { // 如果没有数据
      res.send({
        code: '10000',
        message: '没有更多数据了'
      })
    } else { // 有数据
      res.send({
        code: '200',
        message: '获取产品的数据',
        length: data.length, // 获取到多少条数据
        data: data // 获取到的数据
      })
    }
  })
})

/**
 * @api {get} /api/pro/category 产品分类
 * @apiDescription 产品分类
 * @apiName /api/pro/category
 * @apiGroup pro
 * @apiSuccess {json} data
 * @apiSuccessExample {json} Success-Response:
 * {
 *    code: '200',
 *    message: '获取产品的数据',
 *    data: ['', ''] 
 *  }
 * @apiSampleRequest http://localhost:3000/api/pro/category
 * @apiVersion 1.0.0
 */
router.get('/category', (req, res, next) => {
  sql.distinct(Pro, 'type').then(data => {
    res.send({
      code: '200',
      message: '获取产品的分类',
      data
    })
  })
})

/**
 * @api {get} /api/pro/detail 产品详情
 * @apiDescription 产品详情
 * @apiName /api/pro/detail
 * @apiGroup pro
 * @apiParam {string} proid 产品id
 * @apiSuccess {json} data
 * @apiSuccessExample {json} Success-Response:
 * {
 *    code: '200',
 *    message: '获取产品的详情数据',
 *    data: {
 *  "__v": 0,
        "proname": "荣耀20",
        "type": "手机",
        "proimg": "",
        "brand": "华为",
        "brandimg": "",
        "price": 2299,
        "stock": 1000,
        "sales": 50,
        "rating": 5,
        "flag": 0,
        "note": "",
        "detail": "",
        "proid": "pro_d245ee20-0c40-11ea-9bb7-f90a52a739bb"
    }
 * }
 *  }
 * @apiSampleRequest http://localhost:3000/api/pro/detail
 * @apiVersion 1.0.0
 */
router.get('/detail', (req, res, next) => {
  let { proid } = req.query
  sql.find(Pro, {proid}, { _id: 0}).then(data => {
    res.send({
      code: '200',
      message: '获取产品的详情数据',
      data: data[0]
    })
  })
})
//添加产品评论
/**
 * @api {get} /api/pro/updateComment 添加产品评论
 * @apiDescription 添加产品评论
 * @apiName /api/pro/updateComment
 * @apiGroup pro
 * @apiParam {string} proid 产品id
 * @apiParam {string} detail 评论详情
 * @apiParam {string} username 用户名
 * @apiParam {number} type 好评/中评/差评
 * @apiParam {number} proname 商品名称
 * @apiParam {sel} proname 商品尺码
 * @apiSuccess {json} data
 * @apiSuccessExample {json} Success-Response:
 * {
 *    code: '200',
 *    message: '获取产品的详情数据',
 * }
 *  }
 * @apiSampleRequest http://localhost:3000/api/pro/detail
 * @apiVersion 1.0.0
 */
router.get('/updateComment', (req, res, next) => {
  utils.validateToken(req, res, next).then(() => {
    let { proid, detail, username, type, proname, sel} = req.query;
    let listid = 'list_' + uuid.v1()
    sql.update(Pro, { proid }, { $push: { list: {detail : detail, username: username, listid: listid, type: type * 1, proname: proname, sel: sel} } }).then(() => {
      res.send({
        code: '20013',
        message: '更新成功'
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
