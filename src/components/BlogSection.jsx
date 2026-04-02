import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import './BlogSection.css';
import { Link } from 'react-router-dom';

const BlogSection = () => {
  // Statik veriler
  const bilgiItems = useMemo(() => [
    {
      title: 'Zekat Nedir?',
      excerpt: 'İslam\'ın beş şartından biri olan zekat hakkında detaylı bilgi, hesaplama yöntemleri ve önemi.',
      icon: 'fas fa-mosque',
      link: '/rehber/zekat-nedir',
      color: '#12985a'
    },
    {
      title: 'Sadaka Nedir?',
      excerpt: 'Ramazan ayında verilen sadaka-i fıtır hakkında bilgi, verilme zamanı ve miktarı.',
      icon: 'fas fa-gift',
      link: '/rehber/sadaka-nedir',
      color: '#103e6a'
    },
    {
      title: 'Bağış Yapmanın Önemi',
      excerpt: 'Desteğinizin dünya çapında aileler ve çocuklar üzerindeki gerçek etkisini keşfedin.',
      icon: 'fas fa-heart',
      link: '/bagislar',
      color: '#48bb78'
    }
  ], []);

  const [currentBilgiIndex, setCurrentBilgiIndex] = useState(0); // Başlangıçta 0 değil useEffect ile set edilecek
  const [isTransitioning, setIsTransitioning] = useState(false);

  // Responsive States
  const [isMobile, setIsMobile] = useState(false);
  const [isTablet, setIsTablet] = useState(false);

  const scrollContainerRef = useRef(null);
  const autoScrollIntervalRef = useRef(null);
  const isUserScrollingRef = useRef(false);
  const touchStartXRef = useRef(null);

  // Infinite loop için genişletilmiş liste
  const extendedItems = useMemo(() => {
    return [...bilgiItems, ...bilgiItems, ...bilgiItems];
  }, [bilgiItems]);

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      setIsMobile(width <= 768);
      setIsTablet(width > 768 && width <= 1024);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Initial Position (Ortadaki setin başına)
  useEffect(() => {
    if (bilgiItems.length > 0) {
      setCurrentBilgiIndex(bilgiItems.length);
    }
  }, [bilgiItems]);

  const totalItems = bilgiItems.length;

  const handleTransitionEnd = () => {
    setIsTransitioning(false);
    if (currentBilgiIndex >= totalItems * 2) {
      setCurrentBilgiIndex(totalItems);
    } else if (currentBilgiIndex < totalItems) {
      setCurrentBilgiIndex(totalItems * 2 - 1);
    }
  };

  const goNext = useCallback(() => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentBilgiIndex((prev) => prev + 1);
  }, [isTransitioning]);

  const goPrev = useCallback(() => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentBilgiIndex((prev) => prev - 1);
  }, [isTransitioning]);

  const registerTouchStart = (clientX) => {
    touchStartXRef.current = clientX;
  };

  const registerTouchEnd = (clientX) => {
    if (touchStartXRef.current === null) return;
    const deltaX = clientX - touchStartXRef.current;
    const swipeThreshold = 50;
    if (Math.abs(deltaX) > swipeThreshold) {
      if (deltaX < 0) {
        goNext();
      } else {
        goPrev();
      }
    }
    touchStartXRef.current = null;
  };

  const handleTouchStart = (event) => {
    isUserScrollingRef.current = true;
    const clientX = event.touches ? event.touches[0].clientX : event.clientX;
    registerTouchStart(clientX);
  };

  const handleTouchEnd = (event) => {
    isUserScrollingRef.current = false;
    const clientX = event.changedTouches ? event.changedTouches[0].clientX : event.clientX;
    registerTouchEnd(clientX);
  };

  useEffect(() => {
    autoScrollIntervalRef.current = setInterval(() => {
      if (isUserScrollingRef.current) return;
      goNext();
    }, 5000);

    return () => {
      if (autoScrollIntervalRef.current) clearInterval(autoScrollIntervalRef.current);
    };
  }, [goNext]);

  // Slide Width Calculation
  const slideWidth = isMobile ? 100 : (isTablet ? 50 : 33.333);

  return (
    <section className="blog-section">
      <h2>Bilgi Merkezi</h2>
      <p className="section-description">
        İslami yardım ve bağış konularında ihtiyacınız olan tüm bilgileri burada bulabilirsiniz.
      </p>

      <div className="blog-viewport"
        ref={scrollContainerRef}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
        onMouseDown={handleTouchStart}
        onMouseUp={handleTouchEnd}
        onMouseLeave={() => { isUserScrollingRef.current = false; touchStartXRef.current = null; }}
      >
        <div
          className="blog-slider-track"
          style={{
            transform: `translateX(-${currentBilgiIndex * slideWidth}%)`,
            transition: isTransitioning ? 'transform 0.5s ease-in-out' : 'none'
          }}
          onTransitionEnd={handleTransitionEnd}
        >
          {extendedItems.map((item, idx) => (
            <div className="blog-slide-item" key={`${item.title}-${idx}`}>
              <Link to={item.link} className="blog-card-link">
                <div className="blog-card" style={{ borderTop: `4px solid ${item.color}` }}>
                  <div className="card-icon" style={{ color: item.color }}>
                    <i className={item.icon}></i>
                  </div>
                  <h3>{item.title}</h3>
                  <p>{item.excerpt}</p>
                  <div className="card-arrow">
                    <i className="fas fa-arrow-right"></i>
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>

      <div className="carousel-indicators">
        {bilgiItems.map((_, index) => (
          <button
            key={index}
            className={`indicator ${index === (currentBilgiIndex % totalItems) ? 'active' : ''}`}
            onClick={() => {
              if (!isTransitioning) {
                setIsTransitioning(true);
                setCurrentBilgiIndex(totalItems + index);
              }
            }}
          ></button>
        ))}
      </div>
    </section>
  );
};

export default BlogSection;