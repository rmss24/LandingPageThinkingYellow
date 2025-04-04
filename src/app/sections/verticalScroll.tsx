"use client";
import { useRef, useState, useEffect } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import ReactLenis from "lenis/react";
import Cursor from "../components/cursor";
import "./verticalScroll.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import Image from "next/image";
import ParallaxImage from "../../../public/images/pexels-camila-melo-1602181-3075974.jpg";
import OutroSection from "@/app/components/outroSection"; // Import the new OutroSection component

export default function VerticalScrolling() {
  const container = useRef<HTMLDivElement>(null);
  const totalCards = 4;
  const [isHovered, setIsHovered] = useState(false);
  const parallaxRef = useRef<HTMLDivElement>(null);

  const introItems = [
    {
      image: "/images/anteprima.jpg",
      title: "Marketing",
    },
    {
      image: "/images/crowdfunding.jpg",
      title: "Responsabilità",
    },
    {
      image: "/images/main-port-010-1.jpg",
      title: "Crowdfunding",
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
            },
            onLeaveBack: () => {
              // Hide next card immediately when scrolling back
              if (i < cards.length - 1) {
                gsap.to(cards[i + 1] as HTMLElement, {
                  opacity: 0,
                  duration: 0.1,
                });
              }
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

  return (
    <>
      <Cursor isHovered={isHovered} />
      <ReactLenis
        root
        options={{
          syncTouch: true,
          wheelMultiplier: 1,
          touchMultiplier: 2, // Increased for smoother touch response
          smoothWheel: true, // Enable smooth scrolling for wheel
          duration: 1.2, // Longer duration for smoother effect
          easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // Custom easing function
          orientation: "vertical", // Ensure vertical scrolling
          gestureOrientation: "vertical", // Ensure vertical gesture handling
        }}
      >
        <div ref={container} className="vertical-scroll-container">
          {/* Replace the outro section with the OutroSection component */}
          <OutroSection introItems={introItems} />

          <section className="cards-section h-screen relative overflow-hidden">
            <div className="cards-container h-full w-full relative">
              <div
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
                className="card bg-blue-100"
              >
                <video autoPlay loop muted className="video">
                  <source src="/videos/hero.webm" type="video/webm" />
                </video>
                <h2 className="uppercase">
                  Analizzare le tendenze per anticipare il futuro
                </h2>
                <p>La creatività è energia</p>
                <div className="button-container">
                  <button className="bg-gray-400/15 backdrop-blur-md text-black px-4 py-2 rounded-lg transition-colors hover:bg-gray-800/15 font-bold">
                    Scopri il nostro mondo{" "}
                    <i className="bi bi-chevron-right"></i>
                  </button>
                </div>
              </div>

              <div className="card bg-blue-100">
                <video
                  autoPlay
                  loop
                  muted
                  className="video"
                  onMouseEnter={() => setIsHovered(true)}
                  onMouseLeave={() => setIsHovered(false)}
                >
                  <source src="/videos/Data.webm" type="video/webm" />
                </video>
                <h2 className="uppercase">
                  Analizzare le tendenze per anticipare il futuro
                </h2>
                <p>La creatività è energia</p>
                <div className="button-container">
                  <button className="bg-gray-400/15 backdrop-blur-md text-black px-4 py-2 rounded-lg transition-colors hover:bg-gray-800/15 font-bold">
                    Scopri il nostro mondo{" "}
                    <i className="bi bi-chevron-right"></i>
                  </button>
                </div>
              </div>

              <div className="card bg-blue-100">
                <video
                  autoPlay
                  loop
                  muted
                  className="video"
                  onMouseEnter={() => setIsHovered(true)}
                  onMouseLeave={() => setIsHovered(false)}
                >
                  <source src="/videos/scc.webm" type="video/webm" />
                </video>
                <h2 className="uppercase">
                  Analizzare le tendenze per anticipare il futuro
                </h2>
                <p>La creatività è energia</p>
                <div className="button-container">
                  <button className="bg-gray-400/15 backdrop-blur-md text-black px-4 py-2 rounded-lg transition-colors hover:bg-gray-800/15 font-bold">
                    Scopri il nostro mondo{" "}
                    <i className="bi bi-chevron-right"></i>
                  </button>
                </div>
              </div>
            </div>
          </section>
        </div>
      </ReactLenis>
    </>
  );
}
