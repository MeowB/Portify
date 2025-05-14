const generateImageName = (userId, imageType, title) => {
	const timestamp = Date.now();
	const extension = title.split('.').pop(); // Extracts 'jpg' from 'photo.jpg'
	return `${userId}_${timestamp}_${imageType}.${extension}`;
};

export default generateImageName