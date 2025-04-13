import VerticalScrolling from "./sections/verticalScroll";
import OutroSection from "@/app/components/outroSection"; // Import the new OutroSection component

export default function Home() {
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
      <VerticalScrolling />
      <OutroSection introItems={introItems} />
    </div>
  );
}
