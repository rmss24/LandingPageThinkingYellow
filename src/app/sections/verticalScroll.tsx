"use client";
import { useRef, useState, useEffect } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import ReactLenis from "lenis/react";
import Cursor from "../components/cursor";
import "./verticalScroll.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import Link from "next/link";
import { useRouter } from "next/navigation"; // ✅ per Next.js 13+ con App Router

export default function VerticalScrolling() {
  const router = useRouter();
  const container = useRef<HTMLDivElement>(null);
  const totalCards = 4;
  const [isHovered, setIsHovered] = useState(false);
  const parallaxRef = useRef<HTMLDivElement>(null);
  const scrollArrowRef = useRef<HTMLDivElement>(null);
  const [currentSection, setCurrentSection] = useState(1);
  const [totalSections, setTotalSections] = useState(3); // Based on your cardInfo array length

  const [isModalOpenVideo, setIsModalOpenVideo] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);
  const [currentCardIndex, setCurrentCardIndex] = useState(0);

  // Contact form modal state
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);
  const contactModalRef = useRef<HTMLDivElement>(null);
  const [formData, setFormData] = useState({
    nome: "",
    cognome: "",
    telefono: "",
    email: "",
    messaggio: "",
    privacyPolicy: false,
    marketingConsent: false,
  });

  const cardInfo = [
    {
      title: "Think Yellow: Creatività che sorprende",
      progetto: "Creative Concept",
      media: "Video",
      content: "Per noi la creatività è energia.",
      text: "Una sinfonia visiva in giallo. Dalla natura alla mente umana, attraversiamo suggestioni visive per raccontare il nostro approccio alla creatività: intuitivo, inaspettato, energico. Ogni fotogramma è una piccola scossa creativa.",
      linkPath: "/aboutus",
      linkText: "Vai alla pagina",
      src: "/videos/hero.webm",
    },
    {
      title: "Campagne che lasciano il segno",
      progetto: "Comunicazione",
      media: "Video",
      content: "Ogni idea è un viaggio.",
      text: "Ogni progetto è un racconto. Dal mondo della fiscalità reso umano e comprensibile, a campagne emozionali e sociali. Lasciamo parlare le immagini, le parole, le scelte creative. Perché ogni messaggio ha bisogno della sua forma.",
      linkPath: "/showcase",
      linkText: "Vai alle campagne",
      src: "/videos/scc.webm",
    },
    {
      title: "Leggiamo i segnali del futuro.",
      progetto: "Trend Analysis",
      media: "Video + Interactive",
      content: "L'analisi come visione ",
      text: "La creatività non è solo intuizione: è osservazione, dati, ascolto del contesto. Le tendenze digitali sono uno specchio della cultura, e noi le leggiamo per aiutare i brand a muoversi con intelligenza e precisione. L'AI è il prossimo capitolo.",
      linkPath: "/showcase",
      linkText: "Contattaci",
      src: "/videos/Data.webm",
    },
  ];

  useEffect(() => {
    const handleScroll = () => {
      if (parallaxRef.current) {
        const scrollPosition = window.scrollY;
        // Limit the amount of translation to prevent the image from disappearing
        const maxTranslate = window.innerHeight * 0.3; // 30% of the viewport height
        const translateY = Math.min(scrollPosition * 0.3, maxTranslate);
        parallaxRef.current.style.transform = `translateY(${translateY}px)`;
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Animate scroll arrow on mount
  useEffect(() => {
    if (scrollArrowRef.current) {
      // Create a bouncing animation for the scroll arrow
      gsap.to(scrollArrowRef.current, {
        y: 10,
        duration: 1.2,
        repeat: -1,
        yoyo: true,
        ease: "power1.inOut",
      });
    }

    // Hide the scroll arrow after a certain amount of scrolling
    const handleScrollVisibility = () => {
      if (scrollArrowRef.current) {
        if (window.scrollY > window.innerHeight * 0.1) {
          gsap.to(scrollArrowRef.current, {
            opacity: 0,
            duration: 0.5,
            ease: "power2.out",
          });
        } else {
          gsap.to(scrollArrowRef.current, {
            opacity: 1,
            duration: 0.5,
            ease: "power2.out",
          });
        }
      }
    };

    window.addEventListener("scroll", handleScrollVisibility);
    return () => window.removeEventListener("scroll", handleScrollVisibility);
  }, []);

  // Funzione per aprire il modale con animazione (from VideoCarousel)
  const openModal = (index: number) => {
    setCurrentCardIndex(index);
    setIsModalOpenVideo(true);

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

  // Funzione per chiudere il modale con animazione (from VideoCarousel)
  const closeModal = () => {
    if (modalRef.current) {
      gsap.to(modalRef.current, {
        opacity: 0,
        y: 20,
        scale: 0.95,
        duration: 0.3,
        ease: "power2.in",
        onComplete: () => setIsModalOpenVideo(false),
      });
    } else {
      setIsModalOpenVideo(false);
    }
  };

  // Contact form modal functions
  const openContactModal = () => {
    setIsContactModalOpen(true);

    // Animate modal opening
    if (contactModalRef.current) {
      gsap.fromTo(
        contactModalRef.current,
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

    // Prevent body scroll when modal is open
    document.body.style.overflow = "hidden";
  };

  const closeContactModal = () => {
    if (contactModalRef.current) {
      gsap.to(contactModalRef.current, {
        opacity: 0,
        y: 20,
        scale: 0.95,
        duration: 0.3,
        ease: "power2.in",
        onComplete: () => {
          setIsContactModalOpen(false);
          // Re-enable body scroll when modal is closed
          document.body.style.overflow = "auto";
        },
      });
    } else {
      setIsContactModalOpen(false);
      document.body.style.overflow = "auto";
    }
  };

  // Form handling
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type, checked } = e.target as HTMLInputElement;
    setFormData((prevState) => ({
      ...prevState,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Here you would handle the form submission
    console.log("Form submitted:", formData);

    // For demo purposes, just close the modal and show an alert
    alert("Grazie per averci contattato! Ti risponderemo al più presto.");
    closeContactModal();
  };

  // Add event listener for ESC key to close modal
  useEffect(() => {
    const handleEscKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        if (isModalOpenVideo) {
          closeModal();
        }
        if (isContactModalOpen) {
          closeContactModal();
        }
      }
    };

    window.addEventListener("keydown", handleEscKey);

    return () => {
      window.removeEventListener("keydown", handleEscKey);
      // Make sure to re-enable scrolling when component unmounts
      document.body.style.overflow = "auto";
    };
  }, [isModalOpenVideo, isContactModalOpen]);

  useGSAP(
    () => {
      if (!container.current) return;

      gsap.registerPlugin(ScrollTrigger);

      const cards = gsap.utils.toArray<HTMLElement>(".card");
      const section = document.querySelector(".cards-section");

      if (!section || cards.length === 0) return;

      // Set initial state - stack cards with 100% visibility
      gsap.set(cards, {
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        zIndex: (i) => totalCards - i,
        transformOrigin: "center center",
        opacity: (i) => (i === 0 ? 1 : 0), // Only first card visible, others hidden initially
      });

      // Create a snap-based scrolling system with discrete card changes
      cards.forEach((card, i) => {
        if (i === cards.length - 1) return; // Skip the last card

        // Create a snapping effect for card transitions
        gsap.to(card, {
          y: "-100vh", // Move card completely out of view
          ease: "none", // No easing for direct response
          scrollTrigger: {
            trigger: section,
            start: `top+=${i * window.innerHeight} top`, // One full viewport height per card
            end: `top+=${(i + 1) * window.innerHeight} top`, // Next viewport height
            scrub: 0, // No delay for immediate response to scroll
            snap: {
              snapTo: 1, // Snap to the end of the animation
              duration: { min: 0, max: 0 }, // Very short duration for snap
              delay: 0, // No delay
              ease: "none", // Minimal easing for the snap
            },
            // markers: true, // Uncomment for debugging
            onEnter: () => {
              // Make next card fully visible immediately
              if (i < cards.length - 1) {
                gsap.to(cards[i + 1] as HTMLElement, {
                  opacity: 1,
                  duration: 0.1,
                });
              }

              // Update current section index
              setCurrentSection(i + 2); // +2 because i is 0-based and we want to start from 1
            },
            onLeaveBack: () => {
              // Hide next card immediately when scrolling back
              if (i < cards.length - 1) {
                gsap.to(cards[i + 1] as HTMLElement, {
                  opacity: 0,
                  duration: 0.1,
                });
              }

              // Update current section index when scrolling back
              setCurrentSection(i + 1);
            },
          },
        });
      });

      // Pin the section with exact height calculation for discrete card views
      ScrollTrigger.create({
        trigger: section,
        start: "top top",
        end: `+=${window.innerHeight * (cards.length - 1)}`, // Exact height for discrete cards
        pin: true,
        // markers: true, // Uncomment for debugging
      });
    },
    { scope: container }
  );

  const handleCardClick = (index: number) => {
    if (index === 2) {
      openContactModal();
    } else {
      router.push(cardInfo[index].linkPath);
    }
  };

  return (
    <>
      <Cursor isHovered={isHovered} />
      <div ref={container} className="vertical-scroll-container">
        {/* Scroll Arrow Indicator */}
        <div
          ref={scrollArrowRef}
          className="scroll-arrow fixed bottom-8 left-1/2 transform -translate-x-1/2 z-20 flex flex-col items-center"
        >
          <p className="mb-2 text-white bg-black/30 backdrop-blur-sm px-4! py-2! rounded-full">
            Scorri per esplorare
          </p>
          <div className="w-10 h-10 flex items-center justify-center bg-[#d1b42f] rounded-full animate-pulse">
            <i className="bi bi-chevron-down text-white text-xl"></i>
          </div>
        </div>

        {/* Section Counter */}
        <div className="section-counter fixed right-8 top-1/2 transform -translate-y-1/2 z-20 flex flex-col items-center">
          <div className="px-4! py-2! bg-black/30 backdrop-blur-sm rounded-full text-white font-bold  my-4! lg:my-2!">
            <span className="text-[#d1b42f]">{currentSection}</span>
            <span className="px-1!">/</span>
            <span>{totalSections}</span>
          </div>
          <div className="h-16 w-px bg-white/50 my-4! lg:my-2!  hidden lg:block "></div>
          <div className="flex flex-col space-y-2">
            {Array.from({ length: totalSections }).map((_, index) => (
              <div
                key={index}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  index + 1 === currentSection
                    ? "bg-[#d1b42f] scale-150"
                    : "bg-white/50"
                }`}
              ></div>
            ))}
          </div>
        </div>

        <section className="cards-section h-screen relative overflow-hidden">
          <div className="cards-container h-full w-full relative">
            {cardInfo.map((card, index) => (
              <div
                key={index}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
                className="card bg-blue-100"
                onClick={() => handleCardClick(index)}
                style={{ cursor: "pointer" }}
              >
                <video autoPlay loop muted className="video brightness-[0.8]">
                  <source src={card.src} type="video/webm" />
                </video>
                <h2 className="uppercase"> {card.title}</h2>
                <p>{card.content}</p>
                <div className="button-container">
                  {index < 2 ? (
                    <Link
                      href={card.linkPath}
                      className="bg-gray-400/15 backdrop-blur-md px-6! py-4! rounded-full transition-colors hover:bg-gray-800/15 font-bold"
                    >
                      {card.linkText}
                      <i className="bi bi-chevron-right"></i>
                    </Link>
                  ) : (
                    <button
                      className="bg-gray-400/15 backdrop-blur-md px-6! py-4! rounded-full transition-colors hover:bg-gray-800/15 font-bold"
                      onClick={(e) => {
                        e.stopPropagation();
                        openContactModal();
                      }}
                    >
                      {card.linkText}
                      <i className="bi bi-chevron-right"></i>
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>

      {/* Contact Modal */}
      {isContactModalOpen && (
        <>
          {/* Overlay */}
          <div
            className="fixed inset-0 backdrop-blur-sm bg-black/50 z-30"
            onClick={closeContactModal}
          />

          {/* Modal Content */}
          <div
            ref={contactModalRef}
            className="fixed top-[55%] lg:top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-40 
                      bg-white rounded-lg w-[95%] sm:w-[90%] md:w-[75%] lg:w-[50%] max-h-[90vh]
                      shadow-2xl overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close button */}
            <button
              onClick={closeContactModal}
              className="absolute top-4 right-4 bg-gray-200 hover:bg-gray-300 
                        w-8 h-8 rounded-full flex items-center justify-center 
                        transition-colors z-10"
              aria-label="Close modal"
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="black"
                strokeWidth="2"
                className="transform scale-75"
              >
                <path d="M18 6L6 18M6 6l12 12" />
              </svg>
            </button>

            {/* Header */}
            <div className="bg-[#d1b42f] text-white! py-6! px-8! rounded-t-lg">
              <h2 className="text-2xl! font-bold!">Contattaci</h2>
              <p className="mt-2">
                Compilando il modulo sottostante, il nostro team ti contatterà
                al più presto.
              </p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="p-8!">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="nome" className="block text-gray-700! mb-2">
                    Nome *
                  </label>
                  <input
                    type="text"
                    id="nome"
                    name="nome"
                    value={formData.nome}
                    onChange={handleInputChange}
                    required
                    className="w-full px-6! py-4! border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#d1b42f] text-black!"
                  />
                </div>

                <div>
                  <label
                    htmlFor="cognome"
                    className="block text-gray-700! mb-2"
                  >
                    Cognome *
                  </label>
                  <input
                    type="text"
                    id="cognome"
                    name="cognome"
                    value={formData.cognome}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4! py-2! border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#d1b42f] text-black!"
                  />
                </div>

                <div>
                  <label
                    htmlFor="telefono"
                    className="block text-gray-700! mb-2"
                  >
                    Numero di Telefono *
                  </label>
                  <input
                    type="tel"
                    id="telefono"
                    name="telefono"
                    value={formData.telefono}
                    onChange={handleInputChange}
                    required
                    className="w-full px-6! py-4! border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#d1b42f] text-black!"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-gray-700! mb-2">
                    Email *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="w-full px-6! py-4! border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#d1b42f] text-black!"
                  />
                </div>
              </div>

              <div className="mt-6">
                <label
                  htmlFor="messaggio"
                  className="block text-gray-700! mb-2"
                >
                  Messaggio
                </label>
                <textarea
                  id="messaggio"
                  name="messaggio"
                  value={formData.messaggio}
                  onChange={handleInputChange}
                  rows={4}
                  className="w-full px-6! py-4! border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#d1b42f] text-black!"
                  placeholder="Come possiamo aiutarti?"
                ></textarea>
              </div>

              <div className="mt-6 space-y-4">
                <div className="flex items-start">
                  <input
                    type="checkbox"
                    id="privacyPolicy"
                    name="privacyPolicy"
                    checked={formData.privacyPolicy}
                    onChange={handleInputChange}
                    required
                    className="mt-1 mr-2 text-black!"
                  />
                  <label
                    htmlFor="privacyPolicy"
                    className="text-sm! text-gray-700!"
                  >
                    Dichiaro di aver letto e accettato i termini della{" "}
                    <Link
                      href="/privacy-policy"
                      className="text-[#d1b42f] font-bold hover:underline"
                    >
                      privacy policy
                    </Link>{" "}
                    *
                  </label>
                </div>

                <div className="flex items-start">
                  <input
                    type="checkbox"
                    id="marketingConsent"
                    name="marketingConsent"
                    checked={formData.marketingConsent}
                    onChange={handleInputChange}
                    className="mt-1 mr-2 text-black!"
                  />
                  <label
                    htmlFor="marketingConsent"
                    className="text-sm! text-gray-700!"
                  >
                    Acconsento a ricevere comunicazioni tramite SMS e WhatsApp
                    riguardanti promozioni, offerte speciali e aggiornamenti sui
                    servizi. Queste comunicazioni potrebbero includere messaggi
                    di marketing. Comprendo che posso revocare il consenso in
                    qualsiasi momento.
                  </label>
                </div>
              </div>

              <div className="mt-8 text-center">
                <button
                  type="submit"
                  className="bg-[#d1b42f] hover:bg-[#c0a52a] text-white! font-bold! py-3! px-8! rounded-full transition-colors"
                >
                  Invia
                </button>
              </div>
            </form>
          </div>
        </>
      )}
    </>
  );
}
