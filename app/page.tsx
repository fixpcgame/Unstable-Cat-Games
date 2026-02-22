import { v2 as cloudinary } from 'cloudinary';
import Header from './components/header';
import Footer from './components/footer';
import { CONFIG } from './utils/config';
import React from 'react';
import CacheCloudinary from './components/cachecloudinary';
import Bundle from './components/bundle';
import StartupAnimation from './components/startupanimation';
import AboutMe from './components/aboutme';
import Community from './components/community';
import RocketFuel from './components/rocketfuel';
import Elasticity from './components/elasticity';
import Feed from './components/feed';
import LinkGame from './components/link';
import SpinTycoon from './components/spintycoon';
import FixPC from './components/fixpc';
import RightThatsIt from './components/rightthatsit';

interface CloudinaryResource {
  secure_url: string;
}

async function getResourcesFromFolder(
  folder: string,
  resourceType: 'image' | 'video' = 'image'
): Promise<string[]> {
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

    return (result.resources || []).map((res: CloudinaryResource) => res.secure_url);
  } catch (error) {
    return [];
  }
}

export default async function Page() {
  const videoSrcList = await getResourcesFromFolder('Video Placeholder', 'video');
  const videoSrc = videoSrcList.length > 0 ? videoSrcList[0] : null;

  const bundleFolders = [
    'Bundle/Spin Tycoon',
    'Bundle/Feed',
    'Bundle/Elasticity',
    'Bundle/Rocket Fuel',
    'Bundle/Link',
  ];
  const bundleImages = await Promise.all(bundleFolders.map(f => getResourcesFromFolder(f)));

  const rocketFuelImages = await getResourcesFromFolder('Mobile Games/Rocket Fuel');
  const elasticityImages = await getResourcesFromFolder('Mobile Games/Elasticity');
  const feedImages = await getResourcesFromFolder('Mobile Games/Feed');
  const linkImages = await getResourcesFromFolder('Mobile Games/Link');
  const spinTycoonImages = await getResourcesFromFolder('Mobile Games/Spin Tycoon');

  const fixPcVideoUrls = await getResourcesFromFolder('PC Games/Fix PC/Videos', 'video');
  const fixPcImageUrls = await getResourcesFromFolder('PC Games/Fix PC/Images');

  const rightThatsItVideoUrls = await getResourcesFromFolder(
    'PC Games/Right Thats It/Videos',
    'video'
  );
  const rightThatsItImageUrls = await getResourcesFromFolder(
    'PC Games/Right Thats It/Images'
  );

  return (
    <>
      <StartupAnimation canPlay={!!videoSrc} />

      <main className="bg-[#0a0a0a]">
        <Header />

        <section id="home" data-theme="dark" className="relative h-screen w-full">
          <div className="absolute inset-0 z-0">
            {videoSrc ? (
              <CacheCloudinary
                assetUrl={videoSrc}
                type="video"
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full bg-[#0a0a0a]" />
            )}
            <div className="absolute inset-0 bg-black/40" />
          </div>
        </section>

        <AboutMe />

        <Bundle bundleImages={bundleImages} />

        <section
          id="mobilegames"
          data-theme="light"
          className="w-full bg-white py-24 flex flex-col items-center justify-center border-t border-black/10"
        >
          <h2 className="text-5xl sm:text-7xl font-black tracking-tight">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#E46362] to-[#F9C462]">
              Mobile
            </span>{' '}
            <span className="text-[#0e172a]">Games</span>
          </h2>
        </section>

        <div className="w-full h-[2px] bg-[#0e172a]" />

        <div className="w-full bg-white relative z-30 flex flex-col text-black">
          <RocketFuel imageUrls={rocketFuelImages} />
          <Elasticity imageUrls={elasticityImages} />
          <Feed imageUrls={feedImages} />
          <LinkGame imageUrls={linkImages} />
          <SpinTycoon imageUrls={spinTycoonImages} />
        </div>

        <div className="w-full h-[2px] bg-[#0e172a]" />
        
        <section
          id="pcgames"
          data-theme="light"
          className="w-full bg-white py-24 flex flex-col items-center justify-center border-t border-black/10"
        >
          <h2 className="text-5xl sm:text-7xl font-black tracking-tight">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#E46362] to-[#F9C462]">
              PC
            </span>{' '}
            <span className="text-[#0e172a]">Games</span>
          </h2>
        </section>

        <div className="w-full h-[2px] bg-[#0e172a]" />

        <div className="w-full bg-[#0a0a0a] relative z-30 flex flex-col">
          <section
            id="fixpc-hero"
            className="scroll-mt-24 sm:scroll-mt-32 relative h-screen w-full overflow-hidden"
          >
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

          <section
            id="rightthatsit-hero"
            className="scroll-mt-24 sm:scroll-mt-32 relative h-screen w-full overflow-hidden"
          >
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
        </div>

        <Community />

        <Footer />
      </main>
    </>
  );
}