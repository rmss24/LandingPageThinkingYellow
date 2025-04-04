"use client";
import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { useSwipeable } from "react-swipeable";

// Helper to merge multiple refs
function mergeRefs<T>(
  ...refs: (React.Ref<T> | undefined)[]
): React.RefCallback<T> {
  return (node: T) => {
    refs.forEach((ref) => {
      if (typeof ref === "function") {
        ref(node);
      } else if (ref && typeof ref === "object") {
        (ref as React.MutableRefObject<T | null>).current = node;
      }
    });
  };
}

interface IntroItem {
  image: string;
  title: string;
}

interface OutroSectionProps {
  introItems: IntroItem[];
}

export default function OutroSection({ introItems }: OutroSectionProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const carouselRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => {
      window.removeEventListener("resize", checkMobile);
    };
  }, []);

  const handlers = useSwipeable({
    onSwipedLeft: () => nextSlide(),
    onSwipedRight: () => prevSlide(),
    trackMouse: false,
  });
  const { ref: swipeRef, ...swipeHandlers } = handlers;

  const nextSlide = () => {
    setActiveIndex((prevIndex) =>
      prevIndex === introItems.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevSlide = () => {
    setActiveIndex((prevIndex) =>
      prevIndex === 0 ? introItems.length - 1 : prevIndex - 1
    );
  };

  return (
    <section className="outro min-h-screen flex flex-col justify-center p-4 sm:p-8">
      <div className="mx-2 sm:mx-8 grid grid-cols-1 sm:grid-cols-2 my-10 sm:my-20 pt-10 sm:pt-60">
        <p className="text-2xl! sm:text-6xl! w-full sm:w-[70%] text-black! mb-6! sm:mb-0!">
          Scopri le nostre 3 anime
        </p>
        <div className="mt-4 sm:mt-auto sm:ml-auto w-full sm:w-1/2">
          <button className="bg-black duration-300 hover:bg-[#d1b42f] transition w-full py-2! rounded-full non-magnetic outro-button">
            Le nostre idee
          </button>
        </div>
      </div>

      {isMobile && (
        <div
          className="relative overflow-hidden mx-2 h-[75vh]"
          ref={mergeRefs(carouselRef, swipeRef)}
          {...swipeHandlers}
        >
          {/* Container with hidden overflow and full width/height */}
          <div
            className="flex transition-transform duration-300 ease-in-out h-full w-full"
            style={{ transform: `translateX(-${activeIndex * 100}%)` }}
          >
            {introItems.map((introItem, index) => (
              <div
                key={index}
                className="min-w-full w-full h-full flex-shrink-0 flex-grow-0"
                style={{ overflow: "hidden" }}
              >
                <div className="relative h-full w-full">
                  <div className="bg-black/15 absolute z-10 inset-0" />
                  <Image
                    className="w-full h-full object-cover"
                    width={500}
                    height={500}
                    src={introItem.image}
                    alt={introItem.title}
                  />
                  <div className="absolute z-50 inset-0 flex flex-col items-center justify-center">
                    <p className="text-2xl font-bold text-white text-center px-4 text-outro">
                      {introItem.title}
                    </p>
                    <button className="bg-gray-400/15 backdrop-blur-md text-white mt-8 px-6! py-3! rounded-lg transition-colors hover:bg-gray-800/15 font-bold w-3/4 max-w-xs">
                      Esplora
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="absolute bottom-8 left-0 right-0 flex justify-center gap-2 z-50">
            {introItems.map((_, index) => (
              <button
                key={index}
                onClick={() => setActiveIndex(index)}
                className={`w-3 h-3 rounded-full transition-colors ${
                  index === activeIndex ? "bg-white" : "bg-white/50"
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
          <button
            onClick={prevSlide}
            className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/30 backdrop-blur-sm text-white w-10 h-10 rounded-full flex items-center justify-center z-50"
            aria-label="Previous slide"
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M15 18l-6-6 6-6" />
            </svg>
          </button>
          <button
            onClick={nextSlide}
            className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/30 backdrop-blur-sm text-white w-10 h-10 rounded-full flex items-center justify-center z-50"
            aria-label="Next slide"
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M9 18l6-6-6-6" />
            </svg>
          </button>
        </div>
      )}

      {!isMobile && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mx-2 sm:mx-8 mt-4 mb-10 sm:mb-20">
          {introItems.map((introItem, index) => (
            <div
              key={index}
              className="group relative h-[50rem] cursor-pointer"
            >
              <div className="bg-black/15 absolute z-10 w-full h-full transition duration-300 group-hover:backdrop-blur-md" />
              <Image
                className="w-full h-full object-cover"
                width={500}
                height={500}
                src={introItem.image}
                alt={introItem.title}
              />
              <div className="absolute z-50 inset-0 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <p className="text-3xl font-bold text-white text-center px-4 text-outro">
                  {introItem.title}
                </p>
                <button className="bg-gray-400/15 backdrop-blur-md text-white mt-8 px-6! py-3! rounded-lg transition-colors hover:bg-gray-800/15 font-bold w-3/4 max-w-xs">
                  Esplora
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
