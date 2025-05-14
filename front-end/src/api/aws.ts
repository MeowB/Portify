import axios from "axios"

const BASE_URL = 'http://localhost:3001/api/aws'

const getUploadUrl = async (userId: string, title: string, imageType: string, mimeType: string, projectId?: string): Promise<{ uploadUrl: string, imageName: string } | undefined> => {
	try {
		console.log('test:')
		const response = await axios.post(`${BASE_URL}/uploadUrl`, {
			userId,
			title,
			imageType,
			mimeType,
			projectId: projectId || null,
		})

		const { uploadUrl, imageName } = response.data

		return { uploadUrl, imageName }
	} catch (error) {
		console.error('Error getting upload URL', error)
		return undefined; // Explicitly return undefined in case of an error
	}
}

const uploadImageToS3 = async (file: File, uploadUrl: string): Promise<void> => {
	try {
		console.log(file.name, file.size, file.type)

		const response = await axios.put(uploadUrl, file, {
			headers: {
				'Content-Type': file.type,
			}
		})

		if (response.status === 200) {
			console.log('Image uploaded successfully')
			alert('Image uploaded succesfully')
		} else {
			throw new Error('Error uploading image to S3')
		}
	} catch (error: any) {
		console.error('Error uploading image:', error.response?.data || error.message);
		console.log(error.response); // Log full response
	}
}

const handleImageUpload = async (file: File, userId: string, title: string, imageType: string, projectId?: string): Promise<string | undefined> => {
	
		console.log('handleImageUpload')
	try {
		if (projectId) {

			const result = await getUploadUrl(userId, title, imageType, file.type, projectId);

			if (!result) {
				throw new Error('Failed to get upload URL');
			}
			const { uploadUrl, imageName } = result;
	
			// Upload image to S3
			await uploadImageToS3(file, uploadUrl);
	
			console.log(`Image uploaded successfully to S3 with name: ${imageName}`);
	
			// Construct the image URL
			const imageUrl = `http://portify-user-images.s3.eu-north-1.amazonaws.com/${imageName}`;
			console.log(`Image URL: ${imageUrl}`);
	
			// Return the image URL
			return imageUrl;
		} 


	} catch (error) {
		console.error('Error uploading image: ', error);
		alert('Error uploading Image: ' + (error instanceof Error ? error.message : 'Unknown error'));

		// Return undefined in case of an error
		return undefined;
	}
};

export { getUploadUrl, handleImageUpload, uploadImageToS3 }