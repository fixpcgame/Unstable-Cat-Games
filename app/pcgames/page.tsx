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
      <Header startScrolled={false} />

      <section 
        data-theme="dark" 
        className="relative pt-48 pb-32 px-4 sm:px-12 w-full flex flex-col items-center justify-center overflow-hidden bg-[#0a0a0a] bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[#1f1f1f] via-[#0a0a0a] to-[#000000]"
      >
        <div className="relative z-10 max-w-7xl w-full text-center mb-12">
          <h1 className="text-6xl sm:text-8xl font-black mb-6 tracking-tight text-white">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-gray-300 to-white">
              PC
            </span> Games
          </h1>
          <p className="text-xl sm:text-2xl text-gray-400 font-light max-w-2xl mx-auto mb-10">
            Immersive worlds and deep mechanics. Discover our premium desktop experiences crafted for maximum chaos.
          </p>
          
          <div className="flex flex-wrap gap-4 justify-center">
            <a href="#fixpc-hero" className="px-8 py-3 bg-white/10 hover:bg-white/20 border border-white/20 text-white font-bold rounded-full transition-all duration-300 backdrop-blur-sm shadow-lg">
              Fix PC
            </a>
            <a href="#rightthatsit-hero" className="px-8 py-3 bg-white/10 hover:bg-white/20 border border-white/20 text-white font-bold rounded-full transition-all duration-300 backdrop-blur-sm shadow-lg">
              Right Thats It
            </a>
          </div>
        </div>
        
        <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-none z-20">
          <svg 
            className="relative block w-full h-[8vw] min-h-[60px] max-h-[150px]" 
            viewBox="0 0 1440 100" 
            preserveAspectRatio="none"
          >
            <path fill="#000000" d="M0,100 L1440,100 L1440,50 C1080,150 360,-50 0,50 Z"></path>
          </svg>
        </div>
      </section>

      <section id="fixpc-hero" className="relative h-screen w-full overflow-hidden">
        <div className="absolute inset-0 z-0 bg-black">
          {fixPcVideoUrls.length > 0 && (
            <CacheCloudinary
              assetUrl={fixPcVideoUrls}
              type="video"
              className="w-full h-full object-cover opacity-70"
              loading="eager"
            />
          )}
          <div className="absolute inset-0 bg-gradient-to-b from-black via-transparent to-[#0a0a0a]" />
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

      <section id="rightthatsit-hero" className="relative h-screen w-full overflow-hidden">
        <div className="absolute inset-0 z-0 bg-black">
          {rightThatsItVideoUrls.length > 0 && (
            <CacheCloudinary
              assetUrl={rightThatsItVideoUrls}
              type="video"
              className="w-full h-full object-cover opacity-70"
            />
          )}
          <div className="absolute inset-0 bg-gradient-to-b from-black via-transparent to-[#0a0a0a]" />
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