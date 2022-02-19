const {RELATIONSHIP, DATA_TYPE} = require('../lib/constants');

module.exports = {

    name: 'community',
    comment: '小区',

    tableName: 't_community',

    columns: {
        id: {
            dataType: DATA_TYPE.INT,
            autoIncrement: true,
            primaryKey: true,
            comment: '自增id'
        },
        name: {
            dataType: DATA_TYPE.STRING,
            maxlength: 30,
            comment: '小区名',
            allowNull: false
        }
    },

    relationship: [     // 跟其他model的关系
        {type: RELATIONSHIP.MANY_TO_MANY, modelName: 'school', through: 'school_community'}
    ]
};