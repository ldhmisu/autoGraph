/**
 * 根据model自动生成mutation的typeDef和操作接口
 * @param model
 */
module.exports = model => {
    let type = `"新建${model.comment}"
    ${model.name}Create: ${model.name}`;
    console.log(type);
    let resolver = {
        [ `${model.name}Create` ]: async (parent, args, ctx, info) => {
        }
    };
    return {
        type,
        resolver
    };
};