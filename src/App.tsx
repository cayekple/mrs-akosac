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
  const [bioExpanded, setBioExpanded] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [countdown, setCountdown] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  const prevFocusRef = useRef<HTMLElement | null>(null);
  const closeBtnRef = useRef<HTMLButtonElement | null>(null);

  const basePath = import.meta.env.BASE_URL.replace(/\/$/, '');

  const galleryCategories = [
    {
      title: 'Picture of the Deceased',
      images: [
        { src: `${basePath}/img/1.jpeg`, alt: 'Mrs Harriet Atuahene Sarkodie (Mrs AKOSAC)', objectPosition: 'top' },
        { src: `${basePath}/img/individual/1a.jpg`, alt: 'Mrs Harriet Atuahene Sarkodie (Mrs AKOSAC)', objectPosition: 'top' },
        { src: `${basePath}/img/individual/6.jpg`, alt: 'Mrs Harriet Atuahene Sarkodie (Mrs AKOSAC)', objectPosition: 'top' },
        { src: `${basePath}/img/individual/8.jpg`, alt: 'Mrs Harriet Atuahene Sarkodie (Mrs AKOSAC)', objectPosition: 'top' },
        { src: `${basePath}/img/individual/9.jpg`, alt: 'Mrs Harriet Atuahene Sarkodie (Mrs AKOSAC)', objectPosition: 'top' },
        { src: `${basePath}/img/individual/10.jpeg`, alt: 'Mrs Harriet Atuahene Sarkodie (Mrs AKOSAC)', objectPosition: 'top' },
        { src: `${basePath}/img/individual/11.jpeg`, alt: 'Mrs Harriet Atuahene Sarkodie (Mrs AKOSAC)', objectPosition: 'top' },
        { src: `${basePath}/img/individual/18.jpeg`, alt: 'Mrs Harriet Atuahene Sarkodie (Mrs AKOSAC)', objectPosition: 'top' },
        { src: `${basePath}/img/individual/25.jpg`, alt: 'Mrs Harriet Atuahene Sarkodie (Mrs AKOSAC)', objectPosition: 'top' },
        { src: `${basePath}/img/individual/34.jpeg`, alt: 'Mrs Harriet Atuahene Sarkodie (Mrs AKOSAC)', objectPosition: 'top' },
        { src: `${basePath}/img/individual/IMG-20251001-WA0000.jpg`, alt: 'Mrs Harriet Atuahene Sarkodie (Mrs AKOSAC)', objectPosition: 'top' },
        { src: `${basePath}/img/individual/IMG-20251001-WA0008.jpg`, alt: 'Mrs Harriet Atuahene Sarkodie (Mrs AKOSAC)', objectPosition: 'top' },
        { src: `${basePath}/img/individual/IMG-20251223-WA0000.jpg`, alt: 'Mrs Harriet Atuahene Sarkodie (Mrs AKOSAC)', objectPosition: 'top' },
        { src: `${basePath}/img/individual/IMG-20251223-WA0015.jpg`, alt: 'Mrs Harriet Atuahene Sarkodie (Mrs AKOSAC)', objectPosition: 'top' },
        { src: `${basePath}/img/individual/IMG-20260302-WA0080.jpg`, alt: 'Mrs Harriet Atuahene Sarkodie (Mrs AKOSAC)', objectPosition: 'top' },
      ]
    },
    {
      title: 'Husband — Eric Kofi Atuahene Sarkodie (Late)',
      images: [
        { src: `${basePath}/img/husband/h1.jpeg`, alt: 'Mrs AKOSAC with husband', objectPosition: 'top' },
        { src: `${basePath}/img/husband/h2.jpeg`, alt: 'Mrs AKOSAC with husband', objectPosition: 'top' },
        { src: `${basePath}/img/husband/h3.jpeg`, alt: 'Mrs AKOSAC with husband', objectPosition: 'top' },
        { src: `${basePath}/img/husband/h4.jpg`, alt: 'Mrs AKOSAC with husband', objectPosition: 'top' },
        { src: `${basePath}/img/husband/h5.jpg`, alt: 'Mrs AKOSAC with husband', objectPosition: 'top' },
        { src: `${basePath}/img/husband/IMG-20260405-WA0049.jpg`, alt: 'Mrs AKOSAC with husband', objectPosition: 'top' },
        { src: `${basePath}/img/husband/IMG-20260405-WA0050.jpg`, alt: 'Mrs AKOSAC with husband', objectPosition: 'top' },
        { src: `${basePath}/img/husband/IMG-20260405-WA0051.jpg`, alt: 'Mrs AKOSAC with husband', objectPosition: 'top' },
      ]
    },
    {
      title: 'Children',
      images: [
        { src: `${basePath}/img/children/c1.jpeg`, alt: 'Mrs AKOSAC with Abigail Abena Kyeraa Sarkodie Ansah', caption: 'Abigail Abena Kyeraa Sarkodie Ansah' },
        { src: `${basePath}/img/children/c2.jpg`, alt: 'Mrs AKOSAC with Kofi Atuahene Sarkodie', caption: 'Kofi Atuahene Sarkodie' },
        { src: `${basePath}/img/children/c3.jpeg`, alt: 'Mrs AKOSAC with Nana Yaa Asarewaa Sarkodie Nunoo', caption: 'Nana Yaa Asarewaa Sarkodie Nunoo' },
      ]
    },
    {
      title: 'In-Laws',
      images: [
        { src: `${basePath}/img/inlaws/i1.jpeg`, alt: 'Mrs AKOSAC with Benjamin Ansah', caption: 'Benjamin Ansah', objectPosition: 'top' },
        { src: `${basePath}/img/inlaws/i2.jpeg`, alt: 'Mrs AKOSAC with Shirley Akua Kankam Atuahene Sarkodie', caption: 'Shirley Akua Kankam Atuahene Sarkodie', objectPosition: 'top' },
        { src: `${basePath}/img/inlaws/i3.jpeg`, alt: 'Mrs AKOSAC with Jacob Nunoo', caption: 'Jacob Nunoo', objectPosition: 'top' },
      ]
    },
    {
      title: 'Grandchildren',
      images: [
        { src: `${basePath}/img/grandchildren/g1.jpg`, alt: 'Mrs AKOSAC with Jared Kofi Obo Ansah', caption: 'Jared Kofi Obo Ansah', objectPosition: 'top' },
        { src: `${basePath}/img/grandchildren/g2.jpeg`, alt: 'Mrs AKOSAC with Damaris Harriet Efua Ansah', caption: 'Damaris Harriet Efua Ansah', objectPosition: 'top' },
        { src: `${basePath}/img/grandchildren/g3.jpg`, alt: 'Mrs AKOSAC with Papa Kofi Atuahene Sarkodie Jnr.', caption: 'Papa Kofi Atuahene Sarkodie Jnr.', objectPosition: 'top' },
        { src: `${basePath}/img/grandchildren/g4.jpg`, alt: 'Mrs AKOSAC with Ama Kwakyewaa Atuahene Sarkodie', caption: 'Ama Kwakyewaa Atuahene Sarkodie', objectPosition: 'top' },
        { src: `${basePath}/img/grandchildren/g5.jpg`, alt: 'Mrs AKOSAC with Adwoa Owuswaa Atuahene Sarkodie', caption: 'Adwoa Owuswaa Atuahene Sarkodie', objectPosition: 'top' },
        { src: `${basePath}/img/grandchildren/g6.jpeg`, alt: 'Mrs AKOSAC with Nylephtha Efua Badwua Nunoo', caption: 'Nylephtha Efua Badwua Nunoo', objectPosition: 'top' },
      ]
    },
    {
      title: 'Children & Family',
      images: [
        { src: `${basePath}/img/children-family/2.jpg`, alt: 'Mrs AKOSAC with children and family' },
        { src: `${basePath}/img/children-family/1.png`, alt: 'Mrs AKOSAC with children and family' },
        { src: `${basePath}/img/children-family/n3.jpg`, alt: 'Mrs AKOSAC with children and family' },
      ]
    },
    {
      title: 'Family & Friends',
      images: [
        { src: `${basePath}/img/family-friends/f1.jpg`, alt: 'Mrs AKOSAC with family and friends' },
        { src: `${basePath}/img/family-friends/f2.jpeg`, alt: 'Mrs AKOSAC with family and friends' },
        { src: `${basePath}/img/family-friends/4.jpg`, alt: 'Mrs AKOSAC with family and friends' },
        { src: `${basePath}/img/family-friends/5.jpg`, alt: 'Mrs AKOSAC with family and friends' },
        { src: `${basePath}/img/family-friends/29.jpg`, alt: 'Mrs AKOSAC with family and friends' },
        { src: `${basePath}/img/family-friends/IMG-20241231-WA0001.jpg`, alt: 'Mrs AKOSAC with family and friends' },
        { src: `${basePath}/img/family-friends/IMG-20241231-WA0004.jpg`, alt: 'Mrs AKOSAC with family and friends' },
        { src: `${basePath}/img/family-friends/IMG-20251223-WA0001.jpg`, alt: 'Mrs AKOSAC with family and friends' },
        { src: `${basePath}/img/family-friends/IMG-20251223-WA0011.jpg`, alt: 'Mrs AKOSAC with family and friends' },
        { src: `${basePath}/img/family-friends/WhatsApp Image 2026-04-17 at 11.05.32.jpeg`, alt: 'Mrs AKOSAC with family and friends' },
        { src: `${basePath}/img/family-friends/WhatsApp Image 2026-04-17 at 11.06.10.jpeg`, alt: 'Mrs AKOSAC with family and friends' },
        { src: `${basePath}/img/family-friends/WhatsApp Image 2026-04-18 at 09.05.24.jpeg`, alt: 'Mrs AKOSAC with family and friends' },
        { src: `${basePath}/img/family-friends/WhatsApp Image 2026-04-18 at 10.49.07.jpeg`, alt: 'Mrs AKOSAC with family and friends' },
      ]
    },
    {
      title: 'Memorial Gallery',
      images: [
        { src: `${basePath}/img/2.jpeg`, alt: 'In memory of Mrs AKOSAC' },
        { src: `${basePath}/img/general/2.jpg`, alt: 'In memory of Mrs AKOSAC' },
        { src: `${basePath}/img/general/3.jpg`, alt: 'In memory of Mrs AKOSAC' },
        { src: `${basePath}/img/general/7.jpg`, alt: 'In memory of Mrs AKOSAC' },
        { src: `${basePath}/img/general/12.jpg`, alt: 'In memory of Mrs AKOSAC' },
        { src: `${basePath}/img/general/14.jpg`, alt: 'In memory of Mrs AKOSAC' },
        { src: `${basePath}/img/general/15.jpg`, alt: 'In memory of Mrs AKOSAC' },
        { src: `${basePath}/img/general/16.jpg`, alt: 'In memory of Mrs AKOSAC' },
        { src: `${basePath}/img/general/17.jpg`, alt: 'In memory of Mrs AKOSAC' },
        { src: `${basePath}/img/general/19.jpg`, alt: 'In memory of Mrs AKOSAC' },
        { src: `${basePath}/img/general/20.jpeg`, alt: 'In memory of Mrs AKOSAC' },
        { src: `${basePath}/img/general/21.jpg`, alt: 'In memory of Mrs AKOSAC' },
        { src: `${basePath}/img/general/22.jpg`, alt: 'In memory of Mrs AKOSAC' },
        { src: `${basePath}/img/general/24.jpg`, alt: 'In memory of Mrs AKOSAC' },
        { src: `${basePath}/img/general/26.jpg`, alt: 'In memory of Mrs AKOSAC' },
        { src: `${basePath}/img/general/27.jpg`, alt: 'In memory of Mrs AKOSAC' },
        { src: `${basePath}/img/general/28.jpg`, alt: 'In memory of Mrs AKOSAC' },
        { src: `${basePath}/img/general/30.jpg`, alt: 'In memory of Mrs AKOSAC' },
        { src: `${basePath}/img/general/31.jpeg`, alt: 'In memory of Mrs AKOSAC' },
        { src: `${basePath}/img/general/32.jpeg`, alt: 'In memory of Mrs AKOSAC' },
        { src: `${basePath}/img/general/35.jpeg`, alt: 'In memory of Mrs AKOSAC' },
        { src: `${basePath}/img/general/36.jpeg`, alt: 'In memory of Mrs AKOSAC' },
        { src: `${basePath}/img/general/38.jpeg`, alt: 'In memory of Mrs AKOSAC' },
        { src: `${basePath}/img/general/c1.jpg`, alt: 'In memory of Mrs AKOSAC' },
        { src: `${basePath}/img/general/c2.jpg`, alt: 'In memory of Mrs AKOSAC' },
        { src: `${basePath}/img/general/g5.jpeg`, alt: 'In memory of Mrs AKOSAC' },
        { src: `${basePath}/img/general/g6.jpeg`, alt: 'In memory of Mrs AKOSAC' },
        { src: `${basePath}/img/general/g7.jpeg`, alt: 'In memory of Mrs AKOSAC' },
        { src: `${basePath}/img/general/g8.jpeg`, alt: 'In memory of Mrs AKOSAC' },
        { src: `${basePath}/img/general/g8.jpg`, alt: 'In memory of Mrs AKOSAC' },
        { src: `${basePath}/img/general/IMG-20241231-WA0006.jpg`, alt: 'In memory of Mrs AKOSAC' },
        { src: `${basePath}/img/general/IMG-20241231-WA0012.jpg`, alt: 'In memory of Mrs AKOSAC' },
        { src: `${basePath}/img/general/IMG-20250102-WA0016.jpg`, alt: 'In memory of Mrs AKOSAC' },
        { src: `${basePath}/img/general/IMG-20250102-WA0017.jpg`, alt: 'In memory of Mrs AKOSAC' },
        { src: `${basePath}/img/general/IMG-20251223-WA0012.jpg`, alt: 'In memory of Mrs AKOSAC' },
        { src: `${basePath}/img/general/IMG-20251223-WA0016.jpg`, alt: 'In memory of Mrs AKOSAC' },
        { src: `${basePath}/img/general/IMG-20251228-WA0000.jpg`, alt: 'In memory of Mrs AKOSAC' },
        { src: `${basePath}/img/general/IMG-20251228-WA0005.jpg`, alt: 'In memory of Mrs AKOSAC' },
        { src: `${basePath}/img/general/IMG-20251228-WA0014.jpg`, alt: 'In memory of Mrs AKOSAC' },
        { src: `${basePath}/img/general/IMG-20251228-WA0022.jpg`, alt: 'In memory of Mrs AKOSAC' },
        { src: `${basePath}/img/general/IMG-20251228-WA0032.jpg`, alt: 'In memory of Mrs AKOSAC' },
        { src: `${basePath}/img/general/IMG-20251228-WA0033.jpg`, alt: 'In memory of Mrs AKOSAC' },
        { src: `${basePath}/img/general/IMG-20260113-WA0009.jpg`, alt: 'In memory of Mrs AKOSAC' },
        { src: `${basePath}/img/general/IMG-20260113-WA0032.jpg`, alt: 'In memory of Mrs AKOSAC' },
        { src: `${basePath}/img/general/IMG-20260113-WA0035.jpg`, alt: 'In memory of Mrs AKOSAC' },
        { src: `${basePath}/img/general/IMG-20260113-WA0036.jpg`, alt: 'In memory of Mrs AKOSAC' },
        { src: `${basePath}/img/general/IMG-20260113-WA0043.jpg`, alt: 'In memory of Mrs AKOSAC' },
        { src: `${basePath}/img/general/IMG-20260113-WA0049.jpg`, alt: 'In memory of Mrs AKOSAC' },
        { src: `${basePath}/img/general/IMG-20260113-WA0052.jpg`, alt: 'In memory of Mrs AKOSAC' },
        { src: `${basePath}/img/general/IMG-20260113-WA0055.jpg`, alt: 'In memory of Mrs AKOSAC' },
        { src: `${basePath}/img/general/IMG-20260113-WA0056.jpg`, alt: 'In memory of Mrs AKOSAC' },
        { src: `${basePath}/img/general/IMG-20260121-WA0005.jpg`, alt: 'In memory of Mrs AKOSAC' },
        { src: `${basePath}/img/general/IMG-20260123-WA0025.jpg`, alt: 'In memory of Mrs AKOSAC' },
        { src: `${basePath}/img/general/IMG-20260123-WA0071.jpg`, alt: 'In memory of Mrs AKOSAC' },
        { src: `${basePath}/img/general/IMG-20260123-WA0073.jpg`, alt: 'In memory of Mrs AKOSAC' },
        { src: `${basePath}/img/general/IMG-20260302-WA0053.jpg`, alt: 'In memory of Mrs AKOSAC' },
        { src: `${basePath}/img/general/IMG-20260302-WA0055.jpg`, alt: 'In memory of Mrs AKOSAC' },
        { src: `${basePath}/img/general/IMG-20260302-WA0056.jpg`, alt: 'In memory of Mrs AKOSAC' },
        { src: `${basePath}/img/general/IMG-20260302-WA0057.jpg`, alt: 'In memory of Mrs AKOSAC' },
        { src: `${basePath}/img/general/IMG-20260302-WA0059.jpg`, alt: 'In memory of Mrs AKOSAC' },
        { src: `${basePath}/img/general/IMG-20260302-WA0060.jpg`, alt: 'In memory of Mrs AKOSAC' },
        { src: `${basePath}/img/general/IMG-20260302-WA0061.jpg`, alt: 'In memory of Mrs AKOSAC' },
        { src: `${basePath}/img/general/IMG-20260302-WA0062.jpg`, alt: 'In memory of Mrs AKOSAC' },
        { src: `${basePath}/img/general/IMG-20260302-WA0063.jpg`, alt: 'In memory of Mrs AKOSAC' },
        { src: `${basePath}/img/general/IMG-20260302-WA0064.jpg`, alt: 'In memory of Mrs AKOSAC' },
        { src: `${basePath}/img/general/IMG-20260302-WA0065.jpg`, alt: 'In memory of Mrs AKOSAC' },
        { src: `${basePath}/img/general/IMG-20260302-WA0066.jpg`, alt: 'In memory of Mrs AKOSAC' },
        { src: `${basePath}/img/general/IMG-20260302-WA0067.jpg`, alt: 'In memory of Mrs AKOSAC' },
        { src: `${basePath}/img/general/IMG-20260302-WA0068.jpg`, alt: 'In memory of Mrs AKOSAC' },
        { src: `${basePath}/img/general/IMG-20260302-WA0069.jpg`, alt: 'In memory of Mrs AKOSAC' },
        { src: `${basePath}/img/general/IMG-20260302-WA0070.jpg`, alt: 'In memory of Mrs AKOSAC' },
        { src: `${basePath}/img/general/IMG-20260302-WA0071.jpg`, alt: 'In memory of Mrs AKOSAC' },
        { src: `${basePath}/img/general/IMG-20260302-WA0072.jpg`, alt: 'In memory of Mrs AKOSAC' },
        { src: `${basePath}/img/general/IMG-20260302-WA0073.jpg`, alt: 'In memory of Mrs AKOSAC' },
        { src: `${basePath}/img/general/IMG-20260302-WA0074.jpg`, alt: 'In memory of Mrs AKOSAC' },
        { src: `${basePath}/img/general/IMG-20260302-WA0075.jpg`, alt: 'In memory of Mrs AKOSAC' },
        { src: `${basePath}/img/general/IMG-20260302-WA0076.jpg`, alt: 'In memory of Mrs AKOSAC' },
        { src: `${basePath}/img/general/IMG-20260302-WA0078.jpg`, alt: 'In memory of Mrs AKOSAC' },
        { src: `${basePath}/img/general/IMG-20260302-WA0079.jpg`, alt: 'In memory of Mrs AKOSAC' },
        { src: `${basePath}/img/general/IMG-20260302-WA0082.jpg`, alt: 'In memory of Mrs AKOSAC' },
        { src: `${basePath}/img/general/IMG-20260325-WA0002.jpg`, alt: 'In memory of Mrs AKOSAC' },
        { src: `${basePath}/img/general/IMG-20260325-WA0004.jpg`, alt: 'In memory of Mrs AKOSAC' },
        { src: `${basePath}/img/general/IMG-20260405-WA0002 (1).jpg`, alt: 'In memory of Mrs AKOSAC' },
        { src: `${basePath}/img/general/IMG-20260405-WA0034.jpg`, alt: 'In memory of Mrs AKOSAC' },
        { src: `${basePath}/img/general/IMG-20260405-WA0035.jpg`, alt: 'In memory of Mrs AKOSAC' },
        { src: `${basePath}/img/general/IMG-20260405-WA0036.jpg`, alt: 'In memory of Mrs AKOSAC' },
        { src: `${basePath}/img/general/IMG-20260405-WA0037.jpg`, alt: 'In memory of Mrs AKOSAC' },
        { src: `${basePath}/img/general/WhatsApp Image 2026-04-17 at 09.57.42 (3).jpeg`, alt: 'In memory of Mrs AKOSAC' },
        { src: `${basePath}/img/general/WhatsApp Image 2026-04-17 at 09.57.42 (4).jpeg`, alt: 'In memory of Mrs AKOSAC' },
        { src: `${basePath}/img/general/WhatsApp Image 2026-04-17 at 09.57.42.jpeg`, alt: 'In memory of Mrs AKOSAC' },
        { src: `${basePath}/img/general/WhatsApp Image 2026-04-17 at 09.58.03.jpeg`, alt: 'In memory of Mrs AKOSAC' },
        { src: `${basePath}/img/general/WhatsApp Image 2026-04-17 at 09.58.14.jpeg`, alt: 'In memory of Mrs AKOSAC' },
        { src: `${basePath}/img/general/WhatsApp Image 2026-04-17 at 09.59.26 (1).jpeg`, alt: 'In memory of Mrs AKOSAC' },
        { src: `${basePath}/img/general/WhatsApp Image 2026-04-17 at 09.59.26 (2).jpeg`, alt: 'In memory of Mrs AKOSAC' },
        { src: `${basePath}/img/general/WhatsApp Image 2026-04-17 at 09.59.26 (4).jpeg`, alt: 'In memory of Mrs AKOSAC' },
        { src: `${basePath}/img/general/WhatsApp Image 2026-04-17 at 09.59.48.jpeg`, alt: 'In memory of Mrs AKOSAC' },
        { src: `${basePath}/img/general/WhatsApp Image 2026-04-17 at 10.01.41 (2).jpeg`, alt: 'In memory of Mrs AKOSAC' },
        { src: `${basePath}/img/general/WhatsApp Image 2026-04-17 at 10.06.22.jpeg`, alt: 'In memory of Mrs AKOSAC' },
        { src: `${basePath}/img/general/WhatsApp Image 2026-04-17 at 10.27.08 (1).jpeg`, alt: 'In memory of Mrs AKOSAC' },
        { src: `${basePath}/img/general/WhatsApp Image 2026-04-17 at 10.27.08.jpeg`, alt: 'In memory of Mrs AKOSAC' },
        { src: `${basePath}/img/general/WhatsApp Image 2026-04-17 at 10.42.44 (1).jpeg`, alt: 'In memory of Mrs AKOSAC' },
        { src: `${basePath}/img/general/WhatsApp Image 2026-04-17 at 10.42.44 (2).jpeg`, alt: 'In memory of Mrs AKOSAC' },
        { src: `${basePath}/img/general/WhatsApp Image 2026-04-17 at 10.42.44 (3).jpeg`, alt: 'In memory of Mrs AKOSAC' },
        { src: `${basePath}/img/general/WhatsApp Image 2026-04-17 at 10.42.44.jpeg`, alt: 'In memory of Mrs AKOSAC' },
        { src: `${basePath}/img/general/WhatsApp Image 2026-04-17 at 11.05.49.jpeg`, alt: 'In memory of Mrs AKOSAC' },
        { src: `${basePath}/img/general/WhatsApp Image 2026-04-17 at 11.07.19.jpeg`, alt: 'In memory of Mrs AKOSAC' },
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
    { time: '8:00 AM', title: 'Body Viewing', location: 'AKOSAC\'s residence, Akosac\'s Street near Santiago Bar', icon: '👁️' },
    { time: '10:00 AM', title: 'Memorial Speech, Music & Photo Gallery', location: '', icon: '🎵' },

  ];

  return (
    <div className="min-h-screen bg-white text-gray-900 font-sans dark:bg-gray-950 dark:text-white relative overflow-x-clip">
      {/* Immersive background image */}
      <div className="fixed inset-0 pointer-events-none">
        <img
          src={`${basePath}/img/1.jpeg`}
          alt=""
          aria-hidden="true"
          className="w-full h-full object-cover object-top"
        />
        <div className="absolute inset-0 bg-white/85 dark:bg-gray-950/90"></div>
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
            {/* Portfolio Hero */}
            <div className="mb-20 animate-fade-in">
              {/* Portrait + Name Grid */}
              <div className="grid md:grid-cols-2 gap-12 lg:gap-20 items-center mb-14">
                {/* Portrait */}
                <div className="flex justify-center md:justify-end animate-slide-in-left">
                  <div className="relative">
                    <div
                      className="w-64 h-64 sm:w-80 sm:h-80 md:w-96 md:h-96 rounded-full overflow-hidden ring-8 ring-blue-200 dark:ring-blue-800 shadow-2xl hover-glow transition-all duration-500"
                      style={{
                        transform: `perspective(1000px) rotateX(${mousePosition.y * 0.03}deg) rotateY(${mousePosition.x * 0.03}deg)`
                      }}
                    >
                      <img
                        src={`${basePath}/img/1.jpeg`}
                        alt="Mrs Harriet Atuahene Sarkodie (Mrs AKOSAC)"
                        className="w-full h-full object-cover object-top"
                      />
                    </div>
                    <div className="absolute -inset-4 rounded-full border-2 border-blue-300/20 dark:border-blue-600/20 animate-float pointer-events-none"></div>
                  </div>
                </div>

                {/* Name & Info */}
                <div className="text-center md:text-left animate-slide-in-right">
                  <p className="text-blue-600 dark:text-blue-400 font-semibold tracking-widest uppercase text-sm mb-4 animate-fade-in">
                    In Loving Memory
                  </p>
                  <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-2 leading-tight tracking-tight animate-slide-up stagger-1">
                    Mrs Harriet<br className="hidden sm:block" /> Atuahene Sarkodie
                  </h1>
                  <p className="text-xl sm:text-2xl text-gray-600 dark:text-gray-400 font-light mb-1 animate-slide-up stagger-2">
                    (Mrs AKOSAC)
                  </p>
                  <p className="text-lg text-gray-500 dark:text-gray-500 italic mb-6 animate-slide-up stagger-3">
                    aka Auntie Akweley
                  </p>

                  <div className="inline-flex items-center gap-3 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-full px-6 py-2.5 text-blue-700 dark:text-blue-300 font-medium mb-8 animate-scale-in">
                    <span>15 Feb 1953</span>
                    <div className="w-1.5 h-1.5 rounded-full bg-blue-400"></div>
                    <span>24 Dec 2025</span>
                  </div>

                  <div className="flex flex-wrap gap-3 justify-center md:justify-start mb-8">
                    {['72 Years of Life', '53 Years of Marriage', 'Devoted Mother', 'Faithful Servant'].map(tag => (
                      <span key={tag} className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-full px-4 py-1.5 text-sm text-gray-700 dark:text-gray-300 shadow-sm hover-lift">
                        {tag}
                      </span>
                    ))}
                  </div>

                  <p className="text-lg text-gray-600 dark:text-gray-400 italic leading-relaxed max-w-lg mx-auto md:mx-0">
                    &quot;A loving mother, devoted grandmother, and cherished member of the community&quot;
                  </p>
                </div>
              </div>

              {/* Countdown Timer */}
              <div className="max-w-3xl mx-auto mb-8 animate-bounce-in">
                <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-2xl p-6 border-2 border-blue-200 dark:border-blue-800">
                  <h3 className="text-center text-lg font-semibold mb-4 text-gray-700 dark:text-gray-300">Time Until Service</h3>
                  <div className="grid grid-cols-4 gap-4">
                    <div className="hover-lift bg-blue-50 dark:bg-blue-900/20 rounded-xl p-4 text-center">
                      <div className="text-3xl sm:text-4xl font-bold text-blue-600 dark:text-blue-400">{countdown.days}</div>
                      <div className="text-sm text-gray-600 dark:text-gray-400 mt-1">Days</div>
                    </div>
                    <div className="hover-lift bg-blue-50 dark:bg-blue-900/20 rounded-xl p-4 text-center">
                      <div className="text-3xl sm:text-4xl font-bold text-blue-600 dark:text-blue-400">{countdown.hours}</div>
                      <div className="text-sm text-gray-600 dark:text-gray-400 mt-1">Hours</div>
                    </div>
                    <div className="hover-lift bg-blue-50 dark:bg-blue-900/20 rounded-xl p-4 text-center">
                      <div className="text-3xl sm:text-4xl font-bold text-blue-600 dark:text-blue-400">{countdown.minutes}</div>
                      <div className="text-sm text-gray-600 dark:text-gray-400 mt-1">Minutes</div>
                    </div>
                    <div className="hover-lift bg-blue-50 dark:bg-blue-900/20 rounded-xl p-4 text-center">
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
                  <p className="text-gray-600 dark:text-gray-400">AGA Basic School, Obuasi</p>
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
                  <p className="text-gray-600 dark:text-gray-400">8:00 AM</p>
                </div>
              </div>

              <div className="max-w-2xl mx-auto space-y-3 text-base sm:text-lg text-gray-600 dark:text-gray-400 text-center">
                <p className="hover:text-gray-900 dark:hover:text-gray-200 transition-colors">
                  <span className="font-semibold">Body Viewing:</span> AKOSAC's residence, Akosac's Street near Santiago Bar, Obuasi at 8:00 AM
                </p>
                <p className="hover:text-gray-900 dark:hover:text-gray-200 transition-colors">
                  <span className="font-semibold">Memorial Speech, Music & Photo Gallery:</span> 10:00 AM
                </p>
              </div>
            </div>

            {/* Biography Section */}
            <div className="max-w-4xl mx-auto mb-20 animate-fade-in">
              <div className="flex items-center gap-3 mb-8">
                <div className="h-1 w-12 bg-blue-500 rounded-full"></div>
                <h3 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white">
                  In Loving Memory
                </h3>
                <div className="h-1 flex-1 bg-blue-500 rounded-full"></div>
              </div>

              {/* Preview — always visible */}
              <div className="hover-lift bg-white/50 dark:bg-gray-900/50 p-6 rounded-xl backdrop-blur-sm space-y-4 text-gray-700 dark:text-gray-300 leading-relaxed text-justify mb-4">
                <h4 className="text-xl font-bold text-gray-900 dark:text-white">Mrs. Harriet Atuahene Sarkodie (Auntie Akwaley)</h4>
                <p>
                  Mrs. Harriet Atuahene Sarkodie, affectionately known as Auntie Akwaley, was born on 15th February 1953 at Kukurantumi in the Eastern Region of Ghana, to Obaapayin Akosua Adgyeiwaa and Mr. Kwesi Larbi. Her father hailed from James Town with Ga roots, while her mother was Akyem from Kukurantumi.
                </p>
                <p>
                  She was born into a large, vibrant family of nine siblings and shared a unique bond with her twin, popularly known as Auntie Akooko. Auntie Akwaley and her twin sister were inseparable companions through life's early journey, embodying a deep connection that only twins can share. Sadly, her twin sister passed away some years ago—a loss she carried with quiet strength and grace.
                </p>
              </div>

              {/* Expandable content */}
              {bioExpanded && (
                <div className="space-y-4 animate-fade-in mb-4">
                  <div className="hover-lift bg-white/50 dark:bg-gray-900/50 p-6 rounded-xl backdrop-blur-sm space-y-4 text-gray-700 dark:text-gray-300 leading-relaxed text-justify">
                    <p>
                      Over time, she also lost many of her siblings, and at the time of her passing, only one sister remained. Auntie Akwaley and her twin sister were the last of the nine siblings, marking the close of a remarkable family generation.
                    </p>
                    <p>
                      From an early age, Harriet distinguished herself through diligence and excellence. She began her basic education in Kukurantumi and completed her middle school education in 1968. Despite being the youngest in her class, she consistently excelled academically and earned the admiration of both peers and teachers. She served as Girls' Prefect at both primary and middle school levels and was widely recognised for her discipline, neatness, and outstanding performance.
                    </p>
                    <p>
                      Her academic brilliance earned her several scholarships to further her education. However, due to circumstances beyond her control, she was unable to take advantage of these opportunities. Undeterred, Harriet displayed remarkable resilience and entrepreneurial spirit by venturing into a small-scale business, where she found success through sheer hard work and determination.
                    </p>
                    <p>
                      In January 1970, Harriet married the love of her life, Mr. Eric Kofi Atuahene Sarkodie (of blessed memory). Their union, which spanned 53 years, was built on love, mutual respect, and unwavering partnership. Together, they were blessed with four children, though their first child sadly passed shortly after birth. They lovingly raised three children: Abigail Abena Kyeraa Sarkodie Ansah, Kofi Atuahene Sarkodie, and Nana Yaa Asarewaa Sarkodie Nunoo Nunoo.
                    </p>
                    <p>
                      Harriet was a pillar of strength in her family and played a central role in the success of their business ventures. In March 1985, together with her husband, she established a licensed chemical shop in Obuasi, which later became a pharmacy in 1993. Through her intelligence, dedication, and tireless work ethic, she made the business flourish and become one of the town's leading pharmacies.
                    </p>
                  </div>
                  <div className="hover-lift bg-white/50 dark:bg-gray-900/50 p-6 rounded-xl backdrop-blur-sm space-y-4 text-gray-700 dark:text-gray-300 leading-relaxed text-justify">
                    <h4 className="text-xl font-bold text-gray-900 dark:text-white">Her Spiritual Journey</h4>
                    <p>
                      Though not born into a family of Jehovah's Witnesses, Harriet's spiritual path began when her mother embraced Bible truth through her study with the Witnesses. Harriet followed this path with conviction and, on 8th December 1967, symbolised her dedication to Jehovah through water baptism. She remained a faithful and devoted servant of Jehovah throughout her life until her peaceful passing on 24th December 2025.
                    </p>
                    <p>
                      Auntie Akwaley was widely known for her warm hospitality and kindness, especially toward travelling overseers and full-time servants. Her home was always open, offering comfort, nourishment, and a sense of belonging to all who visited. Together with her husband, she supported preaching activities in areas of greater need, particularly in Aduaneɛdɛ, where they served diligently for 17 years. Through her efforts, many came to know and dedicate their lives to Jehovah.
                    </p>
                    <p>
                      She was an exemplary figure to many—especially young ones and married couples—demonstrating through her life what it meant to love, serve, and remain steadfast in faith.
                    </p>
                  </div>
                  <div className="hover-lift bg-white/50 dark:bg-gray-900/50 p-6 rounded-xl backdrop-blur-sm space-y-4 text-gray-700 dark:text-gray-300 leading-relaxed text-justify">
                    <h4 className="text-xl font-bold text-gray-900 dark:text-white">A Devoted Wife, Loving Mother, and Compassionate Caregiver</h4>
                    <p>
                      Harriet was a remarkable woman whose life was defined by love, strength, and selflessness. As a wife, she stood firmly beside her husband through every season, offering unwavering support and companionship. Their home was a haven of peace, built on trust, respect, and deep affection.
                    </p>
                    <p>
                      As a mother, Harriet was nurturing, sacrificial, and deeply devoted. She worked tirelessly to ensure the well-being and happiness of her children, always placing their needs above her own. Her guidance, wisdom, and unconditional love shaped their lives in profound ways.
                    </p>
                    <p>
                      Beyond her immediate family, Harriet's heart extended to many others. Following the tragic loss of her twin sister, she lovingly took her sister's children and raised them herself—an extraordinary testament to her boundless compassion and generosity. Indeed, she became a mother to many, and her influence reached far beyond her household.
                    </p>
                    <p>
                      Such was her impact that many friends chose to name their children after her—a lasting tribute to the love and respect she inspired.
                    </p>
                  </div>
                  <div className="hover-lift bg-white/50 dark:bg-gray-900/50 p-6 rounded-xl backdrop-blur-sm space-y-4 text-gray-700 dark:text-gray-300 leading-relaxed text-justify">
                    <h4 className="text-xl font-bold text-gray-900 dark:text-white">A Life of Warmth and Generosity</h4>
                    <p>
                      Auntie Akwaley had a special gift for bringing people together, often expressed through her love of cooking. Her meals were not merely food but heartfelt expressions of care, warmth, and unity. She found joy in serving others, and her kindness touched countless lives, both near and far.
                    </p>
                  </div>
                  <div className="hover-lift bg-white/50 dark:bg-gray-900/50 p-6 rounded-xl backdrop-blur-sm space-y-4 text-gray-700 dark:text-gray-300 leading-relaxed text-justify">
                    <h4 className="text-xl font-bold text-gray-900 dark:text-white">A Blessed Hope</h4>
                    <p>
                      Though our hearts are heavy with grief, we find comfort in the sure hope of the resurrection—a promise that sustains us in this time of loss.
                    </p>
                    <p>
                      Harriet's legacy of love, faith, and kindness will continue to live on in all who knew her.
                    </p>
                    <p>
                      She has fought the fine fight, she has finished the race, she has kept the faith.
                    </p>
                    <p className="font-semibold text-gray-900 dark:text-white">Forever in our hearts.</p>
                  </div>
                </div>
              )}

              <button
                onClick={() => setBioExpanded(!bioExpanded)}
                className="px-8 py-4 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 shadow-lg hover:shadow-xl hover:scale-105 font-semibold"
              >
                {bioExpanded ? '↑ Read Less' : '📖 Read More'}
              </button>
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
              <div className="space-y-8">
                {/* Opening Song Card */}
                <div className="bg-blue-50 dark:bg-blue-900/20 rounded-xl hover-lift border-2 border-transparent hover:border-blue-400 transition-all duration-300 animate-slide-up stagger-1 p-6">
                  <div className="text-center mb-4">
                    <div className="text-5xl mb-3 animate-float">🎵</div>
                    <p className="font-bold text-2xl text-gray-900 dark:text-white mb-1">Opening Song</p>
                    <p className="text-lg font-semibold text-blue-600 dark:text-blue-400 mb-2">Song 156</p>
                    <p className="text-xl font-bold text-gray-800 dark:text-gray-200 mb-1">With Eyes of Faith</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400 italic">(Psalm 27:13)</p>
                  </div>
                  <div className="text-center space-y-3 text-base text-gray-700 dark:text-gray-300 leading-relaxed">
                    <div>
                      <p className="font-semibold mb-1">1. Why should I fear the lion?</p>
                      <p>Why should I fear any foe?</p>
                      <p>With Jehovah by my side,</p>
                      <p>I will not run and hide.</p>
                      <p>My God is with me; this I know.</p>
                    </div>
                    <div className="italic pl-4 border-l-2 border-blue-400">
                      <p className="font-semibold mb-1">(CHORUS)</p>
                      <p>With eyes of faith,</p>
                      <p>I see beyond the darkness.</p>
                      <p>With eyes of faith,</p>
                      <p>there's nothing more to fear.</p>
                      <p>With Jehovah, I am strong,</p>
                      <p>Determined to go on,</p>
                      <p>Knowing that my God</p>
                      <p>is always near—</p>
                      <p>With eyes of faith.</p>
                    </div>
                    <div>
                      <p className="font-semibold mb-1">2. Those faithful ones before us</p>
                      <p>Lived their lives in loyalty.</p>
                      <p>By their faith they endured.</p>
                      <p>Their future is assured.</p>
                      <p>They'll stand again for all to see.</p>
                    </div>
                    <div className="italic pl-4 border-l-2 border-blue-400">
                      <p className="font-semibold mb-1">(CHORUS)</p>
                      <p>With eyes of faith,</p>
                      <p>I see beyond the darkness.</p>
                      <p>With eyes of faith,</p>
                      <p>there's nothing more to fear.</p>
                      <p>With Jehovah, I am strong,</p>
                      <p>Determined to go on,</p>
                      <p>Knowing that my God</p>
                      <p>is always near—</p>
                      <p>With eyes of faith.</p>
                    </div>
                    <div className="italic pl-4 border-l-2 border-purple-400">
                      <p className="font-semibold mb-1">(BRIDGE)</p>
                      <p>With eyes of faith,</p>
                      <p>I can move a mountain.</p>
                      <p>With eyes of faith,</p>
                      <p>my hope is sure.</p>
                      <p>Where would I be</p>
                      <p>Without the faith</p>
                      <p>that helps me see</p>
                      <p>Beyond the trials I endure?</p>
                    </div>
                    <div>
                      <p className="font-semibold mb-1">3. I see the wondrous future</p>
                      <p>God has in store for me.</p>
                      <p>I need to be strong.</p>
                      <p>I know it won't be long</p>
                      <p>Till Jehovah claims his victory.</p>
                    </div>
                    <div className="italic pl-4 border-l-2 border-blue-400">
                      <p className="font-semibold mb-1">(CHORUS)</p>
                      <p>With eyes of faith,</p>
                      <p>I see beyond the darkness.</p>
                      <p>With eyes of faith,</p>
                      <p>there's nothing more to fear.</p>
                      <p>With Jehovah, I am strong,</p>
                      <p>Determined to go on,</p>
                      <p>Knowing that my God</p>
                      <p>is always near—</p>
                      <p>With eyes of faith,</p>
                      <p>With eyes of faith.</p>
                    </div>
                  </div>
                </div>

                {/* Closing Song Card */}
                <div className="bg-blue-50 dark:bg-blue-900/20 rounded-xl hover-lift border-2 border-transparent hover:border-blue-400 transition-all duration-300 animate-slide-up stagger-2 p-6">
                  <div className="text-center mb-4">
                    <div className="text-5xl mb-3 animate-float">🎶</div>
                    <p className="font-bold text-2xl text-gray-900 dark:text-white mb-1">Closing Song</p>
                    <p className="text-lg font-semibold text-blue-600 dark:text-blue-400 mb-2">Song 158</p>
                    <p className="text-xl font-bold text-gray-800 dark:text-gray-200 mb-1">"It Will Not Be Late!"</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400 italic">(Habakkuk 2:3)</p>
                  </div>
                  <div className="text-center space-y-3 text-base text-gray-700 dark:text-gray-300 leading-relaxed">
                    <div>
                      <p className="font-semibold mb-1">1. Beauty fills the earth,</p>
                      <p>wonder fills our mind—</p>
                      <p>The work of your hands</p>
                      <p>so patiently designed.</p>
                      <p>Though the world may change,</p>
                      <p>you remain the same.</p>
                      <p>You patiently wait</p>
                      <p>to make it new again.</p>
                    </div>
                    <div className="italic pl-4 border-l-2 border-blue-400">
                      <p className="font-semibold mb-1">(CHORUS)</p>
                      <p>Father, we long to see</p>
                      <p>Paradise come to be.</p>
                      <p>Give us the patience to wait.</p>
                      <p>We know your day will come,</p>
                      <p>sure as the rising sun.</p>
                      <p>No matter how long it takes,</p>
                      <p>"It will not be late!"</p>
                    </div>
                    <div>
                      <p className="font-semibold mb-1">2. Faithfully we wait</p>
                      <p>for the dead to rise.</p>
                      <p>Jehovah, you yearn</p>
                      <p>to bring them back to life.</p>
                      <p>Father, we well know</p>
                      <p>how you loved them so.</p>
                      <p>Instill in our hearts</p>
                      <p>the patience you have shown.</p>
                    </div>
                    <div className="italic pl-4 border-l-2 border-blue-400">
                      <p className="font-semibold mb-1">(CHORUS)</p>
                      <p>Father, we long to see</p>
                      <p>Paradise come to be.</p>
                      <p>Give us the patience to wait.</p>
                      <p>We know your day will come,</p>
                      <p>sure as the rising sun.</p>
                      <p>No matter how long it takes,</p>
                      <p>"It will not be late!"</p>
                    </div>
                    <div>
                      <p className="font-semibold mb-1">3. Patiently you search;</p>
                      <p>honest hearts you find.</p>
                      <p>You heal them with hope</p>
                      <p>and long to give them life.</p>
                      <p>Working by your side,</p>
                      <p>sharing what is true,</p>
                      <p>We use our time well.</p>
                      <p>It draws us close to you.</p>
                    </div>
                    <div className="italic pl-4 border-l-2 border-blue-400">
                      <p className="font-semibold mb-1">(CHORUS)</p>
                      <p>Father, we long to see</p>
                      <p>Paradise come to be.</p>
                      <p>Give us the patience to wait.</p>
                      <p>We know your day will come,</p>
                      <p>sure as the rising sun.</p>
                      <p>No matter how long it takes,</p>
                      <p>"It will not be late!"</p>
                    </div>
                    <div className="mt-2">
                      <p className="italic">Father, please help us to wait!</p>
                    </div>
                  </div>
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
                        const caption = 'caption' in img ? img.caption as string : null;
                        return (
                          <div key={imgIndex} className={`flex flex-col items-center animate-scale-in stagger-${imgIndex + 1}`}>
                            <button
                              onClick={() => onOpenLightboxAt(globalIndex)}
                              className="group relative w-full aspect-square overflow-hidden rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-500 focus:outline-none focus:ring-4 focus:ring-blue-500 focus:ring-offset-2 ring-2 ring-gray-200 dark:ring-gray-800 hover:scale-105 hover:rotate-1"
                            >
                              <img
                                src={img.src}
                                alt={img.alt}
                                className="w-full h-full object-cover group-hover:scale-125 transition-transform duration-700"
                                style={'objectPosition' in img ? { objectPosition: img.objectPosition as string } : undefined}
                              />
                              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-all duration-300 flex items-center justify-center">
                                <span className="text-white text-4xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform group-hover:scale-110">🔍</span>
                              </div>
                              {!caption && (
                                <div className="absolute bottom-0 left-0 right-0 bg-black/70 text-white p-3 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                                  <p className="text-sm font-medium">Click to view</p>
                                </div>
                              )}
                            </button>
                            {caption && (
                              <p className="mt-3 text-sm font-bold text-center text-blue-900 dark:text-blue-100 leading-snug px-3 py-2 bg-blue-100 dark:bg-blue-900/50 rounded-lg shadow-sm w-full">{caption}</p>
                            )}
                          </div>
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
              <h4 className="text-xl font-bold text-gray-900 dark:text-white not-prose">Obituary of Mrs. Harriet Atuahene Sarkodie (Auntie Akwaley)</h4>
              <p>
                Mrs. Harriet Atuahene Sarkodie, affectionately known as Auntie Akwaley, was born on 15th February 1953 at Kukurantumi in the Eastern Region of Ghana, to Obaapayin Akosua Adgyeiwaa and Mr. Kwesi Larbi. Her father hailed from James Town with Ga roots, while her mother was Akyem from Kukurantumi.
              </p>
              <p>
                She was born into a large, vibrant family of nine siblings and shared a unique bond with her twin, popularly known as Auntie Akooko. Auntie Akwaley and her twin sister were inseparable companions through life's early journey, embodying a deep connection that only twins can share. Sadly, her twin sister passed away some years ago—a loss she carried with quiet strength and grace. Over time, she also lost many of her siblings, and at the time of her passing, only one sister remained. Auntie Akwaley and her twin sister were the last of the nine siblings, marking the close of a remarkable family generation.
              </p>
              <p>
                From an early age, Harriet distinguished herself through diligence and excellence. She began her basic education in Kukurantumi and completed her middle school education in 1968. Despite being the youngest in her class, she consistently excelled academically and earned the admiration of both peers and teachers. She served as Girls' Prefect at both primary and middle school levels and was widely recognised for her discipline, neatness, and outstanding performance.
              </p>
              <p>
                Her academic brilliance earned her several scholarships to further her education. However, due to circumstances beyond her control, she was unable to take advantage of these opportunities. Undeterred, Harriet displayed remarkable resilience and entrepreneurial spirit by venturing into a small-scale business, where she found success through sheer hard work and determination.
              </p>
              <p>
                In January 1970, Harriet married the love of her life, Mr. Eric Kofi Atuahene Sarkodie (of blessed memory). Their union, which spanned 53 years, was built on love, mutual respect, and unwavering partnership. Together, they were blessed with four children, though their first child sadly passed shortly after birth. They lovingly raised three children: Abigail Abena Kyeraa Sarkodie Ansah, Kofi Atuahene Sarkodie, and Nana Yaa Asarewaa Sarkodie Nunoo Nunoo.
              </p>
              <p>
                Harriet was a pillar of strength in her family and played a central role in the success of their business ventures. In March 1985, together with her husband, she established a licensed chemical shop in Obuasi, which later became a pharmacy in 1993. Through her intelligence, dedication, and tireless work ethic, she made the business flourish and become one of the town's leading pharmacies.
              </p>
              <h4 className="text-xl font-bold text-gray-900 dark:text-white not-prose mt-6">Her Spiritual Journey</h4>
              <p>
                Though not born into a family of Jehovah's Witnesses, Harriet's spiritual path began when her mother embraced Bible truth through her study with the Witnesses. Harriet followed this path with conviction and, on 8th December 1967, symbolised her dedication to Jehovah through water baptism. She remained a faithful and devoted servant of Jehovah throughout her life until her peaceful passing on 24th December 2025.
              </p>
              <p>
                Auntie Akwaley was widely known for her warm hospitality and kindness, especially toward travelling overseers and full-time servants. Her home was always open, offering comfort, nourishment, and a sense of belonging to all who visited. Together with her husband, she supported preaching activities in areas of greater need, particularly in Aduaneɛdɛ, where they served diligently for 17 years. Through her efforts, many came to know and dedicate their lives to Jehovah.
              </p>
              <p>
                She was an exemplary figure to many—especially young ones and married couples—demonstrating through her life what it meant to love, serve, and remain steadfast in faith.
              </p>
              <h4 className="text-xl font-bold text-gray-900 dark:text-white not-prose mt-6">A Devoted Wife, Loving Mother, and Compassionate Caregiver</h4>
              <p>
                Harriet was a remarkable woman whose life was defined by love, strength, and selflessness. As a wife, she stood firmly beside her husband through every season, offering unwavering support and companionship. Their home was a haven of peace, built on trust, respect, and deep affection.
              </p>
              <p>
                As a mother, Harriet was nurturing, sacrificial, and deeply devoted. She worked tirelessly to ensure the well-being and happiness of her children, always placing their needs above her own. Her guidance, wisdom, and unconditional love shaped their lives in profound ways.
              </p>
              <p>
                Beyond her immediate family, Harriet's heart extended to many others. Following the tragic loss of her twin sister, she lovingly took her sister's children and raised them herself—an extraordinary testament to her boundless compassion and generosity. Indeed, she became a mother to many, and her influence reached far beyond her household.
              </p>
              <p>
                Such was her impact that many friends chose to name their children after her—a lasting tribute to the love and respect she inspired.
              </p>
              <h4 className="text-xl font-bold text-gray-900 dark:text-white not-prose mt-6">A Life of Warmth and Generosity</h4>
              <p>
                Auntie Akwaley had a special gift for bringing people together, often expressed through her love of cooking. Her meals were not merely food but heartfelt expressions of care, warmth, and unity. She found joy in serving others, and her kindness touched countless lives, both near and far.
              </p>
              <h4 className="text-xl font-bold text-gray-900 dark:text-white not-prose mt-6">A Blessed Hope</h4>
              <p>
                Though our hearts are heavy with grief, we find comfort in the sure hope of the resurrection—a promise that sustains us in this time of loss.
              </p>
              <p>
                Harriet's legacy of love, faith, and kindness will continue to live on in all who knew her.
              </p>
              <p>
                She has fought the fine fight, she has finished the race, she has kept the faith.
              </p>
              <p className="font-semibold text-gray-900 dark:text-white">Forever in our hearts.</p>
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
