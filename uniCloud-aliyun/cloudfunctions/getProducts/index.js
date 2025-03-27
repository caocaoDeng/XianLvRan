'use strict';
exports.main = async (event, context) => {
	// const { page, pageSize, category_id, } = JSON.parse(event.body)
	// if (!page || !pageSize) return {
	// 	code: 400,
	// 	data: null,
	// 	message: '缺少必要参数'
	// }
	const dbJQL = uniCloud.databaseForJQL({ event, context})
	const res = await dbJQL.collection('products')
		.where({
			// category: category_id || undefined,
			// 上线
			// status: 3,
		})
		// .orderBy('create_date desc')
		// .skip((page - 1) * pageSize)
		// .limit(pageSize)
		.get();
	return {
		code: res.errCode || 200,
		data: res,
		message: res.errMsg || 'msg: ok'
	}
};	