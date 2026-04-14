import { useParams } from 'react-router-dom';

const policies = {
  kvkk: {
    title: 'KVKK Aydınlatma Metni',
    content: (
      <>
        <h2 className="text-2xl font-bold text-[#103e6a] mb-2">İYİLİK ADIMI KVKK AYDINLATMA METNİ</h2>
        <h3 className="text-lg font-semibold text-gray-700 mb-2">İYİLİK ADIMI ULUSLARARASI İNSANİ YARDIM DERNEĞİ</h3>
        <h3 className="text-lg font-semibold text-gray-700 mb-6">KİŞİSEL VERİLERİN KORUNMASINA İLİŞKİN AYDINLATMA METNİ</h3>

        <p className="mb-6 text-gray-700 leading-relaxed">
          T.C. İstanbul Valiliği İl Sivil Toplumla İlişkiler Müdürlüğü'nün 10.04.2025 tarihli onayı ile 34-292-063 kütük numarası ile faaliyet gösteren İyilik Adımı Uluslararası İnsani Yardım Derneği ("Dernek") olarak; 6698 sayılı Kişisel Verilerin Korunması Kanunu ("KVKK") kapsamında, üyelerimizin, gönüllülerimizin, bağışçılarımızın ve tüm paydaşlarımızın kişisel verilerinin korunmasına büyük önem vermekteyiz.
        </p>
        <p className="mb-8 text-gray-700 leading-relaxed">
          Derneğimiz, Veri Sorumlusu sıfatıyla; tarafımıza iletilen kişisel verilerin kaydedileceğini, saklanacağını, güncelleneceğini, mevzuatın izin verdiği durumlarda üçüncü kişilere aktarılabileceğini ve KVKK'da öngörülen şekillerde işlenebileceğini bilgilerinize sunar.
        </p>

        <Section title="1. HANGİ KİŞİSEL VERİLERİ İŞLİYORUZ?">
          <p className="mb-3 text-gray-700">Derneğimiz tarafından aşağıdaki kişisel veriler işlenebilmektedir:</p>
          <ul className="list-disc pl-6 space-y-1 text-gray-700">
            <li>Kimlik bilgileri (ad, soyad)</li>
            <li>İletişim bilgileri (telefon, e-posta, adres)</li>
            <li>Dernek faaliyetlerine ilişkin görsel ve işitsel kayıtlar (fotoğraf ve video)</li>
            <li>Bağış bilgileri</li>
            <li>Gönüllülük ve üyelik süreçlerine ilişkin bilgiler</li>
          </ul>
        </Section>

        <Section title="2. KİŞİSEL VERİLERİN TOPLANMA YÖNTEMİ">
          <p className="mb-3 text-gray-700">Kişisel verileriniz;</p>
          <ul className="list-disc pl-6 space-y-1 text-gray-700">
            <li>Derneğimizin internet sitesi üzerinden,</li>
            <li>Sosyal medya hesaplarımız aracılığıyla,</li>
            <li>Dernek merkezinde veya etkinliklerde doldurulan formlar yoluyla,</li>
            <li>E-posta, telefon veya diğer iletişim kanalları ile</li>
          </ul>
          <p className="mt-3 text-gray-700">sözlü, yazılı veya elektronik ortamda toplanmaktadır.</p>
        </Section>

        <Section title="3. KİŞİSEL VERİLERİN İŞLENME AMAÇLARI">
          <p className="mb-3 text-gray-700">Toplanan kişisel verileriniz;</p>
          <ul className="list-disc pl-6 space-y-1 text-gray-700">
            <li>Üyelik ve gönüllülük süreçlerinin yürütülmesi</li>
            <li>Bağış ve yardım organizasyonlarının yönetilmesi</li>
            <li>Dernek faaliyetleri hakkında bilgilendirme yapılması</li>
            <li>Etkinliklerin planlanması ve yürütülmesi</li>
            <li>Yasal yükümlülüklerin yerine getirilmesi</li>
            <li>İstatistiksel analizlerin yapılması (kimlik ifşa edilmeden)</li>
            <li>Dernek ile paydaşlar arasındaki iletişimin sağlanması</li>
          </ul>
          <p className="mt-3 text-gray-700">amaçlarıyla işlenmektedir.</p>
        </Section>

        <Section title="4. KİŞİSEL VERİLERİN AKTARILABİLECEĞİ KİŞİ VE KURULUŞLAR">
          <p className="mb-3 text-gray-700">Kişisel verileriniz;</p>
          <ul className="list-disc pl-6 space-y-1 text-gray-700">
            <li>İlgili mevzuat gereği yetkili kamu kurum ve kuruluşlarına,</li>
            <li>Bankalar, ödeme kuruluşları, muhasebe hizmet sağlayıcıları gibi iş ortaklarına,</li>
            <li>Hukuki zorunluluklar kapsamında yetkili mercilere</li>
          </ul>
          <p className="mt-3 text-gray-700">aktarılabilecektir.</p>
        </Section>

        <Section title="5. KVKK KAPSAMINDAKİ HAKLARINIZ">
          <p className="mb-3 text-gray-700">KVKK'nın 11. maddesi uyarınca;</p>
          <ul className="list-disc pl-6 space-y-1 text-gray-700">
            <li>Kişisel verilerinizin işlenip işlenmediğini öğrenme</li>
            <li>İşlenmişse bilgi talep etme</li>
            <li>İşlenme amacını öğrenme</li>
            <li>Aktarıldığı üçüncü kişileri bilme</li>
            <li>Eksik/yanlış işlenmişse düzeltilmesini isteme</li>
            <li>Silinmesini veya yok edilmesini isteme</li>
            <li>Bu işlemlerin üçüncü kişilere bildirilmesini isteme</li>
            <li>Otomatik sistemlere itiraz etme</li>
            <li>Zarara uğramanız hâlinde tazminat talep etme</li>
          </ul>
          <p className="mt-3 text-gray-700">haklarına sahipsiniz.</p>
        </Section>

        <Section title="6. BAŞVURU YOLLARI">
          <p className="mb-4 text-gray-700">
            Haklarınızı kullanmak için taleplerinizi; ıslak imzalı dilekçe ile aşağıdaki adrese gönderebilir veya e-posta yoluyla iletebilirsiniz:
          </p>
          <div className="bg-gray-50 rounded-lg p-5 space-y-2 text-gray-700">
            <p><strong>Veri Sorumlusu:</strong><br />İyilik Adımı Uluslararası İnsani Yardım Derneği</p>
            <p><strong>Adres:</strong><br />Yukarı Dudullu Mah. Katibim Sokak<br />Dış Kapı No: 1 İç Kapı No: 1<br />Ümraniye / İstanbul / Türkiye</p>
            <p><strong>E-posta:</strong><br /><a href="mailto:info@iyilikadimi.org.tr" className="text-[#12985a] hover:underline">info@iyilikadimi.org.tr</a></p>
          </div>
        </Section>
      </>
    ),
  },

  'bilgi-guvenligi': {
    title: 'Bilgi Güvenliği Politikası',
    content: (
      <>
        <h2 className="text-2xl font-bold text-[#103e6a] mb-2">BİLGİ GÜVENLİĞİ POLİTİKASI</h2>
        <h3 className="text-lg font-semibold text-gray-700 mb-6">İYİLİK ADIMI ULUSLARARASI İNSANİ YARDIM DERNEĞİ</h3>

        <Section title="1. AMAÇ">
          <p className="text-gray-700">Bu politika, Dernek bünyesinde işlenen tüm verilerin gizliliğini, bütünlüğünü ve erişilebilirliğini korumayı amaçlar.</p>
        </Section>

        <Section title="2. KAPSAM">
          <p className="mb-3 text-gray-700">Bu politika;</p>
          <ul className="list-disc pl-6 space-y-1 text-gray-700">
            <li>Üyeler</li>
            <li>Gönüllüler</li>
            <li>Bağışçılar</li>
            <li>Çalışanlar</li>
            <li>İş ortakları</li>
          </ul>
          <p className="mt-3 text-gray-700">tarafından paylaşılan tüm verileri kapsar.</p>
        </Section>

        <Section title="3. GÜVENLİK TEDBİRLERİ">
          <p className="mb-3 text-gray-700">Dernek;</p>
          <ul className="list-disc pl-6 space-y-1 text-gray-700">
            <li>Yetkisiz erişimleri önlemek</li>
            <li>Veri kaybını engellemek</li>
            <li>Sistem güvenliğini sağlamak</li>
          </ul>
          <p className="mt-3 text-gray-700">amacıyla gerekli teknik ve idari tedbirleri almaktadır.</p>
        </Section>

        <Section title="4. VERİ GİZLİLİĞİ">
          <p className="mb-3 text-gray-700">Kişisel veriler;</p>
          <ul className="list-disc pl-6 space-y-1 text-gray-700">
            <li>Yetkisiz kişilerle paylaşılmaz</li>
            <li>Sadece gerekli kişiler tarafından erişilebilir</li>
            <li>Mevzuata uygun şekilde saklanır</li>
          </ul>
        </Section>

        <Section title="5. ERİŞİM YETKİLERİ">
          <ul className="list-disc pl-6 space-y-1 text-gray-700">
            <li>Yetkilendirme prensibi uygulanır</li>
            <li>Her kullanıcı yalnızca gerekli verilere erişebilir</li>
          </ul>
        </Section>

        <Section title="6. İHLAL DURUMLARI">
          <p className="mb-3 text-gray-700">Olası veri ihlallerinde;</p>
          <ul className="list-disc pl-6 space-y-1 text-gray-700">
            <li>Gerekli inceleme yapılır</li>
            <li>Yetkili kurumlara bildirim yapılır</li>
            <li>İlgili kişiler bilgilendirilir</li>
          </ul>
        </Section>

        <Section title="7. SÜREKLİLİK">
          <p className="text-gray-700">Bilgi güvenliği süreçleri düzenli olarak gözden geçirilir ve güncellenir.</p>
        </Section>
      </>
    ),
  },

  'uyelik-kosullari': {
    title: 'Üyelik ve Kullanım Koşulları',
    content: (
      <>
        <h2 className="text-2xl font-bold text-[#103e6a] mb-2">ÜYELİK VE KULLANIM KOŞULLARI</h2>
        <h3 className="text-lg font-semibold text-gray-700 mb-6">İYİLİK ADIMI ULUSLARARASI İNSANİ YARDIM DERNEĞİ</h3>

        <Section title="1. TARAFLAR">
          <p className="text-gray-700">Bu sözleşme, İyilik Adımı Uluslararası İnsani Yardım Derneği ile siteye üye olan kullanıcı ("Üye") arasında akdedilmiştir.</p>
        </Section>

        <Section title="2. ÜYELİK ŞARTLARI">
          <ul className="list-disc pl-6 space-y-1 text-gray-700">
            <li>Üye, verdiği bilgilerin doğru ve güncel olduğunu kabul eder.</li>
            <li>Yanlış veya eksik bilgi verilmesi halinde Dernek üyeliği askıya alma veya sonlandırma hakkına sahiptir.</li>
          </ul>
        </Section>

        <Section title="3. KULLANIM KOŞULLARI">
          <ul className="list-disc pl-6 space-y-1 text-gray-700">
            <li>Site yalnızca hukuka uygun amaçlarla kullanılabilir.</li>
            <li>Üye, başkalarının haklarını ihlal edecek davranışlarda bulunamaz.</li>
            <li>Dernek, site içeriğinde değişiklik yapma hakkını saklı tutar.</li>
          </ul>
        </Section>

        <Section title="4. BAĞIŞ VE İŞLEMLER">
          <ul className="list-disc pl-6 space-y-1 text-gray-700">
            <li>Yapılan bağışlar ilgili mevzuat kapsamında değerlendirilir.</li>
            <li>Üye, bağış işlemlerinin kendi rızasıyla gerçekleştiğini kabul eder.</li>
          </ul>
        </Section>

        <Section title="5. FİKRİ MÜLKİYET">
          <p className="text-gray-700">Site içeriği, tasarım, logo ve tüm materyaller Derneğe aittir ve izinsiz kullanılamaz.</p>
        </Section>

        <Section title="6. SORUMLULUK SINIRI">
          <p className="text-gray-700">Dernek, teknik aksaklıklar veya üçüncü taraf hizmetlerden kaynaklı kesintilerden sorumlu değildir.</p>
        </Section>

        <Section title="7. SÖZLEŞME DEĞİŞİKLİĞİ">
          <p className="text-gray-700">Dernek, sözleşme koşullarını güncelleme hakkını saklı tutar.</p>
        </Section>
      </>
    ),
  },

  'cerez-politikasi': {
    title: 'Çerez Politikası',
    content: (
      <>
        <h2 className="text-2xl font-bold text-[#103e6a] mb-2">ÇEREZ POLİTİKASI</h2>
        <h3 className="text-lg font-semibold text-gray-700 mb-6">İYİLİK ADIMI ULUSLARARASI İNSANİ YARDIM DERNEĞİ<br />ÇEREZ (COOKIE) POLİTİKASI</h3>

        <p className="mb-8 text-gray-700 leading-relaxed">
          İyilik Adımı Uluslararası İnsani Yardım Derneği ("Dernek") olarak, internet sitemizi ziyaret eden kullanıcılarımızın deneyimini geliştirmek amacıyla çerezler kullanmaktayız.
        </p>

        <Section title="1. ÇEREZ NEDİR?">
          <p className="text-gray-700">Çerezler, ziyaret ettiğiniz internet siteleri tarafından tarayıcınız aracılığıyla cihazınıza kaydedilen küçük veri dosyalarıdır.</p>
        </Section>

        <Section title="2. HANGİ ÇEREZLERİ KULLANIYORUZ?">
          <ul className="list-disc pl-6 space-y-3 text-gray-700">
            <li><strong>Zorunlu Çerezler:</strong><br />Sitenin düzgün çalışması için gereklidir.</li>
            <li><strong>Performans Çerezleri:</strong><br />Ziyaretçi davranışlarını analiz ederek site performansını iyileştirir.</li>
            <li><strong>Fonksiyonel Çerezler:</strong><br />Kullanıcı tercihlerini hatırlar (dil, bölge vb.)</li>
            <li><strong>Pazarlama Çerezleri (varsa):</strong><br />Kullanıcılara ilgi alanlarına göre içerik sunulmasını sağlar.</li>
          </ul>
        </Section>

        <Section title="3. ÇEREZLERİN KULLANIM AMAÇLARI">
          <ul className="list-disc pl-6 space-y-1 text-gray-700">
            <li>Site performansını artırmak</li>
            <li>Kullanıcı deneyimini iyileştirmek</li>
            <li>Güvenliği sağlamak</li>
            <li>Analiz ve istatistik yapmak</li>
          </ul>
        </Section>

        <Section title="4. ÇEREZLERİN KONTROLÜ">
          <p className="text-gray-700">Tarayıcı ayarlarınız üzerinden çerezleri silebilir veya engelleyebilirsiniz. Ancak bu durumda sitenin bazı bölümleri düzgün çalışmayabilir.</p>
        </Section>

        <Section title="5. DEĞİŞİKLİKLER">
          <p className="text-gray-700">Dernek, çerez politikasında değişiklik yapma hakkını saklı tutar.</p>
        </Section>
      </>
    ),
  },
};

function Section({ title, children }) {
  return (
    <div className="mb-8">
      <h4 className="text-lg font-bold text-[#103e6a] mb-3">{title}</h4>
      {children}
    </div>
  );
}

export default function LegalPage() {
  const { slug } = useParams();
  const policy = policies[slug];

  if (!policy) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-500 text-lg">Sayfa bulunamadı.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white pt-32 pb-16">
      <div className="mx-auto max-w-3xl px-4">
        {policy.content}
      </div>
    </div>
  );
}
