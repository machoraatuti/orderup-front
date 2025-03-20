import React from 'react';
import Hero from '@/components/landing/Hero';
import Features from '@/components/landing/Features';
import HowItWorks from '@/components/landing/HowItWorks';
import CTASection from '@/components/landing/CTASection';

export default function Home() {
  return (
    <main>
      <Hero />
      <Features />
      <HowItWorks />
      <CTASection />
    </main>
  );
}