/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';
import {
  Wrench,
  ShoppingCart,
  PenLine,
  CircleHelp,
  TrendingDown,
  UserX,
  Package,
  Scissors,
  Lightbulb,
  Tag,
  TrendingUp,
  Calculator,
  Truck,
  BookOpen,
  MapPin,
  Star,
  Check,
  ArrowLeft,
  ArrowRight,
  ShieldCheck,
  ChevronDown,
  Clock,
  Lock,
  Sparkles,
  Zap,
  Download,
  CheckCircle2,
  Euro,
  FileCheck
} from 'lucide-react';

const CHECKOUT_URL = "https://checkout.escalepay.com/5759716";

interface CarouselItem {
  id: string;
  title: string;
  image: string;
}

const carouselItems: CarouselItem[] = [
  { id: '1', title: 'Sofá 3 Lugares', image: '/imagens/011-projeto-de-banqueta.webp' },
  { id: '2', title: 'Grelhador & Churrasqueira', image: '/imagens/012-projeto-de-churrasqueira.webp' },
  { id: '3', title: 'Cama Reforçada', image: '/imagens/013-projeto-de-carretinha.webp' },
  { id: '4', title: 'Mesa de Jantar', image: '/imagens/020-projeto-mesa-de-jantar.webp' },
  { id: '5', title: 'Closet Metálico', image: '/imagens/021-projeto-closet.webp' },
  { id: '6', title: 'Móvel Rack TV', image: '/imagens/022-projeto-rack-tv.webp' },
  { id: '7', title: 'Car Transporter', image: '/imagens/023-projeto-car-transporter.webp' },
  { id: '8', title: 'Reboque / Atrelado', image: '/imagens/024-projeto-reboque-carretinha.webp' },
  { id: '9', title: 'Reboque Jetski', image: '/imagens/025-projeto-reboque-jetski.webp' },
];

const galleryModels = [
  { title: 'Projeto de Estante', img: '/imagens/003-projeto-de-estante.png', category: 'Mobiliário' },
  { title: 'Projeto de Cama', img: '/imagens/004-projeto-de-cama.jpg', category: 'Estruturas' },
  { title: 'Projeto de Beliche', img: '/imagens/005-projeto-de-beliche.jpg', category: 'Mobiliário' },
  { title: 'Projeto de Painel', img: '/imagens/006-projeto-de-painel.jpg', category: 'Decoração' },
  { title: 'Projeto de Ginásio', img: '/imagens/007-projeto-de-academia.jpg', category: 'Fitness' },
  { title: 'Projeto de Mesa', img: '/imagens/008-projeto-de-mesa.jpg', category: 'Mobiliário' },
  { title: 'Projeto de Cadeira', img: '/imagens/009-projeto-de-cadeira.jpg', category: 'Mobiliário' },
  { title: 'Projeto de Portão', img: '/imagens/010-projeto-de-portao.jpg', category: 'Portões & Grades' },
  { title: 'Projeto de Banqueta', img: '/imagens/011-projeto-de-banqueta.webp', category: 'Mobiliário' },
  { title: 'Projeto de Churrasqueira', img: '/imagens/012-projeto-de-churrasqueira.webp', category: 'Lazer' },
  { title: 'Projeto de Atrelado', img: '/imagens/013-projeto-de-carretinha.webp', category: 'Reboques' },
];

export default function App() {
  const [activeFaq, setActiveFaq] = useState<number | null>(null);
  const [carouselIndex, setCarouselIndex] = useState(0);
  const [showStickyCta, setShowStickyCta] = useState(false);
  const [timeLeft, setTimeLeft] = useState({ hours: 3, minutes: 24, seconds: 18 });

  // Countdown timer simulation for conversion urgency
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.seconds > 0) return { ...prev, seconds: prev.seconds - 1 };
        if (prev.minutes > 0) return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        if (prev.hours > 0) return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        return { hours: 2, minutes: 45, seconds: 30 };
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Show sticky CTA when scrolling past hero
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 400) {
        setShowStickyCta(true);
      } else {
        setShowStickyCta(false);
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Smooth scroll handler to the offer section
  const scrollToOffer = (e?: React.MouseEvent) => {
    if (e) e.preventDefault();
    const offerElement = document.getElementById('pricing') || document.getElementById('oferta');
    if (offerElement) {
      offerElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const nextSlide = () => {
    setCarouselIndex(prev => (prev + 1) % carouselItems.length);
  };

  const prevSlide = () => {
    setCarouselIndex(prev => (prev - 1 + carouselItems.length) % carouselItems.length);
  };

  const toggleFaq = (index: number) => {
    setActiveFaq(prev => prev === index ? null : index);
  };

  return (
    <div className="min-h-screen bg-[#0b0f14] text-[#f5f7fa] font-body selection:bg-amber-500 selection:text-black">
      
      {/* Top Notification Bar */}
      <div className="bg-gradient-to-r from-amber-600 via-orange-500 to-amber-700 text-black py-2 px-4 text-xs sm:text-sm font-bold tracking-wide text-center flex items-center justify-center gap-2 shadow-md">
        <span className="animate-pulse">⚡</span>
        <span>OFERTA DE LANÇAMENTO EM PORTUGAL: <strong>6.90€</strong> SÓ HOJE!</span>
        <span className="hidden md:inline-block font-mono bg-black/20 px-2 py-0.5 rounded text-white text-xs">
          Termina em {String(timeLeft.hours).padStart(2, '0')}:{String(timeLeft.minutes).padStart(2, '0')}:{String(timeLeft.seconds).padStart(2, '0')}
        </span>
      </div>

      {/* Main Navigation Header */}
      <header className="sticky top-0 z-50 bg-[#0b0f14]/90 backdrop-blur-md border-b border-[#202b37]">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
            <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center text-black shadow-lg shadow-orange-500/20">
              <Wrench className="w-5 h-5 text-[#0b0f14]" />
            </div>
            <div>
              <span className="font-heading text-xl font-bold uppercase tracking-wider text-white">
                Pack Tesouro
              </span>
              <span className="hidden sm:block text-[10px] text-amber-400 font-semibold tracking-widest uppercase">
                do Serralheiro
              </span>
            </div>
          </div>

          <button
            onClick={scrollToOffer}
            className="btn-primary-gradient text-[#0b0f14] font-heading px-5 py-2.5 rounded-lg font-bold text-sm tracking-wide flex items-center gap-2 shadow-lg cursor-pointer"
          >
            <ShoppingCart className="w-4 h-4" />
            <span>Comprar Agora</span>
          </button>
        </div>
      </header>

      {/* Hero Section */}
      <section className="pt-12 sm:pt-16 pb-16 px-4 text-center relative overflow-hidden">
        {/* Subtle background glow */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-amber-500/10 blur-[130px] pointer-events-none rounded-full" />
        
        <div className="max-w-4xl mx-auto relative z-10">
          <div className="inline-flex items-center gap-2 bg-[#141c25] border border-amber-500/40 text-amber-400 px-3.5 py-1.5 rounded-full text-xs sm:text-sm font-semibold mb-6">
            <Sparkles className="w-4 h-4 text-amber-400" />
            <span>Mais de 1.480 Serralheiros já descarregaram em Portugal</span>
          </div>

          <h1 className="font-heading text-4xl sm:text-6xl md:text-7xl font-extrabold uppercase text-[#ff9500] leading-[1.08] mb-6 drop-shadow-sm">
            Pack Tesouro do Serralheiro
          </h1>

          <p className="text-lg sm:text-2xl text-[#f5f7fa] font-bold mb-8 max-w-3xl mx-auto">
            + de 3000 Projetos prontos de serralharia para{' '}
            <span className="text-[#ff9500] underline decoration-[#ff9500]/50 decoration-2 underline-offset-4">
              copiar, fabricar e vender
            </span>
          </p>

          {/* Hero Featured Mockup */}
          <div className="my-8 max-w-2xl mx-auto rounded-2xl overflow-hidden border-2 border-amber-500/30 shadow-2xl shadow-black/80 bg-[#121922] transition-transform hover:scale-[1.01]">
            <img
              src="/imagens/001-pack-tesouro-do-serralheiro-projetos-prontos.webp"
              alt="Pack Tesouro do Serralheiro - Projetos prontos"
              className="w-full h-auto object-cover"
              loading="eager"
            />
          </div>

          <p className="text-muted-foreground max-w-2xl mx-auto mb-8 text-base sm:text-lg leading-relaxed">
            Não é curso. São projetos testados, com medidas, lista de material, custo e lucro estimado. Tudo pronto para fabricar e vender.
          </p>

          <div className="flex flex-col items-center gap-4">
            <button
              onClick={scrollToOffer}
              className="btn-primary-gradient inline-flex items-center justify-center gap-3 text-[#0b0f14] px-8 sm:px-12 py-4 rounded-xl font-heading text-xl sm:text-2xl font-bold uppercase tracking-wider hover:opacity-95 transition-all cursor-pointer w-full sm:w-auto shadow-xl shadow-orange-500/25"
            >
              <Zap className="w-6 h-6 fill-current" />
              <span>Quero o Pack Agora</span>
            </button>

            <div className="flex flex-wrap items-center justify-center gap-4 text-xs sm:text-sm text-gray-400 mt-2">
              <span className="flex items-center gap-1.5">
                <Check className="w-4 h-4 text-amber-400" /> Acesso Vitalício
              </span>
              <span className="flex items-center gap-1.5">
                <Check className="w-4 h-4 text-amber-400" /> Download Imediato
              </span>
              <span className="flex items-center gap-1.5">
                <Check className="w-4 h-4 text-amber-400" /> Garantia de 7 Dias
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Section 2: Pain Points (Identifica-se com isto?) */}
      <section className="py-16 px-4 section-dark border-y border-[#1c2631]">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="font-heading text-3xl sm:text-4xl font-bold uppercase text-[#ff9500] mb-3">
            Identifica-se com isto?
          </h2>
          <p className="mb-12 text-lg text-[#94a3b8]">
            O problema não é falta de serviço. É falta de projeto certo.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-[#121922] border border-[#202b37] rounded-xl p-6 text-left hover:border-amber-500/50 transition-all group">
              <div className="w-12 h-12 rounded-lg bg-amber-500/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <PenLine className="w-6 h-6 text-[#ff9500]" />
              </div>
              <h3 className="font-heading font-semibold text-white mb-2 text-2xl">
                Perde tempo a desenhar
              </h3>
              <p className="text-[#94a3b8] text-base leading-relaxed">
                Horas no papel ou no computador a tentar criar projetos do zero, errando nas medidas e desperdiçando ferro.
              </p>
            </div>

            <div className="bg-[#121922] border border-[#202b37] rounded-xl p-6 text-left hover:border-amber-500/50 transition-all group">
              <div className="w-12 h-12 rounded-lg bg-amber-500/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <CircleHelp className="w-6 h-6 text-[#ff9500]" />
              </div>
              <h3 className="font-heading font-semibold text-white mb-2 text-2xl">
                Não sabe o que fabricar
              </h3>
              <p className="text-[#94a3b8] text-base leading-relaxed">
                Fica sem ideias de produtos modernos e práticos que realmente vendem no mercado com alta procura.
              </p>
            </div>

            <div className="bg-[#121922] border border-[#202b37] rounded-xl p-6 text-left hover:border-amber-500/50 transition-all group">
              <div className="w-12 h-12 rounded-lg bg-amber-500/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <TrendingDown className="w-6 h-6 text-[#ff9500]" />
              </div>
              <h3 className="font-heading font-semibold text-white mb-2 text-2xl">
                Lucro baixo
              </h3>
              <p className="text-[#94a3b8] text-base leading-relaxed">
                Fabrica peças sem saber o custo real do material e acaba por vender demasiado barato e sem margem.
              </p>
            </div>

            <div className="bg-[#121922] border border-[#202b37] rounded-xl p-6 text-left hover:border-amber-500/50 transition-all group">
              <div className="w-12 h-12 rounded-lg bg-amber-500/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <UserX className="w-6 h-6 text-[#ff9500]" />
              </div>
              <h3 className="font-heading font-semibold text-white mb-2 text-2xl">
                Perde clientes
              </h3>
              <p className="text-[#94a3b8] text-base leading-relaxed">
                Sem um catálogo profissional com fotos e modelos prontos, o cliente não confia e fecha com o concorrente.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Section 3: What is the Pack? (O que é o Pack?) */}
      <section className="py-16 px-4">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="font-heading text-3xl sm:text-4xl font-bold uppercase text-[#ff9500] mb-4">
            O que é o Pack?
          </h2>
          <p className="text-[#94a3b8] mb-6 max-w-3xl mx-auto text-base sm:text-lg leading-relaxed">
            É um pacote completo com <strong>+ de 3000 projetos de serralharia prontos</strong>, organizados por categoria, com medidas milimétricas, material necessário, custo aproximado e sugestão de preço de venda.
          </p>
          <div className="inline-block bg-[#141c25] border border-amber-500/30 px-6 py-3 rounded-xl mb-10">
            <p className="text-white font-semibold text-base sm:text-lg">
              ✨ Não precisa de aprender teoria. Basta copiar o projeto, fabricar e vender.
            </p>
          </div>

          <div className="max-w-2xl mx-auto rounded-2xl overflow-hidden border border-[#202b37] shadow-xl bg-[#121922]">
            <img
              src="/imagens/002-pack-tesouro-do-serralheiro.webp"
              alt="Pack Tesouro do Serralheiro"
              className="w-full h-auto object-cover"
              loading="lazy"
            />
          </div>
        </div>
      </section>

      {/* Section 4: Models Showcase (Veja alguns modelos:) */}
      <section className="py-16 px-4 section-dark border-y border-[#1c2631]">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="font-heading text-3xl sm:text-4xl font-bold uppercase text-[#ff9500] mb-3">
            Veja alguns modelos:
          </h2>
          <p className="text-[#94a3b8] mb-10 font-medium text-base sm:text-lg">
            + 3000 projetos em diversas categorias para fabricar imediatamente!
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {galleryModels.map((item, idx) => (
              <div
                key={idx}
                className="group relative overflow-hidden rounded-xl border border-[#202b37] bg-[#121922] hover:border-amber-500/50 transition-all duration-300 hover:-translate-y-1 shadow-md hover:shadow-xl"
              >
                <div className="aspect-[4/3] w-full overflow-hidden bg-black/40 flex items-center justify-center p-2">
                  <img
                    src={item.img}
                    alt={item.title}
                    className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300"
                    loading="lazy"
                  />
                </div>
                <div className="p-4 text-left border-t border-[#202b37] flex items-center justify-between bg-[#121922]">
                  <div>
                    <span className="text-[11px] font-bold uppercase tracking-wider text-amber-400 block mb-1">
                      {item.category}
                    </span>
                    <h3 className="font-heading font-bold text-white text-lg">
                      {item.title}
                    </h3>
                  </div>
                  <span className="text-xs bg-amber-500/10 text-amber-400 font-semibold px-2 py-1 rounded">
                    Completo
                  </span>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-12">
            <button
              onClick={scrollToOffer}
              className="btn-primary-gradient inline-flex items-center gap-2 text-[#0b0f14] px-8 py-3.5 rounded-xl font-heading text-lg font-bold uppercase tracking-wider cursor-pointer"
            >
              <Download className="w-5 h-5" />
              <span>Descarregar Todos os 3000 Projetos</span>
            </button>
          </div>
        </div>
      </section>

      {/* Section 5: Testimonials (QUEM JÁ COMPROU APROVA:) */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <div className="inline-flex items-center gap-1 mb-3">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-5 h-5 fill-[#ff9500] text-[#ff9500]" />
            ))}
          </div>
          <h2 className="font-heading text-3xl sm:text-4xl font-bold uppercase text-[#ff9500] mb-3">
            QUEM JÁ COMPROU APROVA:
          </h2>
          <p className="text-[#94a3b8] mb-12 text-base sm:text-lg">
            Veja o que dizem serralheiros e profissionais em Portugal que já usam o pack:
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Testimonial 1 */}
            <div className="bg-[#121922] border border-[#202b37] rounded-xl p-6 text-left flex flex-col justify-between hover:border-amber-500/40 transition-colors shadow-lg">
              <div>
                <div className="flex gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-[#ff9500] text-[#ff9500]" />
                  ))}
                </div>
                <p className="text-[#e2e8f0] mb-6 italic text-base leading-relaxed">
                  "Já fiz mais de 30 projetos do pack. O que mais vende são os portões e as grades. Material de primeira qualidade, recomendo a todos os colegas!"
                </p>
              </div>
              <div className="flex items-center gap-3 pt-4 border-t border-[#202b37]">
                <img
                  src="/imagens/014-carlos-silva.jpg"
                  alt="Carlos Silva"
                  className="w-12 h-12 rounded-full object-cover border-2 border-amber-500/40"
                  loading="lazy"
                />
                <div>
                  <p className="font-semibold text-white text-base">Carlos Silva</p>
                  <p className="text-[#94a3b8] text-xs">Porto, Portugal</p>
                </div>
              </div>
            </div>

            {/* Testimonial 2 */}
            <div className="bg-[#121922] border border-[#202b37] rounded-xl p-6 text-left flex flex-col justify-between hover:border-amber-500/40 transition-colors shadow-lg">
              <div>
                <div className="flex gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-[#ff9500] text-[#ff9500]" />
                  ))}
                </div>
                <p className="text-[#e2e8f0] mb-6 italic text-base leading-relaxed">
                  "Melhor investimento que fiz. Os projetos vêm com tudo: medidas certas, lista de material, custo aproximado. É só fabricar e vender ao cliente."
                </p>
              </div>
              <div className="flex items-center gap-3 pt-4 border-t border-[#202b37]">
                <img
                  src="/imagens/015-roberto-almeida.jpg"
                  alt="Roberto Almeida"
                  className="w-12 h-12 rounded-full object-cover border-2 border-amber-500/40"
                  loading="lazy"
                />
                <div>
                  <p className="font-semibold text-white text-base">Roberto Almeida</p>
                  <p className="text-[#94a3b8] text-xs">Lisboa, Portugal</p>
                </div>
              </div>
            </div>

            {/* Testimonial 3 */}
            <div className="bg-[#121922] border border-[#202b37] rounded-xl p-6 text-left flex flex-col justify-between hover:border-amber-500/40 transition-colors shadow-lg">
              <div>
                <div className="flex gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-[#ff9500] text-[#ff9500]" />
                  ))}
                </div>
                <p className="text-[#e2e8f0] mb-6 italic text-base leading-relaxed">
                  "Eu não tinha ideia do que fabricar para aumentar o faturamento. Com o pack, comecei a produzir escadas e corrimãos. A minha faturação triplicou!"
                </p>
              </div>
              <div className="flex items-center gap-3 pt-4 border-t border-[#202b37]">
                <img
                  src="/imagens/016-jose-santos.jpg"
                  alt="José Santos"
                  className="w-12 h-12 rounded-full object-cover border-2 border-amber-500/40"
                  loading="lazy"
                />
                <div>
                  <p className="font-semibold text-white text-base">José Santos</p>
                  <p className="text-[#94a3b8] text-xs">Braga, Portugal</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 6: What's Inside & 4 Bonuses (O QUE VEM DENTRO:) */}
      <section className="py-16 px-4 section-dark border-y border-[#1c2631]">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="font-heading text-3xl sm:text-4xl font-bold uppercase text-[#ff9500] mb-4">
            O QUE VEM DENTRO:
          </h2>
          <p className="text-[#94a3b8] mb-10 text-base sm:text-lg">
            Cada projeto vem estruturado para que qualquer profissional ou iniciante consiga executar:
          </p>

          {/* 6 Key features */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mb-12">
            <div className="flex items-center gap-3 bg-[#121922] border border-[#202b37] rounded-xl p-4">
              <Package className="w-6 h-6 text-[#ff9500] shrink-0" />
              <span className="text-[#f5f7fa] font-medium text-left text-base">
                Lista completa de material
              </span>
            </div>
            <div className="flex items-center gap-3 bg-[#121922] border border-[#202b37] rounded-xl p-4">
              <Scissors className="w-6 h-6 text-[#ff9500] shrink-0" />
              <span className="text-[#f5f7fa] font-medium text-left text-base">
                Esquema de corte detalhado
              </span>
            </div>
            <div className="flex items-center gap-3 bg-[#121922] border border-[#202b37] rounded-xl p-4">
              <Lightbulb className="w-6 h-6 text-[#ff9500] shrink-0" />
              <span className="text-[#f5f7fa] font-medium text-left text-base">
                Dicas de montagem e acabamento
              </span>
            </div>
            <div className="flex items-center gap-3 bg-[#121922] border border-[#202b37] rounded-xl p-4">
              <Euro className="w-6 h-6 text-[#ff9500] shrink-0" />
              <span className="text-[#f5f7fa] font-medium text-left text-base">
                Custo médio de produção
              </span>
            </div>
            <div className="flex items-center gap-3 bg-[#121922] border border-[#202b37] rounded-xl p-4">
              <Tag className="w-6 h-6 text-[#ff9500] shrink-0" />
              <span className="text-[#f5f7fa] font-medium text-left text-base">
                Sugestão de preço de venda
              </span>
            </div>
            <div className="flex items-center gap-3 bg-[#121922] border border-[#202b37] rounded-xl p-4">
              <TrendingUp className="w-6 h-6 text-[#ff9500] shrink-0" />
              <span className="text-[#f5f7fa] font-medium text-left text-base">
                Lucro estimado por peça
              </span>
            </div>
          </div>

          {/* 4 Bonuses Box */}
          <div className="bg-[#121922] border-2 border-amber-500/40 p-6 sm:p-8 max-w-2xl mx-auto rounded-3xl shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/10 blur-2xl rounded-full" />
            <div className="flex items-center justify-center gap-3 mb-6">
              <span className="text-3xl sm:text-4xl">🎁</span>
              <h3 className="font-heading text-2xl sm:text-3xl font-bold text-[#ff9500] uppercase">
                4 Bónus Incluídos Grátis
              </h3>
            </div>

            <div className="space-y-4">
              <div className="flex items-center gap-4 bg-[#18222e] p-4 sm:p-5 border border-amber-500/30 rounded-2xl text-left hover:border-amber-500/60 transition-colors">
                <div className="w-12 h-12 rounded-xl bg-amber-500/20 flex items-center justify-center shrink-0">
                  <Calculator className="w-6 h-6 text-amber-400" />
                </div>
                <div>
                  <span className="text-amber-400 font-heading uppercase tracking-wider text-sm font-extrabold block">
                    Bónus 1
                  </span>
                  <p className="text-white font-semibold text-base sm:text-lg">
                    Folha de cálculo automática de preços e orçamentos
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-4 bg-[#18222e] p-4 sm:p-5 border border-amber-500/30 rounded-2xl text-left hover:border-amber-500/60 transition-colors">
                <div className="w-12 h-12 rounded-xl bg-amber-500/20 flex items-center justify-center shrink-0">
                  <Truck className="w-6 h-6 text-amber-400" />
                </div>
                <div>
                  <span className="text-amber-400 font-heading uppercase tracking-wider text-sm font-extrabold block">
                    Bónus 2
                  </span>
                  <p className="text-white font-semibold text-base sm:text-lg">
                    Lista de fornecedores recomendados
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-4 bg-[#18222e] p-4 sm:p-5 border border-amber-500/30 rounded-2xl text-left hover:border-amber-500/60 transition-colors">
                <div className="w-12 h-12 rounded-xl bg-amber-500/20 flex items-center justify-center shrink-0">
                  <BookOpen className="w-6 h-6 text-amber-400" />
                </div>
                <div>
                  <span className="text-amber-400 font-heading uppercase tracking-wider text-sm font-extrabold block">
                    Bónus 3
                  </span>
                  <p className="text-white font-semibold text-base sm:text-lg">
                    Guia prático: quanto cobrar sem perder serviço
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-4 bg-[#18222e] p-4 sm:p-5 border border-amber-500/30 rounded-2xl text-left hover:border-amber-500/60 transition-colors">
                <div className="w-12 h-12 rounded-xl bg-amber-500/20 flex items-center justify-center shrink-0">
                  <MapPin className="w-6 h-6 text-amber-400" />
                </div>
                <div>
                  <span className="text-amber-400 font-heading uppercase tracking-wider text-sm font-extrabold block">
                    Bónus 4
                  </span>
                  <p className="text-white font-semibold text-base sm:text-lg">
                    Projetos mais pedidos em cidades pequenas e médias
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 7: PRICING / OFFER SECTION (id="pricing" and id="oferta") */}
      {/* CRITICAL: All other CTAs scroll here. THIS button goes to the checkout URL */}
      <section className="py-16 sm:py-20 px-4 relative" id="pricing">
        <div id="oferta" className="absolute -top-20" />
        
        <div className="max-w-lg mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-amber-500/20 border border-amber-500/50 text-amber-400 px-4 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-4 animate-bounce">
            ⚡ OFERTA LIMITADA PARA PORTUGAL
          </div>

          <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl font-bold uppercase text-[#ff9500] mb-3">
            GARANTA JÁ O SEU!
          </h2>
          <p className="text-[#94a3b8] mb-10 text-lg">
            Investimento único · Acesso imediato vitalício
          </p>

          {/* Pricing Card */}
          <div className="bg-[#121922] border-2 border-[#ff9500] rounded-2xl p-6 sm:p-8 relative overflow-hidden shadow-2xl shadow-orange-500/20">
            {/* Top glowing bar */}
            <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-amber-400 via-orange-500 to-amber-600" />

            <div className="inline-block bg-amber-500/20 text-amber-300 font-heading text-xs font-bold tracking-widest px-3 py-1 rounded-full uppercase mb-3">
              Pacote Completo
            </div>

            <h3 className="font-heading font-extrabold uppercase mb-1 text-white text-3xl sm:text-4xl">
              KIT PROFISSIONAL
            </h3>
            <p className="text-[#94a3b8] text-sm mb-6">
              Todos os +3000 Projetos + 4 Bónus Inclusos
            </p>

            {/* Price Box */}
            <div className="my-6 p-4 rounded-xl bg-[#090d12] border border-[#202b37]">
              <div className="text-sm line-through text-[#64748b] mb-1 font-semibold">
                Preço normal: 39.90€
              </div>
              <div className="flex items-center justify-center gap-2">
                <span className="text-xs uppercase text-amber-400 font-bold bg-amber-400/10 px-2 py-0.5 rounded">
                  Hoje apenas
                </span>
                <span className="font-heading text-5xl sm:text-6xl font-extrabold text-[#ff9500]">
                  6.90€
                </span>
              </div>
              <div className="text-xs text-[#94a3b8] mt-2">
                Pagamento único · Sem mensalidades ou anuidades
              </div>
            </div>

            {/* Checklist */}
            <ul className="text-left space-y-3 mb-8 text-sm sm:text-base border-t border-b border-[#202b37] py-6">
              <li className="flex items-start gap-3">
                <Check className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                <span className="text-white font-semibold">+ de 3000 projetos completos com medidas</span>
              </li>
              <li className="flex items-start gap-3">
                <Check className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                <span className="text-white">Folha de cálculo automática de preços e orçamentos</span>
              </li>
              <li className="flex items-start gap-3">
                <Check className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                <span className="text-white">Lista de fornecedores</span>
              </li>
              <li className="flex items-start gap-3">
                <Check className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                <span className="text-white">Guia: quanto cobrar sem perder serviço</span>
              </li>
              <li className="flex items-start gap-3">
                <Check className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                <span className="text-white">Projetos mais pedidos em cidades pequenas e médias</span>
              </li>
              <li className="flex items-start gap-3">
                <Check className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                <span className="text-white">300 Projetos de portões artísticos e industriais</span>
              </li>
              <li className="flex items-start gap-3">
                <Check className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                <span className="text-white">Projetos de atrelados e reboques multiusos</span>
              </li>
              <li className="flex items-start gap-3">
                <Check className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                <span className="text-white">Projetos de reboques/plataformas para carros e barcos</span>
              </li>
              <li className="flex items-start gap-3">
                <Check className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                <span className="text-white">Projetos automóveis e mecânica de precisão</span>
              </li>
              <li className="flex items-start gap-3">
                <Check className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                <span className="text-white">600 projetos de móveis industriais (camas, mesas, estantes)</span>
              </li>
              <li className="flex items-start gap-3">
                <Check className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                <span className="text-white">500 projetos de estruturas rápidas, galpões e telhados</span>
              </li>
              <li className="flex items-start gap-3">
                <Check className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                <span className="text-white">50 projetos de churrasqueiras e grelhadores a carvão</span>
              </li>
              <li className="flex items-start gap-3">
                <Check className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                <span className="text-white">100 projetos de equipamentos de ginásio profissionais</span>
              </li>
              <li className="flex items-start gap-3">
                <Check className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                <span className="text-white">Certificado digital</span>
              </li>
              <li className="flex items-start gap-3">
                <Check className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                <span className="text-amber-400 font-bold">Acesso vitalício imediato (download ilimitado)</span>
              </li>
            </ul>

            {/* THE DIRECT CHECKOUT LINK */}
            <a
              href={CHECKOUT_URL}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => {
                if (typeof window !== 'undefined' && (window as any).fbq) {
                  (window as any).fbq('track', 'InitiateCheckout', {
                    value: 6.90,
                    currency: 'EUR',
                    content_name: 'Pack Tesouro do Serralheiro'
                  });
                }
              }}
              className="btn-primary-gradient block w-full text-[#0b0f14] py-4 sm:py-5 rounded-xl font-heading text-xl sm:text-2xl font-black uppercase tracking-wider hover:opacity-95 transition-all text-center shadow-2xl cursor-pointer"
            >
              Quero Garantir Agora
            </a>

            <div className="mt-4 flex flex-col items-center gap-2">
              <p className="text-[#94a3b8] text-xs flex items-center justify-center gap-1.5">
                <Lock className="w-3.5 h-3.5 text-emerald-400" />
                <span>Pagamento 100% seguro com encriptação bancária</span>
              </p>
              <p className="text-amber-400/90 text-xs font-medium">
                Acesso imediato enviado pelo WhatsApp ou e-mail
              </p>
              
              {/* Payment methods badges */}
              <div className="flex items-center justify-center gap-2 mt-2 pt-2 border-t border-[#202b37] w-full text-[11px] text-[#64748b] font-medium">
                <span>MB WAY</span>
                <span>•</span>
                <span>Multibanco</span>
                <span>•</span>
                <span>Cartão Visa / Mastercard</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 8: Interactive Carousel: "Projeto para a vida toda" */}
      <section className="py-16 px-4 section-dark border-y border-[#1c2631]">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="font-heading text-3xl sm:text-4xl font-bold uppercase text-[#ff9500] mb-3">
            Projeto para a vida toda
          </h2>
          <p className="text-[#94a3b8] mb-10 text-base sm:text-lg">
            Lembrando: São mais de 3000 projetos organizados e prontos para consulta!
          </p>

          {/* Interactive Carousel */}
          <div className="relative w-full max-w-4xl mx-auto">
            {/* Carousel Container */}
            <div className="overflow-hidden rounded-2xl bg-[#121922] border border-[#202b37] p-4 sm:p-6 shadow-xl">
              <div className="flex flex-col sm:flex-row items-center gap-6">
                <div className="w-full sm:w-1/2 aspect-video sm:aspect-square rounded-xl overflow-hidden bg-black/60 flex items-center justify-center border border-[#202b37]">
                  <img
                    src={carouselItems[carouselIndex].image}
                    alt={carouselItems[carouselIndex].title}
                    className="w-full h-full object-contain p-2"
                    loading="lazy"
                  />
                </div>
                <div className="w-full sm:w-1/2 text-left flex flex-col justify-center">
                  <span className="text-amber-400 text-xs font-bold uppercase tracking-widest mb-1">
                    Projeto em Destaque {carouselIndex + 1} de {carouselItems.length}
                  </span>
                  <h3 className="font-heading text-2xl sm:text-3xl font-bold text-white uppercase mb-3">
                    {carouselItems[carouselIndex].title}
                  </h3>
                  <p className="text-[#94a3b8] text-sm sm:text-base mb-6 leading-relaxed">
                    Inclui esquema de medidas completas, especificações técnicas de perfis tubulares e chapas, sequência de corte e montagem passo a passo.
                  </p>
                  
                  {/* Thumbnails preview */}
                  <div className="flex items-center gap-2 overflow-x-auto pb-2 mb-4 scrollbar-none">
                    {carouselItems.map((item, idx) => (
                      <button
                        key={item.id}
                        onClick={() => setCarouselIndex(idx)}
                        className={`w-12 h-12 rounded-lg overflow-hidden border shrink-0 transition-all cursor-pointer ${
                          carouselIndex === idx ? 'border-amber-400 scale-105' : 'border-[#202b37] opacity-60 hover:opacity-100'
                        }`}
                      >
                        <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
                      </button>
                    ))}
                  </div>

                  <div className="flex items-center gap-3">
                    <button
                      onClick={prevSlide}
                      className="w-10 h-10 rounded-full bg-[#18222e] border border-[#202b37] text-white hover:border-amber-400 hover:text-amber-400 flex items-center justify-center transition-colors cursor-pointer"
                      aria-label="Slide anterior"
                    >
                      <ArrowLeft className="w-5 h-5" />
                    </button>
                    <button
                      onClick={nextSlide}
                      className="w-10 h-10 rounded-full bg-[#18222e] border border-[#202b37] text-white hover:border-amber-400 hover:text-amber-400 flex items-center justify-center transition-colors cursor-pointer"
                      aria-label="Slide seguinte"
                    >
                      <ArrowRight className="w-5 h-5" />
                    </button>
                    <span className="text-xs text-[#94a3b8] ml-2">
                      Use as setas para explorar mais modelos
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 9: 7 Days Guarantee (Garantia de 7 dias) */}
      <section className="py-16 px-4">
        <div className="max-w-3xl mx-auto text-center bg-[#121922] border border-amber-500/30 rounded-3xl p-8 sm:p-12 shadow-xl relative overflow-hidden">
          <div className="w-20 h-20 rounded-full bg-amber-500/10 border border-amber-500/30 flex items-center justify-center mx-auto mb-6 text-amber-400 shadow-inner">
            <ShieldCheck className="w-10 h-10" />
          </div>
          <h2 className="font-heading text-3xl sm:text-4xl font-bold uppercase text-[#ff9500] mb-6">
            Garantia de 7 dias
          </h2>
          <p className="text-[#94a3b8] text-base sm:text-lg leading-relaxed max-w-2xl mx-auto mb-8">
            Se dentro de 7 dias sentir que o Pack Tesouro do Serralheiro não é para si, basta solicitar o reembolso diretamente na plataforma e devolvemos 100% do seu dinheiro. Sem perguntas, sem burocracia. O risco é todo nosso.
          </p>

          <button
            onClick={scrollToOffer}
            className="btn-primary-gradient inline-flex items-center gap-2 text-[#0b0f14] px-8 py-3.5 rounded-xl font-heading text-lg font-bold uppercase tracking-wider cursor-pointer"
          >
            <CheckCircle2 className="w-5 h-5" />
            <span>Garantir com Risco Zero</span>
          </button>
        </div>
      </section>

      {/* Section 10: FAQ (Perguntas Frequentes) */}
      <section className="py-16 px-4 section-dark border-t border-[#1c2631]">
        <div className="max-w-3xl mx-auto">
          <h2 className="font-heading text-3xl sm:text-4xl font-bold uppercase text-[#ff9500] mb-10 text-center">
            Perguntas Frequentes
          </h2>

          <div className="space-y-4">
            {/* FAQ 1 */}
            <div className="bg-[#121922] border border-[#202b37] rounded-xl overflow-hidden transition-all">
              <button
                type="button"
                onClick={() => toggleFaq(0)}
                className="w-full flex items-center justify-between p-5 text-left font-heading text-white text-lg sm:text-xl font-semibold hover:text-amber-400 transition-colors cursor-pointer"
              >
                <span>Quais as formas de Pagamento?</span>
                <ChevronDown className={`w-5 h-5 text-amber-400 transition-transform duration-200 shrink-0 ${activeFaq === 0 ? 'rotate-180' : ''}`} />
              </button>
              {activeFaq === 0 && (
                <div className="px-5 pb-5 text-[#94a3b8] text-base border-t border-[#202b37]/60 pt-4 leading-relaxed animate-in fade-in duration-200">
                  Pode pagar com Cartão de Crédito/Débito, MB WAY, Multibanco ou através do checkout seguro EscalenPay. O processamento é 100% seguro com confirmação instantânea.
                </div>
              )}
            </div>

            {/* FAQ 2 */}
            <div className="bg-[#121922] border border-[#202b37] rounded-xl overflow-hidden transition-all">
              <button
                type="button"
                onClick={() => toggleFaq(1)}
                className="w-full flex items-center justify-between p-5 text-left font-heading text-white text-lg sm:text-xl font-semibold hover:text-amber-400 transition-colors cursor-pointer"
              >
                <span>Como recebo o Pack?</span>
                <ChevronDown className={`w-5 h-5 text-amber-400 transition-transform duration-200 shrink-0 ${activeFaq === 1 ? 'rotate-180' : ''}`} />
              </button>
              {activeFaq === 1 && (
                <div className="px-5 pb-5 text-[#94a3b8] text-base border-t border-[#202b37]/60 pt-4 leading-relaxed animate-in fade-in duration-200">
                  O acesso é imediato! Assim que o pagamento de 6.90€ for concluído, receberá automaticamente o link de acesso aos ficheiros no seu e-mail e também pelo WhatsApp. Pode descarregar tudo para o seu telemóvel, tablet ou computador.
                </div>
              )}
            </div>

            {/* FAQ 3 */}
            <div className="bg-[#121922] border border-[#202b37] rounded-xl overflow-hidden transition-all">
              <button
                type="button"
                onClick={() => toggleFaq(2)}
                className="w-full flex items-center justify-between p-5 text-left font-heading text-white text-lg sm:text-xl font-semibold hover:text-amber-400 transition-colors cursor-pointer"
              >
                <span>Ainda não recebi o Pack, o que fazer?</span>
                <ChevronDown className={`w-5 h-5 text-amber-400 transition-transform duration-200 shrink-0 ${activeFaq === 2 ? 'rotate-180' : ''}`} />
              </button>
              {activeFaq === 2 && (
                <div className="px-5 pb-5 text-[#94a3b8] text-base border-t border-[#202b37]/60 pt-4 leading-relaxed animate-in fade-in duration-200">
                  Verifique a sua caixa de Spam ou Lixo Eletrónico no e-mail utilizado na compra. Caso ainda assim não o encontre, não se preocupe: a nossa equipa de apoio ao cliente está pronta para lhe reenviar os links de acesso imediatamente.
                </div>
              )}
            </div>

            {/* FAQ 4 */}
            <div className="bg-[#121922] border border-[#202b37] rounded-xl overflow-hidden transition-all">
              <button
                type="button"
                onClick={() => toggleFaq(3)}
                className="w-full flex items-center justify-between p-5 text-left font-heading text-white text-lg sm:text-xl font-semibold hover:text-amber-400 transition-colors cursor-pointer"
              >
                <span>E se eu estiver com dúvidas?</span>
                <ChevronDown className={`w-5 h-5 text-amber-400 transition-transform duration-200 shrink-0 ${activeFaq === 3 ? 'rotate-180' : ''}`} />
              </button>
              {activeFaq === 3 && (
                <div className="px-5 pb-5 text-[#94a3b8] text-base border-t border-[#202b37]/60 pt-4 leading-relaxed animate-in fade-in duration-200">
                  Oferecemos suporte por e-mail e WhatsApp para tirar qualquer dúvida sobre a abertura dos ficheiros, uso das folhas de cálculo de orçamentos e consulta aos projetos.
                </div>
              )}
            </div>

            {/* FAQ 5 */}
            <div className="bg-[#121922] border border-[#202b37] rounded-xl overflow-hidden transition-all">
              <button
                type="button"
                onClick={() => toggleFaq(4)}
                className="w-full flex items-center justify-between p-5 text-left font-heading text-white text-lg sm:text-xl font-semibold hover:text-amber-400 transition-colors cursor-pointer"
              >
                <span>O valor de 6.90€ é pagamento único ou mensalidade?</span>
                <ChevronDown className={`w-5 h-5 text-amber-400 transition-transform duration-200 shrink-0 ${activeFaq === 4 ? 'rotate-180' : ''}`} />
              </button>
              {activeFaq === 4 && (
                <div className="px-5 pb-5 text-[#94a3b8] text-base border-t border-[#202b37]/60 pt-4 leading-relaxed animate-in fade-in duration-200">
                  É um pagamento único de apenas 6.90€! Não existem mensalidades, renovações ou cobranças extras. Paga uma vez e tem acesso vitalício para sempre a todos os projetos e atualizações.
                </div>
              )}
            </div>

            {/* FAQ 6 */}
            <div className="bg-[#121922] border border-[#202b37] rounded-xl overflow-hidden transition-all">
              <button
                type="button"
                onClick={() => toggleFaq(5)}
                className="w-full flex items-center justify-between p-5 text-left font-heading text-white text-lg sm:text-xl font-semibold hover:text-amber-400 transition-colors cursor-pointer"
              >
                <span>Preciso de algum programa específico no computador?</span>
                <ChevronDown className={`w-5 h-5 text-amber-400 transition-transform duration-200 shrink-0 ${activeFaq === 5 ? 'rotate-180' : ''}`} />
              </button>
              {activeFaq === 5 && (
                <div className="px-5 pb-5 text-[#94a3b8] text-base border-t border-[#202b37]/60 pt-4 leading-relaxed animate-in fade-in duration-200">
                  Não! Todos os arquivos vêm em formatos universais (PDFs detalhados com cotas e medidas, imagens em alta definição e planilhas simples), podendo ser abertos no telemóvel Android, iPhone, tablet ou qualquer computador.
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Floating Bottom Sticky Action Bar */}
      {showStickyCta && (
        <div className="fixed bottom-0 left-0 right-0 z-40 bg-[#0b0f14]/95 backdrop-blur-md border-t border-amber-500/30 p-3 sm:p-4 animate-in slide-in-from-bottom duration-300 shadow-2xl">
          <div className="max-w-4xl mx-auto flex items-center justify-between gap-3">
            <div className="hidden sm:block">
              <p className="font-heading text-base font-bold text-white uppercase">
                Pack Tesouro do Serralheiro
              </p>
              <p className="text-xs text-[#94a3b8]">
                +3000 Projetos Prontos · Acesso Vitalício
              </p>
            </div>
            <div className="flex items-center gap-3 w-full sm:w-auto justify-between sm:justify-end">
              <div>
                <span className="text-[10px] text-[#94a3b8] block leading-none">Preço especial:</span>
                <span className="font-heading text-2xl font-extrabold text-[#ff9500]">
                  6.90€
                </span>
              </div>
              <button
                onClick={scrollToOffer}
                className="btn-primary-gradient text-[#0b0f14] font-heading font-bold text-sm sm:text-base px-6 py-2.5 rounded-lg uppercase tracking-wide cursor-pointer shadow-lg flex items-center gap-2"
              >
                <span>Aproveitar Oferta</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="bg-[#070a0e] border-t border-[#1c2631] py-10 px-4 text-center text-xs text-[#64748b]">
        <div className="max-w-4xl mx-auto space-y-4">
          <div className="flex items-center justify-center gap-2 text-white font-heading text-base">
            <Wrench className="w-4 h-4 text-amber-400" />
            <span>Pack Tesouro do Serralheiro</span>
          </div>
          <p className="max-w-xl mx-auto leading-relaxed">
            Este site não tem afiliação com a Meta ou Instagram. Todos os conteúdos, marcas e produtos pertencem aos seus respetivos titulares.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4 text-[#94a3b8] pt-2">
            <span>Termos de Uso</span>
            <span>•</span>
            <span>Política de Privacidade</span>
            <span>•</span>
            <span>Aviso Legal</span>
            <span>•</span>
            <span>Contacto & Suporte</span>
          </div>
          <p className="text-[11px] text-[#475569] pt-2">
            © {new Date().getFullYear()} Pack Tesouro do Serralheiro. Todos os direitos reservados. Edição Portugal.
          </p>
        </div>
      </footer>

    </div>
  );
}
