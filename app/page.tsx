import Hero from '@/components/Hero';
import LensLayers from '@/components/LensLayers';
import { Booking, Brands, Faq, Prices, Quote, Services, Team, Trust } from '@/components/Sections';

export const metadata = { alternates: { canonical: '/' } };

export default function Home() {
  return (
    <>
      <Hero />
      <Trust />
      <Services />
      <LensLayers />
      <Brands />
      <Prices />
      <Quote />
      <Team />
      <Faq />
      <Booking />
    </>
  );
}
