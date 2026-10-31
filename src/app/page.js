import Hero from "@/components/sections/home/Hero";
import Services from "@/components/sections/home/Services";
import Projects from "@/components/sections/home/Projects";
import WhyChooseUs from "@/components/sections/home/WhyChooseUs";
import Process from "@/components/sections/home/Process";
import Industries from "@/components/sections/home/Industries";
import Technologies from "@/components/sections/home/Technologies";
import About from "@/components/sections/home/About";
import FAQ from "@/components/sections/home/FAQ";
import Contact from "@/components/sections/home/Contact";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

export default function HomePage() {
  return (
    <main>
      <Navbar></Navbar>
      <Hero />
      <Services />
      <Projects />
      <WhyChooseUs />
      <Process />
      <Industries />
      <Technologies />
      <About />
      <FAQ />
      <Contact />
      <Footer></Footer>
    </main>
  );
}