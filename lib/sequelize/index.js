const {Sequelize} = require('sequelize');

module.exports = (app, models) => {
    let {dialect, scheme, user, password, host} = app.config.database;

    const sequelize = new Sequelize(scheme, user, password, {
        host,
        dialect,
        define: {
            paranoid: true, // 开启软删除，自动添加deleteAt字段记录删除时间，查询的时候默认无法查出来
            timestamps: true    // 默认添加updatedAt和createdAt字段，记录创建和更新时间
        }
    });

    require('./model-loader')(models, sequelize);

    return sequelize;
};