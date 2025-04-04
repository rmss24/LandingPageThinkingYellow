"use client";
import { useRef, useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import Cursor from "../components/cursor";

export default function Hero() {
  const totalSlides = 5;
  const [currentSlide, setCurrentSlide] = useState(0);
  const containerRef = useRef<HTMLElement | null>(null);
  const slidesRef = useRef<Array<HTMLDivElement | null>>([]);
  // Imposta isHovered a true di default
  const [isHovered, setIsHovered] = useState(false); // Start with false
  const autoSlideTimerRef = useRef<NodeJS.Timeout | null>(null);
  const loadingRef = useRef<HTMLDivElement | null>(null);
  const router = useRouter();

  const slides = [
    {
      videoSrc: "/videos/cp15.webm",
      text: "IL CAAF TI SUPPORTA NELLA GESTIONE DELLA TUA VITA FINANZIARIA",
      subtitle:
        "Siamo al fianco dei pensionati moderni con il nostro supporto concreto. Grazie a SPI CGIL, il pensionato non è mai solo: lo aiutiamo, lo consigliamo e lo proteggiamo ogni giorno.",
      path: "#",
    },
    {
      videoSrc: "/videos/100rock.webm",
      text: "La leggendaria rock band",
      subtitle:
        "Al fianco del pensionato moderno, c'è sempre un sostegno solido. Con SPI CGIL, il pensionato trova un supporto indispensabile: siamo sempre pronti a proteggerlo, .",
      path: "#",
    },
    {
      videoSrc: "/videos/torreMatilde.webm",
      text: "Torre Matilde: una bellezza senza tempo",
      subtitle:
        "Avevo pensato di scrivere un testo divertente con l'aiuto di ChatGPT, ma sfortunatamente il servizio è momentaneamente fuori uso...",
      path: "#",
    },
    {
      videoSrc: "/videos/Video.webm",
      text: "Insieme, per un futuro migliore per tutti",
      subtitle:
        "La nostra missione è inventare soluzioni che migliorano la vita quotidiana, assicurando sempre il benessere e i diritti dei nostri cittadini, soprattutto dei pensionati.",
      path: "#",
    },
  ];

  useEffect(() => {
    slidesRef.current = slidesRef.current.slice(0, slides.length);
  }, [slides.length]);

  useEffect(() => {
    slidesRef.current.forEach((slide, index) => {
      if (slide) {
        gsap.set(slide, {
          xPercent: index === 0 ? 0 : 100,
          zIndex: index === 0 ? 0 : -10,
          opacity: index === 0 ? 1 : 0,
        });
      }
    });
  }, []);

  useEffect(() => {
    const startAutoSlide = () => {
      if (loadingRef.current) {
        gsap.fromTo(
          loadingRef.current,
          { width: "0%", left: "0%" },
          {
            width: "100%",
            duration: 10,
            ease: "none",
            onComplete: () => {
              slideNext();
            },
          }
        );
      }

      autoSlideTimerRef.current = setTimeout(() => {
        startAutoSlide();
      }, 10000);
    };

    startAutoSlide();

    return () => {
      if (autoSlideTimerRef.current) {
        clearTimeout(autoSlideTimerRef.current);
      }
      gsap.killTweensOf(loadingRef.current);
    };
  }, [currentSlide]);

  const handleMouseEnter = () => setIsHovered(true);
  const handleMouseLeave = () => setIsHovered(false);

  useGSAP(
    () => {
      gsap.set(".title, .flex-content", { y: 30, opacity: 0 });
      gsap.set(".divider", { width: 0 });

      gsap
        .timeline()
        .to(".divider", { width: "100vw", duration: 1.5, ease: "power2.inOut" })
        .to(".title", {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: "power4.inOut",
          delay: -0.75,
        })
        .to(".flex-content", {
          y: 0,
          opacity: 1,
          duration: 1,
          stagger: 0.1,
          ease: "power4.inOut",
        });
    },
    { scope: containerRef, dependencies: [] }
  );

  const animateSlide = (
    currentIndex: number,
    nextIndex: number,
    direction: number
  ) => {
    const targets = slidesRef.current;
    if (!targets[currentIndex] || !targets[nextIndex]) return;

    gsap.set(targets[nextIndex], {
      xPercent: direction * 100,
      zIndex: 10,
      opacity: 1,
    });
    gsap
      .timeline()
      .to(targets[currentIndex], {
        xPercent: -direction * 100,
        zIndex: -10,
        duration: 0.7,
        ease: "power4.inOut",
      })
      .to(
        targets[nextIndex],
        { xPercent: 0, zIndex: 0, duration: 0.7, ease: "power4.inOut" },
        "<"
      );

    gsap.fromTo(
      ".title, .content-container, .projects-titles",
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, ease: "power4.inOut" }
    );

    setCurrentSlide(nextIndex);
  };

  const slideNext = () => {
    if (autoSlideTimerRef.current) clearTimeout(autoSlideTimerRef.current);
    gsap.killTweensOf(loadingRef.current);
    animateSlide(currentSlide, (currentSlide + 1) % slides.length, 1);
  };

  const slidePrev = () => {
    if (autoSlideTimerRef.current) clearTimeout(autoSlideTimerRef.current);
    gsap.killTweensOf(loadingRef.current);
    animateSlide(
      currentSlide,
      (currentSlide - 1 + slides.length) % slides.length,
      -1
    );
  };

  const getNextSlideNumber = () => {
    return ((currentSlide + 1) % slides.length) + 1;
  };

  // Modifica per prevenire sovrapposizione del cursore
  const handleSectionClick = (e: React.MouseEvent) => {
    const target = e.target as HTMLElement;
    if (target.closest("button")) return; // Ignora i pulsanti

    // Non modificare lo stato del cursore qui
    router.push(slides[currentSlide].path);
  };

  return (
    <>
      {/* Passa isHovered come true di default */}
      <Cursor isHovered={isHovered} />
      <section
        ref={containerRef}
        className="relative h-screen flex flex-col text-white py-0 px-3 overflow-x-hidden"
        onClick={handleSectionClick}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className="flex items-center mx-auto w-[20%] z-20 mt-8 my-8">
          <span className="text-xl font-medium">{currentSlide + 1}</span>
          <div className="relative mx-4 w-80 h-1 bg-white/20">
            <div
              ref={loadingRef}
              className="absolute top-0 left-0 h-full bg-white"
              style={{ width: "0%" }}
            ></div>
          </div>
          <span className="text-xl font-medium">{getNextSlideNumber()}</span>
        </div>

        <div className="video-docker absolute top-0 left-0 w-full h-full overflow-hidden">
          <div className="bg-black/15 absolute z-10 w-full h-full" />
          {slides.map((slide, index) => (
            <div
              key={index}
              ref={(el) => {
                slidesRef.current[index] = el;
              }}
              className="absolute w-full h-full"
              style={{
                opacity: index === 0 ? 1 : 0,
                zIndex: index === 0 ? 0 : -10,
              }}
            >
              <video
                className="min-w-full min-h-full absolute object-cover"
                autoPlay
                loop
                muted
              >
                <source src={slide.videoSrc} type="video/mp4" />
              </video>
            </div>
          ))}
        </div>

        <div className="video-content space-y-2 z-20 mt-auto mb-60">
          <h1 className="lg:text-9xl text-5xl title my-8 mx-8 lg:mx-0">
            {slides[currentSlide].text}
          </h1>
          <div className="h-[2px] w-screen -ml-8 bg-white divider hidden lg:block"></div>
          <div className="lg:flex block flex-content my-8 mx-8 lg:mx-0">
            <div className="projer-titles lg:flex my-8 hidden">
              <div className="h-4 w-4 bg-white rounded-full self-center mr-2" />
            </div>

            <div className="w-[30%] ml-[15%] absolute content-container contents lg:block my-8">
              <p className="text-lg! lg:mt-4 mt-8  mx-0 my-8">
                {slides[currentSlide].subtitle}
              </p>
              <button
                onClick={(e) => {
                  e.stopPropagation(); // Previeni il click sulla sezione
                  router.push(slides[currentSlide].path);
                }}
                className="bg-gray-400/15 backdrop-blur-3xl text-white px-4! py-2! rounded-full transition-colors hover:bg-gray-800/15 font-bold mt-4 my-8"
              >
                Scopri di più{" "}
                <span className="w-2">
                  <i className="bi bi-plus"></i>
                </span>
              </button>
            </div>

            <div className="ml-auto mr-8 flex gap-6 lg:mt-4 mt-8 lg:my-8 my-0">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  slidePrev();
                }}
                className="text-2xl hover:text-gray-300 transition-colors bg-gray-400/15 backdrop-blur-3xl text-white px-2! py-1! rounded-full my-8"
              >
                <i className="bi bi-arrow-left"></i>
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  slideNext();
                }}
                className="text-2xl hover:text-gray-300 transition-colors bg-gray-400/15 backdrop-blur-3xl text-white px-2! py-1! rounded-full my-8"
              >
                <i className="bi bi-arrow-right"></i>
              </button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
