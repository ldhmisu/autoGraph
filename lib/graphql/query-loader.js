/**
 * 根据model自动生成query的typeDef和查询接口
 */
module.exports = model => {
    let type = `"${model.comment}列表"
    ${model.name}List (page:Int, size:Int): [${model.name}]
    "${model.comment}详情"
    ${model.name}Detail : ${model.name}`;

    let resolver = {
        [ `${model.name}List` ]: async (parent, args, ctx, info) => {
            const {page = 1, size = 10} = args;
            let where = {};
            return await ctx.models[ model.name ].findAll({offset: (page - 1) * size, limit: size, where});
        },
        [ `${model.name}Detail` ]: () => {

        }
    };
    return {
        type,
        resolver
    };
};