var config = require("config-lite");
var Mongolass = require("mongolass");
var moment = require("moment");
var objectIdToTimestamp = require("objectid-to-timestamp");

var mongolass = new Mongolass();
mongolass.connect(config.mongodb);

exports.User = mongolass.model('User', {
    name: { type: 'string' },
    password: { type: 'string' },
    avatar: { type: 'string' },
    gender: { type: 'string', enum: ['m', 'f', 'x'] },
    bio: { type: 'string' }
});

//  根据id生成创建时间created_at
mongolass.plugin("addCreatedAt", {
    afterFind: function(results) {
        results.forEach(function(item) {
            item.created_at = moment(objectIdToTimestamp(item.id)).format("YYYY-MM-DD HH:mm");
        });
        return results;
    },
    afterFineOne: function(result) {
        if (result) {
            result.created_at = moment(objectIdToTimestamp(item.id)).format("YYYY-MM-DD HH:mm");
        }
        return result;
    }
});

// 根据用户名找到用户，用户名全局唯一
exports.User.index({ name: 1 }, { unique: true }).exec();

exports.Post = mongolass.model('Post', {
    author: { type: Mongolass.Types.ObjectId },
    title: { type: 'string' },
    content: { type: 'string' },
    pv: { type: 'number' }
});

// 按创建时间降序查看用户的文章列表
exports.Post.index({ author: 1, _id: -1 }).exec();