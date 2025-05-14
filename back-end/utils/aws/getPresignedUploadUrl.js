import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";


const s3 = new S3Client({
	region: process.env.AWS_REGION,
	credentials: {
		accessKeyId: process.env.AWS_ACCESS_KEY_ID,
		secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
	},
});

const getPresignedUploadUrl = async (fileName, mimeType) => {
	const command = new PutObjectCommand( {
		Bucket: process.env.AWS_BUCKET_NAME,
		Key: fileName,
		ContentType: mimeType,
	})

	const signedUrl = await getSignedUrl(s3, command, { expiresIn: 120 })
	return signedUrl
}

export default getPresignedUploadUrl