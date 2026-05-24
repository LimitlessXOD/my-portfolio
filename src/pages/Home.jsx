import React, { useEffect } from 'react';
import Nav from '../components/Nav';
import Hero from '../components/Hero';
import About from '../components/About';
import Skills from '../components/Skills';
import Projects from '../components/Projects';
import Services from '../components/Services';
import NowBuilding from '../components/NowBuilding';
import Testimonials from '../components/Testimonials';
import Blog from '../components/Blog';
import Guestbook from '../components/Guestbook';
import Contact from '../components/Contact';
import Footer from '../components/Footer';

export default function Home() {
  useEffect(() => {
    document.title = 'MugenSoft — Erastus (Leroy) Shalimba · Full Stack Developer';
  }, []);

  return (
    <>
      <Nav />
      <Hero />
      <About />
      <Skills />
      <Projects />
      <Services />
      <NowBuilding />
      <Testimonials />
      <Blog />
      <Guestbook />
      <Contact />
      <Footer />
    </>
  );
}
