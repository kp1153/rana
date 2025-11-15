import Hero from "@/components/HeroSection";
import Abhyang from "@/components/Abhyang";
import Swedan from "@/components/Swedan";
import Vaman from "@/components/Vaman";
import Virechan from "@/components/Virechan";
import Basti from "@/components/Basti";
import Raktmokshan from "@/components/Raktmokshan";
import Nasya from "@/components/Nasya";

export default function Home() {
  return (
    <>
      <Hero />
      <section id="abhyang">
        <Abhyang />
      </section>
      <section id="swedan">
        <Swedan />
      </section>
      <section id="vaman">
        <Vaman />
      </section>
      <section id="virechan">
        <Virechan />
      </section>
      <section id="basti">
        <Basti />
      </section>
      <section id="raktmokshan">
        <Raktmokshan />
      </section>
      <section id="nasya">
        <Nasya />
      </section>
    </>
  );
}