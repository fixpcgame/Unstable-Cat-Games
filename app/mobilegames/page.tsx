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

      <section data-theme="dark" className="relative pt-48 pb-40 px-4 sm:px-12 w-full flex flex-col items-center justify-center overflow-hidden bg-[#0f172a]">
        <div className="absolute top-10 left-0 w-96 h-96 bg-[#F9C462] rounded-full mix-blend-screen filter blur-[120px] opacity-20 animate-pulse"></div>
        <div className="absolute bottom-0 right-10 w-[30rem] h-[30rem] bg-[#E46362] rounded-full mix-blend-screen filter blur-[120px] opacity-20 animate-pulse" style={{ animationDelay: '2s' }}></div>
        
        <div className="relative z-10 max-w-7xl w-full text-center">
          <h1 className="text-6xl sm:text-8xl font-black mb-6 tracking-tight text-white">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#E46362] to-[#F9C462]">
              Mobile
            </span> Games
          </h1>
          <p className="text-xl sm:text-2xl text-gray-300 font-light max-w-2xl mx-auto">
            Pocket sized chaos. Explore the collection of vibrant, fast-paced games built for everywhere you go.
          </p>
        </div>
        
        <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-none z-20">
          <svg className="relative block w-full h-[60px] sm:h-[120px]" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
            <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V120H0V95.8C59.71,118.08,130.83,119.3,198.36,108.61,241.85,101.69,284.8,81.4,321.39,56.44Z" className="fill-white"></path>
          </svg>
        </div>
      </section>

      <div className="w-full pb-24 bg-white relative z-30">
        <RocketFuel imageUrls={rocketFuelImages} />
      </div>
    </main>
  );
}