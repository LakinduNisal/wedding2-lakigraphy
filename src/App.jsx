import React, { useState, useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ScrollToPlugin } from 'gsap/ScrollToPlugin'
import Lenis from 'lenis'
import {
  ArrowUpRight,
  ChevronLeft,
  ChevronRight,
  Quote,
  Menu as MenuIcon,
  X,
  Check,
  ArrowUp,
  Sparkles,
  Crown,
  Compass,
  Star,
  Award,
  Globe,
  Heart,
  Calendar,
  Volume2,
  ArrowRight
} from 'lucide-react'
import heroImage from './assets/hero-image.jpg'

// Register GSAP plugins safely
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger, ScrollToPlugin)
}

export default function App() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [email, setEmail] = useState('')
  const [subscribed, setSubscribed] = useState(false)
  const [activeTestimonial, setActiveTestimonial] = useState(1)
  const [servicesSlide, setServicesSlide] = useState(0)

  // Main container ref for scoping GSAP context
  const mainRef = useRef(null)
  const lenisRef = useRef(null)

  // Hero Refs
  const heroSectionRef = useRef(null)
  const heroImageRef = useRef(null)
  const heroNavRef = useRef(null)
  const heroContentRef = useRef(null)


  // About Refs
  const aboutSectionRef = useRef(null)
  const aboutImageLeftRef = useRef(null)
  const aboutImageRight1Ref = useRef(null)
  const aboutImageRight2Ref = useRef(null)
  const atelierSealRef = useRef(null)

  // Metrics Counters Refs
  const statsSectionRef = useRef(null)
  const counterRefs = useRef([])

  // Services Refs
  const servicesSectionRef = useRef(null)
  const serviceCardsRef = useRef([])

  // Banner Refs
  const bannerSectionRef = useRef(null)
  const bannerImageRef = useRef(null)

  // Unforgettable Memories Refs
  const unforgettableSectionRef = useRef(null)
  const unforgettableCardsRef = useRef([])

  // Testimonials Refs
  const testimonialsSectionRef = useRef(null)
  const testimonialCardRef = useRef(null)

  // Brand Big Text Ref
  const brandSectionRef = useRef(null)
  const brandWordmarkRef = useRef(null)

  // Footer Ref
  const footerRef = useRef(null)

  // Testimonials data for Wedding & Celebration Studio
  const testimonials = [
    {
      id: 0,
      names: "Marcus & Vivienne",
      location: "Paris, France",
      tagline: "Private Chateau Wedding",
      quote: "The spatial scenography and floral orchestration were nothing short of theatrical perfection. Our international guests were enchanted from twilight until dawn.",
      image: "https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=800&q=80",
      avatar: "https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=150&q=80",
      rating: 5,
    },
    {
      id: 1,
      names: "Elena & Harrison",
      location: "New York & Amalfi",
      tagline: "Villa Belvedere Wedding",
      quote: "Eternia crafted an immersive evening beyond our highest expectations. Every nuance was breathtakingly executed with timeless elegance and poise.",
      image: "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=800&q=80",
      avatar: "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=150&q=80",
      rating: 5,
    },
    {
      id: 2,
      names: "Arthur & Genevieve",
      location: "Geneva & Monaco",
      tagline: "Lake Palace Wedding",
      quote: "From the grand ceremony entrance to the bespoke lighting installation, every moment was captured with cinematic grace and genuine emotion.",
      image: "https://images.unsplash.com/photo-1539025828301-b314ca222fa9?auto=format&fit=crop&w=800&q=80",
      avatar: "https://images.unsplash.com/photo-1539025828301-b314ca222fa9?auto=format&fit=crop&w=150&q=80",
      rating: 5,
    }
  ]

  const services = [
    {
      tag: "TAILORED EXPERIENCES",
      title: "Tailored Wedding Experiences",
      description: "Every wedding is unique. We curate every detail to reflect your personal style and love story, architecting unforgettable moments for you and your guests.",
      image: "https://images.unsplash.com/photo-1537633552985-df8429e8048b?auto=format&fit=crop&w=800&q=80",
      specs: ["Comprehensive Ceremony Design", "Destination Venue Logistics", "Personalized Celebration Direction"]
    },
    {
      tag: "CINEMATOGRAPHY",
      title: "Expert Cinematography",
      description: "Our visionary photographers and cinematographers capture living emotions, tender smiles, and every fleeting, magical glance between bride and groom.",
      image: "https://images.unsplash.com/photo-1591604466107-ec97de577aff?auto=format&fit=crop&w=800&q=80",
      specs: ["Emotional Storytelling", "Drone & Multi-Angle Coverage", "Couture Wedding Albums"]
    },
    {
      tag: "PLANNING & EXECUTION",
      title: "Full-Service Planning",
      description: "From venue selection and couture styling to on-site direction, we oversee every minute detail with quiet discretion, warmth, and seamless precision.",
      image: "https://images.unsplash.com/photo-1544078751-58fee2d8a03b?auto=format&fit=crop&w=800&q=80",
      specs: ["Full Vendor Orchestration", "Timeline & Rehearsal Management", "Stress-Free Day-of Coordination"]
    }
  ]



  // Stats data
  const stats = [
    { value: 380, suffix: "+", label: "Celebrations Produced", subtext: "Across 6 continents" },
    { value: 18, suffix: "", label: "Global Atelier Capitals", subtext: "Paris, Milan, New York, Geneva" },
    { value: 100, suffix: "%", label: "Bespoke Curation", subtext: "Zero templated concepts" },
    { value: 15, suffix: " yr", label: "Heritage of Excellence", subtext: "Est. in Paris" }
  ]

  // Master GSAP Animations Setup & Lenis Smooth Scroll
  useEffect(() => {
    // Only run on client
    if (typeof window === 'undefined') return

    // Initialize Lenis Smooth Scroll
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 2,
      infinite: false
    })
    lenisRef.current = lenis

    // Sync Lenis scroll events with GSAP ScrollTrigger
    lenis.on('scroll', ScrollTrigger.update)

    // Hook Lenis into GSAP's internal ticker for buttery 60/120fps sync
    const updateTicker = (time) => {
      lenis.raf(time * 1000)
    }
    gsap.ticker.add(updateTicker)
    gsap.ticker.lagSmoothing(0)

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReducedMotion) {
      return () => {
        gsap.ticker.remove(updateTicker)
        lenis.destroy()
      }
    }

    const ctx = gsap.context(() => {
      // -------------------------------------------------------------
      // 1. HERO ENTRANCE & PARALLAX SCROLL
      // -------------------------------------------------------------
      const heroTl = gsap.timeline({ defaults: { ease: 'power3.out' } })

      // Initial Image Reveal
      if (heroImageRef.current) {
        heroTl.fromTo(
          heroImageRef.current,
          { scale: 1.18, filter: 'brightness(0.4) contrast(1.15)' },
          { scale: 1.05, filter: 'brightness(0.76) contrast(1.08)', duration: 2.2, ease: 'power2.out' },
          0
        )
      }

      // Nav Slide Down
      if (heroNavRef.current) {
        heroTl.fromTo(
          heroNavRef.current,
          { y: -40, opacity: 0 },
          { y: 0, opacity: 1, duration: 1.2 },
          0.3
        )
      }

      // Hero Content Fade & Slide in
      if (heroContentRef.current) {
        heroTl.fromTo(
          heroContentRef.current,
          { y: 30, opacity: 0 },
          { y: 0, opacity: 1, duration: 1.4, ease: 'power3.out' },
          0.6
        )
      }

      // Hero ScrollTrigger Parallax on Scroll
      if (heroSectionRef.current && heroImageRef.current) {
        gsap.to(heroImageRef.current, {
          yPercent: 22,
          scale: 1.15,
          ease: 'none',
          scrollTrigger: {
            trigger: heroSectionRef.current,
            start: 'top top',
            end: 'bottom top',
            scrub: 1
          }
        })
      }


      // -------------------------------------------------------------
      // 4. SECTION 2: ABOUT / ATELIER REVEAL & MULTI-LAYER PARALLAX
      // -------------------------------------------------------------
      if (aboutSectionRef.current) {
        const aboutElements = aboutSectionRef.current.querySelectorAll('.about-reveal')
        gsap.fromTo(
          aboutElements,
          { y: 50, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 1,
            stagger: 0.15,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: aboutSectionRef.current,
              start: 'top 78%',
              toggleActions: 'play none none none'
            }
          }
        )

        // Parallax depth on about images
        if (aboutImageLeftRef.current) {
          gsap.to(aboutImageLeftRef.current, {
            yPercent: -12,
            ease: 'none',
            scrollTrigger: {
              trigger: aboutSectionRef.current,
              start: 'top bottom',
              end: 'bottom top',
              scrub: 1.2
            }
          })
        }

        if (aboutImageRight1Ref.current) {
          gsap.to(aboutImageRight1Ref.current, {
            yPercent: -20,
            ease: 'none',
            scrollTrigger: {
              trigger: aboutSectionRef.current,
              start: 'top bottom',
              end: 'bottom top',
              scrub: 1.5
            }
          })
        }

        if (aboutImageRight2Ref.current) {
          gsap.to(aboutImageRight2Ref.current, {
            yPercent: -8,
            ease: 'none',
            scrollTrigger: {
              trigger: aboutSectionRef.current,
              start: 'top bottom',
              end: 'bottom top',
              scrub: 1.1
            }
          })
        }

        // Rotating Atelier Seal Badge
        if (atelierSealRef.current) {
          gsap.to(atelierSealRef.current, {
            rotation: 360,
            repeat: -1,
            duration: 25,
            ease: 'none'
          })
        }
      }

      // -------------------------------------------------------------
      // 5. ANIMATED STATS COUNTER STRIP
      // -------------------------------------------------------------
      if (statsSectionRef.current) {
        gsap.fromTo(
          statsSectionRef.current.querySelectorAll('.stat-item'),
          { y: 40, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.9,
            stagger: 0.15,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: statsSectionRef.current,
              start: 'top 82%',
              onEnter: () => {
                // Animate each number count up
                counterRefs.current.forEach((el, idx) => {
                  if (!el) return
                  const target = stats[idx].value
                  const obj = { val: 0 }
                  gsap.to(obj, {
                    val: target,
                    duration: 2.2,
                    ease: 'power2.out',
                    onUpdate: () => {
                      el.innerText = Math.floor(obj.val)
                    }
                  })
                })
              }
            }
          }
        )
      }

      // -------------------------------------------------------------
      // 6. SECTION 3: SERVICES CARDS STAGGER & HOVER MICRO-ANIMATION
      // -------------------------------------------------------------
      if (servicesSectionRef.current) {
        gsap.fromTo(
          servicesSectionRef.current.querySelector('.services-header'),
          { y: 45, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 1,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: servicesSectionRef.current,
              start: 'top 80%'
            }
          }
        )

        const cards = serviceCardsRef.current.filter(Boolean)
        gsap.fromTo(
          cards,
          { y: 70, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 1.1,
            stagger: 0.2,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: servicesSectionRef.current,
              start: 'top 75%'
            }
          }
        )
      }

      // -------------------------------------------------------------
      // 7. SECTION 4: FULL-WIDTH BANNER PARALLAX & ROTATING BADGE
      // -------------------------------------------------------------
      if (bannerSectionRef.current) {
        if (bannerImageRef.current) {
          gsap.to(bannerImageRef.current, {
            scale: 1.16,
            yPercent: 12,
            ease: 'none',
            scrollTrigger: {
              trigger: bannerSectionRef.current,
              start: 'top bottom',
              end: 'bottom top',
              scrub: 1.5
            }
          })
        }

        // Banner text reveal
        const bannerText = bannerSectionRef.current.querySelector('.banner-content')
        if (bannerText) {
          gsap.fromTo(
            bannerText,
            { y: 40, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              duration: 1.1,
              ease: 'power3.out',
              scrollTrigger: {
                trigger: bannerSectionRef.current,
                start: 'top 70%'
              }
            }
          )
        }
      }

      // -------------------------------------------------------------
      // 8. SECTION 5: UNFORGETTABLE MEMORIES (01, 02, 03)
      // -------------------------------------------------------------
      if (unforgettableSectionRef.current) {
        gsap.fromTo(
          unforgettableSectionRef.current.querySelector('.unforgettable-header'),
          { y: 40, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 1,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: unforgettableSectionRef.current,
              start: 'top 80%'
            }
          }
        )

        const memCards = unforgettableCardsRef.current.filter(Boolean)
        gsap.fromTo(
          memCards,
          { y: 60, opacity: 0, scale: 0.95 },
          {
            y: 0,
            opacity: 1,
            scale: 1,
            duration: 1,
            stagger: 0.18,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: unforgettableSectionRef.current,
              start: 'top 75%'
            }
          }
        )
      }

      // -------------------------------------------------------------
      // 9. SECTION 6: TESTIMONIALS SECTION ENTRANCE
      // -------------------------------------------------------------
      if (testimonialsSectionRef.current) {
        gsap.fromTo(
          testimonialsSectionRef.current.querySelector('.testimonials-header'),
          { y: 40, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.9,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: testimonialsSectionRef.current,
              start: 'top 80%'
            }
          }
        )

        gsap.fromTo(
          testimonialsSectionRef.current.querySelector('.testimonials-body'),
          { y: 50, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 1.1,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: testimonialsSectionRef.current,
              start: 'top 75%'
            }
          }
        )
      }

      // -------------------------------------------------------------
      // 10. SECTION 7: GRAND CÉLESTE WORDMARK PARALLAX
      // -------------------------------------------------------------
      if (brandSectionRef.current && brandWordmarkRef.current) {
        gsap.fromTo(
          brandWordmarkRef.current,
          { xPercent: -5, opacity: 0.7 },
          {
            xPercent: 5,
            opacity: 1,
            ease: 'none',
            scrollTrigger: {
              trigger: brandSectionRef.current,
              start: 'top bottom',
              end: 'bottom top',
              scrub: 1.2
            }
          }
        )
      }

      // -------------------------------------------------------------
      // 11. FOOTER REVEAL
      // -------------------------------------------------------------
      if (footerRef.current) {
        gsap.fromTo(
          footerRef.current.querySelectorAll('.footer-col'),
          { y: 40, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.9,
            stagger: 0.15,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: footerRef.current,
              start: 'top 85%'
            }
          }
        )
      }

    }, mainRef) // Scope context to mainRef

    return () => {
      ctx.revert() // Cleanup GSAP animations
      gsap.ticker.remove(updateTicker)
      lenis.destroy()
    }
  }, [])

  // Smooth slide transition for testimonials when changed
  const handleTestimonialChange = (newIndex) => {
    if (testimonialCardRef.current) {
      gsap.fromTo(
        testimonialCardRef.current,
        { opacity: 0.3, scale: 0.97, y: 15 },
        { opacity: 1, scale: 1, y: 0, duration: 0.6, ease: 'power2.out' }
      )
    }
    setActiveTestimonial(newIndex)
  }

  const prevTestimonial = () => {
    handleTestimonialChange(activeTestimonial === 0 ? testimonials.length - 1 : activeTestimonial - 1)
  }

  const nextTestimonial = () => {
    handleTestimonialChange(activeTestimonial === testimonials.length - 1 ? 0 : activeTestimonial + 1)
  }

  const handleSubscribe = (e) => {
    e.preventDefault()
    if (!email) return
    setSubscribed(true)
    setTimeout(() => {
      setEmail('')
      setSubscribed(false)
    }, 4000)
  }

  const scrollToTop = () => {
    gsap.to(window, { scrollTo: 0, duration: 1.2, ease: 'power3.inOut' })
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const currentT = testimonials[activeTestimonial]
  const prevT = testimonials[(activeTestimonial - 1 + testimonials.length) % testimonials.length]
  const nextT = testimonials[(activeTestimonial + 1) % testimonials.length]

  return (
    <div ref={mainRef} className="w-full min-h-screen bg-[#FAF7F2] font-sans antialiased text-[#1C1C1C] selection:bg-[#2A3B5C] selection:text-white relative overflow-x-hidden">

      {/* ================= SECTION 1: FULL SCREEN LUXURY HERO ================= */}
      <header ref={heroSectionRef} className="relative w-full overflow-hidden bg-[#070A10]">

        {/* Hero Background Image with GSAP Scale & Parallax Scrub */}
        <div className="relative w-full h-[90vh] min-h-[660px] max-h-[1100px] overflow-hidden">
          <img
            ref={heroImageRef}
            src={heroImage}
            alt="Eternia Wedding Planning & Celebration"
            fetchPriority="high"
            width="2560"
            height="1600"
            className="w-full h-full object-cover object-[62%_center] will-change-transform"
          />

          {/* Dark shade at the top of the hero section only */}
          <div className="absolute top-0 left-0 right-0 h-48 sm:h-64 bg-gradient-to-b from-black/70 via-black/30 to-transparent pointer-events-none z-10" />

          {/* Soft vignette/gradient across left side to ensure high contrast for typography */}
          <div className="absolute inset-y-0 left-0 w-full sm:w-2/3 md:w-1/2 bg-gradient-to-r from-black/60 via-black/25 to-transparent pointer-events-none z-10" />

          {/* Top Navigation Bar - First Edition Style */}
          <nav ref={heroNavRef} className="absolute top-0 left-0 right-0 z-30">
            <div className="max-w-7xl mx-auto px-6 sm:px-12 py-6 sm:py-8 flex items-center justify-between text-white">
              <a href="#" className="text-white text-base sm:text-lg font-medium tracking-tight hover:opacity-90 transition-opacity">
                Eternia
              </a>

              <button
                onClick={() => setMenuOpen(!menuOpen)}
                className="text-white text-base sm:text-lg font-medium tracking-tight hover:opacity-80 transition-opacity cursor-pointer focus:outline-none"
                aria-label="Toggle menu"
                aria-expanded={menuOpen}
              >
                Menu
              </button>
            </div>
          </nav>

          {/* Hero Section Title & Subtitle at Middle-Left */}
          <div
            ref={heroContentRef}
            className="absolute inset-y-0 left-0 z-20 flex items-center px-6 sm:px-12 lg:px-20 max-w-2xl pointer-events-none"
          >
            <div className="pointer-events-auto">
              <span className="text-[11px] sm:text-xs uppercase tracking-[0.3em] text-[#EADFCF] font-medium block mb-3 drop-shadow-sm">
                Bespoke Wedding Planning & Cinematography
              </span>
              <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-white font-normal leading-[1.08] tracking-tight drop-shadow-[0_4px_24px_rgba(0,0,0,0.6)]">
                Timeless Romance, <br />
                <span className="italic font-light text-[#F4EEE5]">Artfully Crafted.</span>
              </h1>
              <p className="text-sm sm:text-base text-gray-200/90 mt-4 sm:mt-5 max-w-md font-light leading-relaxed drop-shadow-sm">
                Curating unforgettable weddings that capture every emotion, smile, and fleeting glance with poetic artistry.
              </p>
            </div>
          </div>

          {/* Full-bleed Convex Arch Cutout matching First Edition Dome */}
          <div className="absolute -bottom-1 left-0 right-0 w-full overflow-hidden leading-none z-10 pointer-events-none">
            <svg
              viewBox="0 0 1440 100"
              preserveAspectRatio="none"
              className="relative block w-full h-[40px] sm:h-[65px] md:h-[90px] text-[#FAF7F2] fill-current"
            >
              <path d="M0,100 L0,70 Q720,0 1440,70 L1440,100 Z" />
            </svg>
          </div>
        </div>
      </header>


      {/* Slide-out Menu Modal */}
      {menuOpen && (
        <div className="fixed inset-0 z-50 bg-black/65 backdrop-blur-md flex justify-end">
          <div className="w-96 max-w-full bg-[#090D18] text-white p-8 sm:p-12 flex flex-col justify-between shadow-2xl border-l border-white/10 animate-in slide-in-from-right duration-300">
            <div>
              <div className="flex items-center justify-between pb-6 border-b border-gray-800">
                <div>
                  <span className="font-serif text-2xl tracking-[0.2em] uppercase">Eternia</span>
                  <p className="text-[10px] text-gray-400 uppercase tracking-widest mt-1">Bespoke Weddings</p>
                </div>
                <button
                  onClick={() => setMenuOpen(false)}
                  className="p-2 rounded-full hover:bg-white/10 text-gray-300 hover:text-white transition-colors cursor-pointer"
                  aria-label="Close menu"
                >
                  <X size={22} />
                </button>
              </div>

              <div className="flex flex-col gap-6 mt-12 font-serif text-2xl sm:text-3xl">
                <a href="#about" onClick={() => setMenuOpen(false)} className="hover:text-[#D7CBC0] hover:translate-x-2 transition-all flex items-center justify-between group">
                  <span>Our Atelier</span>
                  <ArrowRight size={18} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                </a>
                <a href="#services" onClick={() => setMenuOpen(false)} className="hover:text-[#D7CBC0] hover:translate-x-2 transition-all flex items-center justify-between group">
                  <span>Experiences</span>
                  <ArrowRight size={18} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                </a>
                <a href="#unforgettable" onClick={() => setMenuOpen(false)} className="hover:text-[#D7CBC0] hover:translate-x-2 transition-all flex items-center justify-between group">
                  <span>Why Eternia</span>
                  <ArrowRight size={18} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                </a>
                <a href="#testimonials" onClick={() => setMenuOpen(false)} className="hover:text-[#D7CBC0] hover:translate-x-2 transition-all flex items-center justify-between group">
                  <span>Patrons</span>
                  <ArrowRight size={18} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                </a>
                <a href="#footer" onClick={() => setMenuOpen(false)} className="hover:text-[#D7CBC0] hover:translate-x-2 transition-all flex items-center justify-between group">
                  <span>Concierge</span>
                  <ArrowRight size={18} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                </a>
              </div>
            </div>

            <div className="text-xs text-gray-400 border-t border-gray-800 pt-8">
              <div className="flex items-center gap-2 text-white mb-2">
                <Globe size={14} className="text-[#C5A880]" />
                <span className="tracking-wide">Global Representation</span>
              </div>
              <p className="text-gray-400 leading-relaxed">Paris • New York • Geneva • London</p>
              <p className="mt-3 text-gray-500 font-mono text-[11px]">concierge@eternia-weddings.com</p>
            </div>
          </div>
        </div>
      )}

      {/* ================= SECTION 2: DREAMS COME TRUE / ABOUT ================= */}
      <section id="about" ref={aboutSectionRef} className="w-full px-6 sm:px-12 py-20 sm:py-28 bg-[#FAF7F2] relative">
        <div className="max-w-6xl mx-auto grid grid-cols-12 gap-8 lg:gap-14 items-center">

          {/* Left Image: Bride and groom walking in nature */}
          <div className="col-span-12 sm:col-span-4 flex justify-center sm:justify-start relative">
            <div
              ref={aboutImageLeftRef}
              className="w-full max-w-[300px] sm:max-w-none aspect-[3/4] rounded-3xl overflow-hidden shadow-xl bg-stone-200 will-change-transform relative group"
            >
              <img
                src="https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?auto=format&fit=crop&w=900&q=80"
                alt="Bride and groom walking together outdoors in nature"
                loading="lazy"
                width="900"
                height="1200"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-60" />
              <div className="absolute bottom-4 left-4 right-4 text-white">
                <span className="text-[10px] uppercase tracking-[0.25em] text-[#EADFCF] font-semibold">Bridal Harmony</span>
                <p className="font-serif text-sm">Scenic Ceremony Moments</p>
              </div>
            </div>

            {/* Rotating Circular Seal Badge */}
            <div
              ref={atelierSealRef}
              className="absolute -bottom-6 -right-6 w-24 h-24 sm:w-28 sm:h-28 rounded-full bg-[#0C1222] text-[#EADFCF] p-2 flex items-center justify-center shadow-2xl z-20 select-none border border-[#C5A880]/30 hidden sm:flex"
            >
              <svg className="w-full h-full" viewBox="0 0 100 100">
                <defs>
                  <path
                    id="sealPath"
                    d="M 50, 50 m -37, 0 a 37,37 0 1,1 74,0 a 37,37 0 1,1 -74,0"
                  />
                </defs>
                <text className="text-[9.2px] uppercase tracking-[0.25em] fill-[#EADFCF] font-serif font-normal">
                  <textPath href="#sealPath" startOffset="0%">
                    ETERNIA • BESPOKE WEDDINGS • ATELIER •
                  </textPath>
                </text>
              </svg>
              <div className="absolute inset-0 flex items-center justify-center text-[#C5A880]">
                <Crown size={18} />
              </div>
            </div>
          </div>

          {/* Center Content: Eyebrow, Heading, Subtext, Button */}
          <div className="col-span-12 sm:col-span-5 text-center sm:text-left flex flex-col items-center sm:items-start justify-center px-2">
            <div className="about-reveal inline-flex items-center gap-2 text-xs uppercase tracking-[0.28em] text-[#8C7A6B] font-semibold mb-3">
              <span className="w-6 h-[1px] bg-[#8C7A6B]" />
              <span>Our Core</span>
            </div>

            <h2 className="about-reveal font-serif text-3xl sm:text-4xl lg:text-[44px] leading-[1.18] text-[#141414] font-normal">
              Dedicated To Making Your Dreams Come True.
            </h2>

            <p className="about-reveal text-xs sm:text-sm text-gray-600 mt-5 leading-relaxed max-w-md">
              At our core, we specialize in bringing your vision to life, curating unforgettable weddings that reflect your unique love story. Combining couture scenography and seamless coordination, we celebrate your new chapter.
            </p>

            <div className="about-reveal flex items-center gap-4 mt-8">
              <button
                onClick={() => {
                  const el = document.getElementById('services');
                  el?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="group bg-[#0A1020] text-white text-xs sm:text-sm font-medium px-7 py-3.5 rounded-full hover:bg-[#1C2640] transition-all shadow-md tracking-wider flex items-center gap-3 cursor-pointer"
              >
                <span>More About Us</span>
                <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>

          {/* Right Images: 2 Staggered wedding details photos with Parallax */}
          <div className="col-span-12 sm:col-span-3 flex flex-col gap-6 sm:gap-7 items-center sm:items-end">
            {/* Top: Groom putting ring on bride's finger */}
            <div
              ref={aboutImageRight1Ref}
              className="w-40 sm:w-48 aspect-video rounded-2xl overflow-hidden shadow-lg self-center sm:self-start ml-auto sm:ml-4 will-change-transform group"
            >
              <img
                src="https://images.unsplash.com/photo-1606800052052-a08af7148866?auto=format&fit=crop&w=600&q=80"
                alt="Groom putting wedding ring on bride's finger during marriage ceremony"
                loading="lazy"
                width="600"
                height="338"
                className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-500"
              />
            </div>
            {/* Bottom: Bride and groom smiling lovingly */}
            <div
              ref={aboutImageRight2Ref}
              className="w-48 sm:w-60 aspect-[4/5] rounded-3xl overflow-hidden shadow-xl will-change-transform group"
            >
              <img
                src="https://images.unsplash.com/photo-1522673607200-164d1b6ce486?auto=format&fit=crop&w=700&q=80"
                alt="Bride and groom smiling lovingly at each other during wedding celebration"
                loading="lazy"
                width="700"
                height="875"
                className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-500"
              />
            </div>
          </div>

        </div>
      </section>

      {/* ================= ANIMATED STATS / METRICS COUNTERS ================= */}
      <section
        ref={statsSectionRef}
        className="w-full bg-[#FAF7F2] px-6 sm:px-12 py-8 border-y border-[#EADBCE]/70"
      >
        <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 py-4">
          {stats.map((stat, idx) => (
            <div key={idx} className="stat-item flex flex-col items-center sm:items-start text-center sm:text-left">
              <div className="flex items-baseline font-display text-4xl sm:text-5xl lg:text-6xl text-[#0C1222] font-normal">
                <span ref={(el) => (counterRefs.current[idx] = el)}>0</span>
                <span className="text-[#C5A880] text-3xl sm:text-4xl font-display ml-1">{stat.suffix}</span>
              </div>
              <h3 className="text-xs sm:text-sm font-semibold tracking-wide text-gray-900 mt-2">
                {stat.label}
              </h3>
              <p className="text-[11px] text-gray-500 mt-0.5">
                {stat.subtext}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ================= SECTION 3: 3 SERVICES / EXPERIENCES CARDS ================= */}
      <section id="services" ref={servicesSectionRef} className="w-full px-6 sm:px-12 py-20 sm:py-28 bg-[#FAF7F2]">
        <div className="max-w-6xl mx-auto">
          {/* Section Header with Next/Prev Arrows */}
          <div className="services-header flex flex-col sm:flex-row sm:items-end justify-between mb-12 gap-6">
            <div>
              <div className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.28em] text-[#8C7A6B] font-semibold mb-2">
                <Crown size={14} className="text-[#C5A880]" />
                <span>Signature Capabilities</span>
              </div>
              <h2 className="font-serif text-3xl sm:text-4xl lg:text-[44px] text-[#141414] font-normal leading-tight">
                Dedicated To Making Your Dreams Come True.
              </h2>
            </div>

            <div className="flex items-center gap-3 flex-shrink-0">
              <button
                onClick={() => setServicesSlide((prev) => (prev > 0 ? prev - 1 : 0))}
                className="w-10 h-10 rounded-full border border-gray-400 bg-transparent flex items-center justify-center text-gray-700 hover:text-black hover:border-black transition-all cursor-pointer shadow-xs active:scale-95"
                aria-label="Previous service"
              >
                <ChevronLeft size={18} />
              </button>
              <button
                onClick={() => setServicesSlide((prev) => (prev < 1 ? prev + 1 : 0))}
                className="w-10 h-10 rounded-full bg-[#0A1020] flex items-center justify-center text-white hover:bg-black transition-all cursor-pointer shadow-md active:scale-95"
                aria-label="Next service"
              >
                <ChevronRight size={18} />
              </button>
            </div>
          </div>

          {/* 3 Arched Cards Grid with GSAP Entrance and Hover Depth */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-10">
            {services.map((service, index) => (
              <div
                key={index}
                ref={(el) => (serviceCardsRef.current[index] = el)}
                className="group flex flex-col bg-white rounded-3xl p-5 sm:p-6 shadow-[0_4px_20px_rgba(0,0,0,0.03)] hover:shadow-2xl transition-all duration-500 border border-gray-100/80"
              >
                {/* Image Card with Arched Pill Top */}
                <div className="relative w-full aspect-[3/4] rounded-t-[4rem] rounded-b-2xl overflow-hidden bg-gray-100 shadow-sm">
                  <img
                    src={service.image}
                    alt={service.title}
                    onError={(e) => {
                      e.currentTarget.src = "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=800&q=80";
                    }}
                    loading="lazy"
                    width="800"
                    height="1067"
                    className="w-full h-full object-cover filter brightness-[0.98] group-hover:scale-108 transition-transform duration-700 will-change-transform"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                  {/* Corner Interactive Arrow */}
                  <div className="absolute bottom-4 right-4 w-10 h-10 rounded-full bg-white text-black flex items-center justify-center shadow-lg opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
                    <ArrowUpRight size={18} />
                  </div>
                </div>

                {/* Title and Description */}
                <h3 className="font-serif text-xl sm:text-2xl font-semibold text-[#141414] mt-6 leading-snug group-hover:text-[#2A3B5C] transition-colors">
                  {service.title}
                </h3>
                <p className="text-xs sm:text-sm text-gray-600 mt-2.5 leading-relaxed flex-grow">
                  {service.description}
                </p>

                {/* Specification tags */}
                <div className="mt-6 pt-4 border-t border-gray-100 flex flex-col gap-1.5">
                  {service.specs.map((spec, sIdx) => (
                    <div key={sIdx} className="flex items-center gap-2 text-[11px] text-gray-500">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#C5A880]" />
                      <span>{spec}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= SECTION 4: FULL-WIDTH CELEBRATION BANNER WITH ROTATING BADGE ================= */}
      <section ref={bannerSectionRef} className="w-full px-6 sm:px-12 py-10 sm:py-16 bg-[#FAF7F2]">
        <div className="max-w-7xl mx-auto">
          <div className="relative w-full h-[360px] sm:h-[480px] md:h-[580px] rounded-3xl overflow-hidden shadow-2xl group">
            <img
              ref={bannerImageRef}
              src="https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=2560&q=85"
              alt="Newlywed bride and groom smiling warmly in romantic wedding celebration"
              loading="lazy"
              width="2560"
              height="1600"
              className="w-full h-full object-cover object-center filter brightness-[0.88] will-change-transform"
            />

            {/* Cinematic overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/35 to-black/60 pointer-events-none" />

            {/* Banner Content Reveal */}
            <div className="banner-content absolute top-8 left-8 sm:top-12 sm:left-12 max-w-lg text-white pointer-events-none">
              <span className="text-[10px] sm:text-xs uppercase tracking-[0.3em] text-[#EADFCF] font-semibold">
                Eternia Celebrations
              </span>
              <h3 className="font-serif text-2xl sm:text-3xl md:text-4xl mt-2 font-normal leading-tight drop-shadow-md">
                Where Love Stories Turn Into Timeless Art
              </h3>
            </div>

            {/* Bottom subtitle on banner */}
            <div className="absolute bottom-6 sm:bottom-10 right-6 sm:right-12 text-right text-white/90 pointer-events-none">
              <p className="text-xs uppercase tracking-[0.22em] text-[#D7CBC0]">Worldwide Concierge</p>
              <p className="font-serif text-sm sm:text-base italic">Paris • Venice • Lake Como • Aspen</p>
            </div>
          </div>
        </div>
      </section>


      {/* ================= SECTION 5: UNFORGETTABLE MEMORIES (01, 02, 03) ================= */}
      <section id="unforgettable" ref={unforgettableSectionRef} className="w-full px-6 sm:px-12 py-18 sm:py-26 bg-[#FAF7F2]">
        <div className="max-w-6xl mx-auto">
          <div className="unforgettable-header text-center mb-14 sm:mb-18">
            <span className="text-xs uppercase tracking-[0.28em] text-[#8C7A6B] font-semibold">
              The Eternia Promise
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-[44px] text-[#141414] font-normal max-w-2xl mx-auto leading-tight mt-2">
              Eternia Creates Unforgettable Wedding Memories
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">

            {/* Card 01 */}
            <div
              ref={(el) => (unforgettableCardsRef.current[0] = el)}
              className="bg-white rounded-3xl p-8 sm:p-10 shadow-[0_4px_24px_rgba(0,0,0,0.03)] hover:shadow-2xl transition-all duration-500 flex flex-col justify-between min-h-[300px] relative overflow-hidden group border border-gray-100"
            >
              <div>
                <h3 className="font-serif text-xl sm:text-2xl font-semibold text-[#141414]">
                  Creative Storytelling
                </h3>
                <p className="text-xs sm:text-sm text-gray-500 mt-3 leading-relaxed">
                  Capturing monumental milestones that narrate your personal legacy with theatrical beauty and heart.
                </p>
              </div>
              <div className="flex justify-between items-end mt-10">
                <span className="text-xs uppercase tracking-widest text-[#8C7A6B] font-medium">Stagecraft</span>
                <span className="font-serif text-6xl sm:text-7xl font-light tracking-tighter text-transparent bg-clip-text bg-gradient-to-br from-[#233554]/40 to-[#1e293b] select-none group-hover:scale-110 transition-transform duration-500">
                  01
                </span>
              </div>
            </div>

            {/* Card 02 */}
            <div
              ref={(el) => (unforgettableCardsRef.current[1] = el)}
              className="bg-white rounded-3xl p-8 sm:p-10 shadow-[0_4px_24px_rgba(0,0,0,0.03)] hover:shadow-2xl transition-all duration-500 flex flex-col justify-between min-h-[300px] relative overflow-hidden group border border-gray-100"
            >
              <div>
                <h3 className="font-serif text-xl sm:text-2xl font-semibold text-[#141414]">
                  Design & Planning
                </h3>
                <p className="text-xs sm:text-sm text-gray-500 mt-3 leading-relaxed">
                  Modern, serene, and stress-free wedding experiences architected by our Paris and New York ateliers.
                </p>
              </div>
              <div className="flex justify-between items-end mt-10">
                <span className="text-xs uppercase tracking-widest text-[#8C7A6B] font-medium">Scenography</span>
                <span className="font-serif text-6xl sm:text-7xl font-light tracking-tighter text-transparent bg-clip-text bg-gradient-to-br from-[#233554]/40 to-[#1e293b] select-none group-hover:scale-110 transition-transform duration-500">
                  02
                </span>
              </div>
            </div>

            {/* Card 03 */}
            <div
              ref={(el) => (unforgettableCardsRef.current[2] = el)}
              className="bg-white rounded-3xl p-8 sm:p-10 shadow-[0_4px_24px_rgba(0,0,0,0.03)] hover:shadow-2xl transition-all duration-500 flex flex-col justify-between min-h-[300px] relative overflow-hidden group border border-gray-100"
            >
              <div>
                <h3 className="font-serif text-xl sm:text-2xl font-semibold text-[#141414]">
                  Dedicated Concierge
                </h3>
                <p className="text-xs sm:text-sm text-gray-500 mt-3 leading-relaxed">
                  From the first consultation to the final dawn farewell, our directorship accompanies you with calm poise.
                </p>
              </div>
              <div className="flex justify-between items-end mt-10">
                <span className="text-xs uppercase tracking-widest text-[#8C7A6B] font-medium">Orchestration</span>
                <span className="font-serif text-6xl sm:text-7xl font-light tracking-tighter text-transparent bg-clip-text bg-gradient-to-br from-[#233554]/40 to-[#1e293b] select-none group-hover:scale-110 transition-transform duration-500">
                  03
                </span>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ================= SECTION 6: TESTIMONIALS / PATRONS EXPERIENCE ================= */}
      <section id="testimonials" ref={testimonialsSectionRef} className="w-full px-6 sm:px-12 py-20 sm:py-28 bg-[#FAF7F2]">
        <div className="max-w-6xl mx-auto">
          <div className="testimonials-header text-center mb-14 sm:mb-18">
            <span className="text-xs uppercase tracking-[0.28em] text-[#8C7A6B] font-semibold">
              Love Stories
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-[44px] text-[#141414] font-normal mt-2">
              Couples Share Their Experience
            </h2>
          </div>

          {/* Testimonial Showcase Container */}
          <div className="testimonials-body relative flex items-center justify-center gap-4 sm:gap-6 overflow-hidden py-4">

            {/* Left Preview Card */}
            <div
              onClick={prevTestimonial}
              className="hidden md:flex flex-col justify-end w-48 lg:w-56 h-72 rounded-3xl p-5 text-white shadow-lg cursor-pointer opacity-85 hover:opacity-100 transition-all flex-shrink-0 transform hover:-translate-x-1.5 border border-white/15 relative overflow-hidden group"
            >
              {/* Full box image */}
              <img
                src={prevT.image}
                alt={prevT.names}
                loading="lazy"
                width="800"
                height="1067"
                className="absolute inset-0 w-full h-full object-cover object-center filter brightness-[0.85] group-hover:scale-105 transition-transform duration-700"
              />
              {/* Gradient overlay for readability */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 to-black/15 pointer-events-none" />

              <div className="relative z-10 text-left">
                <p className="text-sm font-semibold tracking-wide leading-tight drop-shadow-md">{prevT.names}</p>
                <p className="text-xs text-gray-300 capitalize mt-0.5 drop-shadow-sm">{prevT.location}</p>
              </div>
            </div>

            {/* Active Center Card with GSAP Animated Transition */}
            <div
              ref={testimonialCardRef}
              className="bg-white rounded-3xl p-6 sm:p-10 shadow-[0_10px_35px_rgba(0,0,0,0.06)] flex flex-col sm:flex-row gap-6 sm:gap-10 items-center w-full max-w-2xl transition-all duration-300 border border-gray-100 will-change-transform"
            >
              {/* Client Photo */}
              <div className="w-full sm:w-56 h-64 sm:h-72 rounded-2xl overflow-hidden flex-shrink-0 bg-stone-100 shadow-md relative group">
                <img
                  src={currentT.image}
                  alt={currentT.names}
                  loading="lazy"
                  width="800"
                  height="1067"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
              </div>

              {/* Quote & Author Info */}
              <div className="flex flex-col justify-center text-left flex-grow">
                {/* Double Quote Icon & Rating Stars */}
                <div className="flex items-center justify-between mb-4">
                  <div className="text-[#1A2849]">
                    <Quote size={36} className="fill-[#1A2849]" />
                  </div>
                  <div className="flex gap-1 text-[#C5A880]">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} size={14} className="fill-[#C5A880]" />
                    ))}
                  </div>
                </div>

                {/* Quote Text */}
                <p className="font-serif text-lg sm:text-xl font-medium text-[#141414] leading-relaxed">
                  "{currentT.quote}"
                </p>

                {/* Author */}
                <div className="mt-6 pt-4 border-t border-gray-100">
                  <p className="text-sm font-bold text-gray-900 tracking-wide">
                    — {currentT.names}
                  </p>
                  <p className="text-xs text-[#8C7A6B] mt-0.5 font-medium">
                    {currentT.tagline} • {currentT.location}
                  </p>
                </div>
              </div>
            </div>

            {/* Right Preview Card */}
            <div
              onClick={nextTestimonial}
              className="hidden md:flex flex-col justify-end w-48 lg:w-56 h-72 rounded-3xl p-5 text-white shadow-lg cursor-pointer opacity-85 hover:opacity-100 transition-all flex-shrink-0 transform hover:translate-x-1.5 border border-white/15 relative overflow-hidden group"
            >
              {/* Full box image */}
              <img
                src={nextT.image}
                alt={nextT.names}
                loading="lazy"
                width="800"
                height="1067"
                className="absolute inset-0 w-full h-full object-cover object-center filter brightness-[0.85] group-hover:scale-105 transition-transform duration-700"
              />
              {/* Gradient overlay for readability */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 to-black/15 pointer-events-none" />

              <div className="relative z-10 text-left">
                <p className="text-sm font-semibold tracking-wide leading-tight drop-shadow-md">{nextT.names}</p>
                <p className="text-xs text-gray-300 capitalize mt-0.5 drop-shadow-sm">{nextT.location}</p>
              </div>
            </div>

          </div>

          {/* Carousel Pagination Controls */}
          <div className="flex items-center justify-center gap-3 mt-10">
            <button
              onClick={prevTestimonial}
              className="w-10 h-10 rounded-full border border-gray-400 bg-transparent flex items-center justify-center text-gray-700 hover:border-black hover:text-black transition-all cursor-pointer shadow-xs active:scale-95"
              aria-label="Previous testimonial"
            >
              <ChevronLeft size={18} />
            </button>

            {/* Dots */}
            <div className="flex items-center gap-2 px-3">
              {testimonials.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => handleTestimonialChange(idx)}
                  className={`h-2 rounded-full transition-all cursor-pointer ${activeTestimonial === idx ? 'w-8 bg-[#0C1222]' : 'w-2 bg-gray-300 hover:bg-gray-400'
                    }`}
                  aria-label={`Go to slide ${idx + 1}`}
                />
              ))}
            </div>

            <button
              onClick={nextTestimonial}
              className="w-10 h-10 rounded-full bg-[#0A1020] flex items-center justify-center text-white hover:bg-black transition-all cursor-pointer shadow-md active:scale-95"
              aria-label="Next testimonial"
            >
              <ChevronRight size={18} />
            </button>
          </div>
        </div>
      </section>

      {/* ================= SECTION 7: LARGE BRAND WORDMARK WITH SCROLL SCRUB ================= */}
      <section ref={brandSectionRef} className="w-full bg-white px-6 sm:px-12 pt-20 sm:pt-28 pb-14 sm:pb-20 border-t border-gray-100 overflow-hidden">
        <div className="max-w-7xl mx-auto text-center">
          <span className="text-xs uppercase tracking-[0.35em] text-[#8C7A6B] font-semibold block mb-4">
            Bespoke Weddings & Cinematography
          </span>
          <h2
            ref={brandWordmarkRef}
            className="font-serif text-6xl sm:text-9xl md:text-[150px] lg:text-[200px] leading-none tracking-[0.16em] sm:tracking-[0.22em] text-[#0C1222] font-normal uppercase select-none will-change-transform"
          >
            ETERNIA
          </h2>
        </div>
      </section>

      {/* ================= SECTION 8: FULL-WIDTH LUXURY FOOTER ================= */}
      <footer id="footer" ref={footerRef} className="w-full bg-[#FAF7F2] px-6 sm:px-12 pt-16 pb-12 border-t border-gray-200 text-[#1C1C1C]">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-12 pb-16">

            {/* Left Column: Newsletter & Concierge Contact */}
            <div className="footer-col md:col-span-6 flex flex-col justify-between pr-0 md:pr-12">
              <div>
                <span className="text-[10px] uppercase tracking-[0.28em] text-[#8C7A6B] font-semibold">
                  Private Correspondence
                </span>
                <p className="font-serif text-2xl text-gray-900 mt-2 mb-4 font-normal">
                  Subscribe to the Eternia Journal
                </p>
                <p className="text-xs text-gray-600 mb-5 max-w-sm">
                  Receive private invitations, seasonal scenography retrospectives, and wedding cinematography dispatches.
                </p>

                <form onSubmit={handleSubscribe} className="relative max-w-sm">
                  <div className="flex items-center border border-gray-300 rounded-full bg-white overflow-hidden px-4 py-2.5 focus-within:border-black focus-within:ring-1 focus-within:ring-black shadow-xs transition-all">
                    <input
                      type="email"
                      placeholder="Enter your email address"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      className="w-full text-xs sm:text-sm text-gray-800 placeholder-gray-400 bg-transparent outline-none pr-2"
                    />
                    <button
                      type="submit"
                      className="bg-[#0C1222] text-white p-2 rounded-full hover:bg-black transition-colors flex-shrink-0 cursor-pointer shadow-sm"
                      aria-label="Submit newsletter subscription"
                    >
                      {subscribed ? <Check size={16} className="text-green-400" /> : <ArrowUpRight size={16} />}
                    </button>
                  </div>
                  {subscribed && (
                    <p className="text-xs text-emerald-600 mt-2 font-medium flex items-center gap-1.5 animate-in fade-in">
                      <Check size={14} /> Thank you for subscribing to Eternia Privé.
                    </p>
                  )}
                </form>
              </div>

              <div className="mt-12 pt-8 border-t border-gray-200/80">
                <p className="text-xs uppercase tracking-widest text-[#8C7A6B] font-semibold">Atelier Inquiries</p>
                <a
                  href="mailto:concierge@eternia-weddings.com"
                  className="font-serif text-lg sm:text-xl font-medium text-gray-900 hover:text-black hover:underline mt-1 inline-block"
                >
                  concierge@eternia-weddings.com
                </a>
                <p className="text-xs text-gray-500 mt-1">Direct inquiries answered within 24 hours.</p>
              </div>
            </div>

            {/* Right Columns: Explore & Atelier Locations */}
            <div className="footer-col md:col-span-6 grid grid-cols-2 gap-8 pl-0 md:pl-12">

              {/* Explore Links */}
              <div>
                <h4 className="text-xs uppercase tracking-[0.22em] font-semibold text-gray-900 mb-5">
                  Explore
                </h4>
                <ul className="flex flex-col gap-3 text-xs sm:text-sm text-gray-600">
                  <li><a href="#" className="hover:text-black hover:translate-x-1 transition-all inline-block">Atelier Home</a></li>
                  <li><a href="#about" className="hover:text-black hover:translate-x-1 transition-all inline-block">Our Philosophy</a></li>
                  <li><a href="#services" className="hover:text-black hover:translate-x-1 transition-all inline-block">Gala Experiences</a></li>
                  <li><a href="#testimonials" className="hover:text-black hover:translate-x-1 transition-all inline-block">Patron Chronicles</a></li>
                  <li><a href="#footer" className="hover:text-black hover:translate-x-1 transition-all inline-block">Private Concierge</a></li>
                </ul>
              </div>

              {/* Atelier Studios */}
              <div>
                <h4 className="text-xs uppercase tracking-[0.22em] font-semibold text-gray-900 mb-5">
                  Ateliers
                </h4>
                <ul className="flex flex-col gap-3 text-xs sm:text-sm text-gray-600">
                  <li>
                    <span className="font-semibold text-gray-800 block">Paris</span>
                    <span className="text-[11px] text-gray-500">Place Vendôme</span>
                  </li>
                  <li>
                    <span className="font-semibold text-gray-800 block">New York</span>
                    <span className="text-[11px] text-gray-500">Madison Avenue</span>
                  </li>
                  <li>
                    <span className="font-semibold text-gray-800 block">Geneva</span>
                    <span className="text-[11px] text-gray-500">Rue du Rhône</span>
                  </li>
                  <li>
                    <span className="font-semibold text-gray-800 block">London</span>
                    <span className="text-[11px] text-gray-500">Mayfair</span>
                  </li>
                </ul>
              </div>

            </div>

          </div>

          {/* Bottom Bar: Copyright & Scroll to Top */}
          <div className="pt-8 border-t border-gray-200 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-gray-500">
            <span>© 2026 Eternia : All rights reserved.</span>

            <button
              onClick={scrollToTop}
              className="text-gray-700 hover:text-black font-medium hover:underline transition-all flex items-center gap-2 cursor-pointer py-1 px-3 rounded-full hover:bg-stone-200/50"
            >
              <span>Return to Top</span>
              <ArrowUp size={14} />
            </button>
          </div>
        </div>
      </footer>

    </div>
  )
}
