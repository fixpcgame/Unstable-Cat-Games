import { v2 as cloudinary } from 'cloudinary';
import Header from '../components/header';
import { CONFIG } from '../utils/config';
import React from 'react';
import RocketFuel from '../components/rocketfuel';

interface CloudinaryResource {
  secure_url: string;
  [key: string]: any;
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
    return resources.map((res) => res.secure_url);
  } catch (error) {
    console.error(`Failed to fetch images from ${folder}`, error);
    return [];
  }
}

export default async function MobileGamesPage() {
  const rocketFuelImages = await getImagesFromFolder('Mobile Games/Rocket Fuel');

  return (
    <main className="bg-white min-h-screen text-gray-900">
      <Header startScrolled={false} />

      <section 
        data-theme="dark" 
        className="relative pt-48 pb-32 px-4 sm:px-12 w-full flex flex-col items-center justify-center overflow-hidden bg-[#0f172a] bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[#1e293b] via-[#0f172a] to-[#020617]"
      >
        <div className="relative z-10 max-w-7xl w-full text-center mb-12">
          <h1 className="text-6xl sm:text-8xl font-black mb-6 tracking-tight text-white">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#E46362] to-[#F9C462]">
              Mobile
            </span> Games
          </h1>
          <p className="text-xl sm:text-2xl text-gray-300 font-light max-w-2xl mx-auto">
            Pocket-sized chaos. Explore our collection of vibrant, fast-paced games built for everywhere you go.
          </p>
        </div>
        
        <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-none z-20">
          <svg 
            className="relative block w-full h-[8vw] min-h-[60px] max-h-[150px]" 
            viewBox="0 0 1440 100" 
            preserveAspectRatio="none"
          >
            <path fill="#ffffff" d="M0,100 L1440,100 L1440,50 C1080,150 360,-50 0,50 Z"></path>
          </svg>
        </div>
      </section>

      <div className="w-full pb-24 bg-white relative z-30">
        <RocketFuel imageUrls={rocketFuelImages} />
      </div>
    </main>
  );
}