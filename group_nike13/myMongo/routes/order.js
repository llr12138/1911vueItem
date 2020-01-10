var express = require('express');
var router = express.Router();
var Order = require('./../sql/col/orders');
var sql = require('./../sql')

/* GET users listing. */
router.get('/', function(req, res, next) {
  sql.find(Order, {status: 1}, { _id: 0 }).then(data => {
    res.render('order', { 
      activeIndex: 6,
      data
    })
  })
});
// router.get('/deliver', function(req, res, next) {
//   sql.find(Order, {status: 1}, { _id: 0 }).then(data => {
//     res.render('order', { 
//       activeIndex: 6,
//       data
//     })
//   })
// });
router.get('/deliver', (req, res, next) => {
  let orderid = req.query.orderid
  let updateData = {
    $set: { status: 2 }
  }
  sql.update(Order, { orderid }, updateData).then(() => {
    res.redirect('/order')
  })
})


module.exports = router;
