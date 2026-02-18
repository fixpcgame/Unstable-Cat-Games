import { v2 as cloudinary } from 'cloudinary';
import Header from './components/header';
import { CONFIG } from './utils/config';
import Image from 'next/image';
import React from 'react';

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

    const resources = result.resources || [];
    if (resources.length === 0) {
      return null;
    }

    let videoUrl = resources[0].secure_url;
    videoUrl = videoUrl.replace('/upload/', '/upload/q_auto:good,f_mp4,vc_h264,c_scale,w_1920/');

    return videoUrl;
  } catch (error) {
    return null;
  }
}

export default async function Page() {
  const videoSrc = await getFirstVideoInFolder('Video Placeholder');

  return (
    <>
      <div
        className={`intro-overlay-animate fixed inset-0 z-50 flex flex-col items-center justify-center bg-black transition-opacity duration-1000 ${
          videoSrc ? '' : 'hidden'
        }`}
      >
        <div className="relative flex items-center justify-center">
          <Image
            src="/Assets/cat.png"
            alt="Unstable Cat"
            width={500}
            height={500}
            className="h-64 w-64 object-contain relative z-10"
          />
          <div className="bouncing-ball"></div>
          <Image
            src="/logos/logo.png"
            alt="Unstable Cat Games Logo"
            width={240}
            height={240}
            className="h-32 w-auto object-contain brightness-0 invert relative z-10"
          />
        </div>
      </div>

      <main className="bg-black">
        <Header />

        <section data-theme="dark" className="relative h-screen w-full">
          <div className="absolute inset-0 z-0">
            {videoSrc ? (
              <video
                autoPlay
                loop
                muted
                playsInline
                preload="metadata"
                className="w-full h-full object-cover"
                src={videoSrc}
              />
            ) : (
              <div className="w-full h-full bg-black" />
            )}
            <div className="absolute inset-0 bg-black/60" />
          </div>
        </section>

        <section
          data-theme="light"
          className="bg-gray-100 text-gray-900 min-h-screen flex items-center justify-center text-4xl font-bold p-8"
        >
          <div>Light Theme Section</div>
        </section>

        <section
          data-theme="dark"
          className="bg-gray-900 text-white min-h-screen flex items-center justify-center text-4xl font-bold p-8"
        >
          <div>Dark Theme Section</div>
        </section>
      </main>
    </>
  );
}