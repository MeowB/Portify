import { S3Client, DeleteObjectCommand } from "@aws-sdk/client-s3";
import dotenv from 'dotenv'

dotenv.config()

const s3 = new S3Client({
	region: process.env.AWS_REGION,
	credentials: {
		accessKeyId: process.env.AWS_ACCESS_KEY_ID,
		secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
	},
});

export const deleteImageFromS3 = async (imageKey) => {
	const params = {
		Bucket: process.env.AWS_BUCKET_NAME,
		Key: imageKey,
	}

	try {
		await s3.send(new DeleteObjectCommand(params))
		console.log(`Image deleted: ${imageKey}`)
	} catch (error) {
		console.error('Failed to delete image: ', error)
	}
}