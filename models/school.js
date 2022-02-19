const {RELATIONSHIP, DATA_TYPE} = require('../lib/constants');

module.exports = {

    name: 'school',
    comment: '学校',

    tableName: 't_school',

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
            comment: '学校名',
            allowNull: false
        }
    },

    relationship: [     // 跟其他model的关系
        {type: RELATIONSHIP.MANY_TO_MANY, modelName: 'community', through: 'school_community'}
    ]
};