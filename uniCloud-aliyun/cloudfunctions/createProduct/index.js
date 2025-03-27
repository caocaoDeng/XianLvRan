'use strict';
exports.main = async (event, context) => {
	const dbJQL = uniCloud.databaseForJQL({ event, context})
	const { userId, cover, media, title, description, address } = JSON.parse(event.body)
	const res = await dbJQL.collection('products').add({
		userId,
		cover,
		media,
		title,
		description,
		address
	})
	console.log(res)
	//返回数据给客户端
	return res
};
