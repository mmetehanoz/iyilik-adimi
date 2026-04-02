import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './DuyurPages.css'; 

const DuyurPage = () => {
  const navigate = useNavigate();
  const [copiedMessage, setCopiedMessage] = useState('');

  // Sayfa yüklendiğinde en üste scroll yap
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Sosyal medya hesapları (iletişim sayfasından alındı)
  const socialMediaLinks = {
    instagram: 'https://www.instagram.com/iyilikadimitr',
    youtube: 'https://www.youtube.com/@iyilikadimitr',
    facebook: 'https://www.facebook.com/iyilikadimitr',
    twitter: 'https://x.com/iyilikadimitr',
    tiktok: 'https://www.tiktok.com/@iyilikadimitr',
    linkedin: 'https://www.linkedin.com/company/iyilikadimitr/',
    // nextsosyal: 'https://sosyal.teknofest.app/@umutyolcularitr'
  };

  // WhatsApp hazır mesajları
  const whatsappMessages = [
    {
      id: 1,
      title: 'Genel Duyuru',
      message: '🌟 İyilik Adımı İnsani Yardım Derneği\'nin çalışmalarını takip edin! Dünya çapında ihtiyaç sahiplerine yardım eli uzatıyoruz. Siz de destek olabilirsiniz! 💙\n\n🌐 Web: iyilikadimi.org.tr\n📱 Instagram: @iyilikadimitr\n📺 YouTube: @iyilikadimitr'
    },
    {
      id: 2,
      title: 'Kurban Kampanyası',
      message: '🐐 Kurban Bağışı Kampanyası başladı! İhtiyaç sahiplerine kurban eti dağıtımı için destek olun. Her bağış, bir ailenin yüzünü güldürür. 💙\n\n🌐 Web: iyilikadimi.org.tr\n📱 Instagram: @iyilikadimitr'
    },
    {
      id: 3,
      title: 'Gıda Yardımı',
      message: '🍲 Gıda Yardımı Kampanyası! Açlıkla mücadele eden ailelere gıda paketi dağıtıyoruz. Siz de bu hayırlı işe ortak olun! 💙\n\n🌐 Web: iyilikadimi.org.tr\n📱 Instagram: @iyilikadimitr'
    },
    {
      id: 4,
      title: 'Su Kuyusu Projesi',
      message: '💧 Su Kuyusu Projesi! Temiz suya erişimi olmayan bölgelerde su kuyuları açıyoruz. Bir kuyu, binlerce kişinin hayatını değiştirir! 💙\n\n🌐 Web: iyilikadimi.org.tr\n📱 Instagram: @iyilikadimitr'
    },
    {
      id: 5,
      title: 'Eğitim Desteği',
      message: '📚 Eğitim Desteği Kampanyası! Çocukların eğitim hakkı için okullar inşa ediyor, eğitim materyalleri sağlıyoruz. Geleceğe umut olun! 💙\n\n🌐 Web: iyilikadimi.org.tr\n📱 Instagram: @iyilikadimitr'
    }
  ];

  // Sosyal medya linkine git
  const handleSocialMediaClick = (platform) => {
    window.open(socialMediaLinks[platform], '_blank');
  };

  // WhatsApp mesajı gönder
  const handleWhatsAppClick = (message) => {
    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/?text=${encodedMessage}`;
    window.open(whatsappUrl, '_blank');
  };

  // Mesajı kopyala
  const handleCopyMessage = (message) => {
    navigator.clipboard.writeText(message).then(() => {
      setCopiedMessage('Mesaj kopyalandı!');
      setTimeout(() => setCopiedMessage(''), 2000);
    });
  };

  return (
    <div className="duyur-page">
      <div className="duyur-container">
        {/* Header */}
        <div className="duyur-header">
          <button className="back-btn" onClick={() => navigate('/')}>
            <i className="fas fa-arrow-left"></i>
            Ana Sayfaya Dön
          </button>
          <h1>Misyonumuzu Duyur</h1>
          <p className="duyur-subtitle">
            İyilik Adımı'nın çalışmalarını sosyal medyada paylaşın ve daha fazla kişiye ulaşmamıza yardımcı olun.
          </p>
        </div>

        {/* Sosyal Medya Bölümü */}
        <div className="social-media-section">
          <h2>Sosyal Medya Hesaplarımız</h2>
          <p>Bizi takip edin ve güncel projelerimizi öğrenin</p>
          
          <div className="social-media-grid">
            <div className="social-subscribe instagram-subscribe" onClick={() => handleSocialMediaClick('instagram')}>
              <div className="subscribe-content">
                <div className="subscribe-text">
                  <h3>
                    <i className="fab fa-instagram"></i>
                    Instagram'da Takip Edin
                  </h3>
                  <p>Günlük projelerimizi ve hikayelerimizi takip edin</p>
                </div>
                <a href="#" className="subscribe-btn" onClick={(e) => e.preventDefault()}>
                  <i className="fab fa-instagram"></i>
                  <span>Takip Et</span>
                </a>
              </div>
            </div>

            <div className="social-subscribe youtube-subscribe" onClick={() => handleSocialMediaClick('youtube')}>
              <div className="subscribe-content">
                <div className="subscribe-text">
                  <h3>
                    <i className="fab fa-youtube"></i>
                    YouTube'da Abone Olun
                  </h3>
                  <p>Proje videolarımızı ve tanıtım filmlerimizi izleyin</p>
                </div>
                <a href="#" className="subscribe-btn" onClick={(e) => e.preventDefault()}>
                  <i className="fab fa-youtube"></i>
                  <span>Abone Ol</span>
                </a>
              </div>
            </div>

            <div className="social-subscribe facebook-subscribe" onClick={() => handleSocialMediaClick('facebook')}>
              <div className="subscribe-content">
                <div className="subscribe-text">
                  <h3>
                    <i className="fab fa-facebook-f"></i>
                    Facebook'ta Takip Edin
                  </h3>
                  <p>Topluluk güncellemelerimizi ve etkinliklerimizi takip edin</p>
                </div>
                <a href="#" className="subscribe-btn" onClick={(e) => e.preventDefault()}>
                  <i className="fab fa-facebook-f"></i>
                  <span>Takip Et</span>
                </a>
              </div>
            </div>

            <div className="social-subscribe twitter-subscribe" onClick={() => handleSocialMediaClick('twitter')}>
              <div className="subscribe-content">
                <div className="subscribe-text">
                  <h3>
                    <i className="fab fa-x-twitter"></i>
                    X'te Takip Edin
                  </h3>
                  <p>Anlık güncellemelerimizi ve haberlerimizi takip edin</p>
                </div>
                <a href="#" className="subscribe-btn" onClick={(e) => e.preventDefault()}>
                  <i className="fab fa-x-twitter"></i>
                  <span>Takip Et</span>
                </a>
              </div>
            </div>

            <div className="social-subscribe tiktok-subscribe" onClick={() => handleSocialMediaClick('tiktok')}>
              <div className="subscribe-content">
                <div className="subscribe-text">
                  <h3>
                    <i className="fab fa-tiktok"></i>
                    TikTok'ta Takip Edin
                  </h3>
                  <p>Kısa videolarımızı ve eğlenceli içeriklerimizi izleyin</p>
                </div>
                <a href="#" className="subscribe-btn" onClick={(e) => e.preventDefault()}>
                  <i className="fab fa-tiktok"></i>
                  <span>Takip Et</span>
                </a>
              </div>
            </div>

            <div className="social-subscribe linkedin-subscribe" onClick={() => handleSocialMediaClick('linkedin')}>
              <div className="subscribe-content">
                <div className="subscribe-text">
                  <h3>
                    <i className="fab fa-linkedin-in"></i>
                    LinkedIn'de Takip Edin
                  </h3>
                  <p>Profesyonel ağımızı takip edin ve iş birliklerimizi öğrenin</p>
                </div>
                <a href="#" className="subscribe-btn" onClick={(e) => e.preventDefault()}>
                  <i className="fab fa-linkedin-in"></i>
                  <span>Takip Et</span>
                </a>
              </div>
            </div>

            {/* <div className="social-subscribe nextsosyal-subscribe" onClick={() => handleSocialMediaClick('nextsosyal')}>
              <div className="subscribe-content">
                <div className="subscribe-text">
                  <h3>
                    <img 
                      src="https://cdn-n.teknofest.app/logo/light.png" 
                      alt="Next Sosyal" 
                      style={{ width: '32px', height: '32px', objectFit: 'contain' }}
                    />
                    Next Sosyal'da Takip Edin
                  </h3>
                  <p>Teknofest sosyal medya platformunda bizi takip edin</p>
                </div>
                <a href="#" className="subscribe-btn" onClick={(e) => e.preventDefault()}>
                  <img 
                    src="https://cdn-n.teknofest.app/logo/light.png" 
                    alt="Next Sosyal" 
                    style={{ width: '20px', height: '20px', objectFit: 'contain' }}
                  />
                  <span>Takip Et</span>
                </a>
              </div>
            </div> */}
          </div>
        </div>

        {/* WhatsApp Hazır Mesajlar */}
        <div className="whatsapp-section">
          <h2>WhatsApp Hazır Mesajlar</h2>
          <p>Bu mesajları WhatsApp'ta paylaşarak misyonumuzu duyurun</p>
          
          <div className="whatsapp-messages">
            {whatsappMessages.map((item) => (
              <div key={item.id} className="message-card">
                <div className="message-header">
                  <h3>{item.title}</h3>
                  <div className="message-actions">
                    <button 
                      className="copy-btn"
                      onClick={() => handleCopyMessage(item.message)}
                      title="Mesajı Kopyala"
                    >
                      <i className="fas fa-copy"></i>
                    </button>
                    <button 
                      className="whatsapp-btn"
                      onClick={() => handleWhatsAppClick(item.message)}
                      title="WhatsApp'ta Paylaş"
                    >
                      <i className="fab fa-whatsapp"></i>
                      Paylaş
                    </button>
                  </div>
                </div>
                <div className="message-content">
                  <p>{item.message}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Kopyalama Bildirimi */}
        {copiedMessage && (
          <div className="copy-notification">
            <i className="fas fa-check"></i>
            {copiedMessage}
          </div>
        )}

        {/* Alt Bilgi */}
        <div className="duyur-footer">
          <div className="footer-card">
            <i className="fas fa-heart"></i>
            <h3>Teşekkürler</h3>
            <p>Paylaşımlarınız sayesinde daha fazla kişiye ulaşabiliyoruz. Her paylaşım, bir umut demektir.</p>
          </div>
          
          <div className="footer-card">
            <i className="fas fa-share-nodes"></i>
            <h3>Etiketleme</h3>
            <p>Sosyal medyada paylaşırken @iyilikadimitr etiketini kullanmayı unutmayın!</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DuyurPage;
