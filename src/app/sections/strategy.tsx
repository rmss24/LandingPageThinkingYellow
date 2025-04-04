"use client";
import { useRef, useEffect, RefObject } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import ImageLeft from "../../../public/images/ronak-jain-37Hk9D4Ig_4-unsplash.jpg";
import ImageLeft2 from "../../../public/images/mike-meyers--haAxbjiHds-unsplash.jpg";
import ImageLeft3 from "../../../public/images/barthelemy-de-mazenod-f_mGDtPvMmk-unsplash.jpg";

export default function StrategySection() {
  const containerRef = useRef<HTMLDivElement>(null);
  // Properly type the sectionsRef as an array of HTMLDivElement refs
  const sectionsRef = useRef<Array<HTMLDivElement | null>>([]);

  useEffect(() => {
    if (typeof window === "undefined") return;

    gsap.registerPlugin(ScrollTrigger);

    // Initialize - hide all text elements
    gsap.set(".section-content .text-element", {
      y: 100,
      opacity: 0,
    });

    gsap.set(".section-content .image-container", {
      y: 50,
      opacity: 0,
    });

    // Filter out null values and create a timeline for each section
    const validSections = sectionsRef.current.filter(
      (section): section is HTMLDivElement => section !== null
    );

    validSections.forEach((section, index) => {
      const textElements = section.querySelectorAll(".text-element");
      const imageContainer = section.querySelector(".image-container");

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top bottom",
          end: "bottom top",
          toggleActions: "play none none reverse",
        },
      });

      // Add labels for snap points
      tl.addLabel("start");

      // Animate text elements
      tl.to(
        textElements,
        {
          y: 0,
          opacity: 1,
          duration: 1,
          stagger: 0.1,
          ease: "power4.inOut",
        },
        0
      );

      // Animate image
      tl.to(
        imageContainer,
        {
          y: 0,
          opacity: 1,
          duration: 1.2,
          ease: "power3.out",
        },
        0.2
      );

      // Add end label for snap
      tl.addLabel("end");

      // Background color transitions between sections
      if (index < validSections.length - 1) {
        const nextBgColor = index === 0 ? "#000000" : "#d1b42f";
        const nextTextColor = index === 0 ? "#ffffff" : "#000000";

        // Scroll verso il basso: entra nella sezione
        ScrollTrigger.create({
          trigger: section,
          start: "bottom bottom", // 👈 entra solo quando la sezione è quasi tutta visibile
          end: "bottom top",
          onEnter: () => {
            gsap.to(containerRef.current, {
              backgroundColor: nextBgColor,
              color: nextTextColor,
              duration: 0.5,
              ease: "power2.inOut",
            });
          },
        });

        // Scroll verso l’alto: torna alla sezione precedente
        ScrollTrigger.create({
          trigger: section,
          start: "top center", // 👈 entra prima nel reverse
          end: "bottom center",
          onEnterBack: () => {
            const prevBgColor = index === 0 ? "#ffffff" : "#000000";
            const prevTextColor = index === 0 ? "#000000" : "#ffffff";

            gsap.to(containerRef.current, {
              backgroundColor: prevBgColor,
              color: prevTextColor,
              duration: 0.6,
              ease: "power2.inOut",
            });
          },
        });
      }
    });

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  // Reset refs at the beginning of each render
  sectionsRef.current = [];

  // Properly typed function to add elements to refs array
  const addToRefs = (el: HTMLDivElement | null) => {
    if (el && !sectionsRef.current.includes(el)) {
      sectionsRef.current.push(el);
    }
  };

  return (
    <div
      ref={containerRef}
      className="strategy-container transition-colors duration-1000 ease-in-out"
    >
      {/* First Grid - White Background (Default) */}
      <div
        ref={addToRefs}
        className="section-content grid grid-cols-1 lg:grid-cols-2 gap-4 p-8 ml-auto mr-auto max-w-[1200px] min-h-screen"
      >
        <div className="items-start justify-start w-full mb-20 lg:mb-80 flex flex-col gap-8">
          {/* Top row: Number and Title/Subtitle side-by-side */}
          <div className="flex flex-col lg:flex-row items-start gap-8 mx-8 lg:mx-0">
            <h2 className="text-black text-[8rem] lg:text-[15rem] text-element">
              01
            </h2>
            <div className="m-auto">
              <h3 className="text-[3rem] lg:text-[4rem] font-bold text-black text-element">
                Analisi
              </h3>
              <h4 className="text-black w-full lg:w-[80%] text-lg text-balance text-element">
                Analizziamo i trend di mercato e il posizionamento dei nostri
                clienti per individuare e valorizzare ogni punto di forza.
              </h4>
            </div>
          </div>

          {/* Bottom row: Divider + long paragraph */}
          <div className="content items-start gap-4 mx-8 lg:mx-0">
            <div className="h-[2px] w-full bg-gray-950 divider hidden lg:block text-element"></div>
            <h4 className="text-black w-full lg:w-[80%] text-balance my-8 text-element">
              Monitoriamo costantemente Google Trends per intercettare le
              evoluzioni del mercato e individuare opportunità di crescita.
              Analizzando le ricerche emergenti e i cambiamenti nei
              comportamenti degli utenti, forniamo insight strategici per
              rafforzare il posizionamento dei nostri clienti. Il nostro
              approccio trasforma i dati in vantaggi competitivi, anticipando le
              tendenze e valorizzando ogni punto di forza.
            </h4>
            <button className="bg-black text-white duration-300 hover:bg-[#d1b42f] transition-all py-2! px-4! w-[-webkit-fill-available] my-8 lg:my-0  rounded-full text-element non-magnetic">
              Scopri di più
            </button>
          </div>
        </div>

        <div className="image-container">
          <Image
            className="bg-black/10 mt-10 lg:mt-20 w-full h-[60%] object-cover"
            src={ImageLeft}
            alt="Immagine a sinistra"
            width={600}
            height={400}
          />
        </div>
      </div>

      {/* Second Grid - Black Background with White Text */}
      <div
        ref={addToRefs}
        className="section-content grid grid-cols-1 lg:grid-cols-2 gap-4 p-8 ml-auto mr-auto max-w-[1200px] min-h-screen "
      >
        <div className="items-start justify-start w-full mb-20 lg:mb-80 flex flex-col gap-8 lg:order-last">
          {/* Top row: Number and Title/Subtitle side-by-side */}
          <div className="flex flex-col lg:flex-row items-start gap-8 lg:order-last mx-8 lg:mx-0">
            <h2 className="text-[8rem] lg:text-[15rem] text-element">02</h2>
            <div className="m-auto">
              <h3 className="text-[3rem] lg:text-[4rem] font-bold text-element">
                Strategia
              </h3>
              <h4 className="w-full lg:w-[80%] text-lg text-balance text-element">
                Elaboriamo la strategia più efficace al fine di definire un
                obiettivo preciso e il migliore percorso per raggiungerlo.
              </h4>
            </div>
          </div>

          {/* Bottom row: Divider + long paragraph */}
          <div className="content items-start gap-4 mt-20 mx-8 lg:mx-0">
            <div className="h-[2px] w-full bg-gray-100 divider hidden lg:block text-element"></div>
            <h4 className="w-full lg:w-[80%] text-balance my-8 text-element">
              Sfruttiamo le potenzialità dell’Intelligenza Artificiale per
              analizzare in profondità le tendenze di mercato e anticipare i
              cambiamenti nei comportamenti dei consumatori. Attraverso modelli
              predittivi e analisi avanzate, definiamo strategie su misura che
              ottimizzano il posizionamento dei nostri clienti, trasformando i
              dati in visione strategica e vantaggio competitivo.
            </h4>
            <button className="bg-white text-black duration-300 hover:bg-[#d1b42f] hover:text-black transition-all py-2! px-4! w-[-webkit-fill-available] my-8 lg:my-0 rounded-full text-element non-magnetic">
              Scopri di più
            </button>
          </div>
        </div>

        <div className="image-container">
          <Image
            className="bg-white/10 mt-10 lg:mt-20 w-full h-[60%] object-cover"
            src={ImageLeft2}
            alt="Immagine strategia"
            width={600}
            height={400}
          />
        </div>
      </div>

      {/* Third Grid - Yellow Background */}
      <div
        ref={addToRefs}
        className="section-content grid grid-cols-1 lg:grid-cols-2 gap-4 p-8 ml-auto mr-auto max-w-[1200px] min-h-screen"
      >
        <div className="items-start justify-start w-full mb-20 lg:mb-80 flex flex-col gap-8">
          {/* Top row: Number and Title/Subtitle side-by-side */}
          <div className="flex flex-col lg:flex-row items-start gap-8 mx-8 lg:mx-0">
            <h2 className="text-[8rem] lg:text-[15rem] text-element">03</h2>
            <div className="m-auto">
              <h3 className="text-[3rem] lg:text-[4rem] font-bold text-element">
                Azione
              </h3>
              <h4 className="w-full lg:w-[80%] text-lg text-balance text-element">
                Trasformiamo la strategia in azione con creatività dirompente e
                concreta, per tradurre gli obiettivi in risultati tangibili.
              </h4>
            </div>
          </div>

          {/* Bottom row: Divider + long paragraph */}
          <div className="content items-start gap-4 mx-8 lg:mx-0">
            <div className="h-[2px] w-full bg-black divider hidden lg:block text-element"></div>
            <h4 className="w-full lg:w-[80%] text-balance my-8 text-element">
              Mettiamo in pratica le strategie sviluppate con un'esecuzione
              impeccabile e tempestiva. La nostra creatività si traduce in
              campagne e iniziative che catturano l'attenzione del pubblico
              target. Monitoriamo costantemente i risultati, adattando le nostre
              azioni in tempo reale per garantire l'efficacia delle operazioni e
              il raggiungimento degli obiettivi prefissati.
            </h4>
            <button className="bg-black text-white duration-300 hover:bg-white hover:text-black transition-all py-2! px-4! w-[-webkit-fill-available] my-8 lg:my-0  rounded-full text-element non-magnetic">
              Scopri di più
            </button>
          </div>
        </div>

        <div className="image-container">
          <Image
            className="bg-black/10 mt-10 lg:mt-20 w-full h-[60%] object-cover"
            src={ImageLeft3}
            alt="Immagine azione"
            width={600}
            height={400}
          />
        </div>
      </div>
    </div>
  );
}
