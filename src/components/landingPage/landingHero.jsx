import React from 'react';
import { StaticImage } from 'gatsby-plugin-image';

const LandingHero = () => (
  <>
    <div className="pt-4 sm:pt-12">
      <div className="relative select-none">
        <div className="absolute inset-x-0 bottom-0 h-1/2 bg-white" />
        <div className="">
          <div className="relative shadow-xl rounded-lg sm:rounded-2xl overflow-hidden">
            <div className="absolute inset-0">
              <StaticImage
                src="../../images/f1report-hero.jpg"
                quality={90}
                className="h-full w-full object-cover backdrop-filter backdrop-blur-lg"
                alt="Race circuit view on finish straight with the pit lane on the left and fans on the right. Many people stand on the track in the distance."
              />
              <div
                className="absolute inset-0 backdrop-filter"
                style={{ backdropFilter: 'blur(1px)' }}
              />
              <div className="absolute inset-0 bg-gradient-to-r from-red-400 to-orange-300 mix-blend-multiply" />
            </div>
            <div className="relative px-4 py-16 sm:px-6 sm:py-24 lg:py-32 xl:py-48 lg:px-8">
              <h1 className="text-center text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl text-white">
                Welcome to F1 Report
              </h1>
              <p className="mt-6 max-w-lg mx-auto text-center text-xl text-yellow-200 sm:max-w-3xl">
                Get statistics and a detailed view of Formula 1 results. For
                each race, circuit, etc. you find historic facts and charts.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div className="mt-8 text-right">
      Photo by{' '}
      <a
        className="black-link"
        href="https://unsplash.com/@abedismail?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText"
      >
        Abed Ismail
      </a>{' '}
      on{' '}
      <a
        className="black-link"
        href="https://unsplash.com/s/photos/formula-1?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText"
      >
        Unsplash
      </a>
    </div>
  </>
);

export default LandingHero;
