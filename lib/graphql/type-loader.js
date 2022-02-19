const {DATA_TYPE, RELATIONSHIP} = require('../constants');

// 根据model定义的数据类型，转化为graphql的类型
const getGraphqlType = col => {
    if (col.primaryKey) {   // 主键直接返回ID
        return 'ID';
    }
    switch (col.dataType) {
        case DATA_TYPE.STRING:
            return 'String';
        case DATA_TYPE.BOOLEAN:
            return 'Boolean';
        case DATA_TYPE.INT:
            return 'Int';
        case DATA_TYPE.BIGINT:
            return 'Int';
        case DATA_TYPE.FLOAT:
        case DATA_TYPE.DOUBLE:
        case DATA_TYPE.DECIMAL:
            return 'Float';
        case DATA_TYPE.DATETIME:
            return 'String';
        case DATA_TYPE.DATEONLY:
            return 'String';
    }
};

/**
 * 根据model自动生成typeDef
 * @param model
 */
module.exports = model => {
    // 加载model的字段信息
    let columns = model.columnList.map(v => {
        return `"${v.comment}"
        ${v.name}: ${getGraphqlType(v)}`;
    });
    // 根据model与其他model的关系，生成各种关联字段
    let relationship = '';
    model.relationship.forEach(v => {
        switch (v.type) {
            case RELATIONSHIP.MANY_TO_MANY:             //  一对多： xxxList，xxxExist,
            case RELATIONSHIP.ONE_TO_MANY:              // 一对多： xxxList，xxxExist,
                relationship += `
                "${v.model.comment}列表"
                ${v.model.name}List: [${v.model.name}]
                "是否存在${v.model.comment}"
                ${v.model.name}Exist: ${v.model.name}`;
                break;
            case RELATIONSHIP.MANY_TO_ONE:              // 一对一： xxx
                relationship += `
                "${v.model.comment}"
                ${v.model.name}: ${v.model.name} `;
                break;
        }
    });
    return `"${model.comment}"
    type ${model.name} {
        ${columns}
        ${relationship}
        "创建时间"
        createdAt: String
        "更新时间"
        updatedAt: String
        "删除时间"
        deletedAt: String
    }`;
};