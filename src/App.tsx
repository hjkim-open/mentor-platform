import './index.css';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import HowItWorks from './components/HowItWorks';
import MentorGrid from './components/MentorGrid';
import Program from './components/Program';
import Stats from './components/Stats';
import FAQ from './components/FAQ';
import Contact from './components/Contact';
import Footer from './components/Footer';
import MobileCtaBar from './components/MobileCtaBar';
import ScrollToTop from './components/ScrollToTop';

function App() {
  return (
    <div className="min-h-screen bg-[#0a0a0f]">
      <Navbar />
      <Hero />
      <HowItWorks />
      <MentorGrid />
      <Program />
      <Stats />
      <FAQ />
      <Contact />
      <Footer />
      <MobileCtaBar />
      <ScrollToTop />
    </div>
  );
}

export default App;
