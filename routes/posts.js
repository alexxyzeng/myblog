var express = require("express");
var router = express.Router();

var checkLoginIn = require("../middlewares/check").checkLogin;

//  GET /posts 所有用户或者特定用户的文章页
router.get("/", function(req, res, next) {
    res.render('posts');
});

//  发表文章页
router.get("/create", function(req, res, next) {
    res.send(req.flash());
});

//  文章详情页
router.get("/:postId", function(req, res, next) {
    res.send(req.flash());
});

//  文章编辑页
router.get("/:postId/edit", checkLoginIn, function(req, res, next) {
    res.send(req.flash());
});

//  文章删除
router.get("/:postId/remove", checkLoginIn, function(req, res, next) {
    res.send(req.flash());
});

//  创建留言
router.post("/:postId/comment", checkLoginIn, function(req, res, next) {
    res.send(req.flash());
});

router.get("/:postId/comment/:commentId/remove", checkLoginIn, function(req, res, next) {
    res.send(req.flash());
});

module.exports = router;