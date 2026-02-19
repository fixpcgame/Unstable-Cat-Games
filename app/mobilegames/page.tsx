import Header from '../components/header';
import React from 'react';

export default function MobileGamesPage() {
  return (
    <>
      <Header startScrolled />
      <main data-theme="light" className="bg-gray-100 text-gray-900 min-h-screen">
        <div className="w-full max-w-7xl mx-auto py-40 px-4 sm:px-12">
            <h1 className="text-4xl lg:text-5xl font-bold mb-8 text-left">Mobile Games</h1>
            <p className="text-lg">verticl slider, games side by side.</p>
        </div>
      </main>
    </>
  );
}