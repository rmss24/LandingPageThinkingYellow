"use client"

import React, {useState, useRef, useEffect} from "react"
import Link from "next/link"
import Image from "next/image"
import "./menu.css"

import gsap from "gsap";
import { useGSAP } from "@gsap/react";

const menuLinks = [
    {path:"/", label: "Home"},
    {path:"/showcase", label: "Progetti"},
    {path:"https://www.eppela.com", label: "Eppela"},
]
 
export default function Menu(){
    const container = useRef();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isTransitionOnly, setIsTransitionOnly] = useState(false);
    const [transitionTarget, setTransitionTarget] = useState('');
    const tl = useRef();
    const transitionTl = useRef();

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    }

    // Funzione generica per gestire la transizione solo con animazione gialla
    const handleTransitionClick = (e, target) => {
        e.preventDefault();
        setTransitionTarget(target);
        setIsTransitionOnly(true);
        
        // Naviga alla pagina dopo l'animazione
        setTimeout(() => {
            window.location.href = target === "logo" ? "/" : "/aboutus";
        }, 1250); // Attendi che l'animazione finisca
    }

    // Handler per Chi Siamo
    const handleChiSiamoClick = (e) => {
        handleTransitionClick(e, "aboutus");
    }

    // Handler per Logo
    const handleLogoClick = (e) => {
        handleTransitionClick(e, "logo");
    }

    useGSAP(() => {
        // Timeline per menu completo
        gsap.set(".menu-link-item-holder", {y: 75})

        tl.current = gsap.timeline({paused: true})
        .to(".menu-overlay", {
            duration: 1.25,
            clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
            ease: "power4.inOut"
        })
        .to(".menu-link-item-holder", {
            y: 0,
            duration: 1,
            stagger: 0.1,
            ease: "power4.inOut",
            delay: -0.75
        });

        // Timeline per solo transizione (solo effetto giallo)
        transitionTl.current = gsap.timeline({paused: true})
        .to(".menu-overlay", {
            duration: 1.25,
            clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
            ease: "power4.inOut"
        })
        .to(".menu-overlay", {
            duration: 0, 
            opacity: 0,
            delay: 1.25, 
            onComplete: () => {
                setIsTransitionOnly(false);
                gsap.set(".menu-overlay", {
                    clipPath: "polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)",
                    opacity: 1
                });
            }
        });
        
    }, {scope:container});

    useEffect(() => {
        if(isMenuOpen){
            tl.current.play();
        } else{
            tl.current.reverse();
        }
    }, [isMenuOpen]); 

    useEffect(() => {
        if(isTransitionOnly){
            transitionTl.current.play();
        }
    }, [isTransitionOnly]);

    return(
        <div className="menu-container z-50" ref={container}>
            {/* Top navigation bar - modified layout */}
            <div className="menu-bar flex justify-between items-center">
                <div className="menu-open" onClick={toggleMenu}>
                    <p>Menu</p>
                </div>
                <div className="menu-logo">
                    <Link href="/" onClick={handleLogoClick}>
                        <Image 
                            src="/icons/logo.svg" 
                            alt="Company Logo" 
                            width={120} 
                            height={40} 
                            className={isMenuOpen || isTransitionOnly ? "filter-black" : "filter-white"} 
                        />
                    </Link>
                </div>
                <div className="chi-siamo-link">
                    <Link href="/aboutus" onClick={handleChiSiamoClick}>Chi Siamo</Link>
                </div>
            </div>

            {/* Overlay menu */}
            <div className="menu-overlay">
                <div className={`menu-overlay-content ${isTransitionOnly ? 'invisible' : ''}`}>
                    {/* Top bar in overlay - modified layout */}
                    <div className="menu-overlay-top flex justify-between items-center">
                        <div className="menu-close" onClick={toggleMenu}>
                            <p className="text-white!">Close</p>
                        </div>
                        <div className="menu-logo">
                            <Link href="/" onClick={handleLogoClick}>
                                <Image 
                                    src="/icons/logo.svg" 
                                    alt="Company Logo" 
                                    width={120} 
                                    height={40} 
                                />
                            </Link>
                        </div>
                        <div className="chi-siamo-link">
                            <Link href="/aboutUs" onClick={handleChiSiamoClick}>Chi Siamo</Link>
                        </div>
                    </div>
                    
                    {/* Center content with links */}
                    <div className="menu-center-content">
                        <div className="menu-links">
                            {menuLinks.map((link, index) => (
                                <div className="menu-link-item" key={index}>
                                    <div className="menu-link-item-holder" onClick={toggleMenu}>
                                        <Link href={link.path} className="menu-link">
                                            {link.label}
                                        </Link>
                                    </div>
                                </div>
                            ))}
                        </div>
                        
                        <div className="menu-preview">
                            <p>Vedi i Showreel</p>
                        </div>
                    </div>
                    
                    {/* Bottom section with info */}
                    <div className="menu-overlay-bottom">
                        <div className="menu-info">
                            <div className="menu-info-col">
                                <Link href="https://www.linkedin.com/company/anteprima-adv/">Linkedin &#8599;</Link>
                            </div>
                            <div className="menu-info-col">
                                <p>commerciale@anteprimaadv.com</p>
                                <p>+0583 492768</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}