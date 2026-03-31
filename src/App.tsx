import React, { useEffect, useRef, useState } from 'react';
import { motion, useInView, animate } from 'motion/react';
import { ArrowRight, Check, Linkedin, Mail, Phone, Menu, X } from 'lucide-react';

const FadeIn = ({ children, delay = 0, className = "" }: { children: React.ReactNode, delay?: number, className?: string, key?: React.Key }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.7, delay, ease: "easeOut" }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

function Counter({ from = 0, to, suffix = "", prefix = "", decimals = 0 }: { from?: number, to: number, suffix?: string, prefix?: string, decimals?: number }) {
  const nodeRef = useRef<HTMLSpanElement>(null);
  const inView = useInView(nodeRef, { once: true, margin: "-100px" });

  useEffect(() => {
    if (inView && nodeRef.current) {
      const node = nodeRef.current;
      const controls = animate(from, to, {
        duration: 2,
        ease: "easeOut",
        onUpdate(value) {
          node.textContent = prefix + value.toFixed(decimals) + suffix;
        },
      });
      return () => controls.stop();
    }
  }, [inView, from, to, prefix, suffix, decimals]);

  return <span ref={nodeRef}>{prefix}{from.toFixed(decimals)}{suffix}</span>;
}

export default function App() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollTo = (id: string) => {
    setMobileMenuOpen(false);
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="font-sans text-navy bg-offwhite selection:bg-champagne selection:text-navy pb-16 md:pb-0">
      {/* Navigation */}
      <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-navy/95 backdrop-blur-sm py-4 shadow-lg' : 'bg-transparent py-6'}`}>
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex justify-between items-center">
          <div className={`font-serif text-2xl tracking-widest ${isScrolled ? 'text-warmwhite' : 'text-warmwhite'}`}>
            VERMEER <span className="text-champagne">&</span> PARTNERS
          </div>
          
          {/* Desktop Nav */}
          <div className="hidden md:flex items-center space-x-8">
            {['Probleem', 'Diensten', 'Resultaten', 'Over', 'Werkwijze'].map((item) => (
              <button key={item} onClick={() => scrollTo(item.toLowerCase())} className={`text-sm tracking-wide hover:text-champagne transition-colors ${isScrolled ? 'text-warmwhite/80' : 'text-warmwhite/80'}`}>
                {item}
              </button>
            ))}
            <button onClick={() => scrollTo('contact')} className="bg-champagne text-navy px-6 py-2.5 text-sm font-medium tracking-wide hover:bg-champagne/90 transition-colors">
              Kennismaking
            </button>
          </div>

          {/* Mobile Toggle */}
          <button className="md:hidden text-warmwhite" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            {mobileMenuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 bg-navy z-40 flex flex-col items-center justify-center space-y-8">
          <button className="absolute top-6 right-6 text-warmwhite" onClick={() => setMobileMenuOpen(false)}>
            <X size={32} />
          </button>
          {['Probleem', 'Diensten', 'Resultaten', 'Over', 'Werkwijze', 'Contact'].map((item) => (
            <button key={item} onClick={() => scrollTo(item.toLowerCase())} className="text-warmwhite text-2xl font-serif tracking-wide hover:text-champagne transition-colors">
              {item}
            </button>
          ))}
        </div>
      )}

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center bg-navy pt-20">
        <div className="absolute inset-0 z-0 opacity-20">
          <div className="absolute inset-0 bg-gradient-to-r from-navy via-navy to-transparent"></div>
        </div>
        <div className="max-w-7xl mx-auto px-6 md:px-12 w-full grid md:grid-cols-2 gap-12 items-center relative z-10">
          <div className="py-20">
            <FadeIn>
              <h1 className="text-5xl md:text-7xl font-serif text-warmwhite leading-[1.1] mb-6">
                Groei begint met de <span className="text-champagne italic">juiste strategie</span>
              </h1>
            </FadeIn>
            <FadeIn delay={0.2}>
              <p className="text-lg md:text-xl text-warmwhite/80 font-light leading-relaxed mb-10 max-w-lg">
                Wij begeleiden ambitieuze ondernemers en MKB-directeuren bij het maken van beslissingen die écht impact hebben. Strategisch advies, hands-on begeleiding, meetbaar resultaat.
              </p>
            </FadeIn>
            <FadeIn delay={0.4}>
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
                <button onClick={() => scrollTo('contact')} className="bg-champagne text-navy px-8 py-4 text-sm font-medium tracking-widest uppercase hover:bg-white transition-colors flex items-center gap-3">
                  Plan een Kennismaking <ArrowRight size={16} />
                </button>
                <div className="text-warmwhite/60 text-sm font-light border-l border-warmwhite/20 pl-4 py-1">
                  Meer dan 120 ondernemers<br/>begeleid sinds 2016
                </div>
              </div>
            </FadeIn>
          </div>
          <div className="hidden md:block h-full w-full relative">
            <FadeIn delay={0.3} className="h-full w-full">
              <img 
                src="https://images.unsplash.com/photo-1556761175-5973dc0f32d7?auto=format&fit=crop&q=80&w=1600" 
                alt="Business meeting" 
                className="object-cover w-full h-[80vh] opacity-80 grayscale-[30%]"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 border border-champagne/30 translate-x-4 translate-y-4 -z-10"></div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Probleem Section */}
      <section id="probleem" className="py-24 md:py-32 bg-offwhite">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <FadeIn>
            <div className="flex items-center gap-4 mb-16">
              <div className="h-px w-12 bg-champagne"></div>
              <span className="text-champagne font-medium tracking-widest uppercase text-sm">De Realiteit</span>
            </div>
          </FadeIn>
          
          <div className="grid md:grid-cols-2 gap-x-16 gap-y-12">
            <FadeIn delay={0.1}>
              <h2 className="text-4xl md:text-5xl font-serif text-navy leading-tight">
                Wat je voelt als de <span className="italic">structuur ontbreekt</span>
              </h2>
            </FadeIn>
            <div className="grid sm:grid-cols-2 gap-8">
              {[
                "Je bedrijf groeit, maar jij werkt 70 uur per week.",
                "Je team groeit, maar de structuur blijft achter.",
                "Je weet dat er meer in zit, maar je ziet niet waar de hefboom zit.",
                "Grote beslissingen neem je alleen — zonder klankbord."
              ].map((text, i) => (
                <FadeIn key={i} delay={0.2 + (i * 0.1)} className="border-l border-navy/10 pl-6 py-2">
                  <p className="text-navy/80 font-light leading-relaxed">{text}</p>
                </FadeIn>
              ))}
            </div>
          </div>
          
          <FadeIn delay={0.6} className="mt-20 text-center">
            <p className="text-2xl font-serif text-navy italic">Herkenbaar? Dan is het tijd voor een ander gesprek.</p>
          </FadeIn>
        </div>
      </section>

      {/* Diensten Section */}
      <section id="diensten" className="py-24 md:py-32 bg-navy text-warmwhite">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <FadeIn className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-serif mb-6">Hoe wij werken</h2>
            <p className="text-warmwhite/70 font-light max-w-2xl mx-auto">Gerichte interventies voor duurzame groei. Geen standaardmodellen, maar maatwerk voor jouw specifieke uitdaging.</p>
          </FadeIn>

          <div className="grid md:grid-cols-3 gap-8 mb-16">
            {[
              {
                title: "Strategische Sparring",
                desc: "Maandelijkse 1-op-1 sessies voor directeuren die een klankbord nodig hebben bij grote beslissingen. Strategie, groei, leiderschap.",
                price: "Vanaf €450/maand"
              },
              {
                title: "Groei-Traject (12 weken)",
                desc: "Een intensief begeleidingsprogramma: van diagnose tot implementatie. Samen bouwen we een plan dat werkt.",
                price: "Op aanvraag"
              },
              {
                title: "Teamdag / Workshop",
                desc: "Een dag investeren in je team. Strategie, communicatie, en alignment. Wij faciliteren, jullie groeien.",
                price: "Vanaf €1.800/dag"
              }
            ].map((service, i) => (
              <FadeIn key={i} delay={i * 0.2} className="border border-champagne/20 p-10 hover:border-champagne/50 transition-colors group">
                <div className="h-12 w-12 rounded-full border border-champagne/30 flex items-center justify-center mb-8 text-champagne group-hover:bg-champagne group-hover:text-navy transition-colors">
                  <span className="font-serif text-xl">{i + 1}</span>
                </div>
                <h3 className="text-2xl font-serif mb-4">{service.title}</h3>
                <p className="text-warmwhite/70 font-light leading-relaxed mb-8 min-h-[100px]">{service.desc}</p>
                <div className="text-champagne font-medium tracking-wide text-sm uppercase">{service.price}</div>
              </FadeIn>
            ))}
          </div>

          <FadeIn delay={0.6} className="text-center">
            <button onClick={() => scrollTo('contact')} className="border border-champagne text-champagne px-8 py-4 text-sm font-medium tracking-widest uppercase hover:bg-champagne hover:text-navy transition-colors inline-block">
              Bekijk wat bij jou past
            </button>
          </FadeIn>
        </div>
      </section>

      {/* Resultaten Section */}
      <section id="resultaten" className="py-24 md:py-32 bg-offwhite">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="grid md:grid-cols-4 gap-12 mb-24 border-b border-navy/10 pb-20">
            {[
              { num: 120, suffix: "+", label: "Ondernemers begeleid" },
              { num: 8, suffix: "+", label: "Jaar ervaring" },
              { num: 2.4, prefix: "€", suffix: "M", decimals: 1, label: "Omzetgroei gerealiseerd" },
              { num: 96, suffix: "%", label: "Klanttevredenheid" }
            ].map((stat, i) => (
              <FadeIn key={i} delay={i * 0.1} className="text-center md:text-left">
                <div className="text-5xl md:text-6xl font-serif text-navy mb-2">
                  <Counter from={0} to={stat.num} prefix={stat.prefix} suffix={stat.suffix} decimals={stat.decimals} />
                </div>
                <div className="text-sage font-medium tracking-wide uppercase text-sm">{stat.label}</div>
              </FadeIn>
            ))}
          </div>

          <div className="grid md:grid-cols-2 gap-16">
            <FadeIn>
              <h2 className="text-4xl font-serif text-navy mb-12">Bewezen Impact</h2>
            </FadeIn>
            <div className="space-y-12">
              {[
                {
                  company: "Technisch installatiebedrijf (18 medewerkers)",
                  challenge: "Omzet stagneerde ondanks groeiende vraag door inefficiënte processen.",
                  approach: "Procesoptimalisatie en herstructurering van het salesteam.",
                  result: "34% omzetgroei in 8 maanden."
                },
                {
                  company: "E-commerce merk in scale-up fase",
                  challenge: "Operationele chaos en margeverlies door te snelle groei.",
                  approach: "Implementatie van nieuw leiderschapsteam en KPI-dashboard.",
                  result: "Winstmarge verhoogd met 18% in één jaar."
                }
              ].map((caseStudy, i) => (
                <FadeIn key={i} delay={0.2 + (i * 0.2)} className="bg-white p-8 shadow-sm border border-navy/5">
                  <h4 className="font-serif text-xl text-navy mb-4">{caseStudy.company}</h4>
                  <div className="space-y-3 text-sm font-light text-navy/80">
                    <p><strong className="font-medium text-navy">Uitdaging:</strong> {caseStudy.challenge}</p>
                    <p><strong className="font-medium text-navy">Aanpak:</strong> {caseStudy.approach}</p>
                    <p className="text-sage font-medium pt-2 border-t border-navy/5 mt-4"><strong className="text-navy">Resultaat:</strong> {caseStudy.result}</p>
                  </div>
                </FadeIn>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Over Mij Section */}
      <section id="over" className="py-24 md:py-32 bg-navy text-warmwhite overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 md:px-12 grid md:grid-cols-2 gap-16 items-center">
          <FadeIn className="relative">
            <img 
              src="https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=800" 
              alt="Vincent Vermeer" 
              className="w-full max-w-md mx-auto object-cover aspect-[4/5] grayscale-[20%]"
              referrerPolicy="no-referrer"
            />
            <div className="absolute -bottom-6 -right-6 w-full h-full border border-champagne/30 -z-10 hidden md:block"></div>
          </FadeIn>
          
          <div>
            <FadeIn delay={0.2}>
              <h2 className="text-4xl md:text-5xl font-serif mb-2">Vincent Vermeer</h2>
              <p className="text-champagne font-medium tracking-widest uppercase text-sm mb-8">Managing Partner</p>
            </FadeIn>
            
            <FadeIn delay={0.3}>
              <p className="text-warmwhite/80 font-light leading-relaxed text-lg mb-8">
                "Na 15 jaar in het bedrijfsleven — waarvan 8 als operationeel directeur bij een scale-up — heb ik in 2016 Vermeer & Partners opgericht. Mijn overtuiging: de meeste ondernemers hebben geen gebrek aan ambitie, maar aan een helder plan en iemand die ze daarop uitdaagt."
              </p>
            </FadeIn>

            <FadeIn delay={0.4} className="space-y-4">
              {[
                "Rotterdam School of Management",
                "ICF Certified Coach",
                "Ex-COO TechNova (€12M omzet)",
                "Gastdocent Erasmus Universiteit"
              ].map((cred, i) => (
                <div key={i} className="flex items-center gap-3 text-warmwhite/70 font-light">
                  <Check size={16} className="text-champagne" />
                  <span>{cred}</span>
                </div>
              ))}
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Werkwijze Section */}
      <section id="werkwijze" className="py-24 md:py-32 bg-offwhite">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <FadeIn className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-serif text-navy mb-6">Het Proces</h2>
            <p className="text-navy/70 font-light max-w-2xl mx-auto">Een gestructureerde aanpak voor maximale helderheid en resultaat.</p>
          </FadeIn>

          <div className="grid md:grid-cols-4 gap-8 relative">
            <div className="hidden md:block absolute top-6 left-0 w-full h-px bg-navy/10"></div>
            {[
              {
                step: "01",
                title: "Kennismaking",
                desc: "Een vrijblijvend gesprek van 30 minuten. We bespreken waar je staat en wat je wilt bereiken."
              },
              {
                step: "02",
                title: "Diagnose",
                desc: "Ik duik in je cijfers, je team en je processen. Waar zit de hefboom?"
              },
              {
                step: "03",
                title: "Plan",
                desc: "Een concreet strategisch plan met prioriteiten, KPI's en tijdlijn."
              },
              {
                step: "04",
                title: "Begeleiding",
                desc: "Hands-on uitvoering. Ik sta naast je bij de implementatie — geen rapport dat in een la verdwijnt."
              }
            ].map((item, i) => (
              <FadeIn key={i} delay={i * 0.15} className="relative pt-8 md:pt-0">
                <div className="md:absolute top-0 left-0 w-12 h-12 bg-offwhite border border-champagne rounded-full flex items-center justify-center text-champagne font-serif text-xl md:-translate-y-1/2 mb-6 md:mb-0 z-10">
                  {item.step}
                </div>
                <div className="md:pt-12">
                  <h4 className="text-xl font-serif text-navy mb-3">{item.title}</h4>
                  <p className="text-navy/70 font-light leading-relaxed text-sm">{item.desc}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 md:py-32 bg-navy text-warmwhite">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="grid md:grid-cols-3 gap-12">
            {[
              {
                quote: "Vincent heeft me geholpen om van 60-urige werkweken naar een bedrijf te gaan dat zonder mij draait. De investering verdien je dubbel en dwars terug.",
                author: "Mark de V.",
                role: "Directeur Installatietechniek"
              },
              {
                quote: "Ik dacht dat ik een marketingprobleem had. Vincent liet me zien dat het een organisatieprobleem was. Drie maanden later was alles anders.",
                author: "Nadia B.",
                role: "Oprichter E-commerce Brand"
              },
              {
                quote: "Geen wollige coaching maar concrete, harde feedback. Precies wat ik nodig had.",
                author: "Stefan R.",
                role: "CEO Logistiek"
              }
            ].map((testimonial, i) => (
              <FadeIn key={i} delay={i * 0.2} className="flex flex-col">
                <div className="text-champagne text-4xl font-serif mb-4">"</div>
                <p className="text-warmwhite/80 font-light leading-relaxed italic mb-8 flex-grow">
                  {testimonial.quote}
                </p>
                <div>
                  <p className="font-serif text-lg">{testimonial.author}</p>
                  <p className="text-champagne text-sm tracking-wide">{testimonial.role}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-24 md:py-32 bg-offwhite">
        <div className="max-w-7xl mx-auto px-6 md:px-12 grid md:grid-cols-2 gap-16">
          <FadeIn>
            <h2 className="text-4xl md:text-5xl font-serif text-navy mb-6">Plan een Kennismaking</h2>
            <p className="text-navy/70 font-light leading-relaxed text-lg mb-12 max-w-md">
              Benieuwd wat strategische begeleiding voor jou kan betekenen? Plan een vrijblijvend kennismakingsgesprek van 30 minuten.
            </p>
            
            <div className="space-y-6">
              <a href="mailto:contact@vermeerpartners.nl" className="flex items-center gap-4 text-navy hover:text-champagne transition-colors">
                <Mail size={20} className="text-champagne" />
                <span className="font-light">contact@vermeerpartners.nl</span>
              </a>
              <a href="tel:+31101234567" className="flex items-center gap-4 text-navy hover:text-champagne transition-colors">
                <Phone size={20} className="text-champagne" />
                <span className="font-light">+31 (0)10 123 45 67</span>
              </a>
              <a href="#" className="flex items-center gap-4 text-navy hover:text-champagne transition-colors">
                <Linkedin size={20} className="text-champagne" />
                <span className="font-light">LinkedIn Profiel</span>
              </a>
            </div>
          </FadeIn>

          <FadeIn delay={0.2} className="bg-white p-8 md:p-10 shadow-sm border border-navy/5">
            <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-medium text-navy uppercase tracking-widest mb-2">Naam</label>
                  <input type="text" className="w-full border-b border-navy/20 bg-transparent py-2 focus:outline-none focus:border-champagne transition-colors font-light" />
                </div>
                <div>
                  <label className="block text-xs font-medium text-navy uppercase tracking-widest mb-2">Bedrijfsnaam</label>
                  <input type="text" className="w-full border-b border-navy/20 bg-transparent py-2 focus:outline-none focus:border-champagne transition-colors font-light" />
                </div>
              </div>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-medium text-navy uppercase tracking-widest mb-2">E-mail</label>
                  <input type="email" className="w-full border-b border-navy/20 bg-transparent py-2 focus:outline-none focus:border-champagne transition-colors font-light" />
                </div>
                <div>
                  <label className="block text-xs font-medium text-navy uppercase tracking-widest mb-2">Telefoon</label>
                  <input type="tel" className="w-full border-b border-navy/20 bg-transparent py-2 focus:outline-none focus:border-champagne transition-colors font-light" />
                </div>
              </div>
              <div>
                <label className="block text-xs font-medium text-navy uppercase tracking-widest mb-2">Waar kan ik je mee helpen?</label>
                <textarea rows={4} className="w-full border-b border-navy/20 bg-transparent py-2 focus:outline-none focus:border-champagne transition-colors font-light resize-none"></textarea>
              </div>
              <button type="submit" className="bg-navy text-warmwhite w-full py-4 text-sm font-medium tracking-widest uppercase hover:bg-champagne transition-colors mt-4">
                Verstuur Aanvraag
              </button>
            </form>
          </FadeIn>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-navy text-warmwhite py-12 border-t border-warmwhite/10">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="grid md:grid-cols-2 gap-8 items-center mb-12">
            <div>
              <div className="font-serif text-2xl tracking-widest mb-2">
                VERMEER <span className="text-champagne">&</span> PARTNERS
              </div>
              <div className="text-warmwhite/60 text-sm tracking-widest uppercase">Strategic Business Advisory</div>
            </div>
            <div className="flex gap-6 md:justify-end">
              <a href="#" className="text-warmwhite/60 hover:text-champagne transition-colors"><Linkedin size={20} /></a>
              <a href="#" className="text-warmwhite/60 hover:text-champagne transition-colors"><Mail size={20} /></a>
              <a href="#" className="text-warmwhite/60 hover:text-champagne transition-colors"><Phone size={20} /></a>
            </div>
          </div>
          
          <div className="flex flex-col md:flex-row justify-between items-center pt-8 border-t border-warmwhite/10 text-xs text-warmwhite/40 font-light gap-4">
            <div className="flex gap-6">
              <span>KVK: 12345678</span>
              <span>BTW: NL123456789B01</span>
            </div>
            <div className="flex gap-6">
              <a href="#" className="hover:text-warmwhite transition-colors">Privacybeleid</a>
              <span>Website door <a href="#" className="text-champagne hover:text-white transition-colors">Ayoub Benmira</a></span>
            </div>
          </div>
        </div>
      </footer>

      {/* Mobile Sticky CTA */}
      <div className="md:hidden fixed bottom-0 left-0 w-full p-4 bg-navy/95 backdrop-blur-md border-t border-warmwhite/10 z-50">
        <button onClick={() => scrollTo('contact')} className="w-full bg-champagne text-navy py-3 text-sm font-medium tracking-widest uppercase text-center">
          Plan een Kennismaking
        </button>
      </div>
    </div>
  );
}
