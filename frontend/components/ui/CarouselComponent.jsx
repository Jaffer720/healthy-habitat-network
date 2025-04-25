import Link from 'next/link';
import { useEffect, useState } from 'react';

const CarouselComponent = () => {
  const slides = [
  {
    img: '/images/1 (1).jpg',
    title: 'Get Checkups for Free',
  },
  {
    img: '/images/1 (2).jpg',

    title: 'Know more about your Health',
  },
  {
    img: '/images/1 (3).jpg',

    title: 'Interact with Professionals ',
  },
  {
    img: '/images/1 (4).jpg',

    title: 'Get right Guidance',
  },
  {
    img: '/images/1 (5).jpg',

    title: 'Achieve your dreams',
  },
];

const [activeIndex, setActiveIndex] = useState(0);

useEffect(() => {
  const interval = setInterval(() => {
    setActiveIndex((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  }, 2000);
  return () => clearInterval(interval);
}, [slides.length]);

const prevSlide = () => {
  setActiveIndex((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
};

const nextSlide = () => {
  setActiveIndex((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
};

return (
  <div id="carouselExampleCaptions" className="relative w-full rounded-br-4xl rounded-tl-4xl h-[300px] overflow-hidden">
    {/* Carousel indicators */}
    <div className="absolute z-20 bottom-5 left-1/2 -translate-x-1/2 flex gap-2">
      {slides.map((_, index) => (
        <button
          key={index}
          onClick={() => setActiveIndex(index)}
          className={`h-1 w-3 rounded ${activeIndex === index ? 'bg-white' : 'bg-white/50'} transition duration-300`}
          aria-label={`Slide ${index + 1}`}
        />
      ))}
    </div>

    {/* Carousel items */}
    <div className="relative w-full h-full overflow-hidden after:clear-both after:block after:content-['']">
      {slides.map((slide, idx) => (
        <div
          key={idx}
          className={`absolute top-0 left-0 w-full h-full transition-opacity duration-[600ms] ease-in-out ${idx === activeIndex ? 'opacity-100 z-10' : 'opacity-0 z-0'}`}
          style={{ backfaceVisibility: 'hidden' }}
        >
          <img
            src={slide.img}
            className="object-cover w-full h-full"
            alt={slide.title}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-100 z-10"></div>

          <div className="absolute inset-x-[15%] bottom-5 py-5 text-center z-20 text-white hidden md:block">
            <h5 className="text-xl">{slide.title}</h5>
            <p>{slide.desc}</p>
          </div>
        </div>
      ))}
    </div>

    {/* Carousel controls */}
    <button
      className="absolute bottom-0 left-0 top-0 z-20 flex w-[15%] items-center justify-center border-0 bg-none p-0 text-center text-white opacity-50 transition-opacity duration-150 ease-[cubic-bezier(0.25,0.1,0.25,1.0)] hover:text-white hover:no-underline hover:opacity-90 hover:outline-none focus:text-white focus:no-underline focus:opacity-90 focus:outline-none motion-reduce:transition-none"
      type="button"
      onClick={prevSlide}
    >
      <span className="inline-block h-8 w-8">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="h-6 w-6"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
        </svg>
      </span>
      <span className="sr-only">Previous</span>
    </button>
    <button
      className="absolute bottom-0 right-0 top-0 z-20 flex w-[15%] items-center justify-center border-0 bg-none p-0 text-center text-white opacity-50 transition-opacity duration-150 ease-[cubic-bezier(0.25,0.1,0.25,1.0)] hover:text-white hover:no-underline hover:opacity-90 hover:outline-none focus:text-white focus:no-underline focus:opacity-90 focus:outline-none motion-reduce:transition-none"
      type="button"
      onClick={nextSlide}
    >
      <span className="inline-block h-8 w-8">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="h-6 w-6"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
        </svg>
      </span>
      <span className="sr-only">Next</span>
    </button>
    <Link href="/" className="text-xl  max-md:scale-70 absolute bottom-2 md:bottom-4 left-2 md:left-4 z-50 font-bold text-white bg-blue-600 leading-5 tracking-wide p-1 px-4 rounded-br-3xl rounded-tl-3xl"><div>Healthy</div><div>Habitat</div></Link>
  </div>
);
};

export default CarouselComponent;