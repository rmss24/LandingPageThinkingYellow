{
  /*"use client";
import "./works.css";

import { useState, Fragment, useRef, useEffect } from "react";
import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
  Transition,
  TransitionChild,
} from "@headlessui/react";
import { gsap } from "gsap";

// Tipizzazione per ogni card
interface CardInfo {
  title: string;
  progetto: string;
  media: string;
  content: string;
  link: string;
  linkText: string;
  youtubeId: string;
  src: string;
}

// Componente VideoCard con effetto blur dinamico
const VideoCard: React.FC<{
  card: CardInfo;
  onClick: (card: CardInfo) => void;
}> = ({ card, onClick }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [dominantColor, setDominantColor] = useState("rgba(0, 0, 0, 0.5)");

  // Funzione per estrarre il colore dominante dal frame del video
  const extractDominantColor = () => {
    const video = videoRef.current;
    const canvas = canvasRef.current;

    if (!video || !canvas) return;

    const context = canvas.getContext("2d");
    if (!context) return; // Assicurati che il contesto sia disponibile
    context.drawImage(video, 0, 0, canvas.width, canvas.height);

    // Ottieni i dati dei pixel dal centro del video
    const centerX = Math.floor(canvas.width / 2);
    const centerY = Math.floor(canvas.height / 2);
    const imageData = context.getImageData(centerX - 25, centerY - 25, 50, 50);
    const pixels = imageData.data;

    // Calcola il colore medio
    let totalR = 0,
      totalG = 0,
      totalB = 0;
    const numPixels = pixels.length / 4;

    for (let i = 0; i < pixels.length; i += 4) {
      totalR += pixels[i];
      totalG += pixels[i + 1];
      totalB += pixels[i + 2];
    }

    const avgR = Math.floor(totalR / numPixels);
    const avgG = Math.floor(totalG / numPixels);
    const avgB = Math.floor(totalB / numPixels);

    // Crea il colore RGBA con trasparenza per l'effetto blur
    const newColor = `rgba(${avgR}, ${avgG}, ${avgB}, 0.6)`;

    if (newColor !== dominantColor) {
      setDominantColor(newColor);
    }
  };

  useEffect(() => {
    const video = videoRef.current;
    let extractionInterval: NodeJS.Timeout | undefined;

    if (video) {
      // Inizia l'estrazione del colore una volta che il video è caricato
      video.addEventListener("loadeddata", () => {
        extractionInterval = setInterval(extractDominantColor, 1000);
      });

      // Pulizia quando il componente viene smontato
      return () => {
        if (extractionInterval) {
          clearInterval(extractionInterval);
        }
      };
    }
  }, []);

  // Effetto per animare il cambio di colore del blur con GSAP
  useEffect(() => {
    if (containerRef.current) {
      gsap.to(containerRef.current.querySelector(".blur-background"), {
        duration: 0.8,
        backgroundColor: dominantColor,
        ease: "power2.out",
      });
    }
  }, [dominantColor]);

  return (
    <div
      ref={containerRef}
      className="relative aspect-video rounded-xl overflow-hidden shadow-md cursor-pointer hover:scale-105 transition-transform duration-300"
      onClick={() => onClick(card)}
    >
      {/* Strato di blur che prende il colore dominante 
      <div
        className="blur-background absolute inset-0 blur-xl"
        style={{ backgroundColor: dominantColor, transform: "scale(1.1)" }}
      />

      {/* Video effettivo 
      <video
        ref={videoRef}
        className="w-full h-full object-cover pointer-events-none relative z-10"
        autoPlay
        loop
        muted
        playsInline
      >
        <source src={card.src} type="video/webm" />
      </video>

      {/* Canvas nascosto per l'analisi dei frame 
      <canvas ref={canvasRef} width={100} height={100} className="hidden" />
    </div>
  );
};

export default function Works() {
  const cardsInfo: CardInfo[] = [...];
  const autoplayAndMute = "?autoplay=1&mute=1";
  const [open, setOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState<CardInfo | null>(null);
  const [backgroundColorBlur, setBackgroundColorBlur] = useState("rgba(0, 0, 0, 0.5)"); // Stato per il colore del blur di sfondo
  const backdropRef = useRef<HTMLDivElement>(null); // Riferimento per lo sfondo blur

  const handleVideoClick = (card: CardInfo) => {
    setSelectedCard(card);
    setOpen(true);
    // Potresti anche avviare qui l'estrazione del colore se necessario
  };

  // Funzione per estrarre il colore dominante dal video nella modale
  const extractDominantColorModal = (videoId: string) => {
    const videoElement = document.querySelector(`#modal-video-${videoId}`);
    const canvas = document.createElement('canvas');
    if (!videoElement || !(videoElement instanceof HTMLVideoElement)) return;

    canvas.width = videoElement.videoWidth;
    canvas.height = videoElement.videoHeight;
    const context = canvas.getContext('2d');
    if (!context) return;

    context.drawImage(videoElement, 0, 0, canvas.width, canvas.height);
    const imageData = context.getImageData(canvas.width / 2 - 25, canvas.height / 2 - 25, 50, 50);
    const pixels = imageData.data;
    let totalR = 0, totalG = 0, totalB = 0;
    const numPixels = pixels.length / 4;

    for (let i = 0; i < pixels.length; i += 4) {
      totalR += pixels[i];
      totalG += pixels[i + 1];
      totalB += pixels[i + 2];
    }

    const avgR = Math.floor(totalR / numPixels);
    const avgG = Math.floor(totalG / numPixels);
    const avgB = Math.floor(totalB / numPixels);
    const newColor = `rgba(${avgR}, ${avgG}, ${avgB}, 0.7)`;
    setBackgroundColorBlur(newColor);
  };

  useEffect(() => {
    if (open && selectedCard?.youtubeId) {
      // Aspetta che il video nella modale sia caricato e poi estrai il colore
      const video = document.querySelector(`#modal-video-${selectedCard.youtubeId}`);
      const handleLoadedData = () => {
        extractDominantColorModal(selectedCard.youtubeId);
        video?.removeEventListener('loadeddata', handleLoadedData);
      };
      video?.addEventListener('loadeddata', handleLoadedData);
    } else {
      // Resetta il colore del blur quando la modale è chiusa
      setBackgroundColorBlur("rgba(0, 0, 0, 0.5)");
    }
  }, [open, selectedCard?.youtubeId]);

  useEffect(() => {
    if (backdropRef.current) {
      gsap.to(backdropRef.current, {
        duration: 0.8,
        backgroundColor: backgroundColorBlur,
        ease: "power2.out",
      });
    }
  }, [backgroundColorBlur]);

  return (
    <div className="relative flex justify-center items-center min-h-screen w-full overflow-hidden">
      {/* Sfondo blur dinamico *
      <div
        ref={backdropRef}
        className="absolute inset-0 blur-xl transition-colors duration-800 ease-out"
        style={{ backgroundColor: backgroundColorBlur }}
      />
      <div className="container mx-auto px-4 py-8 relative z-10"> {/* Aggiungi relative e z-10 per sovrapporre il contenuto 
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {cardsInfo.map((card, index) => (
            <VideoCard key={index} card={card} onClick={handleVideoClick} />
          ))}
        </div>

        <Transition appear show={open} as={Fragment}>
          <Dialog onClose={() => setOpen(false)} className="relative z-10">
            <TransitionChild
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <DialogBackdrop className="fixed inset-0 bg-black/50" />
            </TransitionChild>

            <div className="fixed inset-0 z-10 flex items-center justify-center p-4">
              <TransitionChild
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <DialogPanel className="bg-white rounded-xl w-full max-w-3xl max-h-[80vh] shadow-xl transform transition-all overflow-y-auto">
                  {selectedCard && (
                    <>
                      {/* YouTube Video Container *
                      <div className="relative w-full pt-[56.25%]">
                        <iframe
                        id={`modal-video-${selectedCard.youtubeId}`}
                        className="absolute top-0 left-0 w-full h-full"
                        src={`https://www.youtube.com/embed/${selectedCard.youtubeId}${autoplayAndMute}`} // Utilizza la variabile per autoplay e mute
                        title={selectedCard.title}
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                        />
                                            </div>

                      <div className="p-6">
                        <DialogTitle className="text-xl font-bold mb-2 mt-4 text-center text-black">
                          {selectedCard.title}
                        </DialogTitle>
                        <p className="text-sm mt-4 text-center text-black mb-1">
                          <strong>Progetto:</strong> {selectedCard.progetto}
                        </p>
                        <p className="text-sm mt-4 text-center text-black mb-1">
                          <strong>Media:</strong> {selectedCard.media}
                        </p>
                        <p className="mt-4 text-center text-black">
                          {selectedCard.content}
                        </p>
                        <div className="mt-4 text-center">
                          <a
                            href={selectedCard.link}
                            className="inline-block text-blue-600 hover:underline"
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            {selectedCard.linkText}
                          </a>
                        </div>
                        <div className="mt-6 text-right">
                          <button
                            onClick={() => setOpen(false)}
                            className="bg-gray-400/15 backdrop-blur-3xl text-black px-4 py-2 rounded-full transition-colors hover:bg-gray-800/15 font-bold my-2"
                          >
                            Chiudi
                          </button>
                        </div>
                      </div>
                    </>
                  )}
                </DialogPanel>
              </TransitionChild>
            </div>
          </Dialog>
        </Transition>
      </div>
    </div>
  );
} /*export default Works; */
}
