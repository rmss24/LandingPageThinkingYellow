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

      {/* Mission Section - Fixed height issues */}
      <div className="bg-black! min-h-screen flex flex-col">
        <div className="mx-4 md:mx-8 flex-grow">
          <div className="flex pt-20! md:pt-40!">
            <p className="w-[15%]! md:w-[5%]! font-bold! mr-2 md:mr-8! text-sm! md:text-base!">
              La nostra missione
            </p>
            <div className="h-[2px] w-full bg-white! divider ml-0! lg:flex! self-center!" />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4! md:gap-8!">
            <p className="lg:text-6xl! text-3xl! md:text-4xl! title my-4!">
              Siamo un'officina in cui si costruiscono ogni giorno, da oltre 30
              anni, idee, strategie, progetti, storie e prodotti.
            </p>
            <div />
            <div></div>
            <div className="pb-8!">
              <p className="normal-case! text-base1 md:text-lg! leading-5!">
                Esperienza, competenza, lungimiranza e coraggio sono i quattro
                concetti che meglio ci contraddistinguono e che ci permettono di
                esprimere con successo le nostre anime: Marketing e
                Comunicazione, Crowdfunding e Responsabilità Sociale. Ogni
                giorno condividiamo visioni e obiettivi con i nostri clienti,
                partner e collaboratori, per essere sempre nel posto giusto al
                momento giusto; sia online che offline.
              </p>
              <p className="normal-case! text-base1 md:text-lg! leading-5!">
                Siamo un'officina in cui si costruiscono ogni giorno, da oltre
                30 anni, idee, strategie, progetti, storie e prodotti.
              </p>
            </div>
          </div>
        </div>
      </div>

      <OutroSection introItems={introItems} />

      {/* Work Process Section - Fixed spacing */}
      <div className="bg-black! py-8! ">
        <div className="grid grid-cols-1 lg:grid-cols-2 mx-4! md:mx-8! gap-4!">
          <div className="">
            <span>
              <p className="">Anteprima ADV</p>
            </span>
            <p className="text-xl! md:text-2xl! font-bold!">Come lavoriamo</p>
            <p className="normal-case! text-base! md:text-lg! leading-5! my-4!">
              Grazie a un team multifunzionale composto da figure fortemente
              specializzate, siamo in grado di gestire internamente l'intero
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
