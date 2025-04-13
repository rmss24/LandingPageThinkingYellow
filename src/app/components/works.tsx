"use client";
import { useRef, useState, useEffect } from "react";
import gsap from "gsap";
import "bootstrap-icons/font/bootstrap-icons.css";
import Brands from "../sections/brands";
import Image from "next/image";

// Define the VideoInfo interface to match your data structure
interface NumberSection {
  number: string;
  text: string;
}

interface GalleryItem {
  src: string;
  alt: string;
  srcVideo?: string;
}

interface VideoInfo {
  numberSection?: NumberSection[];
  title: string;
  progetto?: string;
  media?: string;
  content?: string;
  linkPath?: string;
  linkText?: string;
  gallery?: GalleryItem[];
  logoImage?: string;
  logoAlt?: string;
  defaultColor?: string;
  leftGallery?: GalleryItem[];
  subTitle?: string;
  titleProject?: string;
  subGallery?: GalleryItem[];
  youtubeIds?: string[]; // Added to support multiple YouTube videos
}

export default function Work() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedWorkIndex, setSelectedWorkIndex] = useState<number | null>(
    null
  );
  const [currentGalleryIndex, setCurrentGalleryIndex] = useState(0);
  const [currentLeftGalleryIndex, setCurrentLeftGalleryIndex] = useState(0);
  const [currentYoutubeIndex, setCurrentYoutubeIndex] = useState(0); // For YouTube videos
  const modalRef = useRef<HTMLDivElement>(null);

  // Your videos data array

  const [videos] = useState<VideoInfo[]>([
    {
      numberSection: [
        { number: "", text: "" },
        { number: "", text: "" },
        { number: "", text: "" },
      ],
      title: "DA GRANDE VOGLIO FARE…",
      progetto: "Campagna di raccolta nuovi iscritti.",
      media: "TV – Radio – Outdoor – Web Adv",
      content:
        "Andare in pensione, non significa entrare in una fase della propria vita noiosa, senza obiettivi e deprimente. Tutt'altro. Significa partire per nuove avventure, all'inseguimento dei propri sogni. Questi ragionamenti sono alla base della nuova campagna tesseramento 2022 di SPI Cgil Lombardia. La signora che ambisce a fare la rockstar, l'esploratrice in partenza per emozionanti avventure, il pilota pronto a decollare, il calciatore che non vede l'ora di entrare in campo. Sono i 4 protagonisti della campagna, che ri-disegnano i canoni del pensionato tradizionale, rappresentandolo in un nuovo modo, più vicino al mondo di oggi: pieno di vita, passioni, progettualità e sogni da realizzare. SPI CGIL che lo protegge, lo consiglia e lo aiuta nella sua vita quotidiana permettendogli di vivere la propria pensione al meglio e tutelando i suoi diritti. RIACCENDI I TUOI SOGNI. PER I TUOI DIRITTI CI SIAMO NOI.",
      linkText: "Learn More",
      gallery: [
        {
          srcVideo: "BtV7AJFpMW8",
          src: "/images/galleryImage/CGIL/Calciatore.jpg",
          alt: "Campaign Video",
        },
      ],
      logoImage: "/images/galleryImage/CGIL/Logo_Spi_Cgil.jpg",
      logoAlt: "Logo",
      defaultColor: "rgba(220, 100, 100, 0.6)",
      leftGallery: [
        {
          src: "/images/galleryImage/CGIL/SPI-advCalciatore-scaled.jpg",
          alt: "Image 1",
        },
        {
          src: "/images/galleryImage/CGIL/SPI-advLesploratrice-scaled.jpg",
          alt: "Image 2",
        },
        {
          src: "/images/galleryImage/CGIL/SPI-advPilota-scaled.jpg",
          alt: "Image 3",
        },
        {
          src: "/images/galleryImage/CGIL/SPI-advRockstar-scaled.jpg",
          alt: "Image 4",
        },
      ],
      subTitle: "",
      subGallery: [
        {
          src: "https://youtu.be/G6j0hbTKQms?si=MerHbDjNATIBGJjU",
          alt: "Da grande voglio fare l'esploratrice - CAMPAGNA TESSERAMENTO",
        },
        {
          src: "https://youtu.be/u4xrrl1Hfgw?si=bnWTnkdoCE4WkwMY",
          alt: "Da grande voglio fare l'aviatore - CAMPAGNA TESSERAMENTO",
        },
        {
          src: "https://youtu.be/LPnfCgnUAkU?si=wiGCsb7SsNUl414F",
          alt: "Da grande voglio fare la rockstar - CAMPAGNA TESSERAMENTO",
        },
      ],
      youtubeIds: ["BtV7AJFpMW8"], // YouTube video IDs
    },

    {
      numberSection: [
        { number: "787k", text: "Totale raccolto" },
        { number: "3.2k", text: "Sostenitori" },
        { number: "44", text: "Progetti Finanziati" },
      ],
      title: "Nastro Azurro",
      progetto: "",
      media: "",
      linkPath: "https://www.eppela.com/mentor/12/nastro-azzurro-crowd",
      content:
        "Un'iniziativa nata a sostegno della creatività e dell'innovazione, aperta a tutti i giovani talenti italiani: musicisti, fotografi, designer, bartender, chef e imprenditori.  Al raggiungimento del 50% dell'obiettivo, Nastro Azzurro ha contribuito al progetto con un co-finanziamento pari al restante 50%. Tanti progetti hanno potuto in questo modo validare le potenzialità della propria idea e testare il suo successo sul mercato, attraverso il crowdfunding. A seguito della pandemia nasce il progetto #UNABIRRAPERDOMANI, con il quale Nastro Azzurro sceglie di essere vicina a tutti coloro che fino al periodo pre-covid, servendo una birra, sono stati protagonisti dei momenti di piacere e socialità. Nastro Azzurro contribuisce al progetto raddoppiando quanto raccolto dai sostenitori.",
      linkText: "Scopri",
      gallery: [
        {
          src: "/images/galleryImage/NastroAzzurro/nastro.jpg",
          alt: "Nastro Azzurro Video",
        },
      ],
      logoImage: "/images/galleryImage/CGIL/Logo_Spi_Cgil.jpg",
      logoAlt: "Logo",
      defaultColor: "rgba(220, 100, 100, 0.6)",
      leftGallery: [
        {
          src: "/images/galleryImage/NastroAzzurro/mentoring_eppela_mockup.jpg",
          alt: "Image 1",
        },
        {
          src: "/images/galleryImage/NastroAzzurro/nastro-unaborra.jpg",
          alt: "Image 2",
        },
      ],
      subTitle: "Ne hanno parlato su:",
      subGallery: [
        {
          src: "/images/logosAboutUs/corriere-150x150.jpg",
          alt: "Logo Corriere",
        },
        {
          src: "/images/logosAboutUs/deejay-150x150.jpg",
          alt: "Logo Radio Deejay",
        },
        {
          src: "/images/logosAboutUs/repubblica-150x150.jpg",
          alt: "Logo Repubblica",
        },
        {
          src: "/images/logosAboutUs/rolling-stone-150x150.jpg",
          alt: "Logo Rolling Stone",
        },
        {
          src: "/images/logosAboutUs/virgin-radio-150x150.jpg",
          alt: "Logo Virgin Radio",
        },
        { src: "/images/logosAboutUs/wired-150x150.jpg", alt: "Logo wired" },
      ],
      youtubeIds: ["6XEn1AXYFD8"],
    },
    {
      numberSection: [
        { number: "1.7mln", text: "Totale raccolto" },
        { number: "5000k", text: "Sostenitori" },
        { number: "92", text: "Progetti Finanziati" },
      ],
      title: "Fondazione Vodafone - Ogni Sport Oltre",
      progetto: "",
      media: "",
      linkPath: "https://www.eppela.com/mentor/71/fondazione-vodafone",
      content:
        "Nata nel 2017, OSO è la prima piattaforma digitale pensata per avvicinare allo sport le persone con disabilità e, attraverso il crowdfunding, ha permesso a tante persone di cambiare radicalmente la propria vita e realizzare i propri sogni sportivi. OSO – Ogni Sport Oltre ha saputo raccontare tante storie emozionanti: progetti realizzati con passione per promuovere l'inclusione delle persone con disabilità attraverso lo sport, associazioni che ce l'hanno messa tutta per raggiungere il traguardo e le peripezie di centinaia di persone con disabilità che grazie allo sport hanno saputo riscattarsi. Fondazione Vodafone Italia ha appoggiato fortemente queste storie, co-finanziando i progetti aggiungendo, al raggiungimento del 50% dell'obiettivo, il restante 50%.",
      linkText: "Scopri",
      gallery: [
        {
          src: "/images/galleryImage/Vodafone/ac723d35-6071-4b4a-a783-38c3b8b2493f_large.jpeg",
          alt: "Vodafone Foundation Image",
        },
      ],
      logoImage: "/images/galleryImage/Vodafone/oso-1024x174.jpg",
      logoAlt: "Logo",
      defaultColor: "rgba(220, 100, 100, 0.6)",
      leftGallery: [],
      subTitle: "Ne hanno parlato su:",
      subGallery: [
        {
          src: "/images/logosAboutUs/corriere-150x150.jpg",
          alt: "Logo Corriere",
        },
        {
          src: "/images/logosAboutUs/deejay-150x150.jpg",
          alt: "Logo Radio Deejay",
        },
        {
          src: "/images/logosAboutUs/repubblica-150x150.jpg",
          alt: "Logo Repubblica",
        },
        { src: "/images/logosAboutUs/Rai-150x150.jpg", alt: "Logo Rai" },
        {
          src: "/images/logosAboutUs/skytg24-150x150.jpg",
          alt: "Logo SkyTg",
        },
      ],
    },
    {
      numberSection: [
        { number: "502k", text: "Totale raccolto" },
        { number: "4000k", text: "Sostenitori" },
        { number: "57", text: "Progetti Finanziati" },
      ],
      title: "MSD Crowdcaring",
      progetto: "",
      media: "",
      linkPath: "https://www.eppela.com/mentor/25/msd-crowdcaring",
      titleProject: "Inventiamo insieme per la vita.",
      content:
        "L'iniziativa punta ad aiutare le persone nella vita di tutti i giorni senza che la disabilità, la malattia, il colore della pelle, l'età o alcuna forma di diversità o di condizione possano per loro costituire un limite. MSD rowdCaring quindi, promuove tutti quei progetti che abbiano il fine di favorire, a beneficio della collettività, la rimozione delle barriere sociali e personali, promuovere la cultura dell'attenzione al prossimo e dell'inclusione, per renderci gli uni più vicini agli altri. Al raggiungimento del 50% dell'obiettivo, MSD Italia contribuisce al progetto con un co-finanziamento pari al restante 50%.",
      linkText: "Scopri",
      gallery: [
        {
          src: "/images/galleryImage/CrowFounding/msd-1.jpg",
          alt: "MSD Crowdcaring Image",
        },
      ],
      logoImage: "/images/galleryImage/CrowFounding/logo.jpg",
      logoAlt: "Logo",
      defaultColor: "rgba(220, 100, 100, 0.6)",
      leftGallery: [],
      subTitle: "Ne hanno parlato su:",
      subGallery: [
        {
          src: "/images/logosAboutUs/corriere-150x150.jpg",
          alt: "Logo Corriere",
        },
        {
          src: "/images/logosAboutUs/radio105-150x150.jpg",
          alt: "Logo Radio 105",
        },
        {
          src: "/images/logosAboutUs/repubblica-150x150.jpg",
          alt: "Logo Repubblica",
        },
        { src: "/images/logosAboutUs/Rai-150x150.jpg", alt: "Logo Rai" },
        { src: "images/logosAboutUs/le-iene-150x150.jpg", alt: "Logo Le Iene" },
      ],
      youtubeIds: ["frz6JmtgxPw"],
    },
    {
      numberSection: [
        { number: "", text: "" },
        { number: "", text: "" },
        { number: "", text: "" },
      ],
      title: "IL CAAF CGIL TI AIUTA PER...",
      progetto: "Campagna promozionale servizi fiscali",
      media: "TV – POP – Web Adv",
      content:
        "Il CAAF CGIL fornisce tutta una serie di servizi: 730, locazioni, successioni, colf e badanti, partita iva, etc. Tanti altri competitor ti offrono gli stessi servizi, ma non con la stessa professionalità, accuratezza e cortesia. Abbiamo deciso di trattare l’argomento in modo unconventional e sicuramente divertente. Lo abbiamo fatto con un testimonial irriverente come Paolo Hendel. Il suo modo esilarante di affrontare l’argomento ha generato awareness ed estremo coinvolgimento per il brand. NON SBAGLIARE, VAI AL CAAF CGIL TOSCANA",
      linkText: "Learn More",
      gallery: [
        {
          src: "/images/galleryImage/CGIL/caff.jpg",
          alt: "Campaign Video",
        },
      ],
      logoImage: "/images/galleryImage/CGIL/Logo_Spi_Cgil.jpg",
      logoAlt: "Logo",
      defaultColor: "rgba(220, 100, 100, 0.6)",
      leftGallery: [],
      subTitle: "",
      subGallery: [],
    },
    {
      numberSection: [
        { number: "1.6 Milioni", text: "Totale raccolto" },
        { number: "125k", text: "Sostenitori" },
      ],
      title: "Coop for Africa",
      progetto: "",
      media: "",
      linkPath: "https://www.eppela.com/projects/6950",
      titleProject:
        "Per sostenere la campagna vaccinale anti Covid-19 in Africa",
      content:
        "“Per qualcuno essere NoVax non è una scelta” è stato lo slogan di questa importante campagna di crowdfunding promossa da Coop Italia in collaborazione con tre realtà umanitarie fortemente impegnate sul versante della solidarietà internazionale come l’Agenzia ONU per i Rifugiati-UNHCR, la Comunità di Sant’Egidio e Medici Senza Frontiere. Grazie alla partecipazione di 125.530 donatori, sono stati raccolti più di 1 milione e 650.000 euro. Con CoopForAfrica, 330.000 persone in Africa potranno essere vaccinate. Un enorme successo!",
      linkText: "Scopri",
      gallery: [
        {
          src: "/images/galleryImage/Coop/coop-4.jpg",
          alt: "MSD Crowdcaring Image",
        },
      ],
      logoImage: "/images/galleryImage/Coop/Coop_italia_logo.svg.png",
      logoAlt: "Logo",
      defaultColor: "rgba(220, 100, 100, 0.6)",
      leftGallery: [
        {
          src: "/images/galleryImage/Coop/99bfde6df123728d3ecb2b0fd1c671e74a555a6453179342.jpeg",
          alt: "Image 1",
        },
      ],
      subTitle: "Ne hanno parlato su:",
      subGallery: [
        {
          src: "/images/logosAboutUs/corriere-150x150.jpg",
          alt: "Logo Corriere",
        },
        {
          src: "/images/logosAboutUs/mediaset-150x150.jpg",
          alt: "Logo Mediaset",
        },
        {
          src: "/images/logosAboutUs/deejay-150x150.jpg",
          alt: "Logo Radio Deejay",
        },
        {
          src: "/images/logosAboutUs/repubblica-150x150.jpg",
          alt: "Logo Repubblica",
        },
        {
          src: "/images/logosAboutUs/la7-150x150.jpg",
          alt: "Logo La7",
        },
        { src: "/images/logosAboutUs/Rai-150x150.jpg", alt: "Logo Rai" },
      ],
      youtubeIds: ["8Ptd5g9cNlk"],
    },
    {
      numberSection: [
        { number: "161k", text: "Totale raccolto" },
        { number: "3.5", text: "Sostenitori" },
      ],
      title: "Rockin'1000",
      progetto: "",
      media: "",
      linkPath: "https://www.eppela.com/projects/1553",
      titleProject: "La più grande rock band del mondo in concerto",
      content:
        "L’obiettivo del progetto era quello di realizzare un evento, mai visto prima: il più grande Concerto Rock di sempre. Per farlo, Rockin’1000 ha chiamato a raccolta 1000 Rockers, per eseguire dal vivo i brani che hanno fatto la Storia del Rock, dagli albori sino ad oggi. Questo progetto ha raccolto su eppela più di 160.000 euro grazie ai quali il concerto è stato realizzato e ha permesso a migliaia di persone di vivere un’esperienza che porteranno dentro  di persone di vivere un’esperienza che porteranno dentro per il resto della loro vita!",
      linkText: "Scopri",
      gallery: [
        {
          src: "/images/galleryImage/rock100/rockin.jpg",
          alt: "Rockin 1000 Image",
        },
      ],
      logoImage:
        "/images/galleryImage/rock100/logo_black-a0a289e0f0980a630c42dafde01e0d3b1f0f9d326fd12d1b47cbf57a232f43a5.png",
      logoAlt: "Logo",
      defaultColor: "rgba(220, 100, 100, 0.6)",
      leftGallery: [
        {
          src: "/images/galleryImage/rock100/1458917665798334-batterie.jpeg",
          alt: "Image 1",
        },
      ],
      subTitle: "Ne hanno parlato su:",
      subGallery: [
        {
          src: "/images/logosAboutUs/resto-del-carlino-150x150.jpg",
          alt: "Logo Resto del Carlino",
        },
        {
          src: "/images/logosAboutUs/ansa-150x150.jpg",
          alt: "Logo Ansa",
        },
        {
          src: "/images/logosAboutUs/deejay-150x150.jpg",
          alt: "Logo Radio Deejay",
        },
        {
          src: "/images/logosAboutUs/repubblica-150x150.jpg",
          alt: "Logo Repubblica",
        },
        {
          src: "/images/logosAboutUs/virgin-radio-150x150.jpg",
          alt: "Logo Virgin Radio",
        },
        {
          src: "/images/logosAboutUs/skytg24-150x150.jpg",
          alt: "Logo SkyTg",
        },
      ],
      youtubeIds: ["uJkeOwGZmho"],
    },
    {
      numberSection: [
        { number: "", text: "" },
        { number: "", text: "" },
        { number: "", text: "" },
      ],
      title: "FACILE, VICINO, SENZA STRESS.",
      progetto: "Campagna promozionale servizi fiscali",
      media: "STAMPA – POP",
      content:
        "Il CAAF CGIL fornisce tantissimi servizi: 730, ISEE, locazioni, IMU, successioni, colf e badanti, partita iva, etc. Ma che altri competitor lo fanno. Gli altri però non sono così capillari sul territorio e pochi offrono questi servizi con la stessa professionalità, accuratezza e cortesia. Sulla base di questi presupposti abbiamo usato un key visual iperbolico, una matita morsicata, per rappresentare la mancanza di ansia e stress, nel rivolgersi ai CAAF per l’espletamento delle proprie pratiche. Poter andare a piedi al CAAF sotto casa, fare tutto in modo facile e veloce ed essere sicuri di trovare persone competenti, è sinonimo di tranquillità zero stress. CAAF CGIL TOSCANA. SERVIZI FISCALI CON SEMPLICITÀ.",
      linkText: "Learn More",
      gallery: [
        {
          src: "/images/galleryImage/CGIL/1-1-2048x1365.jpg",
          alt: "Campaign Video",
        },
      ],
      logoImage: "/images/galleryImage/CGIL/Logo_Spi_Cgil.jpg",
      logoAlt: "Logo",
      defaultColor: "rgba(220, 100, 100, 0.6)",
      leftGallery: [],
      subTitle: "",
      subGallery: [],
    },
    {
      numberSection: [
        { number: "2.7mlm", text: "Totale raccolto" },
        { number: "183k", text: "Sostenitori" },
        { number: "204", text: "Progetti Finanziati" },
      ],
      title: "PostePay Crowd ",
      progetto: "",
      media: "",
      linkPath: "https://www.eppela.com/projects/1553",
      titleProject: "Postepay sostiene la nuova musica italiana",
      content:
        "Una collaborazione pluriennale con Poste Italiane culminata in un’iniziativa a sostegno della crescita dei giovani talenti della musica italiana, rivolta a singoli artisti e band di vari generi musicali (come rock, pop, indie, trap e rap). Al raggiungimento del 50% dell’obiettivo, Poste Italiane ha contribuito al progetto con un co-finanziamento pari al restante 50%. Al termine dell’iniziativa alcuni artisti meritevoli hanno vinto una promozione discografica del proprio progetto musicale. Inoltre l’artista “vincitore” ha aperto il concerto di Levante al Forum di Assago.",
      linkText: "Scopri",
      gallery: [
        {
          src: "/images/galleryImage/postpay/postepay-3.jpg",
          alt: "Rockin 1000 Image",
        },
      ],
      logoImage: "/images/galleryImage/postpay/23534.png",
      logoAlt: "Logo",
      defaultColor: "rgba(220, 100, 100, 0.6)",
      leftGallery: [
        {
          src: "/images/galleryImage/postpay/postepay-3.jpg",
          alt: "Image 1",
        },
      ],
      subTitle: "Ne hanno parlato su:",
      subGallery: [
        {
          src: "/images/logosAboutUs/radio2-150x150.jpg",
          alt: "Logo Radio2",
        },
        {
          src: "/images/logosAboutUs/deejay-150x150.jpg",
          alt: "Logo Radio Deejay",
        },
        {
          src: "/images/logosAboutUs/repubblica-150x150.jpg",
          alt: "Logo Repubblica",
        },
        {
          src: "/images/logosAboutUs/virgin-radio-150x150.jpg",
          alt: "Logo Virgin Radio",
        },
        {
          src: "/images/logosAboutUs/corriere-150x150.jpg",
          alt: "Logo Corriere",
        },
        {
          src: "/images/logosAboutUs/rtl-150x150.jpg",
          alt: "Logo RTL102.5",
        },
      ],
      youtubeIds: ["O0315FCKTvE"],
    },
  ]);

  // Get the selected work data
  const selectedWork =
    selectedWorkIndex !== null ? videos[selectedWorkIndex] : null;

  // Determine if a work item has video, gallery, or leftGallery
  const hasMedia = (work: VideoInfo): boolean => {
    return Boolean(
      (work.gallery && work.gallery.length > 0) ||
        (work.leftGallery && work.leftGallery.length > 0) ||
        (work.youtubeIds && work.youtubeIds.length > 0)
    );
  };

  // Check if gallery item is a video
  const isVideoFile = (src: string): boolean => {
    return src.endsWith(".webm") || src.endsWith(".mp4");
  };

  // Extract YouTube ID from a YouTube URL
  const getYouTubeId = (url: string): string | null => {
    const regExp =
      /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    return match && match[2].length === 11 ? match[2] : null;
  };

  // Get thumbnail image for a work item
  const getThumbnail = (work: VideoInfo): string => {
    if (work.gallery && work.gallery.length > 0) {
      return work.gallery[0].src;
    }
    if (work.leftGallery && work.leftGallery.length > 0) {
      return work.leftGallery[0].src;
    }
    // YouTube thumbnail if available
    if (work.youtubeIds && work.youtubeIds.length > 0) {
      return `https://img.youtube.com/vi/${work.youtubeIds[0]}/maxresdefault.jpg`;
    }
    // Fallback image
    return "/images/placeholder.jpg";
  };

  // Open modal with selected work
  const openWorkModal = (index: number) => {
    setSelectedWorkIndex(index);
    setCurrentGalleryIndex(0); // Reset gallery index
    setCurrentLeftGalleryIndex(0); // Reset leftGallery index
    setCurrentYoutubeIndex(0); // Reset YouTube index
    setIsModalOpen(true);
  };

  // Handle modal animations
  useEffect(() => {
    if (isModalOpen && modalRef.current) {
      // Prevent body scrolling when modal is open
      document.body.style.overflow = "hidden";

      // Animate modal opening
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
    } else {
      // Re-enable scrolling when modal is closed
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = ""; // Cleanup
    };
  }, [isModalOpen]);

  // Close modal with animation
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
          setTimeout(() => setSelectedWorkIndex(null), 300);
        },
      });
    } else {
      setIsModalOpen(false);
      setTimeout(() => setSelectedWorkIndex(null), 300);
    }
  };

  // YouTube navigation functions
  const goToNextYouTube = () => {
    if (selectedWork?.youtubeIds && selectedWork.youtubeIds.length > 1) {
      setCurrentYoutubeIndex(
        (prev) => (prev + 1) % selectedWork.youtubeIds!.length
      );
    }
  };

  const goToPrevYouTube = () => {
    if (selectedWork?.youtubeIds && selectedWork.youtubeIds.length > 1) {
      setCurrentYoutubeIndex(
        (prev) =>
          (prev - 1 + selectedWork.youtubeIds!.length) %
          selectedWork.youtubeIds!.length
      );
    }
  };

  // Gallery navigation functions
  const goToNextImage = () => {
    if (selectedWork?.gallery && selectedWork.gallery.length > 1) {
      setCurrentGalleryIndex(
        (prev) => (prev + 1) % (selectedWork.gallery?.length || 1)
      );
    }
  };

  const goToPrevImage = () => {
    if (selectedWork?.gallery && selectedWork.gallery.length > 1) {
      setCurrentGalleryIndex(
        (prev) =>
          (prev - 1 + (selectedWork.gallery?.length ?? 0)) %
          (selectedWork.gallery?.length ?? 1)
      );
    }
  };

  // Left Gallery navigation functions
  const goToNextLeftImage = () => {
    if (selectedWork?.leftGallery && selectedWork.leftGallery.length > 1) {
      setCurrentLeftGalleryIndex(
        (prev) => (prev + 1) % (selectedWork.leftGallery?.length || 1)
      );
    }
  };

  const goToPrevLeftImage = () => {
    if (selectedWork?.leftGallery && selectedWork.leftGallery.length > 1) {
      setCurrentLeftGalleryIndex(
        (prev) =>
          (prev - 1 + (selectedWork.leftGallery?.length ?? 0)) %
          (selectedWork.leftGallery?.length ?? 1)
      );
    }
  };

  // Convert YouTube link to embed format
  const getYouTubeEmbedLink = (url: string): string => {
    if (!url) return "";

    // Handle youtu.be format
    if (url.includes("youtu.be")) {
      const videoId = url.split("/").pop()?.split("?")[0];
      return `https://www.youtube.com/embed/${videoId}`;
    }

    // Handle youtube.com format
    if (url.includes("youtube.com/watch")) {
      const urlObj = new URL(url);
      const videoId = urlObj.searchParams.get("v");
      return `https://www.youtube.com/embed/${videoId}`;
    }

    // If it's just a video ID
    if (/^[a-zA-Z0-9_-]{11}$/.test(url)) {
      return `https://www.youtube.com/embed/${url}`;
    }

    // If already an embed link or other format, return as is
    return url;
  };

  // Check if a URL is a YouTube link
  const isYouTubeLink = (url: string): boolean => {
    return url.includes("youtube.com") || url.includes("youtu.be");
  };

  return (
    <div className="container mx-auto py-12! px-4!">
      <h1 className="text-3xl md:text-5xl font-bold my-12 text-center">
        I Progetti
      </h1>

      {/* Work grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {videos.map((work, index) => (
          <div
            key={index}
            className="group relative rounded-lg overflow-hidden cursor-pointer shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
            onClick={() => openWorkModal(index)}
          >
            {/* Work thumbnail */}
            <div className="aspect-[4/3] relative">
              <img
                src={getThumbnail(work)}
                alt={work.title}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black/30 group-hover:bg-black/50 transition-colors duration-300"></div>
            </div>

            {/* Work info overlay */}
            <div className="absolute inset-0 flex flex-col justify-end p-6! text-white">
              {work.progetto && (
                <span className="text-sm uppercase tracking-wider mb-2 opacity-80">
                  {work.progetto}
                </span>
              )}
              <h3 className="text-xl md:text-2xl font-bold">{work.title}</h3>
              {work.numberSection &&
                work.numberSection.some((section) => section.number) && (
                  <div className="mt-2 flex space-x-4">
                    {work.numberSection
                      .filter((section) => section.number)
                      .map((section, idx) => (
                        <div key={idx} className="text-center">
                          <div className="text-xl font-bold">
                            {section.number}
                          </div>
                          <div className="text-xs">{section.text}</div>
                        </div>
                      ))}
                  </div>
                )}
              <div className="mt-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <span className="inline-flex items-center text-sm">
                  {work.linkText || "View Project"}{" "}
                  <i className="bi bi-arrow-right ml-2"></i>
                </span>
              </div>
            </div>

            {/* Video/gallery indicator */}
            {hasMedia(work) && (
              <div className="absolute top-4 right-4 bg-white/80 backdrop-blur-sm rounded-full p-3!">
                {work.youtubeIds && work.youtubeIds.length > 0 ? (
                  <i className="bi bi-youtube text-black"></i>
                ) : work.gallery &&
                  work.gallery.length > 0 &&
                  isVideoFile(work.gallery[0].src) ? (
                  <i className="bi bi-play-fill text-black"></i>
                ) : work.gallery && work.gallery.length > 0 ? (
                  <i className="bi bi-images text-black"></i>
                ) : work.leftGallery && work.leftGallery.length > 0 ? (
                  isYouTubeLink(work.leftGallery[0].src) ? (
                    <i className="bi bi-youtube text-black"></i>
                  ) : (
                    <i className="bi bi-images text-black"></i>
                  )
                ) : null}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Modal */}
      {isModalOpen && selectedWork && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4! overflow-y-auto">
          <div
            ref={modalRef}
            className="bg-black rounded-lg w-full max-w-6xl max-h-[90vh] overflow-y-auto flex flex-col relative"
          >
            {/* Close button */}
            <button
              onClick={closeModal}
              className="absolute top-4 right-4 bg-gray-200 hover:bg-gray-300 
                        w-8 h-8 rounded-full flex items-center justify-center 
                        transition-colors z-50!"
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

            {/* YouTube videos section - NOW ABOVE THE GRID */}
            {selectedWork.youtubeIds && selectedWork.youtubeIds.length > 0 && (
              <div className="w-full p-4! mt-4! lg:mt-0">
                <div className="relative w-full rounded-2xl overflow-hidden bg-black min-h-[400px] mb-4">
                  <iframe
                    src={`https://www.youtube.com/embed/${selectedWork.youtubeIds[currentYoutubeIndex]}`}
                    title={`${selectedWork.title} - YouTube Video ${
                      currentYoutubeIndex + 1
                    }`}
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="w-full h-[400px]"
                  ></iframe>

                  {/* YouTube navigation (only if more than one video) */}
                  {selectedWork.youtubeIds.length > 1 && (
                    <>
                      <button
                        onClick={goToPrevYouTube}
                        className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/30 backdrop-blur-sm p-2! rounded-full hover:bg-white/50 transition-colors duration-200"
                      >
                        <i className="bi bi-chevron-left text-xl"></i>
                      </button>
                      <button
                        onClick={goToNextYouTube}
                        className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/30 backdrop-blur-sm p-2! rounded-full hover:bg-white/50 transition-colors duration-200"
                      >
                        <i className="bi bi-chevron-right text-xl"></i>
                      </button>

                      {/* YouTube indicator */}
                      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/50 rounded-full px-3! py-1! text-white text-sm">
                        {currentYoutubeIndex + 1} /{" "}
                        {selectedWork.youtubeIds.length}
                      </div>
                    </>
                  )}
                </div>
              </div>
            )}

            <div className="flex flex-col md:flex-row">
              {/* Left section: Gallery */}
              <div className="w-full md:w-1/2 p-4! h-full">
                {/* Regular gallery */}
                {selectedWork.gallery && selectedWork.gallery.length > 0 && (
                  <div className="relative w-full rounded-2xl overflow-hidden bg-black min-h-[400px] max-h-[80vh]">
                    {isVideoFile(
                      selectedWork.gallery[currentGalleryIndex].src
                    ) ? (
                      <video
                        autoPlay
                        loop
                        muted
                        playsInline
                        controls
                        className="w-full h-full object-cover"
                      >
                        <source
                          src={selectedWork.gallery[currentGalleryIndex].src}
                          type={
                            selectedWork.gallery[
                              currentGalleryIndex
                            ].src.endsWith(".webm")
                              ? "video/webm"
                              : "video/mp4"
                          }
                        />
                        Your browser does not support the video tag.
                      </video>
                    ) : (
                      <img
                        src={selectedWork.gallery[currentGalleryIndex].src}
                        alt={
                          selectedWork.gallery[currentGalleryIndex].alt ||
                          `${selectedWork.title} - image ${
                            currentGalleryIndex + 1
                          }`
                        }
                        className="w-full h-full object-cover"
                      />
                    )}

                    {/* Gallery navigation arrows (only if more than one image/video) */}
                    {selectedWork.gallery.length > 1 && (
                      <>
                        <button
                          onClick={goToPrevImage}
                          className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/30 backdrop-blur-sm p-2! rounded-full hover:bg-white/50 transition-colors duration-200"
                        >
                          <i className="bi bi-chevron-left text-xl"></i>
                        </button>
                        <button
                          onClick={goToNextImage}
                          className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/30 backdrop-blur-sm p-2! rounded-full hover:bg-white/50 transition-colors duration-200"
                        >
                          <i className="bi bi-chevron-right text-xl"></i>
                        </button>

                        {/* Gallery indicator */}
                        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/50 rounded-full px-3! py-1! text-white text-sm">
                          {currentGalleryIndex + 1} /{" "}
                          {selectedWork.gallery.length}
                        </div>
                      </>
                    )}
                  </div>
                )}

                {/* Left Gallery - can be either a single image, multiple images, or YouTube embeds */}
                {selectedWork.leftGallery &&
                  selectedWork.leftGallery.length > 0 && (
                    <div className="mt-4 relative aspect-video w-full rounded-lg overflow-hidden bg-black">
                      {isYouTubeLink(
                        selectedWork.leftGallery[currentLeftGalleryIndex].src
                      ) ? (
                        // YouTube embed
                        <iframe
                          src={getYouTubeEmbedLink(
                            selectedWork.leftGallery[currentLeftGalleryIndex]
                              .src
                          )}
                          title={`${selectedWork.title} YouTube video`}
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                          allowFullScreen
                          className="absolute inset-0 w-full h-full"
                        ></iframe>
                      ) : (
                        // Regular image
                        <img
                          src={
                            selectedWork.leftGallery[currentLeftGalleryIndex]
                              .src
                          }
                          alt={
                            selectedWork.leftGallery[currentLeftGalleryIndex]
                              .alt ||
                            `Left gallery image ${currentLeftGalleryIndex + 1}`
                          }
                          className="w-full h-full object-contain"
                        />
                      )}

                      {/* Left Gallery navigation (only if more than one item) */}
                      {selectedWork.leftGallery.length > 1 && (
                        <>
                          <button
                            onClick={goToPrevLeftImage}
                            className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/30 backdrop-blur-sm p-2! rounded-full hover:bg-white/50 transition-colors duration-200"
                          >
                            <i className="bi bi-chevron-left text-xl"></i>
                          </button>
                          <button
                            onClick={goToNextLeftImage}
                            className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/30 backdrop-blur-sm p-2! rounded-full hover:bg-white/50 transition-colors duration-200"
                          >
                            <i className="bi bi-chevron-right text-xl"></i>
                          </button>

                          {/* Left Gallery indicator */}
                          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/50 rounded-full px-3! py-1! text-white text-sm">
                            {currentLeftGalleryIndex + 1} /{" "}
                            {selectedWork.leftGallery.length}
                          </div>
                        </>
                      )}
                    </div>
                  )}
              </div>

              {/* Right section: Content */}
              <div className="w-full md:w-1/2 p-6! flex flex-col h-full">
                {/* Title */}
                {selectedWork.title && (
                  <h2 className="text-2xl md:text-4xl font-bold mb-2">
                    {selectedWork.title}
                  </h2>
                )}

                {/* Progetto & Media */}
                {(selectedWork.progetto || selectedWork.media) && (
                  <div className="mb-4">
                    {selectedWork.progetto && (
                      <p className="text-lg font-medium">
                        {selectedWork.progetto}
                      </p>
                    )}
                    {selectedWork.media && (
                      <p className="text-sm text-gray-600">
                        {selectedWork.media}
                      </p>
                    )}
                  </div>
                )}

                {/* Number sections */}
                {selectedWork.numberSection &&
                  selectedWork.numberSection.some(
                    (section) => section.number
                  ) && (
                    <div className="flex flex-wrap gap-6 mb-4 p-4! bg-[#d1b42f] rounded-lg">
                      {selectedWork.numberSection
                        .filter((section) => section.number)
                        .map((section, idx) => (
                          <div key={idx} className="text-center">
                            <div className="text-2xl font-bold text-black">
                              {section.number}
                            </div>
                            <div className="text-sm text-gray-600">
                              {section.text}
                            </div>
                          </div>
                        ))}
                    </div>
                  )}

                {/* Content */}
                {selectedWork.content && (
                  <div className="prose mb-6 text-gray-700">
                    <p className="normal-case! text-lg!">
                      {selectedWork.content}
                    </p>
                  </div>
                )}
                <div className="flex gap-x-5">
                  {/* Logo */}
                  {selectedWork.logoImage && (
                    <div className="mb-6 max-w-xs">
                      <img
                        src={selectedWork.logoImage}
                        alt={
                          selectedWork.logoAlt || `${selectedWork.title} logo`
                        }
                        className="h-16 object-contain"
                      />
                    </div>
                  )}

                  {/* External link */}
                  {selectedWork.linkPath && selectedWork.linkText && (
                    <a
                      href={selectedWork.linkPath}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center px-8! py-4! bg-[#d1b42f] text-black font-semibold rounded-md hover:bg-[#d1b42f] transition-colors mb-6 w-min"
                    >
                      {selectedWork.linkText}{" "}
                      <i className="bi bi-arrow-right ml-2"></i>
                    </a>
                  )}
                </div>

                {/* Title Project when available */}
                {selectedWork.titleProject && (
                  <h3 className="text-xl font-semibold mb-3">
                    {selectedWork.titleProject}
                  </h3>
                )}

                {/* Sub-gallery grid */}
                {selectedWork.subGallery &&
                  selectedWork.subGallery.length > 0 && (
                    <div className="mt-auto">
                      {selectedWork.subTitle && (
                        <h3 className="text-lg font-semibold mb-3">
                          {selectedWork.subTitle}
                        </h3>
                      )}
                      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
                        {selectedWork.subGallery.map((item, index) => (
                          <div
                            key={index}
                            className={
                              isYouTubeLink(item.src)
                                ? "col-span-2"
                                : "aspect-square"
                            }
                          >
                            {isYouTubeLink(item.src) ? (
                              <div className="aspect-video relative rounded-md overflow-hidden">
                                <iframe
                                  src={getYouTubeEmbedLink(item.src)}
                                  title={
                                    item.alt || `Sub gallery video ${index + 1}`
                                  }
                                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                  allowFullScreen
                                  className="absolute inset-0 w-full h-full"
                                ></iframe>
                              </div>
                            ) : (
                              <div className="relative h-full rounded-md overflow-hidden">
                                <img
                                  src={item.src}
                                  alt={
                                    item.alt || `Sub gallery image ${index + 1}`
                                  }
                                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                                />
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
              </div>
            </div>
          </div>
        </div>
      )}
      <Brands />
    </div>
  );
}
