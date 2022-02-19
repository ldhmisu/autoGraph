(async () => {
    const config = require('../auto.config');

    if (config.modelsDir) {     // 如果传了models目录，表示开启后端服务
        const Koa = require('koa');
        const utils = require('./utils');
        const app = new Koa();
        app.config = config;

        let models = utils.getModulesInDir(app.config.modelsDir);
        utils.resolveModels(models);

        /**
         * 处理数据库模型以及关系
         */
        const sequelize = require('./sequelize')(app, models);
        /**
         * 处理接口定义、字段定义
         */
        const server = require('./graphql')(app, models);
        await server.start();
        // 同步数据库
        await sequelize.sync({alter: true});
        app.db = sequelize;

        // 设置graphql中间件
        app.use(server.getMiddleware());

        // 开启服务
        app.listen({port: app.config.server.port}, () => {
                console.log(`🚀 服务器已启动 http://localhost:${app.config.server.port}${server.graphqlPath}`);
            }
        );
    }

    if (config.adminDir) {    // 如果传了adminDir目录，表示开启中台项目

    }
})();
