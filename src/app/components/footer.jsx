import React from 'react';
import Link from 'next/link';

export default function Footer() {
  const menuLinks = [
    {path:"/", label: "Home"},
    {path:"/aboutUs", label: "Chi Siamo"},
    {path:"/work", label: "Progetti"},
    {path:"https://www.eppela.com", label: "Eppela"},
    {path: "/contact", label: "Contatti"}
  ];
  
  return (
    <footer style={{paddingTop:"1.5rem", paddingBottom:"1.5rem"}} className="bg-[#d1b42f] text-white px-8 rounded-[10px]">
      <div className="container mx-auto pb-8">
        {/* Top section */}
        <div className="flex flex-col md:flex-row justify-between mb-12 mt-8">
          {/* Logo and company name section */}
          <div className="flex flex-col md:flex-row items-start md:items-center mb-6 md:mb-0">
            <div className="lg:mr-4  mx-auto">
              {/* Placeholder logo */}
              <div className="bg-white w-16 h-16 flex items-center justify-center text-gray-800 font-bold rounded">
                LOGO
              </div>
            </div>
            <div className='my-8 lg:my-0 w-full text-center lg:text-left'>
              <h3 className="text-xl font-bold mb-1">ANTEPRIMA</h3>
              <p className="text-gray-300">La tua visione, il nostro impegno</p>
            </div>
          </div>
          
          {/* Menu links */}
          <div className='flex  place-content-evenly'>
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
                    <a className="flex" href="#">Instagram &#8599;</a>
                    <a className="flex mt-4" href="#">Linkedin &#8599;</a>
                    <a className="flex mt-4" href="#">Dribble &#8599;</a>
                </div>
          </div>
        </div>
        
        {/* Bottom section with copyright and contacts */}
        <div className="mt-40 text-center">
          <p className="mb-2 w-[80%] mx-auto">© 2024 All Rights Reserved – ANTEPRIMA SRL p.iva IT01837640463</p>
          <p className='mt-4 w-[80%] mx-auto'>
            <a href="mailto:commerciale@anteprimaadv.com" className="hover:text-blue-300">commerciale@anteprimaadv.com</a> | 
            <span className="mx-2">+39 0583 492768</span> | 
            <a href="/privacy-policy" className="mx-2 hover:text-blue-300">Privacy Policy</a> | 
            <a href="/cookie-policy" className="hover:text-blue-300">Cookie Policy</a>
          </p>
        </div>
      </div>
    </footer>
  );
}