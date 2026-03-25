import { useEffect, useState, useRef } from 'react';

export default function App() {
  const [lightbox, setLightbox] = useState<{ open: boolean; src: string; alt: string; index: number }>({
    open: false, src: '', alt: '', index: -1
  });
  const [menuOpen, setMenuOpen] = useState(false);
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [bioModalOpen, setBioModalOpen] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [countdown, setCountdown] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  const prevFocusRef = useRef<HTMLElement | null>(null);
  const closeBtnRef = useRef<HTMLButtonElement | null>(null);

  const basePath = import.meta.env.PROD ? '/mrs-akosac' : '';

  const galleryCategories = [
    {
      title: 'Picture of the Deceased',
      images: [
        { src: `${basePath}/img/1.jpeg`, alt: 'Mrs Harriet Atuahene Sarkodie (Mrs AKOSAC)' },
      ]
    },
    {
      title: 'Memorial Gallery',
      images: [
        { src: `${basePath}/img/2.jpeg`, alt: 'In memory of Mrs AKOSAC' },
      ]
    },
  ];

  const allImages = galleryCategories.flatMap(cat => cat.images);

  // Countdown timer
  useEffect(() => {
    const eventDate = new Date('2026-05-02T11:00:00').getTime();

    const updateCountdown = () => {
      const now = new Date().getTime();
      const distance = eventDate - now;

      if (distance > 0) {
        setCountdown({
          days: Math.floor(distance / (1000 * 60 * 60 * 24)),
          hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((distance % (1000 * 60)) / 1000)
        });
      } else {
        // Event has passed
        setCountdown({
          days: 0,
          hours: 0,
          minutes: 0,
          seconds: 0
        });
      }
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);
    return () => clearInterval(interval);
  }, []);

  // Mouse parallax effect
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth - 0.5) * 20,
        y: (e.clientY / window.innerHeight - 0.5) * 20
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'dark') root.classList.add('dark');
    else root.classList.remove('dark');
    try { localStorage.setItem('theme', theme); } catch {}
  }, [theme]);

  const onOpenLightboxAt = (index: number) => {
    prevFocusRef.current = document.activeElement as HTMLElement;
    const item = allImages[index];
    if (!item) return;
    setLightbox({ open: true, src: item.src, alt: item.alt, index });
  };

  const onCloseLightbox = () => {
    setLightbox({ open: false, src: '', alt: '', index: -1 });
    prevFocusRef.current?.focus?.();
  };

  useEffect(() => {
    if (lightbox.open) {
      closeBtnRef.current?.focus();
    }
  }, [lightbox.open]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onCloseLightbox();
      } else if (e.key === 'ArrowRight') {
        e.preventDefault();
        if (allImages.length > 1) {
          const next = (lightbox.index + 1 + allImages.length) % allImages.length;
          const item = allImages[next];
          setLightbox({ open: true, src: item.src, alt: item.alt, index: next });
        }
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault();
        if (allImages.length > 1) {
          const prev = (lightbox.index - 1 + allImages.length) % allImages.length;
          const item = allImages[prev];
          setLightbox({ open: true, src: item.src, alt: item.alt, index: prev });
        }
      }
    };
    if (lightbox.open) {
      window.addEventListener('keydown', onKey);
    }
    return () => window.removeEventListener('keydown', onKey);
  }, [lightbox.open, lightbox.index, allImages]);

  useEffect(() => {
    let ticking = false;
    const ids = ['home', 'songs', 'gallery'];
    const getActive = () => {
      const y = window.scrollY || document.documentElement.scrollTop || 0;
      const offset = 120;
      const targetY = y + offset;
      let current = 'home';
      for (const id of ids) {
        const el = document.getElementById(id);
        if (!el) continue;
        const top = el.offsetTop;
        if (top <= targetY) current = id;
        else break;
      }
      return current;
    };

    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const y = window.scrollY || document.documentElement.scrollTop || 0;
          setShowScrollTop(y > 300);
          const current = getActive();
          setActiveSection((prev) => (prev !== current ? current : prev));
          ticking = false;
        });
        ticking = true;
      }
    };

    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true } as any);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const baseNav = "rounded-lg px-4 py-2.5 transition-all duration-300 hover:text-gray-900 hover:bg-gray-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-900 dark:hover:text-white dark:hover:bg-gray-700 hover:scale-105";
  const isActiveId = (id: string) => activeSection === id;
  const linkClass = (id: string) => `${baseNav} ${isActiveId(id) ? 'text-gray-900 font-bold bg-gray-100 dark:text-white dark:bg-gray-700 shadow-md' : 'text-gray-600 dark:text-gray-300'}`;

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const programItems = [
    { time: '8:30 AM', title: 'Body Viewing', location: 'AKOSAC\'s residence, Akosac\'s Street near Santiago Bar', icon: '👁️' },
    { time: '9:30 AM', title: 'Eulogy, Music & Photo Gallery', location: '', icon: '🎵' },
    { time: '11:00 AM', title: 'Main Service', location: 'AGA Basic School', icon: '⛪' },
    { time: 'Following Service', title: 'Interment', location: '', icon: '🕊️' },
  ];

  return (
    <div className="min-h-screen bg-white text-gray-900 font-sans dark:bg-gray-950 dark:text-white relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-20 right-10 w-96 h-96 bg-blue-100 dark:bg-blue-900/10 rounded-full blur-3xl opacity-30"></div>
        <div className="absolute bottom-20 left-10 w-96 h-96 bg-purple-100 dark:bg-purple-900/10 rounded-full blur-3xl opacity-30"></div>
      </div>

      <a href="#mainContent" className="absolute left-[-9999px] focus:left-4 focus:top-4 focus:z-50 focus:bg-white focus:text-gray-900 focus:px-3 focus:py-2 focus:rounded-md focus:shadow">
        Skip to content
      </a>

      {/* Navigation */}
      <nav className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-gray-200 shadow-lg dark:bg-gray-900/95 dark:border-gray-800 transition-all duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <a href="#home" className="text-xl font-bold text-gray-900 dark:text-white transition-all duration-300 hover:text-blue-600 dark:hover:text-blue-400 hover:scale-105">
            Mrs Harriet Atuahene Sarkodie
          </a>
          <div className="flex items-center gap-3">
            <div className="hidden md:flex space-x-2 text-sm">
              <a href="#home" className={linkClass('home')}>Home</a>
              <a href="#songs" className={linkClass('songs')}>Songs</a>
              <a href="#gallery" className={linkClass('gallery')}>Gallery</a>
            </div>
            <button
              onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
              className="p-2.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-all duration-300 hover:scale-110 hover:rotate-12"
              aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
            >
              {theme === 'light' ? '🌙' : '☀️'}
            </button>
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="md:hidden p-2.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-all duration-300"
              aria-label="Toggle menu"
              aria-expanded={menuOpen}
            >
              {menuOpen ? '✕' : '☰'}
            </button>
          </div>
        </div>
        {menuOpen && (
          <div className="md:hidden border-t border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 animate-slide-up">
            <div className="flex flex-col space-y-1 px-4 py-3">
              <a href="#home" onClick={() => setMenuOpen(false)} className={linkClass('home')}>Home</a>
              <a href="#songs" onClick={() => setMenuOpen(false)} className={linkClass('songs')}>Songs</a>
              <a href="#gallery" onClick={() => setMenuOpen(false)} className={linkClass('gallery')}>Gallery</a>
            </div>
          </div>
        )}
      </nav>

      <main id="mainContent" className="relative z-10">
        {/* Hero and Biography Combined Section */}
        <section id="home" className="py-12 md:py-20 px-4 sm:px-6 lg:px-8 relative">
          <div className="max-w-7xl mx-auto">
            {/* Header */}
            <div className="text-center mb-16 animate-fade-in">
              <div className="inline-block mb-6">
                <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6 text-gray-900 dark:text-white tracking-tight hover:scale-105 transition-transform duration-300">
                  Funeral Programme
                </h1>
                <div className="h-1 w-full bg-blue-500 dark:bg-blue-400 mx-auto mb-6 rounded-full"></div>
              </div>

              <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold mb-4 text-gray-800 dark:text-gray-200 animate-slide-up stagger-1">
                Mrs Harriet Atuahene Sarkodie
              </h2>
              <p className="text-xl sm:text-2xl text-gray-600 dark:text-gray-400 font-light tracking-wide mb-2 animate-slide-up stagger-2">
                (Mrs AKOSAC)
              </p>
              <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-400 font-light italic mb-8 animate-slide-up stagger-3">
                aka Auntie Akweley
              </p>

              {/* Countdown Timer */}
              <div className="max-w-4xl mx-auto mb-8 animate-bounce-in">
                <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-2xl p-6 border-2 border-blue-200 dark:border-blue-800">
                  <h3 className="text-lg font-semibold mb-4 text-gray-700 dark:text-gray-300">Time Until Service</h3>
                  <div className="grid grid-cols-4 gap-4">
                    <div className="hover-lift bg-blue-50 dark:bg-blue-900/20 rounded-xl p-4">
                      <div className="text-3xl sm:text-4xl font-bold text-blue-600 dark:text-blue-400">{countdown.days}</div>
                      <div className="text-sm text-gray-600 dark:text-gray-400 mt-1">Days</div>
                    </div>
                    <div className="hover-lift bg-blue-50 dark:bg-blue-900/20 rounded-xl p-4">
                      <div className="text-3xl sm:text-4xl font-bold text-blue-600 dark:text-blue-400">{countdown.hours}</div>
                      <div className="text-sm text-gray-600 dark:text-gray-400 mt-1">Hours</div>
                    </div>
                    <div className="hover-lift bg-blue-50 dark:bg-blue-900/20 rounded-xl p-4">
                      <div className="text-3xl sm:text-4xl font-bold text-blue-600 dark:text-blue-400">{countdown.minutes}</div>
                      <div className="text-sm text-gray-600 dark:text-gray-400 mt-1">Minutes</div>
                    </div>
                    <div className="hover-lift bg-blue-50 dark:bg-blue-900/20 rounded-xl p-4">
                      <div className="text-3xl sm:text-4xl font-bold text-blue-600 dark:text-blue-400">{countdown.seconds}</div>
                      <div className="text-sm text-gray-600 dark:text-gray-400 mt-1">Seconds</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Event Details Cards */}
              <div className="max-w-4xl mx-auto grid md:grid-cols-3 gap-4 mb-8">
                <div className="hover-lift bg-white dark:bg-gray-900 rounded-xl shadow-lg p-6 border border-gray-200 dark:border-gray-800 animate-slide-up stagger-1">
                  <div className="text-4xl mb-3">📍</div>
                  <h3 className="font-bold text-gray-900 dark:text-white mb-2">Venue</h3>
                  <p className="text-gray-600 dark:text-gray-400">AGA Basic School</p>
                  <a
                    href="https://maps.app.goo.gl/PYKpQvusKgoZLJ228"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block mt-3 text-blue-600 dark:text-blue-400 hover:underline font-medium transition-all hover:scale-105"
                  >
                    🗺️ Get Directions
                  </a>
                </div>
                <div className="hover-lift bg-white dark:bg-gray-900 rounded-xl shadow-lg p-6 border border-gray-200 dark:border-gray-800 animate-slide-up stagger-2">
                  <div className="text-4xl mb-3">📅</div>
                  <h3 className="font-bold text-gray-900 dark:text-white mb-2">Date</h3>
                  <p className="text-gray-600 dark:text-gray-400">2nd May 2026</p>
                </div>
                <div className="hover-lift bg-white dark:bg-gray-900 rounded-xl shadow-lg p-6 border border-gray-200 dark:border-gray-800 animate-slide-up stagger-3">
                  <div className="text-4xl mb-3">🕐</div>
                  <h3 className="font-bold text-gray-900 dark:text-white mb-2">Time</h3>
                  <p className="text-gray-600 dark:text-gray-400">11:00 AM</p>
                </div>
              </div>

              <div className="max-w-2xl mx-auto space-y-3 text-base sm:text-lg text-gray-600 dark:text-gray-400">
                <p className="hover:text-gray-900 dark:hover:text-gray-200 transition-colors">
                  <span className="font-semibold">Body Viewing:</span> AKOSAC's residence, Akosac's Street near Santiago Bar at 8:30 AM
                </p>
                <p className="hover:text-gray-900 dark:hover:text-gray-200 transition-colors">
                  <span className="font-semibold">Eulogy, Music & Photo Gallery:</span> 9:30 AM
                </p>
              </div>
            </div>

            {/* Main Content Grid */}
            <div className="grid md:grid-cols-[420px_1fr] gap-10 md:gap-16 lg:gap-20 items-start">
              {/* Left Column - Image */}
              <div className="mx-auto md:mx-0 md:sticky md:top-24 animate-slide-in-left">
                <div className="w-full max-w-md">
                  <div
                    className="relative overflow-hidden rounded-2xl shadow-2xl ring-4 ring-blue-200 dark:ring-blue-800 hover-glow transition-all duration-500 hover:scale-105"
                    style={{
                      transform: `perspective(1000px) rotateX(${mousePosition.y * 0.05}deg) rotateY(${mousePosition.x * 0.05}deg)`
                    }}
                  >
                    <img
                      src={`${basePath}/img/1.jpeg`}
                      alt="Mrs Harriet Atuahene Sarkodie (Mrs AKOSAC)"
                      className="w-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black/0 hover:bg-black/10 transition-all duration-300"></div>
                  </div>
                  <p className="text-base sm:text-lg italic text-gray-700 dark:text-gray-300 mt-8 text-center leading-relaxed px-4 animate-fade-in">
                    &quot;A loving mother, devoted grandmother, and cherished member of the community&quot;
                  </p>
                </div>
              </div>

              {/* Right Column - Biography */}
              <div className="animate-slide-in-right">
                <div className="flex items-center gap-3 mb-8">
                  <div className="h-1 w-12 bg-blue-500 rounded-full"></div>
                  <h3 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white">
                    In Loving Memory
                  </h3>
                  <div className="h-1 flex-1 bg-blue-500 rounded-full"></div>
                </div>
                {/* Desktop: Full text visible */}
                <div className="hidden md:block prose prose-lg max-w-none dark:prose-invert text-gray-700 dark:text-gray-300 leading-relaxed space-y-6 text-justify">
                  <div className="hover-lift bg-white/50 dark:bg-gray-900/50 p-6 rounded-xl backdrop-blur-sm">
                    <p>
                      Mrs Harriet Atuahene Sarkodie, affectionately known as Mrs AKOSAC and Auntie Akweley, was a remarkable woman whose life touched the hearts of many. Her warmth, kindness, and unwavering dedication to her family and community made her a beloved figure to all who knew her.
                    </p>
                  </div>
                  <div className="hover-lift bg-white/50 dark:bg-gray-900/50 p-6 rounded-xl backdrop-blur-sm">
                    <p>
                      Born with a spirit of generosity and compassion, Mrs AKOSAC lived her life with grace and dignity. She was a pillar of strength for her family, always ready with words of wisdom and encouragement. Her home was a place of welcome, where friends and family gathered to share in her hospitality and love.
                    </p>
                  </div>
                  <div className="hover-lift bg-white/50 dark:bg-gray-900/50 p-6 rounded-xl backdrop-blur-sm">
                    <p>
                      As a mother and grandmother, she was devoted and nurturing, investing time and energy into ensuring the well-being and success of her children and grandchildren. Her legacy lives on through the values she instilled in them—hard work, integrity, kindness, and faith.
                    </p>
                  </div>
                  <div className="hover-lift bg-white/50 dark:bg-gray-900/50 p-6 rounded-xl backdrop-blur-sm">
                    <p>
                      Mrs AKOSAC was also deeply involved in her community, contributing to its development and well-being. She was known for her generous spirit, always willing to lend a helping hand to those in need. Her contributions will be remembered for generations to come.
                    </p>
                  </div>
                  <div className="hover-lift bg-white/50 dark:bg-gray-900/50 p-6 rounded-xl backdrop-blur-sm">
                    <p>
                      Though she has departed from this world, her memory remains alive in the hearts of all who knew and loved her. We celebrate her life, honor her legacy, and commit to carrying forward the values she exemplified.
                    </p>
                  </div>
                </div>
                {/* Mobile: Preview with Read More button */}
                <div className="md:hidden">
                  <div className="prose prose-lg max-w-none dark:prose-invert text-gray-700 dark:text-gray-300 leading-relaxed space-y-4 text-justify bg-white/50 dark:bg-gray-900/50 p-6 rounded-xl backdrop-blur-sm">
                    <p>
                      Mrs Harriet Atuahene Sarkodie, affectionately known as Mrs AKOSAC and Auntie Akweley, was a remarkable woman whose life touched the hearts of many...
                    </p>
                  </div>
                  <button
                    onClick={() => setBioModalOpen(true)}
                    className="mt-6 px-8 py-4 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 shadow-lg hover:shadow-xl hover:scale-105 font-semibold"
                  >
                    📖 Read Full Biography
                  </button>
                </div>
              </div>
            </div>

            {/* Program Section */}
            <div className="mt-20">
              <div className="text-center mb-12 animate-fade-in">
                <h2 className="text-4xl sm:text-5xl font-bold mb-4 text-gray-900 dark:text-white inline-block">
                  Order of Service
                </h2>
                <div className="h-1 w-32 bg-blue-500 dark:bg-blue-400 mx-auto rounded-full mt-4"></div>
              </div>
              <div className="max-w-4xl mx-auto">
                {/* Zoom Meeting Info */}
                <div className="mb-8 p-6 bg-blue-50 dark:bg-blue-900/20 border-2 border-blue-200 dark:border-blue-800 rounded-2xl hover-lift animate-scale-in">
                  <h3 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white flex items-center gap-2">
                    <span className="text-2xl">🔗</span>
                    Join via Zoom
                  </h3>
                  <div className="space-y-2 text-gray-700 dark:text-gray-300">
                    <p className="text-sm sm:text-base">
                      Unable to attend in person? Join the funeral service remotely via Zoom.
                    </p>
                    <a
                      href="https://wacren.zoom.us/j/66974441086"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-block mt-3 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 shadow-lg hover:shadow-xl hover:scale-105 text-sm sm:text-base"
                    >
                      🎥 Join Zoom Meeting
                    </a>
                  </div>
                </div>

                {/* Interactive Timeline */}
                <div className="relative">
                  {/* Vertical line */}
                  <div className="absolute left-8 top-0 bottom-0 w-1 bg-blue-200 dark:bg-blue-800 hidden md:block"></div>

                  <div className="space-y-6">
                    {programItems.map((item, index) => (
                      <div
                        key={index}
                        className={`relative hover-lift bg-white dark:bg-gray-900 rounded-2xl border-2 border-gray-200 dark:border-gray-800 p-6 transition-all duration-300 hover:border-blue-400 dark:hover:border-blue-600 animate-slide-up stagger-${index + 1}`}
                      >
                        {/* Timeline dot */}
                        <div className="absolute left-[-2.5rem] top-8 w-6 h-6 bg-blue-500 dark:bg-blue-400 rounded-full border-4 border-white dark:border-gray-950 hidden md:block animate-pulse"></div>

                        <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                          <div className="flex items-center gap-4 flex-1">
                            <span className="text-4xl flex-shrink-0">{item.icon}</span>
                            <div className="flex-1">
                              <h4 className="font-bold text-lg text-gray-900 dark:text-white mb-1">{item.title}</h4>
                              {item.location && (
                                <p className="text-sm text-gray-600 dark:text-gray-400">📍 {item.location}</p>
                              )}
                            </div>
                          </div>
                          <div className="bg-blue-100 dark:bg-blue-900/30 px-4 py-2 rounded-lg font-semibold text-blue-700 dark:text-blue-300 whitespace-nowrap">
                            {item.time}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Songs Section */}
        <section id="songs" className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50 dark:bg-gray-900 relative">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-12 animate-fade-in">
              <h2 className="text-4xl sm:text-5xl font-bold mb-4 text-gray-900 dark:text-white">
                Music & Songs
              </h2>
              <div className="h-1 w-32 bg-blue-500 dark:bg-blue-400 mx-auto rounded-full"></div>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-2xl border-2 border-gray-200 dark:border-gray-700 p-8 md:p-10 shadow-2xl hover-lift">
              <p className="text-center text-lg text-gray-700 dark:text-gray-300 leading-relaxed mb-8">
                Selected songs and musical tributes will be performed during the service to celebrate the life and legacy of Mrs AKOSAC.
              </p>
              <div className="grid md:grid-cols-3 gap-6">
                <div className="text-center p-6 bg-blue-50 dark:bg-blue-900/20 rounded-xl hover-lift border-2 border-transparent hover:border-blue-400 transition-all duration-300 animate-slide-up stagger-1">
                  <div className="text-5xl mb-4 animate-float">🎵</div>
                  <p className="font-bold text-xl text-gray-900 dark:text-white mb-2">Opening Song</p>
                  <p className="text-gray-600 dark:text-gray-400">To be announced</p>
                </div>
                <div className="text-center p-6 bg-purple-50 dark:bg-purple-900/20 rounded-xl hover-lift border-2 border-transparent hover:border-purple-400 transition-all duration-300 animate-slide-up stagger-2">
                  <div className="text-5xl mb-4 animate-float">🎼</div>
                  <p className="font-bold text-xl text-gray-900 dark:text-white mb-2">Musical Tributes</p>
                  <p className="text-gray-600 dark:text-gray-400">Family and friends</p>
                </div>
                <div className="text-center p-6 bg-blue-50 dark:bg-blue-900/20 rounded-xl hover-lift border-2 border-transparent hover:border-blue-400 transition-all duration-300 animate-slide-up stagger-3">
                  <div className="text-5xl mb-4 animate-float">🎶</div>
                  <p className="font-bold text-xl text-gray-900 dark:text-white mb-2">Closing Song</p>
                  <p className="text-gray-600 dark:text-gray-400">To be announced</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Gallery Section */}
        <section id="gallery" className="py-20 px-4 sm:px-6 lg:px-8 bg-white dark:bg-gray-950 relative">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16 animate-fade-in">
              <h2 className="text-4xl sm:text-5xl font-bold mb-4 text-gray-900 dark:text-white">
                Photo Gallery
              </h2>
              <div className="h-1 w-32 bg-blue-500 dark:bg-blue-400 mx-auto rounded-full"></div>
              <p className="text-gray-600 dark:text-gray-400 mt-4 text-lg">Click on any image to view in full screen</p>
            </div>

            {/* Gallery Categories */}
            <div className="space-y-16">
              {galleryCategories.map((category, catIndex) => {
                const startIndex = galleryCategories.slice(0, catIndex).reduce((sum, cat) => sum + cat.images.length, 0);
                return (
                  <div key={catIndex} className="animate-slide-up">
                    <h3 className="text-2xl sm:text-3xl font-bold mb-8 text-gray-900 dark:text-white text-center flex items-center justify-center gap-3">
                      <span className="h-1 w-12 bg-blue-500 rounded-full"></span>
                      {category.title}
                      <span className="h-1 w-12 bg-blue-500 rounded-full"></span>
                    </h3>
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-8">
                      {category.images.map((img, imgIndex) => {
                        const globalIndex = startIndex + imgIndex;
                        return (
                          <button
                            key={imgIndex}
                            onClick={() => onOpenLightboxAt(globalIndex)}
                            className={`group relative aspect-square overflow-hidden rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-500 focus:outline-none focus:ring-4 focus:ring-blue-500 focus:ring-offset-2 ring-2 ring-gray-200 dark:ring-gray-800 hover:scale-105 hover:rotate-1 animate-scale-in stagger-${imgIndex + 1}`}
                          >
                            <img
                              src={img.src}
                              alt={img.alt}
                              className="w-full h-full object-cover group-hover:scale-125 transition-transform duration-700"
                            />
                            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-all duration-300 flex items-center justify-center">
                              <span className="text-white text-4xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform group-hover:scale-110">🔍</span>
                            </div>
                            <div className="absolute bottom-0 left-0 right-0 bg-black/70 text-white p-3 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                              <p className="text-sm font-medium">Click to view</p>
                            </div>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

      </main>

      {/* Biography Modal */}
      {bioModalOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 animate-fade-in"
          onClick={() => setBioModalOpen(false)}
        >
          <div
            className="bg-white dark:bg-gray-900 rounded-2xl max-w-3xl max-h-[85vh] overflow-y-auto p-8 relative shadow-2xl animate-scale-in"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setBioModalOpen(false)}
              className="sticky top-4 float-right text-gray-900 dark:text-white text-2xl w-10 h-10 flex items-center justify-center rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-900 dark:focus:ring-white transition-all hover:scale-110 hover:rotate-90 z-10"
              aria-label="Close biography"
            >
              ✕
            </button>
            <h3 className="text-3xl font-bold mb-6 text-gray-900 dark:text-white pr-8">
              In Loving Memory
            </h3>
            <div className="prose prose-lg max-w-none dark:prose-invert text-gray-700 dark:text-gray-300 leading-relaxed space-y-6 text-justify">
              <p>
                Mrs Harriet Atuahene Sarkodie, affectionately known as Mrs AKOSAC and Auntie Akweley, was a remarkable woman whose life touched the hearts of many. Her warmth, kindness, and unwavering dedication to her family and community made her a beloved figure to all who knew her.
              </p>
              <p>
                Born with a spirit of generosity and compassion, Mrs AKOSAC lived her life with grace and dignity. She was a pillar of strength for her family, always ready with words of wisdom and encouragement. Her home was a place of welcome, where friends and family gathered to share in her hospitality and love.
              </p>
              <p>
                As a mother and grandmother, she was devoted and nurturing, investing time and energy into ensuring the well-being and success of her children and grandchildren. Her legacy lives on through the values she instilled in them—hard work, integrity, kindness, and faith.
              </p>
              <p>
                Mrs AKOSAC was also deeply involved in her community, contributing to its development and well-being. She was known for her generous spirit, always willing to lend a helping hand to those in need. Her contributions will be remembered for generations to come.
              </p>
              <p>
                Though she has departed from this world, her memory remains alive in the hearts of all who knew and loved her. We celebrate her life, honor her legacy, and commit to carrying forward the values she exemplified.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Lightbox */}
      {lightbox.open && (
        <div
          className="fixed inset-0 z-50 bg-black/95 backdrop-blur-md flex items-center justify-center p-4 animate-fade-in"
          onClick={onCloseLightbox}
        >
          <button
            ref={closeBtnRef}
            onClick={onCloseLightbox}
            className="absolute top-4 right-4 text-white text-3xl w-12 h-12 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 focus:outline-none focus:ring-2 focus:ring-white transition-all hover:scale-110 hover:rotate-90"
            aria-label="Close lightbox"
          >
            ✕
          </button>
          <div className="relative max-w-5xl max-h-full animate-scale-in" onClick={(e) => e.stopPropagation()}>
            <img
              src={lightbox.src}
              alt={lightbox.alt}
              className="max-h-[90vh] w-auto object-contain rounded-lg shadow-2xl"
            />
          </div>
          {allImages.length > 1 && (
            <>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  const prev = (lightbox.index - 1 + allImages.length) % allImages.length;
                  const item = allImages[prev];
                  setLightbox({ open: true, src: item.src, alt: item.alt, index: prev });
                }}
                className="absolute left-4 text-white text-5xl w-14 h-14 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 focus:outline-none focus:ring-2 focus:ring-white transition-all hover:scale-110"
                aria-label="Previous image"
              >
                ‹
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  const next = (lightbox.index + 1) % allImages.length;
                  const item = allImages[next];
                  setLightbox({ open: true, src: item.src, alt: item.alt, index: next });
                }}
                className="absolute right-4 text-white text-5xl w-14 h-14 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 focus:outline-none focus:ring-2 focus:ring-white transition-all hover:scale-110"
                aria-label="Next image"
              >
                ›
              </button>
            </>
          )}
        </div>
      )}

      {/* Scroll to Top */}
      {showScrollTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 bg-blue-600 text-white w-14 h-14 rounded-full shadow-2xl hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-300 hover:scale-110 animate-bounce-in z-40"
          aria-label="Scroll to top"
        >
          ↑
        </button>
      )}

      {/* Footer */}
      <footer className="relative py-12 px-4 bg-gray-900 text-white text-center overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-1/4 w-64 h-64 bg-blue-500 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-purple-500 rounded-full blur-3xl"></div>
        </div>
        <div className="relative z-10">
          <p className="text-lg font-semibold mb-2">
            In loving memory of Mrs Harriet Atuahene Sarkodie (Mrs AKOSAC)
          </p>
          <p className="text-sm text-gray-400 mt-2">
            May her soul rest in perfect peace 🕊️
          </p>
          <div className="mt-6 flex items-center justify-center gap-2">
            <span className="h-px w-12 bg-gray-600"></span>
            <span className="text-gray-500 text-xs">Forever in our hearts</span>
            <span className="h-px w-12 bg-gray-600"></span>
          </div>
        </div>
      </footer>
    </div>
  );
}
