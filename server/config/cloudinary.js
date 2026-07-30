import { v2 as cloudinary } from 'cloudinary';
import dotenv from 'dotenv';

dotenv.config();

export const uploadToCloudinary = (fileBuffer, folder = 'ink-art-tattoo') => {
  dotenv.config(); // Ensure latest env vars are loaded

  const cloudName = process.env.CLOUDINARY_CLOUD_NAME;
  const apiKey = process.env.CLOUDINARY_API_KEY;
  const apiSecret = process.env.CLOUDINARY_API_SECRET;

  // Fallback if Cloudinary keys are missing or placeholder
  if (!cloudName || cloudName === 'your_cloud_name') {
    console.warn('⚠️ Cloudinary keys not configured in server/.env, using Data URI fallback.');
    const base64Image = `data:image/png;base64,${fileBuffer.toString('base64')}`;
    return Promise.resolve(base64Image);
  }

  cloudinary.config({
    cloud_name: cloudName,
    api_key: apiKey,
    api_secret: apiSecret,
  });

  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      { folder, resource_type: 'auto' },
      (error, result) => {
        if (error) {
          console.error('Cloudinary Upload Error:', error);
          return reject(error);
        }
        console.log(`☁️ Cloudinary Upload Success: ${result.secure_url}`);
        resolve(result.secure_url);
      }
    );

    uploadStream.end(fileBuffer);
  });
};

export default cloudinary;
