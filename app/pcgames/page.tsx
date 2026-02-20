import { v2 as cloudinary } from 'cloudinary';
import Header from '../components/header';
import { CONFIG } from '../utils/config';
import React from 'react';
import CacheCloudinary from '../components/cachecloudinary';
import FixPC from '../components/fixpc';
import RightThatsIt from '../components/rightthatsit';

interface CloudinaryResource {
  secure_url: string;
  [key: string]: any;
}

async function getResourcesFromFolder(folder: string, resourceType: 'video' | 'image'): Promise<string[]> {
  cloudinary.config({
    cloud_name: CONFIG.CLOUDINARY_CLOUD_NAME,
    api_key: CONFIG.CLOUDINARY_API_KEY,
    api_secret: CONFIG.CLOUDINARY_API_SECRET,
  });

  try {
    const result = await cloudinary.search
      .expression(`resource_type:${resourceType} AND folder="${folder}"`)
      .sort_by('created_at', 'desc')
      .execute();

    const resources: CloudinaryResource[] = result.resources || [];
    return resources.map((res) => res.secure_url);
  } catch (error) {
    return [];
  }
}

export default async function PCGamesPage() {
  const fixPcVideoUrls = await getResourcesFromFolder('PC Games/Fix PC/Videos', 'video');
  const fixPcImageUrls = await getResourcesFromFolder('PC Games/Fix PC/Images', 'image');
  
  const rightThatsItVideoUrls = await getResourcesFromFolder('PC Games/Right Thats It/Videos', 'video');
  const rightThatsItImageUrls = await getResourcesFromFolder('PC Games/Right Thats It/Images', 'image');

  return (
    <main className="bg-[#0a0a0a] min-h-screen">
      <Header startScrolled={true} />

      <section className="relative h-screen w-full overflow-hidden">
        <div className="absolute inset-0 z-0 bg-black">
          {fixPcVideoUrls.length > 0 && (
            <CacheCloudinary
              assetUrl={fixPcVideoUrls}
              type="video"
              className="w-full h-full object-cover opacity-70"
              loading="eager"
            />
          )}
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-[#0a0a0a]" />
        </div>

        <div className="absolute bottom-0 left-0 w-full p-8 sm:p-16 z-10 flex flex-col items-start justify-end h-full">
          <div className="max-w-4xl">
            <h1 className="text-6xl sm:text-8xl font-black text-white mb-4 tracking-tight drop-shadow-2xl">
              FIX PC
            </h1>
            <p className="text-xl sm:text-3xl text-gray-200 font-light drop-shadow-lg border-l-4 border-[#E46362] pl-6">
              A VR puzzle Game.
            </p>
          </div>
        </div>
      </section>

      <FixPC imageUrls={fixPcImageUrls} />

      <section className="relative h-screen w-full overflow-hidden">
        <div className="absolute inset-0 z-0 bg-black">
          {rightThatsItVideoUrls.length > 0 && (
            <CacheCloudinary
              assetUrl={rightThatsItVideoUrls}
              type="video"
              className="w-full h-full object-cover opacity-70"
            />
          )}
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-[#0a0a0a]" />
        </div>

        <div className="absolute bottom-0 right-0 w-full p-8 sm:p-16 z-10 flex flex-col items-end justify-end h-full text-right">
          <div className="max-w-4xl">
            <h1 className="text-6xl sm:text-8xl font-black text-white mb-4 tracking-tight drop-shadow-2xl">
              RIGHT THATS IT
            </h1>
            <p className="text-xl sm:text-3xl text-gray-200 font-light drop-shadow-lg border-r-4 border-[#F9C462] pr-6">
              A Platformer Game.
            </p>
          </div>
        </div>
      </section>

      <RightThatsIt imageUrls={rightThatsItImageUrls} />
    </main>
  );
}