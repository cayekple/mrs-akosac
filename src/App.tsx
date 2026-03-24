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

  const baseNav = "rounded-md px-3 py-2 transition-colors hover:text-gray-900 hover:bg-gray-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-900 dark:hover:text-white dark:hover:bg-gray-700";
  const isActiveId = (id: string) => activeSection === id;
  const linkClass = (id: string) => `${baseNav} ${isActiveId(id) ? 'text-gray-900 font-semibold bg-gray-100 dark:text-white dark:bg-gray-700' : 'text-gray-600 dark:text-gray-300'}`;

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-white text-gray-900 font-sans dark:bg-gray-950 dark:text-white">
      <a href="#mainContent" className="absolute left-[-9999px] focus:left-4 focus:top-4 focus:z-50 focus:bg-white focus:text-gray-900 focus:px-3 focus:py-2 focus:rounded-md focus:shadow">
        Skip to content
      </a>

      {/* Navigation */}
      <nav className="sticky top-0 z-40 bg-white/95 backdrop-blur-sm border-b border-gray-200 shadow-sm dark:bg-gray-900/95 dark:border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <a href="#home" className="text-xl font-bold text-gray-900 dark:text-white transition-colors hover:text-gray-700 dark:hover:text-gray-300">
            Mrs Harriet Atuahene Sarkodie
          </a>
          <div className="flex items-center gap-2">
            <div className="hidden md:flex space-x-2 text-sm">
              <a href="#home" className={linkClass('home')}>Home</a>
              <a href="#songs" className={linkClass('songs')}>Songs</a>
              <a href="#gallery" className={linkClass('gallery')}>Gallery</a>
            </div>
            <button
              onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
              className="p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800"
              aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
            >
              {theme === 'light' ? '🌙' : '☀️'}
            </button>
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="md:hidden p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800"
              aria-label="Toggle menu"
              aria-expanded={menuOpen}
            >
              {menuOpen ? '✕' : '☰'}
            </button>
          </div>
        </div>
        {menuOpen && (
          <div className="md:hidden border-t border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900">
            <div className="flex flex-col space-y-1 px-4 py-3">
              <a href="#home" onClick={() => setMenuOpen(false)} className={linkClass('home')}>Home</a>
              <a href="#songs" onClick={() => setMenuOpen(false)} className={linkClass('songs')}>Songs</a>
              <a href="#gallery" onClick={() => setMenuOpen(false)} className={linkClass('gallery')}>Gallery</a>
            </div>
          </div>
        )}
      </nav>

      <main id="mainContent">
        {/* Hero and Biography Combined Section */}
        <section id="home" className="py-12 md:py-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            {/* Header */}
            <div className="text-center mb-16 animate-fade-in">
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6 text-gray-900 dark:text-white tracking-tight">
                Funeral Programme
              </h1>
              <div className="h-1 w-24 bg-gray-300 dark:bg-gray-700 mx-auto mb-6 rounded-full"></div>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold mb-4 text-gray-800 dark:text-gray-200">
                Mrs Harriet Atuahene Sarkodie
              </h2>
              <p className="text-xl sm:text-2xl text-gray-600 dark:text-gray-400 font-light tracking-wide mb-2">
                (Mrs AKOSAC)
              </p>
              <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-400 font-light italic mb-6">
                aka Auntie Akweley
              </p>
              <div className="max-w-2xl mx-auto space-y-2">
                <p className="text-lg sm:text-xl text-gray-700 dark:text-gray-300 font-medium">
                  📍 Venue: AGA Basic School
                </p>
                <p className="text-lg sm:text-xl text-gray-700 dark:text-gray-300 font-medium">
                  📅 Date: 2nd May 2026
                </p>
                <p className="text-lg sm:text-xl text-gray-700 dark:text-gray-300 font-medium">
                  🕐 Time: 11:00 AM
                </p>
                <p className="text-base sm:text-lg text-gray-600 dark:text-gray-400 mt-4">
                  Body Viewing: AKOSAC's residence, Akosac's Street near Santiago Bar at 8:30 AM
                </p>
                <p className="text-base sm:text-lg text-gray-600 dark:text-gray-400">
                  Eulogy, Music & Photo Gallery: 9:30 AM
                </p>
              </div>
            </div>

            {/* Main Content Grid */}
            <div className="grid md:grid-cols-[420px_1fr] gap-10 md:gap-16 lg:gap-20 items-start">
              {/* Left Column - Image */}
              <div className="mx-auto md:mx-0 md:sticky md:top-24 animate-slide-in-left">
                <div className="w-full max-w-md">
                  <div className="relative overflow-hidden rounded-2xl shadow-2xl ring-1 ring-gray-900/5 dark:ring-white/10">
                    <img
                      src={`${basePath}/img/1.jpeg`}
                      alt="Mrs Harriet Atuahene Sarkodie (Mrs AKOSAC)"
                      className="w-full object-cover"
                    />
                  </div>
                  <p className="text-base sm:text-lg italic text-gray-700 dark:text-gray-300 mt-8 text-center leading-relaxed px-4">
                    &quot;A loving mother, devoted grandmother, and cherished member of the community&quot;
                  </p>
                </div>
              </div>

              {/* Right Column - Biography */}
              <div className="animate-slide-in-right">
                <h3 className="text-3xl sm:text-4xl font-bold mb-8 text-gray-900 dark:text-white">
                  In Loving Memory
                </h3>
                {/* Desktop: Full text visible */}
                <div className="hidden md:block prose prose-lg max-w-none dark:prose-invert text-gray-700 dark:text-gray-300 leading-relaxed space-y-6 text-justify">
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
                {/* Mobile: Preview with Read More button */}
                <div className="md:hidden">
                  <div className="prose prose-lg max-w-none dark:prose-invert text-gray-700 dark:text-gray-300 leading-relaxed space-y-4 text-justify">
                    <p>
                      Mrs Harriet Atuahene Sarkodie, affectionately known as Mrs AKOSAC and Auntie Akweley, was a remarkable woman whose life touched the hearts of many...
                    </p>
                  </div>
                  <button
                    onClick={() => setBioModalOpen(true)}
                    className="mt-6 px-6 py-3 bg-gray-900 text-white rounded-lg hover:bg-gray-700 transition-colors focus:outline-none focus:ring-2 focus:ring-gray-900 focus:ring-offset-2 dark:bg-white dark:text-gray-900 dark:hover:bg-gray-200"
                  >
                    Read Full Biography
                  </button>
                </div>
              </div>
            </div>

            {/* Program Section */}
            <div className="mt-20">
              <div className="text-center mb-12">
                <h2 className="text-4xl sm:text-5xl font-bold mb-4 text-gray-900 dark:text-white">
                  Order of Service
                </h2>
                <div className="h-1 w-20 bg-gray-300 dark:bg-gray-700 mx-auto rounded-full"></div>
              </div>
              <div className="max-w-4xl mx-auto bg-white dark:bg-gray-950 rounded-2xl border border-gray-200 dark:border-gray-800 p-8 md:p-10 shadow-lg">
                {/* Zoom Meeting Info */}
                <div className="mb-8 p-6 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-xl">
                  <h3 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white flex items-center gap-2">
                    <span>🔗</span>
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
                      className="inline-block mt-3 px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 text-sm sm:text-base"
                    >
                      Join Zoom Meeting
                    </a>
                  </div>
                </div>

                <div className="space-y-6">
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2 border-b border-gray-200 dark:border-gray-800 pb-4 hover:bg-gray-50 dark:hover:bg-gray-900/50 -mx-4 px-4 transition-colors duration-200 rounded-lg">
                    <span className="font-semibold text-gray-900 dark:text-white text-lg">Body Viewing</span>
                    <span className="text-gray-600 dark:text-gray-400 font-medium">8:30 AM</span>
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400 -mt-4 ml-4">
                    Location: AKOSAC's residence, Akosac's Street near Santiago Bar
                  </div>
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2 border-b border-gray-200 dark:border-gray-800 pb-4 hover:bg-gray-50 dark:hover:bg-gray-900/50 -mx-4 px-4 transition-colors duration-200 rounded-lg">
                    <span className="font-semibold text-gray-900 dark:text-white text-lg">Eulogy, Music & Photo Gallery</span>
                    <span className="text-gray-600 dark:text-gray-400 font-medium">9:30 AM</span>
                  </div>
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2 border-b border-gray-200 dark:border-gray-800 pb-4 hover:bg-gray-50 dark:hover:bg-gray-900/50 -mx-4 px-4 transition-colors duration-200 rounded-lg">
                    <span className="font-semibold text-gray-900 dark:text-white text-lg">Main Service</span>
                    <span className="text-gray-600 dark:text-gray-400 font-medium">11:00 AM</span>
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400 -mt-4 ml-4">
                    Location: AGA Basic School
                  </div>
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2 hover:bg-gray-50 dark:hover:bg-gray-900/50 -mx-4 px-4 py-2 transition-colors duration-200 rounded-lg">
                    <span className="font-semibold text-gray-900 dark:text-white text-lg">Interment</span>
                    <span className="text-gray-600 dark:text-gray-400 font-medium">Following Service</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Songs Section */}
        <section id="songs" className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50 dark:bg-gray-900">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-4xl sm:text-5xl font-bold mb-4 text-gray-900 dark:text-white">
                Music & Hymns
              </h2>
              <div className="h-1 w-20 bg-gray-300 dark:bg-gray-700 mx-auto rounded-full"></div>
            </div>
            <div className="bg-gray-50 dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 p-8 md:p-10 shadow-lg">
              <p className="text-center text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
                Selected hymns and musical tributes will be performed during the service to celebrate the life and legacy of Mrs AKOSAC.
              </p>
              <div className="mt-8 space-y-4">
                <div className="text-center p-4 bg-white dark:bg-gray-950 rounded-lg">
                  <p className="font-semibold text-gray-900 dark:text-white mb-2">Opening Hymn</p>
                  <p className="text-gray-600 dark:text-gray-400">To be announced</p>
                </div>
                <div className="text-center p-4 bg-white dark:bg-gray-950 rounded-lg">
                  <p className="font-semibold text-gray-900 dark:text-white mb-2">Musical Tributes</p>
                  <p className="text-gray-600 dark:text-gray-400">Family and friends</p>
                </div>
                <div className="text-center p-4 bg-white dark:bg-gray-950 rounded-lg">
                  <p className="font-semibold text-gray-900 dark:text-white mb-2">Closing Hymn</p>
                  <p className="text-gray-600 dark:text-gray-400">To be announced</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Gallery Section */}
        <section id="gallery" className="py-20 px-4 sm:px-6 lg:px-8 bg-white dark:bg-gray-950">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl sm:text-5xl font-bold mb-4 text-gray-900 dark:text-white">
                Photo Gallery
              </h2>
              <div className="h-1 w-20 bg-gray-300 dark:bg-gray-700 mx-auto rounded-full"></div>
            </div>

            {/* Gallery Categories */}
            <div className="space-y-16">
              {galleryCategories.map((category, catIndex) => {
                const startIndex = galleryCategories.slice(0, catIndex).reduce((sum, cat) => sum + cat.images.length, 0);
                return (
                  <div key={catIndex}>
                    <h3 className="text-2xl sm:text-3xl font-semibold mb-6 text-gray-900 dark:text-white text-center">
                      {category.title}
                    </h3>
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
                      {category.images.map((img, imgIndex) => {
                        const globalIndex = startIndex + imgIndex;
                        return (
                          <button
                            key={imgIndex}
                            onClick={() => onOpenLightboxAt(globalIndex)}
                            className="group relative aspect-square overflow-hidden rounded-xl shadow-md hover:shadow-2xl transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:ring-offset-2 dark:focus:ring-white ring-1 ring-gray-900/5 dark:ring-white/10"
                          >
                            <img
                              src={img.src}
                              alt={img.alt}
                              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                            />
                            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300"></div>
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
          className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4"
          onClick={() => setBioModalOpen(false)}
        >
          <div
            className="bg-white dark:bg-gray-900 rounded-2xl max-w-3xl max-h-[85vh] overflow-y-auto p-8 relative shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setBioModalOpen(false)}
              className="absolute top-4 right-4 text-gray-900 dark:text-white text-2xl w-10 h-10 flex items-center justify-center rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-900 dark:focus:ring-white"
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
          className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
          onClick={onCloseLightbox}
        >
          <button
            ref={closeBtnRef}
            onClick={onCloseLightbox}
            className="absolute top-4 right-4 text-white text-2xl w-10 h-10 flex items-center justify-center rounded-full hover:bg-white/20 focus:outline-none focus:ring-2 focus:ring-white"
            aria-label="Close lightbox"
          >
            ✕
          </button>
          <div className="relative max-w-4xl max-h-full" onClick={(e) => e.stopPropagation()}>
            <img
              src={lightbox.src}
              alt={lightbox.alt}
              className="max-h-[90vh] w-auto object-contain"
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
                className="absolute left-4 text-white text-4xl w-12 h-12 flex items-center justify-center rounded-full hover:bg-white/20 focus:outline-none focus:ring-2 focus:ring-white"
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
                className="absolute right-4 text-white text-4xl w-12 h-12 flex items-center justify-center rounded-full hover:bg-white/20 focus:outline-none focus:ring-2 focus:ring-white"
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
          className="fixed bottom-8 right-8 bg-gray-900 text-white w-12 h-12 rounded-full shadow-lg hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:ring-offset-2 transition-all dark:bg-white dark:text-gray-900 dark:hover:bg-gray-200 dark:focus:ring-white"
          aria-label="Scroll to top"
        >
          ↑
        </button>
      )}

      {/* Footer */}
      <footer className="py-8 px-4 bg-gray-900 text-white text-center">
        <p className="text-sm">
          In loving memory of Mrs Harriet Atuahene Sarkodie (Mrs AKOSAC)
        </p>
        <p className="text-xs mt-2 text-gray-400">
          May her soul rest in perfect peace
        </p>
      </footer>
    </div>
  );
}
