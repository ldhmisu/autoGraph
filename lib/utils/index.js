const path = require('path');
const glob = require('glob');

module.exports = {

    /**
     * 获取某个文件夹下的js模块
     * @param dirPath   相对于项目根目录的文件夹路径
     */
    getModulesInDir (dirPath) {
        let dir = path.resolve(process.cwd(), dirPath);
        let files = glob.sync('**/*.js', {cwd: dir});
        if (!files.length) {
            console.error(`${dir}下未找到models`);
            process.exit(1);
        }
        return files.map(v => {
            return require(path.resolve(dir, v));
        });
    },

    /**
     * 处理models数据，转化columns为列表、查询relationship的model对象等等
     */
    resolveModels (models) {
        models.forEach(v => {
            v.columnList = Object.keys(v.columns).map(k => {    // columns从对象转为列表，方便遍历
                return {
                    ...v.columns[ k ],
                    name: k
                };
            });
            v.relationship.forEach(r => {
                r.model = models.find(m => m.name === r.modelName);
            });
        });
    }
};