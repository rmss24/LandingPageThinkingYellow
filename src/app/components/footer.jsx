'use client'
import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import gsap from 'gsap';

export default function Footer() {
  const menuLinks = [
    {path:"/", label: "Home"},
    {path:"/aboutUs", label: "Chi Siamo"},
    {path:"/work", label: "Progetti"},
    {path:"https://www.eppela.com", label: "Eppela"},
  ];
  
  // Modal state and refs
  const [isModalOpen, setIsModalOpen] = useState(false);
  const modalRef = useRef(null);
  
  // Form state
  const [formData, setFormData] = useState({
    nome: '',
    cognome: '',
    telefono: '',
    email: '',
    messaggio: '',
    privacyPolicy: false,
    marketingConsent: false
  });
  
  // Form handling
  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: type === 'checkbox' ? checked : value
    }));
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you would handle the form submission
    console.log('Form submitted:', formData);
    
    // For demo purposes, just close the modal and show an alert
    alert('Grazie per averci contattato! Ti risponderemo al più presto.');
    closeModal();
  };
  
  // Modal functions
  const openModal = () => {
    setIsModalOpen(true);
    
    // Animate modal opening
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
    
    // Prevent body scroll when modal is open
    document.body.style.overflow = 'hidden';
  };
  
  const closeModal = () => {
    if (modalRef.current) {
      gsap.to(modalRef.current, {
        opacity: 0,
        y: 20,
        scale: 0.95,
        duration: 0.3,
        ease: "power2.in",
        onComplete: () => {
          setIsModalOpen(false);
          // Re-enable body scroll when modal is closed
          document.body.style.overflow = 'auto';
        },
      });
    } else {
      setIsModalOpen(false);
      document.body.style.overflow = 'auto';
    }
  };
  
  // Add event listener for ESC key to close modal
  useEffect(() => {
    const handleEscKey = (event) => {
      if (event.key === 'Escape' && isModalOpen) {
        closeModal();
      }
    };
    
    window.addEventListener('keydown', handleEscKey);
    
    return () => {
      window.removeEventListener('keydown', handleEscKey);
      // Make sure to re-enable scrolling when component unmounts
      document.body.style.overflow = 'auto';
    };
  }, [isModalOpen]);
  
  return (
    <footer style={{paddingTop:"1.5rem", paddingBottom:"1.5rem"}} className="bg-[#d1b42f] text-white px-8 rounded-[10px]">
      <div className="container mx-auto pb-8">
        {/* Top section */}
        <div className="flex flex-col md:flex-row justify-between mb-12 mt-8">
          {/* Logo and company name section */}
          <div className="flex flex-col md:flex-row items-start md:items-center mb-6 md:mb-0">
            <div className='my-8 lg:my-0 w-full text-center lg:text-left'>
              <Link href="/" className='max-w-max flex mx-auto lg:max-w-none'>
                <Image 
                  src="/icons/logo.svg" 
                  alt="Company Logo" 
                  width={120} 
                  height={40} 
                  style={{ filter: "brightness(0) invert(1)" }} 
                />
              </Link>
              <p className="text-gray-300">La tua visione, il nostro impegno</p>
            </div>
          </div>
          
          {/* Menu links */}
          <div className='flex place-content-evenly'>
            <nav>
              <ul className="">
                {menuLinks.map((link, index) => (
                  <li key={index} className="mr-6 mb-2">
                    <Link
                      href={link.path}
                      className="hover:text-blue-300 transition duration-300"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
            <div className="hover:text-[#e6ddb5] transition duration-300">
              <Link className="flex" href="https://www.linkedin.com/company/anteprima-adv/">LikedIn &#8599;</Link>
            </div>
          </div>
        </div>
        
        {/* Contact Us Button */}
        <div className="text-center mb-10">
          <button 
            onClick={openModal}
            className="bg-white text-[#d1b42f] hover:bg-gray-200! transition duration-300 font-bold py-2! px-6! rounded-full "
          >
            Contattaci
          </button>
        </div>
        
        {/* Bottom section with copyright and contacts */}
        <div className="mt-20 text-center">
          <p className="mb-2 w-[80%] mx-auto">© 2024 All Rights Reserved – ANTEPRIMA SRL p.iva IT01837640463</p>
          <p className='mt-4 w-[80%] mx-auto'>
            <Link href="mailto:commerciale@anteprimaadv.com" className="hover:text-blue-300">commerciale@anteprimaadv.com</Link> | 
            <span className="mx-2">+39 0583 492768</span> | 
            <Link href="/privacy-policy" className="mx-2 hover:text-blue-300">Privacy Policy</Link> | 
            <Link href="/cookie-policy" className="hover:text-blue-300">Cookie Policy</Link>
          </p>
        </div>
      </div>
      
      {/* Contact Modal */}
      {isModalOpen && (
        <>
          {/* Overlay */}
          <div 
            className="fixed inset-0 backdrop-blur-sm bg-black/50 z-30"
            onClick={closeModal}
          />
          
          {/* Modal Content */}
          <div 
            ref={modalRef}
            className="fixed top-[55%] lg:top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-40 
                      bg-white rounded-lg w-[95%] sm:w-[90%] md:w-[75%] lg:w-[50%] max-h-[90vh]
                      shadow-2xl overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close button */}
            <button
              onClick={closeModal}
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
            <div className="bg-[#d1b42f] text-white/70 py-6! px-8! rounded-t-lg ">
              <h2 className="text-2xl font-bold">Contattaci</h2>
              <p className="mt-2">Compilando il modulo sottostante, il nostro team ti contatterà al più presto.</p>
            </div>
            
            {/* Form */}
            <form onSubmit={handleSubmit} className="p-8!">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="nome" className="block text-gray-700 mb-2">Nome *</label>
                  <input
                    type="text"
                    id="nome"
                    name="nome"
                    value={formData.nome}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4! py-2! border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#d1b42f] text-black!"
                  />
                </div>
                
                <div>
                  <label htmlFor="cognome" className="block text-gray-700 mb-2">Cognome *</label>
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
                  <label htmlFor="telefono" className="block text-gray-700 mb-2">Numero di Telefono *</label>
                  <input
                    type="tel"
                    id="telefono"
                    name="telefono"
                    value={formData.telefono}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4! py-21 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#d1b42f] text-black!"
                  />
                </div>
                
                <div>
                  <label htmlFor="email" className="block text-gray-700 mb-2">Email *</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4! py-21 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#d1b42f] text-black!"
                  />
                </div>
              </div>
              
              <div className="mt-6">
                <label htmlFor="messaggio" className="block text-gray-700 mb-2">Messaggio</label>
                <textarea
                  id="messaggio"
                  name="messaggio"
                  value={formData.messaggio}
                  onChange={handleInputChange}
                  rows="4"
                  className="w-full px-4! py-2! border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#d1b42f] text-black!"
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
                  <label htmlFor="privacyPolicy" className="text-sm text-gray-700">
                    Dichiaro di aver letto e accettato i termini della <Link href="/privacy-policy" className="text-[#d1b42f]! font-bold! hover:underline!">privacy policy</Link> *
                  </label>
                </div>
                
                <div className="flex items-start">
                  <input
                    type="checkbox"
                    id="marketingConsent"
                    name="marketingConsent"
                    checked={formData.marketingConsent}
                    onChange={handleInputChange}
                    className="mt-1 mr-2"
                  />
                  <label htmlFor="marketingConsent" className="text-sm text-gray-700">
                    Acconsento a ricevere comunicazioni tramite SMS e WhatsApp riguardanti promozioni, offerte speciali e aggiornamenti sui servizi. 
                    Queste comunicazioni potrebbero includere messaggi di marketing. Comprendo che posso revocare il consenso in qualsiasi momento.
                  </label>
                </div>
              </div>
              
              <div className="mt-8 text-center">
                <button
                  type="submit"
                  className="bg-[#d1b42f] hover:bg-[#c0a52a] text-white font-bold py-3! px-8! rounded-full transition-colors"
                >
                  Invia
                </button>
              </div>
            </form>
          </div>
        </>
      )}
    </footer>
  );
}