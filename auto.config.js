/**
 * 参考nuxt.config和webpack.config，作为整个工程的入口配置文件
 */
module.exports = {

    /**
     * 服务端口
     */
    server: {
        port: 8080
    },

    /**
     * 数据库配置，数据库需要手动建一个scheme，里面的库表结构可以通过代码自动生成
     */
    database: {
        dialect: 'mysql',
        scheme: 'autograph',
        user: 'root',
        password: 'huizi0808',
        host: '127.0.0.1'
    },

    /**
     * 七牛配置
     */
    qiniu: {},

    modelsDir: './models',
    adminDir: './admin'
};
