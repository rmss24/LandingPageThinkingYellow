import Image from "next/image";
import VerticalScrolling from "./sections/verticalScroll";
import Hero from "./sections/hero";
import StrategySection from "./sections/strategy";
export default function Home() {
  return (
    <div className="">
      <Hero />
      <main>
        <StrategySection />
      </main>
      <VerticalScrolling />
    </div>
  );
}
