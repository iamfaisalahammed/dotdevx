
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

import { createMetadata } from "@/lib/seo";

export const metadata = createMetadata({
  title: "Web Development Agency in Bangladesh",
  description:
    ".DevX is a web development agency building modern, responsive, and high-performance websites for businesses in Bangladesh and worldwide.",
  path: "/",
});

export default function HomePage() {
  return (
    <main>
      <Navbar />
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
      <Footer />
    </main>
  );
}
