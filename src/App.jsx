import React, { useState, useEffect, useRef } from 'react';
import { Menu, X, MessageCircle, ChevronDown, ChevronLeft, ChevronRight, Star, Quote, MapPin, Phone, Instagram, Facebook, Globe } from 'lucide-react';
import { data } from './data.js';

const WHATSAPP_URL = data.link_whatsapp;

// --- Hooks & Utility Components ---

const FadeIn = ({ children, delay = 0, className = "" }) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );
    
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`transition-all duration-1000 transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'} ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
};

// --- Components ---

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [logoIndex, setLogoIndex] = useState(0);
  const [logoError, setLogoError] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogoError = () => {
    if (logoIndex < data.imagens_identidade_visual.length - 1) {
      setLogoIndex(logoIndex + 1);
    } else {
      setLogoError(true);
    }
  };

  const navLinks = [
    { label: "Início", href: "#inicio" },
    { label: "Serviços", href: "#servicos" },
    { label: "Espaço", href: "#espaco" },
    { label: "Avaliações", href: "#avaliacoes" },
    { label: "Contato", href: "#contato" },
  ];

  return (
    <header className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${isScrolled ? 'bg-white/95 backdrop-blur-md shadow-sm py-3' : 'bg-transparent py-5'}`}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">
        <a href="#inicio" className="flex-shrink-0 z-50 flex items-center gap-3">
          {!logoError && data.imagens_identidade_visual[logoIndex] ? (
            <img 
              src={data.imagens_identidade_visual[logoIndex]} 
              alt={data.nome} 
              onError={handleLogoError}
              className={`h-12 w-12 rounded-full object-cover shadow-sm transition-all ${isScrolled ? 'border-brand-200 border' : 'border-white/30 border'}`}
              referrerPolicy="no-referrer"
            />
          ) : null}
          <span className={`text-2xl font-bold tracking-tight ${isScrolled ? 'text-brand-900' : 'text-white drop-shadow-md'}`}>
            {data.nome}
          </span>
        </a>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center space-x-8">
          {navLinks.map((link) => (
            <a 
              key={link.label} 
              href={link.href} 
              className={`text-sm font-semibold transition-colors hover:text-accent-DEFAULT ${isScrolled ? 'text-brand-800' : 'text-white drop-shadow-sm'}`}
            >
              {link.label}
            </a>
          ))}
          <a 
            href={data.redes_sociais.instagram}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram"
            className={`transition-colors hover:text-accent-DEFAULT ${isScrolled ? 'text-brand-800' : 'text-white'}`}
          >
            <Instagram size={22} />
          </a>
          <a 
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-accent-DEFAULT hover:bg-accent-hover text-white px-6 py-2.5 rounded-full font-semibold transition-all hover:scale-105 hover:shadow-lg flex items-center gap-2"
          >
            <MessageCircle size={18} />
            Agendar Horário
          </a>
        </nav>

        {/* Mobile Menu Toggle */}
        <button 
          className={`md:hidden z-50 p-2 rounded-full ${isScrolled || mobileMenuOpen ? 'text-brand-900 bg-brand-50' : 'text-white bg-black/20'}`}
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Menu"
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        {/* Mobile Nav */}
        <div className={`fixed inset-0 bg-white z-40 transition-transform duration-300 ease-in-out ${mobileMenuOpen ? 'translate-x-0' : 'translate-x-full'} md:hidden flex flex-col justify-center items-center space-y-6`}>
          {navLinks.map((link) => (
            <a 
              key={link.label} 
              href={link.href} 
              onClick={() => setMobileMenuOpen(false)}
              className="text-2xl font-bold text-brand-900 hover:text-accent-DEFAULT"
            >
              {link.label}
            </a>
          ))}
          <div className="flex gap-4 mt-4">
             <a 
                href={data.redes_sociais.instagram}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setMobileMenuOpen(false)}
                className="bg-brand-100 text-brand-900 p-4 rounded-full hover:bg-brand-200 transition-colors"
              >
                <Instagram size={28} />
             </a>
          </div>
          <a 
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setMobileMenuOpen(false)}
            className="bg-accent-DEFAULT text-white px-8 py-4 rounded-full font-bold text-xl mt-4 flex items-center gap-3 shadow-lg"
          >
            <MessageCircle size={24} />
            Agendar Horário
          </a>
        </div>
      </div>
    </header>
  );
};

const Hero = () => {
  const bgImage = data.fotos_local_maps[0];

  return (
    <section id="inicio" className="relative min-h-[95vh] flex items-center justify-center pt-20">
      {/* Background Image & Overlay */}
      <div className="absolute inset-0 z-0">
        <img 
          src={bgImage} 
          alt={`Interior do estabelecimento ${data.nome} em Butantã`}
          className="w-full h-full object-cover"
          referrerPolicy="no-referrer"
          onError={(e) => { e.target.style.display = 'none'; }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/60 to-black/90"></div>
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 text-center mt-12">
        <FadeIn>
          {data.imagens_identidade_visual[0] && (
            <img 
              src={data.imagens_identidade_visual[0]} 
              alt={`Logotipo do salão de beleza ${data.nome}`}
              className="w-40 h-40 md:w-56 md:h-56 mx-auto mb-8 rounded-full shadow-2xl border-4 border-white/20 object-cover" 
              referrerPolicy="no-referrer"
            />
          )}
          <h1 className="text-4xl sm:text-5xl lg:text-7xl font-extrabold text-white mb-6 text-balance tracking-tight drop-shadow-lg flex flex-col items-center">
            <span className="text-xl sm:text-2xl lg:text-3xl font-semibold text-accent-DEFAULT mb-2 drop-shadow-md">Salão de Beleza Especialista em Butantã, SP</span>
            <span>{data.nome}</span>
          </h1>
        </FadeIn>
        
        <FadeIn delay={150}>
          <p className="text-white/90 text-lg sm:text-xl md:text-2xl font-medium max-w-3xl mx-auto mb-10 text-balance drop-shadow leading-relaxed">
            Especialistas em <span className="text-accent-DEFAULT font-bold">mega hair na fita</span>, saúde capilar, cor e corte. <br className="hidden md:block" />Desde 2011 embelezando vidas em Butantã, SP.
          </p>
        </FadeIn>

        <FadeIn delay={300}>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a 
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto bg-accent-DEFAULT hover:bg-accent-hover text-white px-8 py-4 rounded-full font-bold text-lg transition-all hover:scale-105 hover:shadow-xl flex items-center justify-center gap-2"
            >
              <MessageCircle size={24} />
              Agendar Transformação
            </a>
            <a 
              href={data.redes_sociais.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto bg-gradient-to-tr from-[#f09433] via-[#e6683c] to-[#bc1888] hover:opacity-90 text-white px-8 py-4 rounded-full font-bold text-lg transition-all hover:scale-105 hover:shadow-xl flex items-center justify-center gap-2"
            >
              <Instagram size={24} />
              Veja nosso Instagram
            </a>
          </div>
        </FadeIn>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 animate-bounce hidden md:block">
        <a href="#servicos" aria-label="Rolar para baixo" className="text-white/70 hover:text-white transition-colors">
          <ChevronDown size={36} />
        </a>
      </div>
    </section>
  );
};

const Services = () => (
  <section id="servicos" className="py-20 md:py-32 bg-white">
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
      <FadeIn>
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-5xl font-extrabold text-brand-900 mb-6">Nossos Serviços</h2>
          <div className="w-24 h-1.5 bg-accent-DEFAULT mx-auto rounded-full mb-8"></div>
          <p className="text-brand-600 max-w-2xl mx-auto text-lg md:text-xl text-balance">
            Técnicas exclusivas e atendimento personalizado. Cada detalhe pensado para valorizar a beleza que já existe em você.
          </p>
        </div>
      </FadeIn>

      <div className="flex flex-col gap-20 md:gap-32">
        {data.servicos.map((servico, i) => (
          <FadeIn key={i} delay={100} className={`flex flex-col ${i % 2 === 1 ? 'md:flex-row-reverse' : 'md:flex-row'} items-center gap-8 md:gap-16 group`}>
            <div className="w-full md:w-1/2 overflow-hidden rounded-3xl shadow-xl relative aspect-square md:aspect-auto md:h-[500px]">
              <img 
                src={servico.imagem} 
                alt={servico.titulo} 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000 ease-out" 
                loading="lazy"
              />
              <div className="absolute inset-0 bg-brand-900/0 group-hover:bg-brand-900/10 transition-colors duration-500"></div>
            </div>
            <div className="w-full md:w-1/2 space-y-6">
              <h3 className="text-3xl md:text-4xl font-bold text-brand-900">{servico.titulo}</h3>
              <p className="text-brand-700 leading-relaxed text-lg text-balance">
                {servico.texto}
              </p>
              <div className="pt-4">
                <a 
                  href={WHATSAPP_URL} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="inline-flex font-bold text-accent-DEFAULT hover:text-accent-hover items-center gap-2 text-lg transition-colors group/btn"
                >
                  Agendar {servico.titulo} 
                  <ChevronRight size={20} className="group-hover/btn:translate-x-1 transition-transform" />
                </a>
              </div>
            </div>
          </FadeIn>
        ))}
      </div>
    </div>
  </section>
);

const Gallery = () => {
  const [lightboxIndex, setLightboxIndex] = useState(null);
  const images = data.fotos_local_maps.slice(0, 10);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (lightboxIndex === null) return;
      if (e.key === 'Escape') setLightboxIndex(null);
      if (e.key === 'ArrowRight') setLightboxIndex((prev) => (prev + 1) % images.length);
      if (e.key === 'ArrowLeft') setLightboxIndex((prev) => (prev - 1 + images.length) % images.length);
    };
    window.addEventListener('keydown', handleKeyDown);
    if (lightboxIndex !== null) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = 'auto';
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'auto';
    };
  }, [lightboxIndex, images.length]);

  return (
    <section id="espaco" className="py-20 md:py-32 bg-brand-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <FadeIn>
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-extrabold text-brand-900 mb-6">Conheça o Espaço</h2>
            <div className="w-24 h-1.5 bg-accent-DEFAULT mx-auto rounded-full mb-8"></div>
            <p className="text-brand-600 max-w-2xl mx-auto text-lg md:text-xl text-balance">
              Um ambiente pensado em cada detalhe para o seu conforto, organizado e muito aconchegante.
            </p>
          </div>
        </FadeIn>

        <div className="columns-2 md:columns-3 lg:columns-4 gap-4 space-y-4">
          {images.map((url, i) => (
            <FadeIn key={i} delay={i * 50} className="break-inside-avoid">
              <div 
                className="relative rounded-2xl overflow-hidden cursor-pointer group shadow-sm hover:shadow-2xl transition-all"
                onClick={() => setLightboxIndex(i)}
              >
                <img 
                  src={url} 
                  alt={`Interior do salão de beleza ${data.nome} em Butantã - Detalhe ${i + 1}`}
                  loading="lazy"
                  decoding="async"
                  referrerPolicy="no-referrer"
                  className="w-full h-auto object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                  onError={(e) => { e.target.parentElement.style.display = 'none'; }}
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300"></div>
              </div>
            </FadeIn>
          ))}
        </div>

        <FadeIn delay={200} className="mt-20 text-center">
          <a 
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex bg-brand-900 hover:bg-brand-800 text-white px-10 py-5 rounded-full font-bold text-xl transition-all hover:scale-105 hover:shadow-2xl items-center justify-center gap-3"
          >
            <MessageCircle size={28} />
            Agendar Horário
          </a>
        </FadeIn>
      </div>

      {/* Lightbox */}
      {lightboxIndex !== null && (
        <div className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center backdrop-blur-md">
          <button 
            className="absolute top-6 right-6 text-white/70 hover:text-white transition-colors z-50 p-2"
            onClick={() => setLightboxIndex(null)}
            aria-label="Fechar"
          >
            <X size={36} />
          </button>
          
          <button 
            className="absolute left-2 sm:left-8 top-1/2 -translate-y-1/2 text-white/50 hover:text-white p-2 transition-colors z-50"
            onClick={(e) => { e.stopPropagation(); setLightboxIndex((prev) => (prev - 1 + images.length) % images.length); }}
          >
            <ChevronLeft size={48} />
          </button>

          <img 
            src={images[lightboxIndex]} 
            alt="Foto expandida" 
            className="max-w-full max-h-[90vh] object-contain shadow-2xl rounded-lg"
            referrerPolicy="no-referrer"
          />

          <button 
            className="absolute right-2 sm:right-8 top-1/2 -translate-y-1/2 text-white/50 hover:text-white p-2 transition-colors z-50"
            onClick={(e) => { e.stopPropagation(); setLightboxIndex((prev) => (prev + 1) % images.length); }}
          >
            <ChevronRight size={48} />
          </button>
        </div>
      )}
    </section>
  );
};

const ReviewCard = ({ autor, nota, texto }) => {
  const [expanded, setExpanded] = useState(false);
  const isLongText = texto.length > 180;
  const initial = autor.charAt(0).toUpperCase();

  return (
    <div className="bg-brand-50 rounded-3xl p-8 shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-300 h-full flex flex-col border border-brand-100">
      <div className="flex justify-between items-start mb-6">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 bg-brand-200 text-brand-800 font-bold text-2xl rounded-full flex items-center justify-center flex-shrink-0 shadow-inner">
            {initial}
          </div>
          <div>
            <h3 className="font-bold text-brand-900 text-lg">{autor}</h3>
            <div className="flex text-accent-DEFAULT mt-1 gap-0.5">
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={16} className={i < nota ? 'fill-accent-DEFAULT' : ''} />
              ))}
            </div>
          </div>
        </div>
        <Quote className="text-accent-DEFAULT opacity-40" size={40} />
      </div>
      <div className="flex-grow">
        <p className={`text-brand-800 whitespace-pre-line leading-relaxed text-lg ${!expanded && isLongText ? 'line-clamp-5' : ''}`}>
          "{texto}"
        </p>
      </div>
      {isLongText && (
        <button 
          onClick={() => setExpanded(!expanded)}
          className="text-brand-600 font-bold text-sm mt-4 hover:text-accent-DEFAULT transition-colors text-left flex items-center gap-1"
        >
          {expanded ? 'Ler menos' : 'Ler relato completo'}
        </button>
      )}
    </div>
  );
};

const Reviews = () => {
  return (
    <section id="avaliacoes" className="py-20 md:py-32 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <FadeIn className="text-center mb-20">
          <h2 className="text-4xl md:text-5xl font-extrabold text-brand-900 mb-6">O que dizem nossas clientes</h2>
          <div className="w-24 h-1.5 bg-accent-DEFAULT mx-auto rounded-full mb-8"></div>
          
          <div className="inline-flex flex-col items-center justify-center bg-brand-50 px-10 py-6 rounded-3xl shadow-sm border border-brand-100">
            <h3 className="text-6xl md:text-7xl font-extrabold text-brand-900 mb-2 drop-shadow-sm">{data.nota_geral}</h3>
            <div className="flex text-accent-DEFAULT mb-3 gap-1">
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={32} className={i < Math.floor(data.nota_geral) ? 'fill-accent-DEFAULT drop-shadow-sm' : ''} />
              ))}
            </div>
            <p className="text-lg font-bold text-brand-600">Avaliação geral no Google</p>
          </div>
        </FadeIn>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {data.avaliacoes_destaque.map((rev, i) => (
            <FadeIn key={i} delay={i * 100}>
              <ReviewCard {...rev} />
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
};

const FinalCTA = () => (
  <section className="bg-brand-900 py-20 px-4 relative overflow-hidden">
    <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-5"></div>
    <FadeIn className="max-w-4xl mx-auto text-center relative z-10">
      <h2 className="text-4xl md:text-6xl font-extrabold text-white mb-8 text-balance drop-shadow-md">
        Pronta para a sua transformação?
      </h2>
      <p className="text-brand-200 text-xl md:text-2xl mb-12 max-w-2xl mx-auto text-balance">
        Agende agora mesmo e descubra como podemos realçar a sua beleza de forma única e luxuosa.
      </p>
      <a 
        href={WHATSAPP_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex bg-accent-DEFAULT hover:bg-accent-hover text-white px-12 py-6 rounded-full font-extrabold text-2xl transition-all hover:scale-105 hover:shadow-2xl items-center justify-center gap-4"
      >
        <MessageCircle size={32} />
        Falar com Especialista
      </a>
    </FadeIn>
  </section>
);

const Contact = () => {
  const currentDay = new Date().getDay();
  const dayMap = [
    "domingo", "segunda-feira", "terça-feira", "quarta-feira", "quinta-feira", "sexta-feira", "sábado"
  ];
  const todayString = dayMap[currentDay];

  const mapUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(data.nome_completo_maps + ' ' + data.endereco)}`;

  return (
    <section id="contato" className="py-20 md:py-32 bg-brand-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <FadeIn>
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-extrabold text-brand-900 mb-6">Onde Estamos</h2>
            <div className="w-24 h-1.5 bg-accent-DEFAULT mx-auto rounded-full"></div>
          </div>
        </FadeIn>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Informações */}
          <FadeIn delay={100} className="space-y-12">
            <div className="bg-white p-8 rounded-3xl shadow-sm border border-brand-100">
              <h3 className="text-2xl font-bold text-brand-900 mb-6 flex items-center gap-3">
                <MapPin className="text-accent-DEFAULT" size={32} /> Endereço
              </h3>
              <p className="text-brand-700 text-xl leading-relaxed mb-8 font-medium">
                {data.endereco}
              </p>
              <a 
                href={mapUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex bg-brand-900 hover:bg-brand-800 text-white px-8 py-4 rounded-xl font-bold text-lg transition-all hover:shadow-lg items-center gap-3"
              >
                Abrir no Google Maps
              </a>
            </div>

            <div className="bg-white p-8 rounded-3xl shadow-sm border border-brand-100">
              <h3 className="text-2xl font-bold text-brand-900 mb-6 flex items-center gap-3">
                <Phone className="text-accent-DEFAULT" size={32} /> Telefone / WhatsApp
              </h3>
              <a 
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="text-brand-700 hover:text-accent-DEFAULT text-3xl font-extrabold transition-colors flex items-center gap-3"
              >
                {data.telefone}
              </a>
            </div>
          </FadeIn>

          {/* Horários */}
          <FadeIn delay={200}>
            <div className="bg-white rounded-3xl p-10 shadow-xl border-t-8 border-t-accent-DEFAULT h-full">
              <h3 className="text-3xl font-extrabold text-brand-900 mb-8 text-center">Horário de Funcionamento</h3>
              <div className="space-y-4">
                {data.horarios.map((horario, i) => {
                  const [dia, horas] = horario.split(': ');
                  const isToday = dia.toLowerCase() === todayString;
                  const isClosed = horas.toLowerCase() === 'fechado';

                  return (
                    <div 
                      key={i} 
                      className={`flex justify-between items-center p-4 rounded-xl text-lg ${isToday ? 'bg-brand-100 border border-brand-200 font-bold shadow-sm' : 'border border-transparent hover:bg-brand-50 transition-colors'}`}
                    >
                      <span className={`capitalize ${isToday ? 'text-brand-900' : 'text-brand-600 font-medium'}`}>{dia}</span>
                      <span className={`${isClosed ? 'text-red-500 font-bold' : (isToday ? 'text-brand-900' : 'text-brand-800 font-semibold')}`}>
                        {horas}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
};

const Footer = () => {
  const socialIcons = {
    instagram: Instagram,
    facebook: Facebook,
    site_oficial: Globe
  };

  return (
    <footer className="bg-brand-900 text-white py-16 border-t-[12px] border-accent-DEFAULT">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-10">
          <div className="text-center md:text-left flex flex-col items-center md:items-start gap-4">
            <div className="flex items-center gap-4">
              {data.imagens_identidade_visual[0] && (
                 <img 
                    src={data.imagens_identidade_visual[0]} 
                    alt="Logo" 
                    className="w-16 h-16 rounded-full object-cover border-2 border-white/20"
                    referrerPolicy="no-referrer"
                 />
              )}
              <span className="text-3xl font-extrabold tracking-tight block">{data.nome}</span>
            </div>
            <p className="text-brand-300 text-base max-w-sm leading-relaxed">{data.endereco}</p>
          </div>

          <div className="flex flex-col items-center md:items-end gap-6">
            <h4 className="text-brand-200 font-bold text-lg">Siga nossas redes</h4>
            <div className="flex items-center gap-4">
              {Object.entries(data.redes_sociais).map(([key, url]) => {
                if (!url) return null;
                const Icon = socialIcons[key];
                if (!Icon) return null;
                return (
                  <a 
                    key={key}
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={key}
                    className="w-14 h-14 bg-brand-800 hover:bg-gradient-to-tr hover:from-[#f09433] hover:via-[#e6683c] hover:to-[#bc1888] rounded-full flex items-center justify-center transition-all hover:scale-110 hover:shadow-lg text-white"
                  >
                    <Icon size={28} />
                  </a>
                );
              })}
            </div>
          </div>
        </div>

        <div className="mt-16 pt-8 border-t border-brand-800 text-center text-brand-400 text-sm font-medium">
          &copy; {new Date().getFullYear()} {data.nome}. Todos os direitos reservados.
        </div>
      </div>
    </footer>
  );
};

const WhatsAppFloat = () => (
  <a
    href={WHATSAPP_URL}
    target="_blank"
    rel="noopener noreferrer"
    aria-label="Falar no WhatsApp"
    className="fixed bottom-6 right-6 z-50 bg-[#25D366] hover:bg-[#128C7E] text-white p-5 rounded-full shadow-2xl transition-transform hover:scale-110 animate-pulse-slow"
  >
    <MessageCircle size={36} />
  </a>
);

function App() {
  useEffect(() => {
    document.title = `Salão de Beleza Especialista no Butantã, SP | ${data.nome}`;
    
    let metaDesc = document.querySelector('meta[name="description"]');
    if (!metaDesc) {
      metaDesc = document.createElement('meta');
      metaDesc.name = "description";
      document.head.appendChild(metaDesc);
    }
    metaDesc.content = `${data.nome}: Salão de beleza especialista em Mega Hair na fita, mechas, cor e corte na ${data.endereco.split('-')[1]?.trim() || "Vila Butantã, São Paulo - SP"}. Saúde capilar e sofisticação. Agende agora!`;

    let script = document.querySelector('script[type="application/ld+json"]');
    if (!script) {
      script = document.createElement('script');
      script.type = "application/ld+json";
      document.head.appendChild(script);
    }
    script.textContent = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "BeautySalon",
      "name": data.nome,
      "image": window.location.origin + data.fotos_local_maps[0],
      "@id": window.location.origin,
      "url": window.location.origin,
      "telephone": data.telefone,
      "address": {
        "@type": "PostalAddress",
        "streetAddress": data.endereco.split('-')[0]?.trim(),
        "addressLocality": data.endereco.split('-')[1]?.split(',')[0]?.trim() || "São Paulo",
        "addressRegion": "SP",
        "postalCode": data.endereco.match(/\d{5}-\d{3}/)?.[0] || "",
        "addressCountry": "BR"
      },
      "aggregateRating": {
        "@type": "AggregateRating",
        "ratingValue": data.nota_geral.toString(),
        "reviewCount": data.avaliacoes_destaque.length.toString()
      }
    });
  }, []);

  return (
    <div className="relative overflow-hidden bg-brand-50 min-h-screen">
      <Navbar />
      <main>
        <Hero />
        <Services />
        <Gallery />
        <Reviews />
        <FinalCTA />
        <Contact />
      </main>
      <Footer />
      <WhatsAppFloat />
    </div>
  );
}

export default App;
