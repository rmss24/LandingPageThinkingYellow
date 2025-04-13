"use client";
import { useRef, useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import Cursor from "../components/cursor";

import VideoHero from "../../../public/videos/hero.webm";

export default function Hero() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const containerRef = useRef<HTMLElement | null>(null);
  const slidesRef = useRef<Array<HTMLDivElement | null>>([]);
  const [isHovered, setIsHovered] = useState(false); // Initialize as false
  const loadingRef = useRef<HTMLDivElement | null>(null);
  const router = useRouter();

  return (
    <>
      {/* Passa isHovered come true di default */}
      <Cursor isHovered={isHovered} />
      <section
        ref={containerRef}
        className="relative h-screen flex flex-col text-white py-0 px-3 overflow-x-hidden"
      >
        <div className="video-docker absolute top-0 left-0 w-full h-full overflow-hidden">
          <div className="bg-black/15 absolute z-10 w-full h-full" />
          <div className="absolute w-full h-full">
            <video
              className="min-w-full min-h-full absolute object-cover"
              autoPlay
              loop
              muted
            >
              <source src="/videos/hero.webm" type="video/webm" />
            </video>
          </div>
        </div>

        <div className="video-content space-y-2 z-20 mt-72  mx-8">
          <div className="lg:flex">
            <p className="lg:w-[5%] w-full font-bold mb-2 lg:mb-0">Su di noi</p>
            <div className="h-[2px] w-screen bg-white divider ml-0 lg:flex self-center" />
          </div>

          <h1 className="lg:text-7xl text-5xl title my-8 ">
            Se cerchi la classifica agenzia di comunicazione non sei nel posto
            giusto
          </h1>
          <div className="lg:flex block flex-content my-8 mx-8 lg:mx-0">
            <div className="projer-titles lg:flex my-8 hidden"></div>

            <div className="w-[30%] ml-[15%] absolute content-container contents lg:block my-8">
              <p className="text-lg! lg:mt-4 mt-8  mx-0 my-8">
                Esperienza, competenza, lungimiranza e coraggio sono i quattro
                concetti che meglio ci contraddistinguono e che ci permettono di
                esprimere con successo le nostre anime: Marketing e
                Comunicazione, Crowdfunding e Responsabilità Sociale. Ogni
                giorno condividiamo visioni e obiettivi con i nostri clienti,
                partner e collaboratori, per essere sempre nel posto giusto al
                momento giusto; sia online che offline.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
