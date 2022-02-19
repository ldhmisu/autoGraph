const {RELATIONSHIP, DATA_TYPE} = require('../lib/constants');

module.exports = {

    name: 'post',
    comment: '文章',

    tableName: 't_posts',

    columns: {
        id: {
            dataType: DATA_TYPE.INT,
            autoIncrement: true,
            primaryKey: true,
            comment: '自增id'
        },
        title: {
            dataType: DATA_TYPE.STRING,
            maxlength: 20,
            comment: '文章标题',
            allowNull: false
        },
        content: {
            dataType: DATA_TYPE.STRING,
            maxlength: 500,
            comment: '文章内容'
        }
    },

    relationship: [     // 跟其他model的关系
        {type: RELATIONSHIP.ONE_TO_MANY, modelName: 'image'}
    ],

    indexes: [  // 索引
        {
            name: 'post_id',
            type: 'UNIQUE',
            using: 'BTREE',
            fields: [ 'title', 'content' ]
        }
    ]

};