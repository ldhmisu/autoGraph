/**
 * 常量
 */
module.exports = {
    RELATIONSHIP: {                     // model之间的关系
        ONE_TO_ONE: 'hasOne',           // 一对一
        ONE_TO_MANY: 'hasMany',         // 一对多
        MANY_TO_ONE: 'belongsTo',       // 多对一
        MANY_TO_MANY: 'belongsToMany'   // 多对多
    },

    DATA_TYPE: {
        /**
         * 字符串，需要maxlength属性判断在数据库中具体的数据类型
         * 不传maxlength：TEXT
         *  maxlength < 255： TINYTEXT
         *  其他：VARCHAR(maxlength)
         */
        STRING: 1,
        BOOLEAN: 2,     // TINYINT(1)
        INT: 3,         // INTEGER
        BIGINT: 4,      // BIGINT, BIGINT(maxlength)
        FLOAT: 5,       // FLOAT, FLOAT(precision), FLOAT(maxlength,precision)
        DOUBLE: 6,      // DOUBLE, DOUBLE(precision), DOUBLE(maxlength,precision)
        DECIMAL: 7,     // DECIMAL, DECIMAL(maxlength,precision)
        DATETIME: 8,    // DATE     包含日期+时间
        DATEONLY: 9     // DATEONLY 只包含日期
    }
}
;