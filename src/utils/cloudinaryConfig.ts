import { v2 as cloudinaryV2} from 'cloudinary';

/**
 * Configure Cloudinary SDK with the provided credentials.
 * @param {string} cloud_name - Cloudinary cloud name.
 * @param {string} api_key - Cloudinary API key.
 * @param {string} api_secret - Cloudinary API secret.
 */
cloudinaryV2.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET, 
} );

export { cloudinaryV2 };