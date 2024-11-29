import { v2 as cloudinary } from "cloudinary";
import { cloudinaryApiKey, cloudinaryApiSecret, cloudinaryCloudName } from "./envConfig";

cloudinary.config({
    cloud_name: cloudinaryCloudName,
    api_key: cloudinaryApiKey,
    api_secret: cloudinaryApiSecret,
});

export default cloudinary;