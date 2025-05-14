const getKeyFromS3Url = (s3Url) => {
	try {
		const url = new URL(s3Url)
		return decodeURIComponent(url.pathname.slice(1))
	} catch (error) {
		console.error('Invalid S3 URL', s3Url)
	}
}

export default getKeyFromS3Url