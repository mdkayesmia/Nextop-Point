
import Hero from "@/components/Hero";
import Services from "@/components/Services";
import Countries from "@/components/Countries";
import FloatingButtons from "@/components/FloatingButtons";
import Footer from "@/components/Footer";
import Reviews from "@/components/Reviews";
import Questions from "@/components/Questions";
import Partners from "@/components/Partners";

export default function Home() {
  return (
    <>
      
      <Hero />
      <Services />
      <Countries />
      <Reviews />
      <Partners/>
      <Questions/>
      <Footer />
      <FloatingButtons />

    </>
  );
}