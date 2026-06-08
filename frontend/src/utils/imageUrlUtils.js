const CLOUDINARY_UPLOAD_SEGMENT = "/image/upload/";

const isSvgImageUrl = (imageUrl) => typeof imageUrl === "string" && /\.svg(?:[?#]|$)/i.test(imageUrl);

const isCloudinaryUploadUrl = (imageUrl) =>
  typeof imageUrl === "string" &&
  imageUrl.includes("res.cloudinary.com") &&
  imageUrl.includes(CLOUDINARY_UPLOAD_SEGMENT);

const getCloudinaryUploadParts = (imageUrl) => {
  if (!isCloudinaryUploadUrl(imageUrl)) {
    return null;
  }

  const uploadSegmentIndex = imageUrl.indexOf(CLOUDINARY_UPLOAD_SEGMENT);
  const baseUrl = imageUrl.slice(0, uploadSegmentIndex);
  const imagePath = imageUrl.slice(uploadSegmentIndex + CLOUDINARY_UPLOAD_SEGMENT.length);

  if (!baseUrl) {
    return null;
  }

  if (!imagePath) {
    return null;
  }

  return { baseUrl, imagePath };
};

const getTransformations = (width) => `f_auto,q_auto,c_fit,w_${width}`;

const buildOptimizedImageUrl = ({ baseUrl, imagePath, transformations }) =>
  `${baseUrl}${CLOUDINARY_UPLOAD_SEGMENT}${transformations}/${imagePath.replace(/^\/+/, "")}`;

export const getOptimizedCloudinaryImageUrl = (imageUrl, { width } = {}) => {
  if (!width) {
    return imageUrl;
  }

  if (isSvgImageUrl(imageUrl)) {
    return imageUrl;
  }

  const uploadParts = getCloudinaryUploadParts(imageUrl);
  if (!uploadParts) {
    return imageUrl;
  }

  const transformations = getTransformations(width);
  if (uploadParts.imagePath.startsWith(`${transformations}/`)) {
    return imageUrl;
  }

  return buildOptimizedImageUrl({ ...uploadParts, transformations });
};
