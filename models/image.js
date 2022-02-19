const {RELATIONSHIP, DATA_TYPE} = require('../lib/constants');

module.exports = {

    name: 'image',
    comment: '图片',

    tableName: 't_images',

    columns: {
        id: {
            dataType: DATA_TYPE.INT,
            autoIncrement: true,
            primaryKey: true,
            comment: '自增id'
        },
        url: {
            dataType: DATA_TYPE.STRING,
            maxlength: 200,
            comment: '图片链接',
            allowNull: false
        }
    },

    relationship: [     // 跟其他model的关系
        {type: RELATIONSHIP.MANY_TO_ONE, modelName: 'post'}
    ]
};