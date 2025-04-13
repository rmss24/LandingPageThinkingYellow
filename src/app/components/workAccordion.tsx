"use client";
import React, { useState } from "react";
import CustomCursor from "@/app/components/cursorImage";

// Define the AccordionItem interface for TypeScript
interface AccordionItem {
  title: string;
  text: string;
  image: string;
}

export default function WorkAccordion() {
  const [openItem, setOpenItem] = useState<number | null>(null);
  const [hoveredItem, setHoveredItem] = useState<number | null>(null);
  const [cursorHovered, setCursorHovered] = useState(false);

  // Enhanced items array with images for cursor
  const items: AccordionItem[] = [
    {
      title: "MARKET ANALISYS",
      text: "L'analisi è il punto di partenza di ogni nostro lavoro. Si parte dall'arena competitiva, per arrivare alla communication analisys del posizionamento di tutti gli attori coinvolti, al fine di individuare la posizione di mercato più adatta a profittevole.",
      image: "/images/galleryImage/CGIL/Calciatore.jpg",
    },
    {
      title: "BRAND IDENTITY",
      text: "Nessun marchio senza un nome e un logo può essere definito brand. Si comincia dallo studio del naming, facile, evocativo, memorabile e si crea un logotipo dal segno originale, simbolico e distintivo.",
      image: "/images/galleryImage/Hortus/Hortus-3.jpg",
    },
    {
      title: "POSITIONING",
      text: "Ogni brand o prodotto, ha bisogno di essere percepito sul mercato in modo unico. Individuiamo il concept di comunicazione più adatto per raggiungere il successo sul mercato.",
      image: "/images/galleryImage/NastroAzzurro/nastro.jpg",
    },
    {
      title: "CONSULENZA MARKETING",
      text: "Pianifichiamo e sviluppiamo ogni progetto fornendo una consulenza completa di marketing per aggredire il mercato nel modo più giusto e aumentare le vendite.",
      image: "/images/galleryImage/Coop/coop-4.jpg",
    },
    {
      title: "WEB DESIGN",
      text: "Progettiamo siti internet d'impatto, facili da usare e piacevoli da navigare. Usiamo le migliori tecnologie di analisi del traffico, per massimizzarne la conversione.",
      image: "/images/screenshotweb.png",
    },
    {
      title: "STORYTELLING",
      text: "Raccontiamo storie in grado di raccontare emozioni in modo non convenzionale e di tenere incollati i consumatori al brand.",
      image: "images/galleryImage/CrowFounding/msd-1.jpg",
    },
    {
      title: "DIGITAL STRATEGY",
      text: "La presenza online, oggi non è più opzionale. Tutte le aziende hanno bisogno di presidiare il web, ognuna in modo diverso in base alle proprie necessità. Creatività ed ingegno contraddistinguono le nostre strategie così come la loro semplicità di esecuzione.",
      image: "/images/galleryImage/rock100/rockin.jpg",
    },
    {
      title: "DIGITAL MEDIA PLANNING",
      text: "Pianificare campagne pubblicitarie online è una scienza matematica che si basa sull'analisi e l'ottimizzazione dei dati di performance. Insieme ai nostri partner, allochiamo nel modo più efficiente il budget che ci viene assegnato dai nostri clienti cercando di trasformare ogni euro investito in fatturato.",
      image:
        "/images/galleryImage/Vodafone/ac723d35-6071-4b4a-a783-38c3b8b2493f_large.jpeg",
    },
  ];

  const toggleItem = (index: number) => {
    setOpenItem(openItem === index ? null : index);
  };

  return (
    <div className="bg-black">
      <div className="mx-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-10">
          <div className="col-span-1 lg:col-span-2 non-magnetic">
            {items.map((item, index) => (
              <div
                key={index}
                className="border-t border-gray-700 last:border-b non-magnetic"
              >
                <div
                  className="accordion-header py-6 flex justify-between items-center cursor-pointer non-magnetic"
                  onClick={() => toggleItem(index)}
                  onMouseEnter={() => {
                    setHoveredItem(index);
                    setCursorHovered(true);
                  }}
                  onMouseLeave={() => {
                    setHoveredItem(null);
                    setCursorHovered(false);
                  }}
                >
                  <p className="text-2xl! py-2! font-bold! non-magnetic z-20!">
                    {item.title}
                  </p>
                  <div className="text-2xl! non-magnetic">
                    {openItem === index ? "−" : "+"}
                  </div>
                </div>
                <div
                  className="overflow-hidden transition-all duration-300 ease-in-out"
                  style={{
                    maxHeight: openItem === index ? "400px" : "0",
                    opacity: openItem === index ? 1 : 0,
                    transition: "max-height 0.5s ease, opacity 0.5s ease",
                  }}
                >
                  <p className="normal-case! text-lg! leading-6 pb-2!">
                    {item.text}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Custom cursor with image based on hovered item */}
      <CustomCursor
        hoveredImage={hoveredItem !== null ? items[hoveredItem].image : null}
        isHovered={cursorHovered}
      />
    </div>
  );
}
