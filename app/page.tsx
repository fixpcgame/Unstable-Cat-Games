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

      <main className="bg-[#0a0a0a] scroll-smooth">
        <Header />

        <section id="home" className="relative h-screen w-full">
          <div className="absolute inset-0 z-0">
            {videoSrc ? (
              <CacheCloudinary assetUrl={videoSrc} type="video" className="w-full h-full object-cover" />
            ) : (
              <div className="w-full h-full bg-[#0a0a0a]" />
            )}
            <div className="absolute inset-0 bg-black/40" />
          </div>
        </section>

        <AboutMe />

        <section className="relative bg-[#0e172a]">
          <Bundle bundleImages={bundleImages} />
        </section>

        <section id="mobilegames" className="relative bg-white pt-24 pb-12">
          <div className="absolute top-0 left-0 w-full overflow-hidden leading-[0] z-20">
            <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="relative block w-full h-[120px] fill-[#0e172a]">
              <path d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0H0Z" />
            </svg>
          </div>

          <div className="max-w-7xl mx-auto px-6 text-center mt-24">
            <h2 className="text-6xl sm:text-8xl font-black tracking-tighter mb-10">
              <span className="inline-block px-2 text-transparent bg-clip-text bg-gradient-to-r from-[#E46362] to-[#F9C462]">
                Mobile
              </span>
              <span className="text-[#0e172a]"> Games</span>
            </h2>
            
            <div className="flex flex-wrap justify-center gap-4 mb-20 relative z-30">
              {['Rocket Fuel', 'Elasticity', 'Feed', 'Link', 'Spin Tycoon'].map((game) => (
                <a 
                  key={game} 
                  href={`#${game.toLowerCase().replace(' ', '')}`}
                  className="px-6 py-2 rounded-full border-2 border-[#0e172a] text-[#0e172a] font-black hover:bg-[#0e172a] hover:text-white transition-all duration-300 shadow-sm"
                >
                  {game}
                </a>
              ))}
            </div>
          </div>

          <div className="w-full flex flex-col text-black">
            <div id="rocketfuel" className="scroll-mt-32"><RocketFuel imageUrls={rocketFuelImages} /></div>
            <div id="elasticity" className="scroll-mt-32"><Elasticity imageUrls={elasticityImages} /></div>
            <div id="feed" className="scroll-mt-32"><Feed imageUrls={feedImages} /></div>
            <div id="link" className="scroll-mt-32"><LinkGame imageUrls={linkImages} /></div>
            <div id="spintycoon" className="scroll-mt-32"><SpinTycoon imageUrls={spinTycoonImages} /></div>
          </div>
        </section>

        <section id="pcgames" className="relative bg-[#0e172a] pt-40 pb-12">
          <div className="absolute top-0 left-0 w-full overflow-hidden leading-[0] z-20">
            <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="relative block w-full h-[120px] fill-white">
              <path d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0H0Z" />
            </svg>
          </div>

          <div className="max-w-7xl mx-auto px-6 text-center mb-16 relative z-10">
            <h2 className="text-6xl sm:text-8xl font-black tracking-tighter mb-10">
              <span className="inline-block px-2 text-transparent bg-clip-text bg-gradient-to-r from-[#E46362] to-[#F9C462]">
                PC
              </span>
              <span className="text-white"> Games</span>
            </h2>

            <div className="flex flex-wrap justify-center gap-4">
              {[
                { name: 'Fix PC', id: 'fixpc-hero' },
                { name: 'Right Thats It', id: 'rightthatsit-hero' }
              ].map((game) => (
                <a 
                  key={game.id} 
                  href={`#${game.id}`}
                  className="px-10 py-3 rounded-full bg-white text-[#0e172a] font-black uppercase tracking-widest hover:bg-gradient-to-r hover:from-[#E46362] hover:to-[#F9C462] hover:text-white transition-all duration-300 shadow-xl"
                >
                  {game.name}
                </a>
              ))}
            </div>
          </div>

          <div className="w-full flex flex-col">
            <section id="fixpc-hero" className="scroll-mt-24 relative h-screen w-full overflow-hidden">
              <div className="absolute inset-0 z-0 bg-[#0e172a]">
                {fixPcVideoUrls.length > 0 && (
                  <CacheCloudinary assetUrl={fixPcVideoUrls} type="video" className="w-full h-full object-cover opacity-60" loading="eager" />
                )}
                <div className="absolute inset-0 bg-gradient-to-b from-[#0e172a] via-transparent to-[#0a0a0a]" />
              </div>
              <div className="absolute bottom-10 left-0 w-full p-8 sm:p-16 z-10">
                <h1 className="text-6xl sm:text-9xl font-black text-white mb-4 tracking-tighter drop-shadow-2xl">FIX PC</h1>
                <p className="text-xl sm:text-2xl text-white/80 font-medium border-l-8 border-[#E46362] pl-6 max-w-lg">A High-Stakes VR Hardware Puzzle Experience.</p>
              </div>
            </section>

            <FixPC imageUrls={fixPcImageUrls} />

            <section id="rightthatsit-hero" className="scroll-mt-24 relative h-screen w-full overflow-hidden">
              <div className="absolute inset-0 z-0 bg-[#0e172a]">
                {rightThatsItVideoUrls.length > 0 && (
                  <CacheCloudinary assetUrl={rightThatsItVideoUrls} type="video" className="w-full h-full object-cover opacity-60" />
                )}
                <div className="absolute inset-0 bg-gradient-to-b from-[#0e172a] via-transparent to-[#0a0a0a]" />
              </div>
              <div className="absolute bottom-10 right-0 w-full p-8 sm:p-16 z-10 text-right flex flex-col items-end">
                <h1 className="text-6xl sm:text-9xl font-black text-white mb-4 tracking-tighter drop-shadow-2xl">RIGHT THAT'S IT</h1>
                <p className="text-xl sm:text-2xl text-white/80 font-medium border-r-8 border-[#F9C462] pr-6 max-w-lg">Best Platformer In The Games Module.</p>
              </div>
            </section>

            <RightThatsIt imageUrls={rightThatsItImageUrls} />
          </div>
        </section>

        <Community />
        <Footer />
      </main>
    </>
  );
}