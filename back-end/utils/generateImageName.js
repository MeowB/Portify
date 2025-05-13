const generateImageName = (userId, imageType, title) => {
	console.log(userId, imageType, title)
	const timestamp = Date.now();
	const extension = title.split('.').pop(); // Extracts 'jpg' from 'photo.jpg'
	console.log(`${userId}_${timestamp}_${imageType}.${extension}`)
	return `${userId}_${timestamp}_${imageType}.${extension}`;
};

export default generateImageName