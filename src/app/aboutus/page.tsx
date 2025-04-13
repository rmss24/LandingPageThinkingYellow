import HeroSection from "@/app/sections/heroSections";
import OutroSection from "../components/outroSection";
import WorkAccordion from "../components/workAccordion";

export default function AboutUs() {
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

  return (
    <div className="">
      <HeroSection />
      <div className="bg-black! h-[100vh]">
        <div className="mx-8">
          <div className="flex pt-40!">
            <p className="w-[5%] font-bold mr-8">La nostra missione</p>
            <div className="h-[2px] w-screen bg-white divider ml-0 lg:flex self-center" />
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2">
            <p className="lg:text-6xl! text-4xl! title my-8 ">
              Siamo un’officina in cui si costruiscono ogni giorno, da oltre 30
              anni, idee, strategie, progetti, storie e prodotti.
            </p>
            <div />
            <div></div>
            <div className="">
              <p className="normal-case! text-lg! leading-5 my-4">
                Esperienza, competenza, lungimiranza e coraggio sono i quattro
                concetti che meglio ci contraddistinguono e che ci permettono di
                esprimere con successo le nostre anime: Marketing e
                Comunicazione, Crowdfunding e Responsabilità Sociale. Ogni
                giorno condividiamo visioni e obiettivi con i nostri clienti,
                partner e collaboratori, per essere sempre nel posto giusto al
                momento giusto; sia online che offline.
              </p>
              <p className="normal-case! text-lg! leading-5">
                Siamo un’officina in cui si costruiscono ogni giorno, da oltre
                30 anni, idee, strategie, progetti, storie e prodotti.
              </p>
            </div>
          </div>
        </div>
      </div>
      <OutroSection introItems={introItems} />
      <div className="bg-black! py-8! ">
        <div className="grid grid-cols-1 lg:grid-cols-2 mx-8">
          <div className="">
            <span>
              <p className="">Anteprima ADV</p>
            </span>
            <p className="text-2xl! font-bold!">Come lavoriamo</p>
            <p className="normal-case! text-lg! leading-5 my-4">
              Grazie a un team multifunzionale composto da figure fortemente
              specializzate, siamo in grado di gestire internamente l’intero
              processo, di perseguire sempre il meglio per i nostri clienti,
              senza compromessi e senza risparmiarci mai.
            </p>
          </div>
        </div>
        <WorkAccordion />
      </div>
    </div>
  );
}
