export const CONFIG = {
  GOOGLE_SCRIPT_URL: process.env.NEXT_PUBLIC_GOOGLE_SCRIPT_URL || '',
  CLOUDINARY_CLOUD_NAME: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME || '',
  CLOUDINARY_API_KEY: process.env.CLOUDINARY_API_KEY || '',
  CLOUDINARY_API_SECRET: process.env.CLOUDINARY_API_SECRET || '',
};

if (process.env.NODE_ENV === 'development') {
  if (CONFIG.GOOGLE_SCRIPT_URL) {
    console.log('Google Script URL loaded');
  } else {
    console.warn('CONFIG WARNING: NEXT_PUBLIC_GOOGLE_SCRIPT_URL is missing.');
  }

  const missingCloudinary = [];
  if (!CONFIG.CLOUDINARY_CLOUD_NAME) missingCloudinary.push("NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME");
  if (!CONFIG.CLOUDINARY_API_KEY) missingCloudinary.push("CLOUDINARY_API_KEY");
  if (!CONFIG.CLOUDINARY_API_SECRET) missingCloudinary.push("CLOUDINARY_API_SECRET");

  if (missingCloudinary.length === 0) {
    console.log('Cloudinary credentials loaded');
  } else {
    console.warn(
      `CONFIG WARNING: Cloudinary variables missing: ${missingCloudinary.join(', ')}. ` +
      "Check your .env.local file."
    );
  }
}