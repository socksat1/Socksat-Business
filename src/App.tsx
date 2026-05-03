import { useState, useEffect, useRef } from "react";
import { Check, ArrowRight, ArrowUp, Facebook, Instagram, Linkedin, Paintbrush, Scissors, Gift } from "lucide-react";
import { motion } from "motion/react";

const SockIcon = ({ size = 24, className = "", strokeWidth = 2 }: { size?: number, className?: string, strokeWidth?: number }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth={strokeWidth} 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={className}
  >
    <path d="M14 2H8" />
    <path d="M8 2v10.5C8 14 6 15 6 17c0 2 2 4 5 4h3c3 0 5-2 5-4s-2.5-4-5-4V2" />
  </svg>
)

function AnimatedNumber({ value, suffix = "", prefix = "", duration = 2000 }: { value: number, suffix?: string, prefix?: string, duration?: number }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setInView(true);
      },
      { threshold: 0.1 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!inView) return;
    
    let startTime: number;
    let animationFrame: number;

    const updateCount = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = timestamp - startTime;
      
      if (progress < duration) {
        const easeProgress = progress === duration ? 1 : 1 - Math.pow(2, -10 * progress / duration);
        setCount(Math.floor(easeProgress * value));
        animationFrame = requestAnimationFrame(updateCount);
      } else {
        setCount(value);
      }
    };

    animationFrame = requestAnimationFrame(updateCount);
    return () => cancelAnimationFrame(animationFrame);
  }, [inView, value, duration]);

  return <span ref={ref}>{prefix}{count}{suffix}</span>;
}

export default function App() {
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 400) {
        setShowScrollTop(true);
      } else {
        setShowScrollTop(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="flex flex-col min-h-screen">
      {/* Top Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-surface-container-lowest/80 backdrop-blur-md shadow-sm">
        <div className="flex justify-between items-center px-4 py-4 max-w-[1600px] mx-auto">
          <div className="text-2xl font-black text-on-background font-headline">
            SOCKSAT <span className="text-coral">BUSINESS</span>
          </div>
          <div className="hidden md:flex space-x-8 items-center">
            <a
              className="text-secondary hover:text-primary-container uppercase tracking-widest text-sm font-bold transition-all duration-300"
              href="#why-us"
            >
              WHY US
            </a>
            <a
              className="text-secondary hover:text-primary-container uppercase tracking-widest text-sm font-bold transition-all duration-300"
              href="#offerings"
            >
              OFFERINGS
            </a>
            <a
              className="text-secondary hover:text-primary-container uppercase tracking-widest text-sm font-bold transition-all duration-300"
              href="#socksat-studio"
            >
              SOCKSAT STUDIO
            </a>
            <a
              className="text-secondary hover:text-primary-container uppercase tracking-widest text-sm font-bold transition-all duration-300"
              href="#clients"
            >
              CLIENTS
            </a>
          </div>
          <button className="hidden md:inline-flex bg-gradient-to-br from-primary to-primary-container text-white px-6 py-3 rounded uppercase tracking-widest text-sm font-bold hover:opacity-90 transition-opacity">
            ENQUIRE NOW
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative flex flex-col lg:flex-row items-stretch bg-primary-container overflow-hidden pt-20 lg:pt-0 min-h-[600px]">
        <div className="absolute inset-0 blueprint-grid opacity-30"></div>
        <div className="relative z-10 w-full grid grid-cols-1 lg:grid-cols-2 items-stretch h-full">
          <div className="space-y-10 flex flex-col justify-center px-4 lg:pl-[max(1rem,calc((100vw-1600px)/2))] lg:pr-8 py-20 bg-primary-container lg:bg-transparent">
            <h1 className="text-5xl md:text-[72px] leading-[1.1] font-headline text-on-surface">
              Your <span className="text-white">#1</span> Trusted Sock Provider
              Since 2018. Made in <span className="text-white">Amman</span>.
            </h1>
            <p className="text-lg md:text-xl text-on-surface-variant font-medium max-w-xl">
              Custom socks for corporate gifting, retail, and uniforms. Designed
              with precision, manufactured locally.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <button className="bg-gradient-to-br from-primary to-primary-container text-white px-8 py-4 rounded text-lg font-bold uppercase tracking-wider hover:shadow-[0_20px_40px_rgba(9,29,46,0.2)] transition-all">
                ENQUIRE NOW
              </button>
              <button className="bg-surface-container-high text-primary px-8 py-4 rounded text-lg font-bold uppercase tracking-wider hover:bg-surface-variant transition-colors">
                VIEW OFFERINGS
              </button>
            </div>
          </div>
          <div className="relative w-full h-full flex justify-end items-stretch min-h-[400px]">
            <div className="absolute inset-0 bg-primary/20 blur-3xl rounded-full"></div>
            <img
              alt="Person wearing custom socks with loafers"
              className="relative z-10 object-cover w-full h-full block object-center lg:object-right md:min-h-[600px]"
              src="https://i.postimg.cc/MKfK2JKn/LOVEATFIRSTPAIR.png"
            />
          </div>
        </div>
      </section>

      {/* 6 Boxes Grid */}
      <section className="w-full">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 w-full">
          {[
            { title: "Fast Fulfillment", bg: "bg-coral", text: "text-white" },
            { title: "Flexible Pricing", bg: "bg-white", text: "text-on-background" },
            { title: "100% Custom", bg: "bg-tertiary-container", text: "text-navy-night" },
            { title: "Low MOQs", bg: "bg-primary-container", text: "text-white" },
            { title: "Made in Jordan", bg: "bg-navy-night", text: "text-white" },
            { title: "Premium Quality", bg: "bg-primary", text: "text-white" },
          ].map((item, idx) => (
            <div
              key={idx}
              className={`${item.bg} p-12 transition-all flex flex-row items-center gap-6 justify-center h-48 md:h-60 lg:h-[30vh]`}
            >
              <Check className={`w-8 h-8 shrink-0 ${item.text}`} strokeWidth={3} />
              <h4 className={`font-bold text-3xl ${item.text}`}>{item.title}</h4>
            </div>
          ))}
        </div>
      </section>

      {/* Statement Section */}
      <section className="bg-white">
        <div className="grid grid-cols-1 md:grid-cols-2 items-center">
          <div className="w-full h-full min-h-[400px]">
            <img
              alt="Detail of custom socks and shoes"
              className="w-full h-full object-cover"
              src="https://i.postimg.cc/rsnRSnQR/IMG-1850.jpg"
            />
          </div>
          <div className="py-20 px-8 md:px-16 text-left lg:pl-16">
            <h2 className="font-body leading-tight font-bold text-navy-night text-5xl md:text-6xl lg:text-7xl">
              Built for organizations that are{" "}
              <span className="block md:inline">Business-Led &amp;</span>{" "}
              <span className="block md:inline italic">Detail-Driven.</span>
            </h2>
          </div>
        </div>
      </section>

      {/* Our Offerings */}
      <section className="relative w-full" id="offerings">
        <div className="bg-coral py-20 px-4">
          <h2 className="text-4xl md:text-[48px] font-headline text-white text-center leading-tight">
            Three Ways to Work With Us
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 w-full">
          {/* Offering 1 */}
          <div className="bg-navy-night text-white p-12 md:p-16 lg:p-20 flex flex-col h-full shadow-inner relative overflow-hidden">
            <div className="absolute inset-0 blueprint-grid opacity-10"></div>
            <div className="relative z-10 flex flex-col h-full">
              <div className="w-12 h-12 bg-white/10 text-white rounded-full flex items-center justify-center font-bold text-lg mb-8 font-headline">
                01
              </div>
              <h3 className="text-3xl font-headline text-white mb-2">
                Bulk Custom Socks
              </h3>
              <div className="text-white font-bold uppercase tracking-wider text-sm mb-4">
                BRANDS, COMPANIES &amp; RETAILERS
              </div>
              <div className="mb-6">
                <span className="bg-white/10 text-white px-3 py-1 rounded-full font-medium text-xs">
                  Merch · Uniforms · Resell
                </span>
              </div>
              <p className="text-white/80 text-lg leading-relaxed mb-8">
                Your logo, your colors, your design — produced at volume with
                competitive pricing and no inflated minimums. Perfect for company
                merch, staff uniforms, or a branded product line.
              </p>
              <div className="border-t border-white/20 pt-8 mb-8 space-y-4 flex-grow">
                {[
                  "Flexible quantities — start small, scale up",
                  "Fully custom designs and branding",
                  "Premium quality that lasts",
                  "Competitive pricing, fast turnaround",
                ].map((item, idx) => (
                  <div key={idx} className="flex items-start">
                    <div className="w-6 h-6 rounded-full bg-white/20 text-white flex items-center justify-center mt-0.5 mr-4 flex-shrink-0">
                      <Check className="w-[14px] h-[14px]" strokeWidth={3} />
                    </div>
                    <span className="text-white font-medium text-lg">{item}</span>
                  </div>
                ))}
              </div>
              <a
                className="bg-white hover:bg-white/90 text-navy-night rounded-xl p-5 flex justify-between items-center transition-colors font-bold text-lg group mt-auto"
                href="#"
              >
                Inquire Now
                <div className="w-8 h-8 bg-navy-night text-white rounded-full flex items-center justify-center group-hover:translate-x-1 transition-transform">
                  <ArrowRight className="w-4 h-4" />
                </div>
              </a>
            </div>
          </div>

          {/* Offering 2 */}
          <div className="bg-primary-container text-white p-12 md:p-16 lg:p-20 flex flex-col h-full shadow-inner relative overflow-hidden">
            <div className="absolute inset-0 blueprint-grid opacity-10"></div>
            <div className="relative z-10 flex flex-col h-full">
              <div className="w-12 h-12 bg-white/20 text-white rounded-full flex items-center justify-center font-bold text-lg mb-8 font-headline">
                02
              </div>
              <h3 className="text-3xl font-headline text-white mb-2">
                Corporate Gifting
              </h3>
              <div className="text-white font-bold uppercase tracking-wider text-sm mb-4">
                CORPORATES, EVENTS &amp; PR TEAMS
              </div>
              <div className="mb-6">
                <span className="bg-white/20 text-white px-3 py-1 rounded-full font-medium text-xs">
                  Events · PR · Onboarding
                </span>
              </div>
              <p className="text-white/90 text-lg leading-relaxed mb-8">
                Socks that feel premium without the premium price tag. Make every
                client, employee, and event touchpoint count — custom-designed or
                off the shelf for tight deadlines.
              </p>
              <div className="border-t border-white/20 pt-8 mb-8 space-y-4 flex-grow">
                {[
                  "Large order capability, handled with ease",
                  "Custom or ready-made options available",
                  "Tight deadlines handled, not apologized for",
                  "Brand reinforcement on every pair",
                ].map((item, idx) => (
                  <div key={idx} className="flex items-start">
                    <div className="w-6 h-6 rounded-full bg-white/20 text-white flex items-center justify-center mt-0.5 mr-4 flex-shrink-0">
                      <Check className="w-[14px] h-[14px]" strokeWidth={3} />
                    </div>
                    <span className="text-white font-medium text-lg">{item}</span>
                  </div>
                ))}
              </div>
              <a
                className="bg-white hover:bg-white/90 text-primary rounded-xl p-5 flex justify-between items-center transition-colors font-bold text-lg group mt-auto"
                href="#"
              >
                Inquire Now
                <div className="w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center group-hover:translate-x-1 transition-transform">
                  <ArrowRight className="w-4 h-4" />
                </div>
              </a>
            </div>
          </div>

          {/* Offering 3 */}
          <div className="bg-tertiary-container text-navy-night p-12 md:p-16 lg:p-20 flex flex-col h-full shadow-inner relative overflow-hidden">
            <div className="absolute inset-0 blueprint-grid opacity-10"></div>
            <div className="relative z-10 flex flex-col h-full">
              <div className="w-12 h-12 bg-navy-night/10 text-navy-night rounded-full flex items-center justify-center font-bold text-lg mb-8 font-headline">
                03
              </div>
              <h3 className="text-3xl font-headline text-navy-night mb-2">
                Retail Partnership
              </h3>
              <div className="text-navy-night font-bold uppercase tracking-wider text-sm mb-4">
                RETAILERS, BOUTIQUES &amp; CONCEPT STORES
              </div>
              <div className="mb-6">
                <span className="bg-navy-night/10 text-navy-night px-3 py-1 rounded-full font-medium text-xs">
                  Boutiques · Stores · Retail
                </span>
              </div>
              <p className="text-navy-night/90 text-lg leading-relaxed mb-8">
                Add a strong-margin product to your shelves with zero complexity.
                Order by the pair, not the pallet. We handle stock management and
                make reordering effortless.
              </p>
              <div className="border-t border-navy-night/10 pt-8 mb-8 space-y-4 flex-grow">
                {[
                  "Order by pair — no pallet commitments",
                  "Strong margins on ready-to-sell stock",
                  "Attractive consignment terms available",
                  "Small display footprint, big returns",
                ].map((item, idx) => (
                  <div key={idx} className="flex items-start">
                    <div className="w-6 h-6 rounded-full bg-navy-night/10 text-navy-night flex items-center justify-center mt-0.5 mr-4 flex-shrink-0">
                      <Check className="w-[14px] h-[14px]" strokeWidth={3} />
                    </div>
                    <span className="text-navy-night font-medium text-lg">{item}</span>
                  </div>
                ))}
              </div>
              <a
                className="bg-navy-night hover:bg-navy-night/90 text-white rounded-xl p-5 flex justify-between items-center transition-colors font-bold text-lg group mt-auto"
                href="#"
              >
                Inquire Now
                <div className="w-8 h-8 bg-white text-navy-night rounded-full flex items-center justify-center group-hover:translate-x-1 transition-transform">
                  <ArrowRight className="w-4 h-4" />
                </div>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-24 px-4 bg-white text-navy-night">
        <div className="max-w-[1600px] mx-auto">
          <h2 className="text-4xl md:text-[48px] font-headline mb-16 text-center leading-tight">
            The Process
          </h2>
          <div className="flex flex-col md:flex-row justify-between items-start gap-8 relative">
            {/* Connecting Line */}
            <div className="hidden md:block absolute top-[48px] left-0 w-full h-[2px] bg-navy-night/20 z-0"></div>
            
            {/* Step 1 */}
            <div className="flex-1 text-center relative w-full z-10">
              <motion.div 
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="w-24 h-24 bg-white rounded-full flex items-center justify-center text-navy-night mx-auto mb-6 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.1)] border border-navy-night/5"
              >
                <Paintbrush className="w-12 h-12 stroke-[1.5]" />
              </motion.div>
              <h3 className="text-2xl font-headline mb-4 text-navy-night">Design</h3>
              <p className="text-navy-night/80 text-lg">
                Work with our creatives at Socksat Studio to design your socks
                &amp; packaging
              </p>
            </div>
            
            {/* Step 2 */}
            <div className="flex-1 text-center relative w-full mt-8 md:mt-0 z-10">
              <motion.div 
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="w-24 h-24 bg-white rounded-full flex items-center justify-center text-navy-night mx-auto mb-6 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.1)] border border-navy-night/5"
              >
                <Scissors className="w-12 h-12 stroke-[1.5]" />
              </motion.div>
              <h3 className="text-2xl font-headline mb-4 text-navy-night">Make</h3>
              <p className="text-navy-night/80 text-lg">
                Once approved, we knit your socks with precision in our Amman
                facility.
              </p>
            </div>
            
            {/* Step 3 */}
            <div className="flex-1 text-center relative w-full mt-8 md:mt-0 z-10">
              <motion.div 
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.5 }}
                className="w-24 h-24 bg-white rounded-full flex items-center justify-center text-navy-night mx-auto mb-6 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.1)] border border-navy-night/5"
              >
                <Gift className="w-12 h-12 stroke-[1.5]" />
              </motion.div>
              <h3 className="text-2xl font-headline mb-4 text-navy-night">Deliver</h3>
              <p className="text-navy-night/80 text-lg">
                Packaged to perfection and delivered right on schedule.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Studio Showcase */}
      <section className="relative" id="socksat-studio">
        <div className="grid grid-cols-1 lg:grid-cols-2 items-stretch lg:min-h-[600px]">
          <div className="bg-[#1C2B3A] text-white flex flex-col justify-center px-4 lg:pl-[max(1rem,calc((100vw-1600px)/2))] lg:pr-16 py-16">
            <h2 className="text-4xl md:text-[56px] font-headline leading-tight mb-6 mt-12 lg:mt-0">
              Bring Your Creative Vision to Life at Socksat{" "}
              <span className="text-coral">Studio</span>
            </h2>
            <p className="text-lg text-white/80 font-body mb-12 max-w-xl">
              Our in-house studio doesn't just slap a logo on a sock. We architect
              the design, curate the materials, and engineer the packaging.
            </p>
            <div className="space-y-8">
              <div>
                <h3 className="text-xl font-bold mb-2 text-white">
                  Creative Design
                </h3>
                <p className="text-white/70 text-sm leading-relaxed">
                  We translate your brand guidelines into stunning knitwear patterns
                  that look perfect on the foot, ensuring every detail reflects your
                  identity.
                </p>
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2 text-white">
                  Gifting Curation
                </h3>
                <p className="text-white/70 text-sm leading-relaxed">
                  Pairing premium socks with complementary items to create memorable
                  unboxing experiences for your clients, partners, and employees.
                </p>
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2 text-white">
                  Packaging Experience
                </h3>
                <p className="text-white/70 text-sm leading-relaxed">
                  From custom sleeves to premium magnetic boxes, we engineer
                  packaging structures that elevate your brand presentation from the
                  first touch.
                </p>
              </div>
            </div>
          </div>
          <div className="relative min-h-[500px] lg:min-h-full overflow-hidden">
            <img
              alt="Person in red pants with black shoes on a red background with milk and cookies"
              className="absolute inset-0 w-full h-full object-cover object-right"
              src="https://i.postimg.cc/cHPVr0NY/cookies.png"
            />
          </div>
        </div>
      </section>

      {/* Social Proof & Credentials */}
      <section className="py-24 bg-white" id="clients">
        <div className="max-w-[1600px] mx-auto text-center px-4">
          <h2 className="text-4xl md:text-[48px] font-headline text-on-surface mb-12 leading-tight">
            Trusted by Brands Across Jordan
          </h2>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-12 mb-20 border-b border-outline-variant/20 pb-20 items-center">
            <div>
              <p className="text-5xl md:text-6xl font-headline text-primary mb-3">
                <AnimatedNumber value={2018} />
              </p>
              <p className="text-on-surface-variant font-bold uppercase tracking-widest text-sm md:text-lg">
                Established
              </p>
            </div>
            <div>
              <p className="text-5xl md:text-6xl font-headline text-primary mb-3">
                <AnimatedNumber value={50} suffix="K+" />
              </p>
              <p className="text-on-surface-variant font-bold uppercase tracking-widest text-sm md:text-lg">
                Happy Clients
              </p>
            </div>
            <div>
              <p className="text-5xl md:text-6xl font-headline text-primary mb-3">
                <AnimatedNumber value={100} suffix="K+" />
              </p>
              <p className="text-on-surface-variant font-bold uppercase tracking-widest text-sm md:text-lg">
                Pairs Delivered
              </p>
            </div>
            <div>
              <p className="text-5xl md:text-6xl font-headline text-primary mb-3">
                <AnimatedNumber value={110} suffix="%" />
              </p>
              <p className="text-on-surface-variant font-bold uppercase tracking-widest text-sm md:text-lg">
                Commitment
              </p>
            </div>
          </div>
        </div>
        <div className="w-full flex justify-center">
          <img
            alt="Trusted Brands Logos"
            className="crisp-image block w-4/5"
            src="https://i.postimg.cc/HLfSV51r/logos2rows.jpg"
          />
        </div>
      </section>

      {/* Contact & Lead Generation */}
      <section className="bg-surface-container-lowest">
        <div className="flex flex-col md:flex-row min-h-[600px]">
          {/* Left Side */}
          <div className="bg-coral w-full md:w-1/2 text-white p-6 md:p-10 lg:p-20 flex items-center justify-center relative overflow-hidden">
            <div className="absolute inset-0 blueprint-grid opacity-20"></div>
            <div className="relative z-10 max-w-lg w-full">
              <h2 className="text-4xl md:text-[56px] font-headline leading-tight mb-6">
                Let's Start With a Pair of Socks.
              </h2>
              <p className="text-tertiary-fixed text-lg">
                Fill out the form and our team will get back to you with a custom
                quote within 24 hours.
              </p>
            </div>
          </div>
          {/* Right Side (Form) */}
          <div className="w-full md:w-1/2 p-6 md:p-10 lg:p-20 bg-surface-container-lowest flex items-center justify-center">
            <div className="w-full max-w-lg">
              <form className="space-y-6">
                <div>
                  <label className="block text-sm font-bold text-on-surface uppercase tracking-widest mb-2 font-label">
                    Full Name
                  </label>
                  <input
                    className="w-full bg-surface-container-low border-none rounded p-4 text-on-surface focus:ring-2 focus:ring-primary/40 focus:bg-surface-container-lowest transition-all"
                    placeholder="Jane Doe"
                    type="text"
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-on-surface uppercase tracking-widest mb-2 font-label">
                    Company Email
                  </label>
                  <input
                    className="w-full bg-surface-container-low border-none rounded p-4 text-on-surface focus:ring-2 focus:ring-primary/40 focus:bg-surface-container-lowest transition-all"
                    placeholder="jane@company.com"
                    type="email"
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-on-surface uppercase tracking-widest mb-2 font-label">
                    Project Details
                  </label>
                  <textarea
                    className="w-full bg-surface-container-low border-none rounded p-4 text-on-surface focus:ring-2 focus:ring-primary/40 focus:bg-surface-container-lowest transition-all resize-none"
                    placeholder="Tell us about your timeline and design ideas..."
                    rows={4}
                  ></textarea>
                </div>
                <button
                  className="w-full bg-on-background text-white py-4 rounded font-bold uppercase tracking-widest hover:bg-primary transition-colors mt-4"
                  type="button"
                >
                  Submit Enquiry
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#091D2E] text-[#4DA8D4]">
        <div className="flex flex-col md:flex-row justify-between items-center px-4 py-16 w-full max-w-[1600px] mx-auto">
          <div className="mb-8 md:mb-0">
            <span className="text-xl font-black text-white font-headline">
              Socksat Business
            </span>
          </div>
          
          <div className="flex space-x-8 mb-8 md:mb-0 items-center">
            <a className="text-slate-400 hover:text-white transition-colors" href="#">
              Privacy Policy
            </a>
            <a className="text-slate-400 hover:text-white transition-colors" href="#">
              Terms of Service
            </a>
            <a className="text-slate-400 hover:text-white transition-colors" href="#">
              Contact Us
            </a>
          </div>

          <div className="flex space-x-4 mb-4 md:mb-0">
            <div className="group relative flex justify-center">
              <a className="text-slate-400 hover:text-white transition-colors" href="#">
                <Facebook className="w-5 h-5" />
              </a>
              <span className="absolute -top-10 opacity-0 group-hover:opacity-100 transition-opacity bg-white text-navy-night text-xs font-bold px-2 py-1 rounded pointer-events-none whitespace-nowrap shadow-lg">
                Visit our Facebook
              </span>
            </div>
            <div className="group relative flex justify-center">
              <a className="text-slate-400 hover:text-white transition-colors" href="#">
                <Instagram className="w-5 h-5" />
              </a>
              <span className="absolute -top-10 opacity-0 group-hover:opacity-100 transition-opacity bg-white text-navy-night text-xs font-bold px-2 py-1 rounded pointer-events-none whitespace-nowrap shadow-lg">
                Follow our Instagram
              </span>
            </div>
            <div className="group relative flex justify-center">
              <a className="text-slate-400 hover:text-white transition-colors" href="#">
                <Linkedin className="w-5 h-5" />
              </a>
              <span className="absolute -top-10 opacity-0 group-hover:opacity-100 transition-opacity bg-white text-navy-night text-xs font-bold px-2 py-1 rounded pointer-events-none whitespace-nowrap shadow-lg">
                Connect on LinkedIn
              </span>
            </div>
          </div>
          
          <div className="text-slate-400 text-sm">
            © 2026 Socksat Business. All rights reserved. Made in Amman.
          </div>
        </div>
      </footer>
      
      {/* Scroll to Top Button */}
      {showScrollTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-6 left-6 bg-coral text-white p-3 rounded-full shadow-[0_4px_14px_0_rgba(242,78,63,0.39)] hover:shadow-[0_6px_20px_rgba(242,78,63,0.23)] hover:-translate-y-1 transition-all z-50 duration-300 animate-in fade-in zoom-in"
          aria-label="Scroll to top"
        >
          <ArrowUp className="w-6 h-6" />
        </button>
      )}
      
    </div>
  );
}
