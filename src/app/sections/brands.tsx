"use client";
import React, { useEffect, useState } from "react";

type Brand = {
  title: string;
  logoSrc: string;
  alt: string;
};

type ImageState = "white" | "yellow";

export default function Brands() {
  const brandsImages: Brand[] = [
    {
      title: "Amplifon",
      logoSrc: "/brands/amplifon.png",
      alt: "Amplifon Logo",
    },
    { title: "Caaf", logoSrc: "/brands/Caaf-1-edit.png", alt: "Caaf Logo" },
    {
      title: "Comune di Milano",
      logoSrc: "/brands/comune-di-milano.png",
      alt: "Comune di Milano Logo",
    },
    {
      title: "Comune di Viareggio",
      logoSrc: "/brands/comune-viareggio.png",
      alt: "Comune di Viareggio Logo",
    },
    { title: "Coop", logoSrc: "/brands/coop-1.png", alt: "Coop Logo" },
    { title: "Fendi", logoSrc: "/brands/fendi-1.png", alt: "Fendi Logo" },
    {
      title: "Fondazione sviluppo e crescita CRT",
      logoSrc: "/brands/fondazione.png",
      alt: "Fondazione s&c CRT",
    },
    {
      title: "Infinity",
      logoSrc: "/brands/infinity.png",
      alt: "Infinity Logo",
    },
    {
      title: "Manifatture sigaro toscana",
      logoSrc: "/brands/manifatture.png",
      alt: "Manifatture Logo",
    },
    {
      title: "Microsoft",
      logoSrc: "/brands/microsoft.png",
      alt: "Microsoft Logo",
    },
    { title: "MSD", logoSrc: "/brands/msd.png", alt: "MSD Logo" },
    {
      title: "Nastro Azzurro",
      logoSrc: "/brands/nastroazzurro.png",
      alt: "Nastro Azzurro Logo",
    },
    { title: "Piaggio", logoSrc: "/brands/piaggio.png", alt: "Piaggio Logo" },
    {
      title: "Poste Italiane",
      logoSrc: "/brands/PosteItalian.png",
      alt: "Poste Italiane Logo",
    },
    { title: "PostPay", logoSrc: "/brands/postepay.png", alt: "PostPay Logo" },
    {
      title: "CGIL - SPI",
      logoSrc: "/brands/si-removebg.png",
      alt: "CGIL - SPI Logo",
    },
    {
      title: "Unicoop Firenze",
      logoSrc: "/brands/unicoopfirenze.png",
      alt: "Unicoop Firenze Logo",
    },
    {
      title: "Unipolsai",
      logoSrc: "/brands/unipolsai.png",
      alt: "Unipolsai Logo",
    },
    { title: "Visa", logoSrc: "/brands/visa.png", alt: "Visa Logo" },
    {
      title: "Vodafone",
      logoSrc: "/brands/vodafone.png",
      alt: "Vodafone Logo",
    },
  ];

  const [imageStates, setImageStates] = useState<{ [key: number]: ImageState }>(
    Object.fromEntries(
      Array.from({ length: brandsImages.length }, (_, i) => [i, "white"])
    )
  );

  const getRandomIndicesWithState = (
    count: number,
    state: ImageState
  ): number[] => {
    const available = Object.entries(imageStates)
      .filter(([_, value]) => value === state)
      .map(([key]) => parseInt(key));

    const selected: number[] = [];
    while (selected.length < count && available.length > 0) {
      const rand = Math.floor(Math.random() * available.length);
      selected.push(available[rand]);
      available.splice(rand, 1);
    }

    return selected;
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setImageStates((prev) => {
        const newState = { ...prev };

        // Accendi 2 loghi bianchi
        const toYellow = getRandomIndicesWithState(2, "white");
        toYellow.forEach((idx) => {
          newState[idx] = "yellow";
        });

        // Conta quanti sono già gialli (escludendo quelli appena accesi)
        const currentYellowIndices = Object.entries(prev)
          .filter(([_, val]) => val === "yellow")
          .map(([k]) => parseInt(k));

        // Spegni 1 logo tra quelli già gialli
        if (currentYellowIndices.length > 0) {
          const randIndex = Math.floor(
            Math.random() * currentYellowIndices.length
          );
          const idxToTurnWhite = currentYellowIndices[randIndex];
          newState[idxToTurnWhite] = "white";
        }

        return newState;
      });
    }, 1500);

    return () => clearInterval(interval);
  }, []);

  const getLogoClassName = (state: ImageState): string => {
    return state === "yellow" ? "logo-yellow" : "logo-white";
  };

  return (
    <div className="p-6! bg-black my-40 ">
      <h2 className="text-2xl font-bold mb-6 text-center text-white mt-20 z-50">
        I Nostri Clienti
      </h2>
      <div className="grid lg:grid-cols-5 grid-cols-3 gap-6 mb-20 ">
        {brandsImages.map((brand, index) => (
          <div key={index} className="flex flex-col items-center">
            <div className="w-28 h-28 relative flex items-center justify-center">
              <img
                src={brand.logoSrc}
                alt={brand.alt}
                className={`w-full h-full object-contain ${getLogoClassName(
                  imageStates[index]
                )}`}
              />
            </div>
          </div>
        ))}
      </div>

      <style jsx>{`
        .logo-white {
          filter: brightness(0) invert(100%);
          transition: filter 1.5s ease-in-out;
        }

        .logo-yellow {
          filter: brightness(0) saturate(100%) invert(87%) sepia(61%)
            saturate(489%) hue-rotate(2deg) brightness(96%) contrast(90%);
          transition: filter 1.5s ease-in-out;
        }

        img {
          transition: filter 1.5s ease-in-out;
        }
      `}</style>
    </div>
  );
}
