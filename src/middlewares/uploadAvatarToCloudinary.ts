import { cloudinaryV2 } from "../utils/cloudinaryConfig";

/**
 * Uploads an avatar image to Cloudinary.
 * @param { string } avatarPath - The path of the avatar image to upload.
 * @returns { Promise<Object> } A Promise that resolves with the Cloudinary response object upon successful upload.
 * @throws { Error } If an error occurs during the upload process.
 */
export const uploadAvatarToCloudinary = async (avatarPath: string) => {
    try {
        // Upload the avatar image to Cloudinary
        const res = await cloudinaryV2.uploader.upload(avatarPath, {
            folder: 'avatars'
        });

        // Return the Cloudinary response object
        return res;
    } catch (error) {
        // Throw a more descriptive error if the upload fails
        throw new Error('Error uploading file to cloudinary')
    };
};