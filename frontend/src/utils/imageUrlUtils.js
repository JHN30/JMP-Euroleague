const CLOUDINARY_UPLOAD_SEGMENT = "/image/upload/";

export const getOptimizedCloudinaryImageUrl = (imageUrl, { width } = {}) => {
  if (!imageUrl || typeof imageUrl !== "string" || !width) {
    return imageUrl;
  }

  if (!imageUrl.includes("res.cloudinary.com") || !imageUrl.includes(CLOUDINARY_UPLOAD_SEGMENT)) {
    return imageUrl;
  }

  if (/\.svg(?:[?#]|$)/i.test(imageUrl)) {
    return imageUrl;
  }

  const [baseUrl, imagePath] = imageUrl.split(CLOUDINARY_UPLOAD_SEGMENT);
  if (!baseUrl || !imagePath) {
    return imageUrl;
  }

  const transformations = `f_auto,q_auto,c_fit,w_${width}`;
  if (imagePath.startsWith(`${transformations}/`)) {
    return imageUrl;
  }

  return `${baseUrl}${CLOUDINARY_UPLOAD_SEGMENT}${transformations}/${imagePath.replace(/^\/+/, "")}`;
};
