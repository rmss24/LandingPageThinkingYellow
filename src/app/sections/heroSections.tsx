"use client";
import { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import Cursor from "../components/cursor";

export default function Hero() {
  const [isHovered, setIsHovered] = useState(false);
  const containerRef = useRef<HTMLElement | null>(null);
  const router = useRouter();

  return (
    <>
      <Cursor isHovered={isHovered} />
      <section
        ref={containerRef}
        className="relative h-screen flex flex-col text-white overflow-hidden"
      >
        {/* Video Background */}
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

        {/* Content */}
        <div className="video-content z-20 flex flex-col justify-center h-full max-h-screen px-4! md:px-8! lg:px-8! overflow-y-auto">
          <div className="lg:mt-0 mt-8 lg:flex items-center">
            <p className="lg:w-[5%] w-full font-bold mb-2 lg:mb-0">Su di noi</p>
            <div className="h-[2px] w-full bg-white divider ml-0 lg:ml-4 lg:flex self-center" />
          </div>

          <h1 className="lg:text-7xl md:text-6xl text-4xl title my-4 md:my-6 lg:my-8 max-w-6xl">
            Se cerchi la classifica agenzia di comunicazione non sei nel posto
            giusto
          </h1>

          <div className="flex flex-col lg:flex-row mb-8">
            <div className="projer-titles lg:flex hidden" />

            <div className="lg:w-2/5 w-full lg:block">
              <p className="text-base! md:text-lg! lg:mt-0 normal-case!">
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
