import { v2 as cloudinary } from 'cloudinary';
import Header from './components/header';
import { CONFIG } from './utils/config';
import Image from 'next/image';
import React from 'react';
import CacheCloudinary from './components/cachecloudinary';
import Bundle from './components/bundle';
import StartupAnimation from './components/startupanimation';

interface CloudinaryResource {
  secure_url: string;
  [key: string]: any;
}

async function getFirstVideoInFolder(folder: string) {
  cloudinary.config({
    cloud_name: CONFIG.CLOUDINARY_CLOUD_NAME,
    api_key: CONFIG.CLOUDINARY_API_KEY,
    api_secret: CONFIG.CLOUDINARY_API_SECRET,
  });

  try {
    const result = await cloudinary.search
      .expression(`resource_type:video AND folder="${folder}"`)
      .sort_by('created_at', 'desc')
      .max_results(1)
      .execute();

    const resources: CloudinaryResource[] = result.resources || [];
    if (resources.length === 0) {
      return null;
    }

    return resources[0].secure_url;
  } catch (error) {
    return null;
  }
}

async function getImagesFromFolder(folder: string): Promise<string[]> {
  cloudinary.config({
    cloud_name: CONFIG.CLOUDINARY_CLOUD_NAME,
    api_key: CONFIG.CLOUDINARY_API_KEY,
    api_secret: CONFIG.CLOUDINARY_API_SECRET,
  });

  try {
    const result = await cloudinary.search
      .expression(`resource_type:image AND folder="${folder}"`)
      .sort_by('created_at', 'desc')
      .execute();

    const resources: CloudinaryResource[] = result.resources || [];
    return resources.map((resource: CloudinaryResource) => resource.secure_url);
  } catch (error) {
    return [];
  }
}

export default async function Page() {
  const videoSrc = await getFirstVideoInFolder('Video Placeholder');
  const bundleFolders = ['Bundle/Spin Tycoon', 'Bundle/Feed', 'Bundle/Elasticity', 'Bundle/Rocket Fuel', 'Bundle/Link'];
  const bundleImages = await Promise.all(bundleFolders.map(getImagesFromFolder));

  return (
    <>
      <StartupAnimation canPlay={!!videoSrc} />

      <main className="bg-black">
        <Header />

        <section data-theme="dark" className="relative h-screen w-full">
          <div className="absolute inset-0 z-0">
            {videoSrc ? (
              <CacheCloudinary
                assetUrl={videoSrc}
                type="video"
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full bg-black" />
            )}
            <div className="absolute inset-0 bg-black/60" />
          </div>
        </section>

        <Bundle bundleImages={bundleImages} />

        <section
          data-theme="dark"
          style={{ backgroundColor: '#0f172a' }}
          className="text-white min-h-screen flex items-center justify-center text-4xl font-bold p-8"
        >
          <div>Oliver colour: #0f172a</div>
        </section>
      </main>
    </>
  );
}