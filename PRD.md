# Planning Guide

Kullanıcıların sorular sorarak rastgele Türkçe cevaplar alabileceği eğlenceli ve mistik bir sihirli küre (Magic 8-Ball) uygulaması.

**Experience Qualities**:
1. **Mistik** - Uygulama gizemli ve kehanet veriyormuş hissi uyandırmalı
2. **Eğlenceli** - Kullanıcılar rahatça sorular sorup cevap alabilmeli, oyun gibi hissettirmeli
3. **Sezgisel** - Tek bir tıklama veya etkileşimle cevap alınabilmeli

**Complexity Level**: Micro Tool (single-purpose)
  - Uygulama tek bir amaca hizmet ediyor: Soru sor, cevap al. Basit state yönetimi ve animasyonlu etkileşim.

## Essential Features

### Soru Sorma ve Cevap Alma
- **Functionality**: Kullanıcı bir soru yazıp küreye tıklayınca veya enter tuşuna basınca rastgele bir Türkçe cevap alır
- **Purpose**: Uygulamanın ana işlevi - eğlenceli tahmin/kehanet deneyimi
- **Trigger**: Küreye tıklama veya Enter tuşuna basma
- **Progression**: Soru yaz → Küreye tıkla/Enter bas → Animasyon oynar → Cevap belirir → Tekrar sor
- **Success criteria**: Kullanıcı soruyu girdikten sonra smooth animasyonla cevap görüntülenir ve her tıklamada farklı rastgele cevaplar gelir

### Cevap Kategorileri
- **Functionality**: Olumlu, olumsuz ve belirsiz Türkçe cevaplar (toplam 20 adet)
- **Purpose**: Gerçek Magic 8-Ball deneyimini yansıtmak
- **Trigger**: Otomatik olarak random seçilir
- **Progression**: Her tıklama → Random cevap seçimi → Ekranda gösterim
- **Success criteria**: Cevaplar dengeli dağıtılmış (olumlu/olumsuz/belirsiz) ve Türkçe'ye uygun

### Animasyon ve Görsel Geri Bildirim
- **Functionality**: Küre shake/glow animasyonu, cevap fade-in efekti
- **Purpose**: Fiziksel Magic 8-Ball deneyimini dijital ortama taşımak
- **Trigger**: Kullanıcı etkileşimi
- **Progression**: Tıklama → Shake animasyon → Glow efekti → Cevap belirir (fade-in)
- **Success criteria**: Animasyonlar smooth ve tatmin edici, 1 saniyeden az sürmeli

## Edge Case Handling
- **Boş Soru**: Kullanıcı soru girmeden tıklarsa "Önce bir soru sor!" uyarısı
- **Hızlı Tıklama**: Animasyon devam ederken tekrar tıklamayı engelle
- **Uzun Sorular**: Çok uzun sorular için scroll veya text truncate

## Design Direction
Tasarım gizemli, büyülü ve modern hissetmeli - koyu tonlar, mor/mavi gradient'ler ve parlayan efektlerle mistik bir atmosfer yaratmalı. Minimal interface ile küre odak noktasında olmalı.

## Color Selection
Complementary (opposite colors) - Mor ve altın tonları gizemli ve değerli hissi verecek şekilde kullanılacak.

- **Primary Color**: Deep Purple (oklch(0.35 0.15 290)) - Mistik ve büyülü hissi, ana küre rengi
- **Secondary Colors**: Dark Blue-Purple (oklch(0.25 0.12 280)) - Background için derin, gizemli ton
- **Accent Color**: Golden Yellow (oklch(0.75 0.15 85)) - Parlayan detaylar, cevap gösterimi için dikkat çekici
- **Foreground/Background Pairings**:
  - Background (Dark Blue-Purple oklch(0.25 0.12 280)): White text (oklch(0.98 0 0)) - Ratio 11.2:1 ✓
  - Card/Ball (Deep Purple oklch(0.35 0.15 290)): White text (oklch(0.98 0 0)) - Ratio 8.5:1 ✓
  - Accent (Golden Yellow oklch(0.75 0.15 85)): Dark text (oklch(0.25 0 0)) - Ratio 9.8:1 ✓
  - Muted (Dim Purple oklch(0.45 0.08 285)): Light text (oklch(0.95 0.02 280)) - Ratio 6.2:1 ✓

## Font Selection
Modern ve gizemli karakteri yansıtan, okunabilir bir sans-serif font - Inter veya Poppins mistik tema ile uyumlu olacak şekilde kullanılmalı.

- **Typographic Hierarchy**:
  - H1 (App Title): Poppins Bold/32px/tight letter spacing - Mistik başlık
  - Input (Question): Inter Regular/18px/normal spacing - Rahatça yazılabilir
  - Answer Text: Poppins Medium/24px/wide letter spacing - Önemli, vurgulu cevap
  - Helper Text: Inter Regular/14px/normal spacing - Yönlendirici metinler

## Animations
Animasyonlar fiziksel Magic 8-Ball'u simüle etmeli - sallanma, parıldama ve yumuşak geçişler ile sihirli anlar yaratmalı.

- **Purposeful Meaning**: Shake animasyonu gerçek Magic 8-Ball'u simüle eder, glow efekti mistik güç hissi verir
- **Hierarchy of Movement**: 
  1. Küre shake (en dikkat çekici) - 600ms
  2. Glow pulse - 400ms
  3. Cevap fade-in - 300ms
  4. Subtle floating idle animation - continuous

## Component Selection
- **Components**: 
  - Card (küre için container, glassmorphic effect)
  - Input (soru girişi için, borderless, integrated look)
  - Button (implicit - kürenin kendisi tıklanabilir)
  - Badge (cevap kategorisi gösterimi için optional)
- **Customizations**: 
  - Circular glowing ball custom component (radial gradient, shadow effects)
  - Animated number "8" in center of ball
  - Custom shake and glow animations with framer-motion
- **States**: 
  - Ball: idle (subtle float) → shaking → glowing → showing answer
  - Input: empty → focused → filled
  - Answer: hidden → fading in → visible
- **Icon Selection**: 
  - Sparkles (sihir efekti için)
  - Question mark (ball center'da veya empty state'de)
- **Spacing**: 
  - Container padding: p-8
  - Element gaps: gap-6 (between input and ball)
  - Ball size: w-64 h-64 (256px)
  - Margins: my-4 for breathing room
- **Mobile**: 
  - Ball scales down to w-48 h-48 on mobile
  - Input full width on mobile
  - Reduced padding p-4 on mobile
  - Stacked vertical layout, ball always centered
