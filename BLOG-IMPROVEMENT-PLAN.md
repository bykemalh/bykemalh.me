# Blog iyileştirme planı

İnceleme: 12 Eylül 2026. Kapsam: performans, React Router güncellemesi, gelişmiş TUI, Türkçe/İngilizce bloglar. Bu aşamada uygulama kodu, bağımlılıklar ve veritabanı değiştirilmedi.

## Bulgular ve kanıt sınırları

- Canlı `/blog` yanıtı HTTP 200; `Cache-Control: public, max-age=0, s-maxage=300, stale-while-revalidate=3600` olmasına rağmen `cf-cache-status: DYNAMIC`. Ölçülen yanıt edge cache üzerinden sunulmadı. Cloudflare HTML'i varsayılan olarak cache'lemez; yalnızca başlık eklemek yeterli değildir.
- Dört ardışık, düşük hacimli blog GET ölçümü: TTFB 2,200 / 2,172 / 2,094 / 0,451 saniye; toplam aktarım 2,369 / 2,365 / 2,295 / 0,656 saniye. İlk HTML 18.377 bayt. Ana sayfa tek örneği: TTFB 1,466 saniye. Bunlar bu ölçüm noktasının ağ/sunucu süreleridir; tarayıcı LCP ölçümü veya üretim p95 sonucu değildir. Sorun yalnızca bloga özgü olmayabilir.
- `app/routes/blog.tsx`: her origin isteğinde Prisma sorgusu bekleniyor. Liste gövdeyi çekmiyor ve uygun birleşik indeks şemada zaten var; gereksiz COUNT sorgusu da yok. İndeksin üretime uygulanıp uygulanmadığı doğrulanmadı. Sayfalama yok.
- `react-router.config.ts`: yalnızca SSR var. README'deki SSG/ISR ve cache süreleri mevcut yapılandırmayı yansıtmıyor.
- `app/components/page-transition.tsx`: ilk render opacity 0; içerik JavaScript/hydration ve animasyona bağlı görünür oluyor. Animasyon 300 ms. Bu, sunucu bekleme süresinin üzerine algılanan gecikme ekleyebilir.
- `app/components/markdown-renderer.tsx`: Markdown, ham HTML, matematik ve highlight işlem hattı hem SSR hem istemci render'ında çalışıyor. KaTeX ve highlight CSS'i koşulsuz. Bu bulgu detay sayfasına ait; blog listesinin gecikmesini tek başına açıklamaz.
- `vite.config.ts`: kullanılmayan react-syntax-highlighter manuel vendor listesinde; vendor gruplarının gerçek çıktıdaki etkisi production build ile ölçülmeli. Dosya boyutu hakkında ölçülmemiş rakam kullanılmamalı.
- `app/components/blog-view-tracker.tsx`: fetcher.submit ile görüntülenme POST'u loader revalidation tetikleyebilir. Bloglar arasında geçişte boolean ref yeni blog kimliğine göre sıfırlanmıyor. sessionStorage başarıdan önce işaretleniyor.
- `app/lib/prisma.ts`: connection_limit=20 ve pool_timeout=30 zorlanıyor. pool_timeout saniyedir; kodun ms yorumu yanlış. Havuz doluluğu kanıtlanmadı; timeout düşürmek veya bağlantı artırmak başlı başına çözüm değil.
- Liste loader'ı DB hatasını boş listeye çeviriyor; bu yanıt public cache başlığıyla gerçek boş blog gibi sunulabilir.
- `scripts/blog-manager.mjs`: manuel içerikte her satır için yeniden await rl.question kuruluyor. Node PassThrough ile aynı desen yeniden üretildi: tek parçada gönderilen bir/iki/uc satırlarından yalnızca bir alındı. Tam terminal testi henüz yapılmadı.
- Script açıklamasında npm run blog yazıyor; package.json içinde blog komutu yok. Boş içerik doğrulaması, kalıcı taslak kurtarma ve hata sonrası formu koruma eksik.
- Blog tablosunda dil/çeviri ilişkisi yok. use-language yalnızca arayüz çevirisi sağlıyor (tr/en/ru); sunucu dili tr başlıyor, tercih istemcide okunuyor. SEO locale sabit tr_TR.
- Yerelde node_modules ve gerçek .env yok; Node 24.14.1 var. Bu incelemede build/typecheck, DB sorgu profili ve üretim migration durumu doğrulanamadı.

## Uygulama sırası

### 1. Ölçüm ve hızlı performans düzeltmeleri

1. Bağımlılıkları lockfile ile kur; Prisma client üret; mevcut typecheck/build tabanını kaydet.
2. Production modunda liste ve kısa/uzun blog detayını ölç: soğuk/sıcak TTFB, loader/DB süresi, LCP, JS aktarımı, Markdown işleme ve navigation istekleri. Server-Timing ile DB süresini ayır. Üretim migration durumunu salt okunur kontrol et.
3. SSR içeriğini ilk HTML'de görünür yap; hareket azaltma tercihini destekle. Skeleton sırasında Outlet'in kaldırılmasının tekrar mount etkisini kontrol et.
4. Görüntülenme kaydını içerik loader'ını gereksiz yenilemeden gönder; blog kimliğine göre takip et, başarıdan sonra oturum işareti koy, storage hatasını tolere et. Gerçek içerik mutasyonlarının revalidation davranışını koru.
5. DB arızasında uygun hata durumu ve no-store döndür. Boş sonuç ile servis hatasını ayır.
6. Ölçüme göre Markdown'ı sunucuda derleyip içerik sürümüyle cache'le; HTML desteğini koruyan açık bir sanitizasyon politikası kullan. Matematik/kod özelliklerini gerektiğinde yükle; kullanılmayan vendor girdilerini kaldır. Öncesi/sonrası paket boyutlarını karşılaştır.
7. Liste büyüdüğünde dil + yayın durumu filtresi ve kararlı sıralamalı sayfalama uygula; mevcut indeksi tekrar oluşturmadan sorgu planını kontrol et.
8. Cloudflare'da sadece herkese açık blog GET/HEAD yanıtları için somut cache kuralı hazırla. HTML ve React Router .data yanıtlarını ayrı doğrula; dil ve gerekli query parametreleri cache anahtarında kalsın. POST, hata, taslak ve özel yanıtlar cache dışı olsun. Yayınlama/güncelleme/yayından kaldırma için purge planı ekle; hit ve Age başlıklarını tekrar ölç.

### 2. React Router güncellemesi

Mevcut dört paket: react-router, @react-router/node, @react-router/serve, @react-router/dev = 7.10.1.

Npm registry ile doğrulanan sürümler: version-7 = 7.18.3; latest = 8.3.1.

1. Dördünü birlikte tam 7.18.3 sürümüne taşı; package-lock güncelle; typegen/typecheck/build ve temel route testlerini çalıştır.
2. Node sürümünü geliştirme/engines/Docker/CI ortamlarında 24 LTS ile uyumlu hale getir. v8 asgari Node 22.22.0 istiyor; mevcut Docker Node 20.
3. React ve React DOM'u birlikte en az 19.2.7'ye taşı (mevcut manifest 19.2.3 tabanlı). Vite 7 sürüm uyumunu ve peer dependency sonuçlarını kontrol et.
4. Resmî v7 -> v8 rehberindeki future flag ve API değişikliklerini tek tek uygula. Özellikle Vite environments yapılandırması, meta/data tipleri, request URL ve .data cache davranışını test et.
5. Dört Router paketini birlikte 8.3.1'e taşı. SSR doğrudan açılış, istemci gezinmesi, 404, meta tarihleri, sitemap, action/fetcher ve Docker build doğrula.

Router güncellemesi ölçülmüş cache/DB/hydration sorunlarının yerine geçen bir performans çözümü değildir.

### 3. İki dilli veri ve URL modeli

Öneri: mevcut Blog kaydını içerik kimliği olarak koru; yerelleştirilmiş alanları BlogTranslation tablosuna taşı.

- Blog: id, featured, viewCount, createdAt, updatedAt ve mevcut views ilişkisi.
- BlogTranslation: id, blogId, locale (tr/en), title, slug, content, keywords, categories, published, publishedAt, updatedAt.
- Benzersizlik: (blogId, locale), (locale, slug). Yayın durumu çeviri başına: Türkçe yayında, İngilizce taslak olabilir.
- URL: /tr/blog, /en/blog ve /tr/blog/:slug, /en/blog/:slug. Eski /blog/:slug adresleri açık bir eşleme üzerinden ilgili mevcut dildeki kanonik adrese kalıcı yönlenir. Eski /blog için sabit varsayılan TR yönlendirmesi.
- İçerik dili URL'den sunucuda belirlenir; localStorage URL'yi geçersiz kılamaz. Blog dil seçici mevcut yayımlanmış çeviriye gider; yoksa o dilin listesine ve açık çeviri-yok mesajına gider. Sessizce yanlış dilde içerik gösterilmez.
- Sitenin mevcut Rusça arayüzü ayrı kalır; blog içerikleri TR/EN ile sınırlı olur.
- html lang, canonical, hreflang, Open Graph locale ve JSON-LD inLanguage içerik diline göre üretilir. Sitemap yalnızca yayımlanmış çevirileri ve karşılıklarını içerir.
- Önce yeni tabloyu ekle, mevcut kayıtların gerçek dilini envanterle ve eşleme dosyasıyla taşı; hepsini körlemesine TR sayma. Blog id'leri, linkler ve sayaçlar korunur. Otomatik çeviri varsayılmaz.
- Geri alınabilir backfill + kayıt/içerik karşılaştırması; yeni okuma/yazma yoluna geçişten sonra eski alanları ayrı aşamada temizle. Çevirinin yayından kaldırılmasında detay, liste, hreflang eşleri ve sitemap cache'leri geçersizleşir.

### 4. Gelişmiş TUI

Öneri: TypeScript + Ink; TUI bağımlılıkları web istemci paketine girmez. Seçilecek yayımlanmış Ink sürümünde usePaste ve Node/React uyumluluğu doğrulanır.

- npm run blog ile tam ekran yönetim: solda aranabilir yazı listesi; sağda alanlar/içerik; TR/EN, taslak/yayında filtreleri; klavye kısayolları.
- İçerik editörü: gerçek çok satırlı tampon, imleç/silme/kaydırma, bracketed paste ile tek olayda metin alma. Enter yeni satırdır; kaydetme ayrı eylemdir. .done artık özel bitirme satırı değildir.
- Uzun metinler için dosyadan içe aktarma ve $VISUAL/$EDITOR/Windows editörü seçeneği. Haricî editör zorunlu olmaz; terminale doğrudan yapıştırma temel özellik olarak kalır.
- Başlık/slug/dil/kategori/SEO alanları; aynı yazıya İngilizce veya Türkçe çeviri ekleme; iki çevirinin durumunu birlikte görme.
- Otomatik yerel taslak ve çökme sonrası kurtarma; DB hatasında girilen içerik korunur. Boş içerik/slug çakışması form içinde gösterilir.
- Varsayılan taslak kayıt; yayımlamadan önce içerik özeti/önizleme; silme/yayından kaldırmada açık eylem. Eşzamanlı değişiklikleri updatedAt kontrolüyle tespit et.
- Yayınlama sonrası ilgili cache'leri geçersizleştir; purge başarısızsa yazı kaydını kaybetmeden tekrar denenebilir durum göster.
- TTY yoksa dosya/stdin tabanlı import; terminal paste desteği yoksa açıklayıcı dosya/editör seçeneği.

## Kabul kontrolleri

- JavaScript kapalıyken yayımlanmış blog içeriği görünür.
- Aynı yazı görüntülenme kaydı gereksiz içerik GET'i başlatmaz; farklı bloga geçişte yeni yazı takip edilir.
- Cache HIT doğrulanır; bir dilin içeriği diğer dil URL'sinde görünmez; taslaklar ve servis hataları cache'lenmez.
- 10.000+ karakterli çok satırlı paste; boş satır, TR karakterleri, emoji, kod blokları, CRLF/LF ve literal .done içeren metin; parçalı paste olayları. Kaynak metinle yalnızca belgelenmiş satır-sonu normalizasyonu dışında birebir karşılaştır.
- Windows Terminal/PowerShell üzerinde gerçek yapıştırma, geri alma, yeniden boyutlandırma, iptal ve taslak kurtarma denemeleri.
- Eski URL'ler çalışır; TR/EN yayımlama durumları bağımsızdır; olmayan çeviri davranışı ve SEO/sitemap tutarlıdır.
- Her Router geçişinde typecheck/build; route entegrasyon testleri; final Docker build. Performans karşılaştırması aynı test koşullarında yapılır; ilk ölçümlerden hızlanma yüzdesi vaat edilmez.

## Kaynaklar

- React Router güncel sürümler: https://reactrouter.com/home
- v8 geçişi ve asgari sürümler: https://reactrouter.com/upgrading/v7
- Cloudflare varsayılan HTML cache davranışı: https://developers.cloudflare.com/cache/concepts/default-cache-behavior/
- Ink usePaste / terminal API'leri: https://github.com/vadimdemedes/ink
- Node readline: https://nodejs.org/api/readline.html
- Prisma eski engine bağlantı havuzu: https://www.prisma.io/docs/orm/v6/prisma-client/setup-and-configuration/databases-connections/connection-pool
