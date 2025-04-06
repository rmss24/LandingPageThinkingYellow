"use client";
import "./works.css";
import { useState, useRef, useEffect } from "react";
import { gsap } from "gsap";

import Brands from "@/app/sections/brands";
import Cursor from "@/app//components/cursor";

// Tipizzazione per ogni card
interface VideoInfo {
  title: string;
  progetto: string;
  media: string;
  content: string;
  link: string;
  linkText: string;
  src: string;
  defaultColor?: string;
}

export default function VideoCarousel() {
  const carouselRef = useRef<HTMLDivElement>(null);
  const backdropRef = useRef<HTMLDivElement>(null);
  const modalRef = useRef<HTMLDivElement>(null);

  const [isHovered, setIsHovered] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [videos] = useState<VideoInfo[]>([
    {
      title: "IL CAAF TI SUPPORTA NELLA GESTIONE DELLA TUA VITA FINANZIARIA",
      progetto: "Design Digital",
      media: "Video",
      content:
        "Siamo al fianco dei pensionati moderni con il nostro supporto concreto.",
      link: "https://example.com/project1",
      linkText: "Learn More",
      src: "/videos/cp15.webm",
      defaultColor: "rgba(220, 100, 100, 0.6)",
    },
    {
      title: "Project 2",
      progetto: "Web Development",
      media: "Interactive",
      content: "Description of the second project",
      link: "https://example.com/project2",
      linkText: "View Project",
      src: "/videos/project2.webm",
      defaultColor: "rgba(100, 150, 220, 0.6)",
    },
    {
      title: "Project 3",
      progetto: "Animation",
      media: "Video",
      content: "A stunning animation project",
      link: "https://example.com/project3",
      linkText: "View Animation",
      src: "/videos/project3.webm",
      defaultColor: "rgba(100, 220, 150, 0.6)",
    },
  ]);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [backgroundColor, setBackgroundColor] = useState(
    videos[0]?.defaultColor || "rgba(0, 0, 0, 0.5)"
  );
  const [isTransitioning, setIsTransitioning] = useState(false);

  // Riferimenti ai video e canvas per l'estrazione del colore
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Funzione per estrarre il colore dai bordi del video
  const extractBorderColor = (videoElement: HTMLVideoElement | null) => {
    if (!videoElement || !canvasRef.current || videoElement.readyState < 2)
      return null;

    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");
    if (!context) return null;

    const videoWidth = videoElement.videoWidth;
    const videoHeight = videoElement.videoHeight;

    // Ridimensiona il canvas per adattarlo al video
    canvas.width = videoWidth;
    canvas.height = videoHeight;

    try {
      // Disegna il frame corrente del video sul canvas
      context.drawImage(videoElement, 0, 0, videoWidth, videoHeight);

      // Campiona i pixel dai bordi del video
      const borderSamples = [];
      const sampleSize = 10; // Dimensione del campione per bordo
      const borderWidth = Math.max(
        10,
        Math.min(videoWidth, videoHeight) * 0.05
      ); // 5% della dimensione minore

      // Bordo superiore
      const topBorderData = context.getImageData(
        0,
        0,
        videoWidth,
        borderWidth
      ).data;
      // Bordo inferiore
      const bottomBorderData = context.getImageData(
        0,
        videoHeight - borderWidth,
        videoWidth,
        borderWidth
      ).data;
      // Bordo sinistro
      const leftBorderData = context.getImageData(
        0,
        0,
        borderWidth,
        videoHeight
      ).data;
      // Bordo destro
      const rightBorderData = context.getImageData(
        videoWidth - borderWidth,
        0,
        borderWidth,
        videoHeight
      ).data;

      // Combina tutti i dati dei bordi
      const allBorderData = [
        ...Array.from(topBorderData),
        ...Array.from(bottomBorderData),
        ...Array.from(leftBorderData),
        ...Array.from(rightBorderData),
      ];

      // Calcola il colore medio
      let totalR = 0,
        totalG = 0,
        totalB = 0;
      const numPixels = allBorderData.length / 4;

      for (let i = 0; i < allBorderData.length; i += 4) {
        totalR += allBorderData[i];
        totalG += allBorderData[i + 1];
        totalB += allBorderData[i + 2];
      }

      const avgR = Math.floor(totalR / numPixels);
      const avgG = Math.floor(totalG / numPixels);
      const avgB = Math.floor(totalB / numPixels);

      // Crea il colore RGBA con trasparenza per l'effetto blur
      return `rgba(${avgR}, ${avgG}, ${avgB}, 0.6)`;
    } catch (error) {
      console.error("Errore nell'estrazione del colore:", error);
      return null;
    }
  };

  // Aggiorna periodicamente il colore di sfondo
  useEffect(() => {
    const currentVideo = videoRefs.current[currentIndex];

    if (!currentVideo) return;

    // Aggiorna il colore al caricamento del video
    const handleVideoLoaded = () => {
      updateBackgroundColor();
    };

    currentVideo.addEventListener("loadeddata", handleVideoLoaded);

    // Imposta un intervallo per l'aggiornamento del colore
    const colorInterval = setInterval(() => {
      if (!isTransitioning) {
        updateBackgroundColor();
      }
    }, 250); // Controlla ogni 250ms

    return () => {
      currentVideo.removeEventListener("loadeddata", handleVideoLoaded);
      clearInterval(colorInterval);
    };
  }, [currentIndex, isTransitioning]);

  // Funzione di aggiornamento del colore di sfondo
  const updateBackgroundColor = () => {
    const currentVideo = videoRefs.current[currentIndex];
    const extractedColor = extractBorderColor(currentVideo);

    if (extractedColor) {
      setBackgroundColor(extractedColor);
    }
  };

  // Effetto per animare il cambio di colore dello sfondo
  useEffect(() => {
    if (backdropRef.current) {
      gsap.to(backdropRef.current, {
        duration: 0.8,
        backgroundColor,
        ease: "power2.out",
      });
    }
  }, [backgroundColor]);

  // Funzione per aprire il modale con animazione
  const openModal = () => {
    setIsModalOpen(true);

    // Anima l'apertura del modale
    if (modalRef.current) {
      gsap.fromTo(
        modalRef.current,
        {
          opacity: 0,
          y: 20,
          scale: 0.95,
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.4,
          ease: "power2.out",
        }
      );
    }
  };

  // Funzione per chiudere il modale con animazione
  const closeModal = () => {
    if (modalRef.current) {
      gsap.to(modalRef.current, {
        opacity: 0,
        y: 20,
        scale: 0.95,
        duration: 0.3,
        ease: "power2.in",
        onComplete: () => setIsModalOpen(false),
      });
    } else {
      setIsModalOpen(false);
    }
  };

  // Navigazione del carosello
  const goToNext = () => {
    if (isTransitioning) return;

    setIsTransitioning(true);
    const nextIndex = (currentIndex + 1) % videos.length;

    if (carouselRef.current) {
      const slideWidth = carouselRef.current.offsetWidth;

      gsap.to(carouselRef.current, {
        duration: 0.6,
        x: -slideWidth,
        ease: "power2.inOut",
        onComplete: () => {
          setCurrentIndex(nextIndex);
          gsap.set(carouselRef.current, { x: 0 });
          setIsTransitioning(false);
        },
      });
    }
  };

  const goToPrev = () => {
    if (isTransitioning) return;

    setIsTransitioning(true);
    const prevIndex = (currentIndex - 1 + videos.length) % videos.length;

    if (carouselRef.current) {
      const slideWidth = carouselRef.current.offsetWidth;

      gsap.fromTo(
        carouselRef.current,
        { x: -slideWidth },
        {
          duration: 0.6,
          x: 0,
          ease: "power2.inOut",
          onComplete: () => {
            setCurrentIndex(prevIndex);
            setIsTransitioning(false);
          },
        }
      );
    }
  };

  // Inizializza i riferimenti dei video
  useEffect(() => {
    videoRefs.current = videoRefs.current.slice(0, videos.length);
  }, [videos.length]);

  return (
    <>
      <Cursor isHovered={isHovered} />
      <div className="relative justify-center items-center min-h-screen w-full overflow-hidden">
        {/* Graduale background scuro invece che dinamico */}
        <h1 className="lg:text-7xl text-5xl title my-8 mx-8 lg:mx-20 lg:my-16 font-semibold mt-20">
          Il nostro Portfolio
        </h1>
        {/* Overlay con colore dinamico ma più sottile */}
        <div
          ref={backdropRef}
          className="absolute inset-0 blur-xl opacity-30 transition-colors duration-300 ease-out pointer-events-none"
          style={{ backgroundColor }}
        />

        <div className="container mx-auto px-4 sm:px-6 py-4 sm:py-8 relative z-10">
          {/* Canvas nascosto per estrazione colore */}
          <canvas ref={canvasRef} className="hidden" />

          {/* Carosello */}
          <div className="relative max-w-7xl mx-auto mt-8 sm:mt-12 md:mt-16 lg:mt-20">
            <div
              onClick={openModal}
              ref={carouselRef}
              className="w-full aspect-video rounded-lg sm:rounded-xl overflow-hidden shadow-lg cursor-pointer h-[60vh] lg:h-[80vh]"
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
            >
              {videos.map((video, index) => (
                <div
                  key={index}
                  className={`absolute inset-0 transition-opacity duration-500 ${
                    index === currentIndex
                      ? "opacity-100 z-10"
                      : "opacity-0 z-0"
                  }`}
                >
                  <video
                    ref={(el) => {
                      videoRefs.current[index] = el;
                    }}
                    className="w-full h-full object-cover"
                    autoPlay
                    loop
                    muted
                    playsInline
                  >
                    <source src={video.src} type="video/webm" />
                  </video>

                  {/* Info overlay */}
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent text-white p-4! sm:p-6! md:p-8!">
                    <div className="mb-4 sm:mb-8 md:mb-10 lg:mb-14 ml-2 sm:ml-4 md:ml-8 lg:ml-16">
                      <h3 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold line-clamp-2 mb-6">
                        {video.title}
                      </h3>
                      <p className="text-sm sm:text-base md:text-lg mt-1 sm:mt-2 line-clamp-2 mb-2">
                        {video.content}
                      </p>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          openModal();
                        }}
                        className="mt-2 sm:mt-3 md:mt-4 px-3! sm:px-4 md:px-6! py-2! sm:py-1.5! md:py-2! bg-white/20 hover:bg-white/30 backdrop-blur-md rounded-full transition-colors text-sm sm:text-base"
                      >
                        Maggiori informazioni
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Controlli del carosello */}
            <button
              onClick={goToPrev}
              className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 z-20 bg-white/20 hover:bg-white/40 backdrop-blur-md text-white rounded-full p-6! sm:p-3! md:p-4!"
              aria-label="Precedente"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6"
              >
                <polyline points="15 18 9 12 15 6"></polyline>
              </svg>
            </button>

            <button
              onClick={goToNext}
              className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 z-20 bg-white/20 hover:bg-white/40 backdrop-blur-md text-white rounded-full p-6! sm:p-3! md:p-4!"
              aria-label="Successivo"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6"
              >
                <polyline points="9 18 15 12 9 6"></polyline>
              </svg>
            </button>

            {/* Indicatori */}
            <div className="absolute bottom-2 sm:bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-1 sm:space-x-2 z-20">
              {videos.map((_, index) => (
                <button
                  key={index}
                  className={`w-2 h-2 sm:w-3 sm:h-3 rounded-full transition-colors ${
                    index === currentIndex ? "bg-white" : "bg-white/40"
                  }`}
                  onClick={() => setCurrentIndex(index)}
                  aria-label={`Vai al video ${index + 1}`}
                />
              ))}
            </div>
          </div>

          {/* Modal con informazioni del video */}
          {isModalOpen && (
            <>
              {/* Overlay per chiudere il modale cliccando all'esterno */}
              <div
                className="fixed inset-0 backdrop-blur-sm z-30"
                onClick={closeModal}
              />

              {/* Contenuto del modale */}
              <div
                ref={modalRef}
                className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-40 
                          bg-black/70 backdrop-blur-md rounded-lg sm:rounded-xl p-4! sm:p-6! md:p-8! 
                          w-[90%] sm:w-[85%] md:max-w-2xl shadow-2xl"
                onClick={(e) => e.stopPropagation()}
              >
                <button
                  onClick={closeModal}
                  className="absolute top-2 sm:top-4 right-2 sm:right-4 text-white/80 hover:text-white"
                  aria-label="Chiudi"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="w-5 h-5 sm:w-6 sm:h-6"
                  >
                    <line x1="18" y1="6" x2="6" y2="18"></line>
                    <line x1="6" y1="6" x2="18" y2="18"></line>
                  </svg>
                </button>

                <div className="text-white">
                  <h2 className="text-xl sm:text-2xl md:text-3xl font-bold mb-2 sm:mb-4">
                    {videos[currentIndex].title}
                  </h2>
                  <div className="flex flex-col sm:flex-row sm:space-x-8 space-y-2 sm:space-y-0 mb-3 sm:mb-4 md:mb-6">
                    <p className="text-xs sm:text-sm">
                      <span className="text-white/60">Progetto:</span>{" "}
                      {videos[currentIndex].progetto}
                    </p>
                    <p className="text-xs sm:text-sm">
                      <span className="text-white/60">Media:</span>{" "}
                      {videos[currentIndex].media}
                    </p>
                  </div>
                  <p className="mb-4 sm:mb-6 md:mb-8 text-sm sm:text-base md:text-lg">
                    {videos[currentIndex].content}
                  </p>
                  <a
                    href={videos[currentIndex].link}
                    className="inline-block bg-white/20 hover:bg-white/30 rounded-full transition-colors px-3! sm:px-4! md:px-6! py-1! sm:py-1.5! md:py-2! text-sm sm:text-base"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {videos[currentIndex].linkText}
                  </a>
                </div>
              </div>
            </>
          )}
        </div>
        <Brands />
      </div>
    </>
  );
}
