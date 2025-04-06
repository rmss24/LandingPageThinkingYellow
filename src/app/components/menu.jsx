"use client"

import React, {useState, useRef, useEffect} from "react"
import Link from "next/link"
import Image from "next/image" // Added for better image handling
import "./menu.css"

import gsap from "gsap";
import { useGSAP } from "@gsap/react";

const menuLinks = [
    {path:"/", label: "Home"},
    {path:"/showcase", label: "Progetti"},
    {path:"https://www.eppela.com", label: "Eppela"}, // Fixed URL format
    {path: "/contact", label: "Contatti"}
]
 
export default function Menu(){
    const container = useRef();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const tl = useRef();

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    }

    useGSAP(() => {
        // Make sure to target the correct elements
        gsap.set(".menu-link-item-holder", {y: 75})

        tl.current = gsap.timeline({paused:true})
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
        })
    }, {scope:container});

    useEffect(() => {
        if(isMenuOpen){
            tl.current.play()
        } else{
            tl.current.reverse();
        }
    }, [isMenuOpen]); 

    return(
        <div className="menu-container z-50" ref={container}>
            {/* Top navigation bar - modified layout */}
            <div className="menu-bar flex justify-between items-center">
                <div className="menu-open" onClick={toggleMenu}>
                    <p>Menu</p>
                </div>
                <div className="menu-logo">
                    <Link href={"/"}>
                        <Image 
                            src="/icons/logo.svg" 
                            alt="Company Logo" 
                            width={120} 
                            height={40} 
                            className={isMenuOpen ? "filter-black w-12" : "filter-white w-12"} 
                        />
                    </Link>
                </div>
                <div className="chi-siamo-link">
                    <Link href="/aboutUs">Chi Siamo</Link>
                </div>
            </div>

            {/* Overlay menu */}
            <div className="menu-overlay">
                <div className="menu-overlay-content">
                    {/* Top bar in overlay - modified layout */}
                    <div className="menu-overlay-top flex justify-between items-center">
                        <div className="menu-close" onClick={toggleMenu}>
                            <p>Close</p>
                        </div>
                        <div className="menu-logo">
                            <Link href={"/"}>
                                <Image 
                                    src="/icons/logo.svg" 
                                    alt="Company Logo" 
                                    width={120} 
                                    height={40} 
                                    className="filter-black w-12" 
                                />
                            </Link>
                        </div>
                        <div className="chi-siamo-link">
                            <Link href="/aboutUs">Chi Siamo</Link>
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
                                <a href="#">Instagram &#8599;</a>
                                <a href="#">Linkedin &#8599;</a>
                                <a href="#">Behance &#8599;</a>
                                <a href="#">Dribble &#8599;</a>
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