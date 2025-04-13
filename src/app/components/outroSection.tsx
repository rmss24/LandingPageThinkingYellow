"use client";
import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { useSwipeable } from "react-swipeable";
import gsap from "gsap";
import Link from "next/link";
import "./outroSection.css"; // Import your CSS file for custom styles

// Helper to merge multiple refs
function mergeRefs<T>(
  ...refs: (React.Ref<T> | undefined)[]
): React.RefCallback<T> {
  return (node: T) => {
    refs.forEach((ref) => {
      if (typeof ref === "function") {
        ref(node);
      } else if (ref && typeof ref === "object") {
        (ref as React.MutableRefObject<T | null>).current = node;
      }
    });
  };
}

interface SubItem {
  title: string;
  description: string;
  optionalImg?: string;
  titleList?: string;
  list?: string[];
  optionalButton?: string;
  optionalButtonPath?: string;
}

interface Item {
  title: string;
  description: string;
  image: string;
  titlesubItem?: string;
  subItem?: SubItem[];
  imageSubItem?: string;
  buttonText?: string;
  buttonPath?: string;
  buttonSection?: string;
  buttonPathSection?: string;
  logo?: string;
}

interface IntroItem {
  image: string;
  title: string;
  description?: string;
}

interface OutroSectionProps {
  introItems: IntroItem[];
}

export default function OutroSection({ introItems }: OutroSectionProps) {
  const item: Item[] = [
    {
      title: "La nostra esperienza, al tuo servizio.",
      description:
        "Anteprima ha una lunga storia nel campo della consulenza di marketing e della comunicazione integrata, maturata grazie ai numerosi progetti realizzati con aziende nazionali e internazionali. Ci piace lavorare su progetti di comunicazione tailor-made in grado di costruire l'unicità che ogni prodotto, di ogni nostro cliente, merita. Nel corso degli anni, ai servizi convenzionali dell'advertising abbiamo aggiunto una consulenza cross mediale, che sfrutta al meglio i mezzi più innovativi e tecnologici offerti dal mondo del marketing digitale. Da alcuni anni, lavoriamo in partnership con GOOGLE PREMIER PARTNER che ci affianca in tutte le nostre attività di comunicazione online, dalla definizione della migliore strategia digitale, alla pianificazione media online più adatta al raggiungimento dei vari obiettivi.",
      image: "/images/anteprima.jpg",
      titlesubItem:
        "Diamo Spazio a Razionalità e professionalità ma quello che facciamo è anche passione, impulsività e divertimento:",
      subItem: [
        {
          title: "",
          description:
            "Sviluppiamo identità di marca capaci di coinvolgere il pubblico e di farlo innamorare del brand",
          optionalImg: "",
        },
        {
          title: "",
          optionalImg: "",
          description:
            "Non creiamo solo grafiche accattivanti, loghi originali, campagne pubblicitarie memorabili o siti internet ad alta conversione, ma creiamo strategie di comunicazione fatte di idee, emozioni e risultati.",
        },
        {
          title: "",
          optionalImg: "",
          description:
            "Progettiamo storie ed esperienze on line ed off line trasformando conversazioni e coinvolgimento in risultati di vendita.",
        },
      ],
      imageSubItem: "/images/anteprima.jpg",
      buttonText: "",
      buttonPath: "",
      buttonSection:
        "Al termine del progetto di crowdfunding, curiamo la vendita off-line e online.",
      buttonPathSection: "",
    },
    {
      title: "L'unica piattaforma di crowdfunding dove la persona è al centro.",
      description:
        "In eppela crediamo nelle persone e nelle relazioni umane e per questo ti garantiamo qualcosa che nessuno ha: una squadra di professionisti al tuo servizio, pronti ad assisterti sotto ogni aspetto. In questo modo assicuriamo la più alta percentuale di soddisfazione e riuscita ai nostri progettisti, senza timore di confronti.",
      image: "images/servizi/MOSHED-2022-2-17-13-15-21.jpg",
      imageSubItem: "",
      logo: "/images/servizi/logo.png",
      buttonText: "Hai un progetto da presentarci? Contattaci",
      buttonPath: "https://www.eppela.com",
      titlesubItem:
        "Eppela è la prima piattaforma di crowdfunding italiana, fondata nel 2013. Eppela è un marchio registrato di Anteprima Srl.",
      subItem: [
        {
          title: "",
          optionalImg: "",
          description:
            "Selezioniamo in Italia prodotti innovativi o idee di prodotto innovative e, se necessario, li sviluppiamo insieme agli ideatori per arrivare a un prototipo definitivo;",
        },
        {
          title: "",
          optionalImg: "",
          description:
            "Investiamo risorse umane ed economiche per lanciarlo sul mercato attraverso piattaforme di crowdfunding internazionali come Kickstarter e Indiegogo;",
        },
        {
          title: "",
          optionalImg: "",
          description:
            "Al termine del progetto di crowdfunding, curiamo la vendita off-line e online.",
        },
      ],
      buttonSection:
        "Al termine del progetto di crowdfunding, curiamo la vendita off-line e online.",
      buttonPathSection: "",
    },
    {
      title: "Responsabilità Sociale",
      description:
        "La Responsabilità Sociale d'Impresa (CSR) aumenta il valore percepito di un brand e oggi i consumatori premiano le aziende etiche. Le buone azioni non solo si fanno, ma si raccontano per amplificarne l'impatto. La CSR è un dovere per tutte le aziende, grandi o piccole, ma non tutte sono pronte ad affrontarlo.",
      image: "/images/main-port-010-1.jpg",
      imageSubItem: "",
      buttonText: "",
      buttonPath: "",
      subItem: [
        {
          title: "Attiva una raccolta Fondi",
          optionalImg: "/images/servizi/shutterstock_2047175816-1.jpg",
          description:
            "Anche un progetto di responsabilità sociale in apparenza semplice come una raccolta fondi, può avere un grande impatto sulla reputazione e sul fatturato della tua azienda.",
          titleList: "Affidati alla nostra esperienza:",
          list: [
            "Analizziamo la tua azienda e il tuo settore",
            "Cerchiamo un progetto che abbia rilevanza per la tua azienda e per il contesto in cui opera",
            "Attiviamo la raccolta fondi online sulla nostra piattaforma",
            "Ideiamo la strategia e il concept di comunicazione",
            "Creiamo lo story-telling e comunichiamo online il progetto e il brand",
            "Promuoviamo online la raccolta, per massimizzare i fondi.",
          ],
          optionalButton: "Contattaci",
          optionalButtonPath: "",
        },
        {
          title: "Promuovi l'impegno sociale della tua azienda",
          optionalImg: "/images/servizi/shutterstock_1898519503.jpg",
          description:
            "La tua azienda è già impegnata per una buona causa, ma nessuno lo sa, oppure ti piacerebbe compiere una buona azione aiutando un progetto del tuo territorio, ma non sai come farlo? Siamo qui per darti una mano, in quanto le buone azioni, se comunicate al meglio, fanno bene al cuore ma anche al tuo business.",
          titleList:
            "Se già fai del bene o Se vuoi sostenere una buona causa a cui tieni:",
          list: [
            "Facciamo uno screening della buona causa da te sostenuta e di quello che la tua azienda fa per sostenerla;",
            "Ideiamo la strategia e il concept della comunicazione",
            "Creiamo lo story-telling e comunichiamo online la tua buona azione",
            "analizziamo i tuoi desideri e i tuoi obiettivi",
            "individuiamo la buona causa più giusta per te",
            "capiamo insieme come sostenerla al meglio e gestiamo il tuo coinvolgimento",
            "Ideiamo la strategia e il concept di comunicazione",
            "creiamo lo story-telling e comunichiamo online la tua buona azione",
          ],
          optionalButton: "Contattaci",
          optionalButtonPath: "",
        },
        {
          title: "Social Team Building",
          optionalImg: "/images/servizi/prodotto-3.jpg",
          description:
            "Sai che l'impegno dei tuoi dipendenti in attività socialmente utili può migliorare il loro morale e aumentarne la produttività? Assecondando e incoraggiando queste attività, puoi accrescere il senso di appartenenza dei tuoi dipendenti, migliorare la reputation dell'azienda e incrementare il tuo fatturato.",
          titleList: "Pensiamo a tutto noi:",
          list: [
            "I nostri formatori, organizzeranno uno o più incontri per illustrare l'importanza delle attività di responsabilità sociale a supporto, ad esempio, della propria comunità territoriale di riferimento",
            "Coinvolgiamo i tuoi dipendenti individuando quelli disposti a partecipare",
            "Scegliamo insieme a loro un progetto che tutti insieme possono supportare",
            "La tua azienda donerà ad ognuno delle ore per poter aiutare il progetto",
            "Noi ideiamo la strategia e il concept di comunicazione",
            "Creiamo lo story-telling e comunichiamo online il contributo al progetto da parte della tua azienda",
          ],
          optionalButton: "Contattaci",
          optionalButtonPath: "",
        },
      ],
    },
  ];

  const [activeIndex, setActiveIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const carouselRef = useRef<HTMLDivElement | null>(null);

  // Modal states and refs
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentItemIndex, setCurrentItemIndex] = useState(0);
  const modalRef = useRef<HTMLDivElement | null>(null);
  const [activeSubItemIndex, setActiveSubItemIndex] = useState(0);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => {
      window.removeEventListener("resize", checkMobile);
    };
  }, []);

  useEffect(() => {
    if (isModalOpen) {
      document.body.classList.add("modal-open");
    } else {
      document.body.classList.remove("modal-open");
    }

    return () => {
      document.body.classList.remove("modal-open");
    };
  }, [isModalOpen]);

  const handlers = useSwipeable({
    onSwipedLeft: () => nextSlide(),
    onSwipedRight: () => prevSlide(),
    trackMouse: false,
  });
  const { ref: swipeRef, ...swipeHandlers } = handlers;

  const nextSlide = () => {
    setActiveIndex((prevIndex) =>
      prevIndex === introItems.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevSlide = () => {
    setActiveIndex((prevIndex) =>
      prevIndex === 0 ? introItems.length - 1 : prevIndex - 1
    );
  };

  // Modal functions
  const openModal = (index: number) => {
    setCurrentItemIndex(index);
    setActiveSubItemIndex(0); // Reset to first subItem when opening modal
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
  };

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

  const nextSubItem = () => {
    if (item[currentItemIndex].subItem) {
      setActiveSubItemIndex((prev) =>
        prev === item[currentItemIndex].subItem!.length - 1 ? 0 : prev + 1
      );
    }
  };

  const prevSubItem = () => {
    if (item[currentItemIndex].subItem) {
      setActiveSubItemIndex((prev) =>
        prev === 0 ? item[currentItemIndex].subItem!.length - 1 : prev - 1
      );
    }
  };

  return (
    <section className="outro min-h-screen flex flex-col justify-center p-4! sm:p-8!">
      <div className="mx-2!  my-10! ">
        <p className="text-4xl! sm:text-6xl! text-center! w-full text-black! mb-6! sm:mb-0!">
          Scopri le nostre 3 anime
        </p>
      </div>

      {isMobile && (
        <div
          className="relative overflow-hidden mx-2! h-[75vh]"
          ref={mergeRefs(carouselRef, swipeRef)}
          {...swipeHandlers}
        >
          {/* Container with hidden overflow and full width/height */}
          <div
            className="flex transition-transform duration-300 ease-in-out h-full w-full"
            style={{ transform: `translateX(-${activeIndex * 100}%)` }}
          >
            {introItems.map((introItem, index) => (
              <div
                key={index}
                className="min-w-full w-full h-full flex-shrink-0 flex-grow-0"
                style={{ overflow: "hidden" }}
              >
                <div className="relative h-full w-full">
                  <div className="bg-black/15 absolute z-10 inset-0" />
                  <Image
                    className="w-full h-full object-cover"
                    width={500}
                    height={500}
                    src={introItem.image}
                    alt={introItem.title}
                  />
                  <div className="absolute z-10 inset-0 flex flex-col items-center justify-center">
                    <p className="text-2xl! font-bold text-white text-center! px-4! text-outro">
                      {introItem.title}
                    </p>
                    <button
                      className="bg-gray-400/15 backdrop-blur-md text-white mt-8 px-6! py-3! rounded-lg transition-colors hover:bg-gray-800/15 font-bold lg:w-3/4 max-w-xs w-1/2"
                      onClick={() => openModal(index)}
                    >
                      Esplora
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="absolute bottom-8! left-0! right-0 flex justify-center gap-2! z-10">
            {introItems.map((_, index) => (
              <button
                key={index}
                onClick={() => setActiveIndex(index)}
                className={`w-3 h-3 rounded-full transition-colors ${
                  index === activeIndex ? "bg-white" : "bg-white/50"
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
          <button
            onClick={prevSlide}
            className="absolute left-4 top-1/2! -translate-y-1/2 bg-black/30 backdrop-blur-sm text-white w-10 h-10 rounded-full flex items-center justify-center z-10"
            aria-label="Previous slide"
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M15 18l-6-6 6-6" />
            </svg>
          </button>
          <button
            onClick={nextSlide}
            className="absolute right-4 top-1/2! -translate-y-1/2 bg-black/30 backdrop-blur-sm text-white w-10 h-10 rounded-full flex items-center justify-center z-10"
            aria-label="Next slide"
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M9 18l6-6-6-6" />
            </svg>
          </button>
        </div>
      )}

      {!isMobile && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6! mx-2! sm:mx-8! mt-4! mb-10! sm:mb-20!">
          {introItems.map((introItem, index) => (
            <div
              key={index}
              className="group relative h-[50rem] cursor-pointer"
            >
              <div className="bg-black/15 absolute z-10 w-full h-full transition duration-300 group-hover:backdrop-blur-md" />
              <Image
                className="w-full h-full object-cover"
                width={500}
                height={500}
                src={introItem.image}
                alt={introItem.title}
              />
              <div className="absolute z-10 inset-0 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <p className="text-3xl1 font-bold text-white text-center! px-4! text-outro">
                  {introItem.title}
                </p>
                <button
                  className="bg-gray-400/15 backdrop-blur-md text-white mt-8 px-6! py-3! rounded-lg transition-colors hover:bg-gray-800/15 font-bold w-3/4 max-w-xs"
                  onClick={() => openModal(index)}
                >
                  Esplora
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Enhanced Modal with item content */}
      {isModalOpen && (
        <>
          {/* Overlay to close modal when clicking outside */}
          <div
            className="fixed inset-0 backdrop-blur-sm bg-black/50 z-30"
            onClick={closeModal}
          />

          {/* Modal content */}
          <div
            ref={modalRef}
            className="fixed lg:top-[50%] top-[55%] left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-40 
                      bg-black/80 backdrop-blur-md rounded-lg sm:rounded-xl
                      w-[95%] sm:w-[90%] md:w-[85%] lg:w-[80%] 
                      shadow-2xl "
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close button */}
            <button
              onClick={closeModal}
              className="absolute top-4 right-4 bg-white/20 hover:bg-white/30 
                        w-8 h-8 rounded-full flex items-center justify-center 
                        transition-colors z-50!"
              aria-label="Close modal"
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="white"
                strokeWidth="2"
                className="transform scale-75"
              >
                <path d="M18 6L6 18M6 6l12 12" />
              </svg>
            </button>

            <div className="modal-scrollbar p-4! sm:p-6! md:p-8!">
              <div className="text-white">
                {/* Main Title */}
                <h2 className="text-xl! sm:text-2xl! md:text-3xl1 font-bold1 mb-4! sm:mb-6!">
                  {item[currentItemIndex].title}
                </h2>

                {/* Main description and image */}
                <div className="flex flex-col lg:flex-row gap-6! mb-6!">
                  <div
                    className={`${
                      item[currentItemIndex].imageSubItem
                        ? "lg:w-1/2 my-auto!"
                        : "w-full"
                    }`}
                  >
                    <p className="text-sm! sm:text-base! md:text-lg! mb-4 normal-case!">
                      {item[currentItemIndex].description}
                    </p>
                  </div>

                  {item[currentItemIndex].imageSubItem && (
                    <div className="lg:w-1/2 flex justify-center items-center">
                      <div className="relative w-full h-48 sm:h-64 md:h-80 overflow-hidden rounded-lg">
                        <Image
                          src={item[currentItemIndex].imageSubItem}
                          alt="Image"
                          fill
                          className="object-contain"
                        />
                      </div>
                    </div>
                  )}
                </div>

                {/* Logo if available */}
                {item[currentItemIndex].logo && (
                  <div className="flex justify-center mb-4">
                    <Image
                      src={item[currentItemIndex].logo}
                      alt="Logo"
                      width={300}
                      height={300}
                      className="object-contain"
                    />
                  </div>
                )}

                {/* Optional button if available */}
                {/* TitleSubItem if it exists */}
                {item[currentItemIndex].titlesubItem && (
                  <h3 className="text-lg! sm:text-xl! font-semibold! mb-4 mt-2 text-center">
                    {item[currentItemIndex].titlesubItem}
                  </h3>
                )}

                {/* SubItems if they exist */}
                {item[currentItemIndex].subItem &&
                  item[currentItemIndex].subItem.length > 0 && (
                    <div className="mt-6">
                      {/* Navigation for subItems when multiple exist */}
                      {item[currentItemIndex].subItem.length > 1 && (
                        <div className="flex justify-between items-center mb-4">
                          <button
                            onClick={prevSubItem}
                            className="bg-white/20 hover:bg-white/30 text-white px-3! py-2! rounded-full"
                          >
                            <svg
                              width="20"
                              height="20"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                            >
                              <path d="M15 18l-6-6 6-6" />
                            </svg>
                          </button>

                          <div className="flex gap-2!">
                            {item[currentItemIndex].subItem.map((_, idx) => (
                              <button
                                key={idx}
                                onClick={() => setActiveSubItemIndex(idx)}
                                className={`w-3 h-3 rounded-full ${
                                  idx === activeSubItemIndex
                                    ? "bg-white"
                                    : "bg-white/40"
                                }`}
                                aria-label={`Item ${idx + 1}`}
                              />
                            ))}
                          </div>

                          <button
                            onClick={nextSubItem}
                            className="bg-white/20 hover:bg-white/30 text-white px-3! py-2! rounded-full"
                          >
                            <svg
                              width="20"
                              height="20"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                            >
                              <path d="M9 18l6-6-6-6" />
                            </svg>
                          </button>
                        </div>
                      )}

                      {/* Display current subItem */}
                      {item[currentItemIndex].subItem[activeSubItemIndex] && (
                        <div className="bg-white/10 p-4! sm:p-6! rounded-lg">
                          {/* SubItem title if available */}
                          {item[currentItemIndex].subItem[activeSubItemIndex]
                            .title && (
                            <h4 className="text-lg! font-semibold! mb-3!">
                              {
                                item[currentItemIndex].subItem[
                                  activeSubItemIndex
                                ].title
                              }
                            </h4>
                          )}

                          {/* Layout with alternating image position */}
                          <div
                            className={`flex flex-col ${
                              activeSubItemIndex % 2 === 0
                                ? "lg:flex-row"
                                : "lg:flex-row-reverse"
                            } gap-4`}
                          >
                            {/* Text content */}
                            <div
                              className={`${
                                item[currentItemIndex].subItem[
                                  activeSubItemIndex
                                ].optionalImg
                                  ? "lg:w-1/2 my-auto!"
                                  : "w-full"
                              }`}
                            >
                              <p className="text-sm! sm:text-base! text-center! normal-case!">
                                {
                                  item[currentItemIndex].subItem[
                                    activeSubItemIndex
                                  ].description
                                }
                              </p>

                              {/* TitleList if available */}
                              {item[currentItemIndex].subItem[
                                activeSubItemIndex
                              ].titleList && (
                                <h5 className="font-medium mt-4! mb-2! ">
                                  {
                                    item[currentItemIndex].subItem[
                                      activeSubItemIndex
                                    ].titleList
                                  }
                                </h5>
                              )}

                              {/* List if available */}
                              {item[currentItemIndex].subItem[
                                activeSubItemIndex
                              ].list &&
                                item[currentItemIndex].subItem[
                                  activeSubItemIndex
                                ].list!.length > 0 && (
                                  <ul className="list-disc pl-5! space-y-1! mb-4!">
                                    {item[currentItemIndex].subItem[
                                      activeSubItemIndex
                                    ].list!.map((listItem, idx) => (
                                      <li key={idx} className="text-sm!">
                                        {listItem}
                                      </li>
                                    ))}
                                  </ul>
                                )}

                              {/* Optional button if available */}
                              {item[currentItemIndex].subItem[
                                activeSubItemIndex
                              ].optionalButton && (
                                <button className="bg-white/20 hover:bg-white/30 text-white px-4! py-2! rounded-lg mt-2">
                                  {
                                    item[currentItemIndex].subItem[
                                      activeSubItemIndex
                                    ].optionalButton
                                  }
                                </button>
                              )}
                            </div>

                            {/* Optional image if available */}
                            {item[currentItemIndex].subItem[activeSubItemIndex]
                              .optionalImg && (
                              <div className="lg:w-1/2 my-auto!">
                                <div className="relative w-full h-48 sm:h-64 overflow-hidden rounded-lg">
                                  <Image
                                    src={
                                      item[currentItemIndex].subItem[
                                        activeSubItemIndex
                                      ].optionalImg!
                                    }
                                    alt="SubItem Image"
                                    fill
                                    className="object-cover"
                                  />
                                </div>
                              </div>
                            )}
                          </div>
                        </div>
                      )}
                    </div>
                  )}

                {/* ButtonSection if available */}
                {item[currentItemIndex].buttonSection && (
                  <div className="mt-6 text-center">
                    <p className="mb-3">
                      {item[currentItemIndex].buttonSection}
                    </p>
                    {item[currentItemIndex].buttonPathSection && (
                      <Link
                        href={item[currentItemIndex].buttonPathSection}
                        className="inline-block bg-white/20 hover:bg-white/30 rounded-full transition-colors px-4! py-2! text-sm sm:text-base"
                      >
                        Scopri di più
                      </Link>
                    )}
                  </div>
                )}

                {/* Main button if available */}
                {item[currentItemIndex].buttonText && (
                  <div className="mt-6 flex justify-center">
                    {item[currentItemIndex].buttonPath ? (
                      <Link
                        href={item[currentItemIndex].buttonPath}
                        className="inline-block bg-white/20 hover:bg-white/30 rounded-full transition-colors px-4! py-2! text-sm sm:text-base"
                      >
                        {item[currentItemIndex].buttonText}
                      </Link>
                    ) : (
                      <button className="bg-white/20 hover:bg-white/30 rounded-full transition-colors px-4! py-2! text-sm sm:text-base">
                        {item[currentItemIndex].buttonText}
                      </button>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        </>
      )}
    </section>
  );
}
