import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import './HowToHelpSection.css';

const HowToHelpSection = () => {
  const navigate = useNavigate();

  // Statik veriler
  const helps = useMemo(() => [
    { icon: 'fa-hand-holding-heart', title: 'Bağış Yap', desc: 'Projelerimize maddi destek olun.', action: 'donate' },
    { icon: 'fa-handshake-angle', title: 'Gönüllü Ol', desc: 'Ekibimize katılın ve topluma katkı sağlayın.', action: 'volunteer' },
    { icon: 'fa-bullhorn', title: 'Duyur', desc: 'Misyonumuzu paylaşın, daha fazla kişiye ulaşmamıza yardımcı olun.', action: 'share' }
  ], []);

  const [currentHelpIndex, setCurrentHelpIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  // Responsive States
  const [isMobile, setIsMobile] = useState(false);
  const [isTablet, setIsTablet] = useState(false);

  const scrollContainerRef = useRef(null);
  const autoScrollIntervalRef = useRef(null);
  const isUserScrollingRef = useRef(false);
  const touchStartXRef = useRef(null);

  // Infinite loop için genişletilmiş liste
  const extendedHelps = useMemo(() => {
    return [...helps, ...helps, ...helps];
  }, [helps]);

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
    if (helps.length > 0) {
      setCurrentHelpIndex(helps.length);
    }
  }, [helps]);

  const totalHelps = helps.length;

  const handleHelpClick = (action) => {
    switch (action) {
      case 'donate':
        navigate('/bagislar');
        break;
      case 'volunteer':
        navigate('/uyelik');
        break;
      case 'share':
        navigate('/duyur');
        break;
      default:
        break;
    }
  };

  const handleTransitionEnd = () => {
    setIsTransitioning(false);
    if (currentHelpIndex >= totalHelps * 2) {
      setCurrentHelpIndex(totalHelps);
    } else if (currentHelpIndex < totalHelps) {
      setCurrentHelpIndex(totalHelps * 2 - 1);
    }
  };

  const goNext = useCallback(() => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentHelpIndex((prev) => prev + 1);
  }, [isTransitioning]);

  const goPrev = useCallback(() => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentHelpIndex((prev) => prev - 1);
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
    <section className="howtohelp-section">
      <h2>Nasıl Yardım Edebilirsin?</h2>

      <div className="howtohelp-viewport"
        ref={scrollContainerRef}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
        onMouseDown={handleTouchStart}
        onMouseUp={handleTouchEnd}
        onMouseLeave={() => { isUserScrollingRef.current = false; touchStartXRef.current = null; }}
      >
        <div
          className="howtohelp-track"
          style={{
            transform: `translateX(-${currentHelpIndex * slideWidth}%)`,
            transition: isTransitioning ? 'transform 0.5s ease-in-out' : 'none'
          }}
          onTransitionEnd={handleTransitionEnd}
        >
          {extendedHelps.map((help, idx) => (
            <div className="howtohelp-slide-item" key={`${help.action}-${idx}`}>
              <div
                className="help-card"
                onClick={() => handleHelpClick(help.action)}
                style={{ cursor: 'pointer' }}
              >
                <i className={`fas ${help.icon} help-icon`}></i>
                <h3>{help.title}</h3>
                <p>{help.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="carousel-indicators">
        {helps.map((_, index) => (
          <button
            key={index}
            className={`indicator ${index === (currentHelpIndex % totalHelps) ? 'active' : ''}`}
            onClick={() => {
              if (!isTransitioning) {
                setIsTransitioning(true);
                setCurrentHelpIndex(totalHelps + index);
              }
            }}
          ></button>
        ))}
      </div>
    </section>
  );
};

export default HowToHelpSection;