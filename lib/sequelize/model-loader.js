const {DataTypes} = require('sequelize');
const {DATA_TYPE, RELATIONSHIP} = require('../constants');

// 根据自己定义的类型，映射sequelize中对应的类型
const getType = col => {
    switch (col.dataType) {
        case DATA_TYPE.STRING:
            if (col.maxlength) {
                if (col.maxlength <= 255) {
                    return DataTypes.STRING;
                } else {
                    return DataTypes.STRING(col.maxlength);
                }
            } else {
                return DataTypes.TEXT;
            }
        case DATA_TYPE.BOOLEAN:
            return DataTypes.BOOLEAN;
        case DATA_TYPE.INT:
            return DataTypes.INTEGER;
        case DATA_TYPE.BIGINT:
            if (col.maxlength) {
                return DataTypes.BIGINT(col.maxlength);
            } else {
                return DataTypes.BIGINT;
            }
        case DATA_TYPE.FLOAT:
            if (col.precision) {
                if (col.maxlength) {
                    return DataTypes.FLOAT(col.maxlength, col.precision);
                } else {
                    return DataTypes.FLOAT(col.precision);
                }
            } else {
                return DataTypes.FLOAT;
            }
        case DATA_TYPE.DOUBLE:
            if (col.precision) {
                if (col.maxlength) {
                    return DataTypes.DOUBLE(col.maxlength, col.precision);
                } else {
                    return DataTypes.DOUBLE(col.precision);
                }
            } else {
                return DataTypes.DOUBLE;
            }
        case DATA_TYPE.DECIMAL:
            if (col.precision && col.maxlength) {
                return DataTypes.DECIMAL(col.maxlength, col.precision);
            } else {
                return DataTypes.DECIMAL;
            }
        case DATA_TYPE.DATETIME:
            return DataTypes.DATE;
        case DATA_TYPE.DATEONLY:
            return DataTypes.DATEONLY;
    }
};

module.exports = (models, sequelize) => {

    /**
     * 遍历models文件夹下的实体类配置，定义为sequelize的model对象，并读取model之间的关系
     */
    let relationship = [];
    models.forEach(m => {
        Object.values(m.columns).forEach(v => {
            v.type = getType(v);
        });
        sequelize.define(m.name, m.columns, {
            tableName: m.tableName,
            comment: m.comment,
            indexes: m.indexes
        });

        relationship = relationship.concat(m.relationship.map(v => {
            return {
                ...v,
                from: m.name
            };
        }));
    });

    /**
     * 建立model之间的联系
     */
    relationship.forEach(v => {
        if (v.type === RELATIONSHIP.MANY_TO_MANY) {
            sequelize.models[ v.from ][ v.type ](sequelize.models[ v.modelName ], {through: v.through});
        } else {
            sequelize.models[ v.from ][ v.type ](sequelize.models[ v.modelName ]);
        }
    });

};