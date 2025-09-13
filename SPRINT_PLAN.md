# Proje Sprint Planı

---

##  Sprint 1 — Monorepo ve İlk Uçtan Uca Çalışma

**Backend öğrenilecekler**
- NestJS temelleri (Modules, Controllers, Services)
- REST prensipleri, HTTP status kodları
- Config yönetimi (`@nestjs/config`)
- Docker temel kullanım (Postgres & Redis için)

**Görevler**
- Monorepo oluştur (`apps/ui`, `apps/electron`, `apps/server`, `apps/python`)
- NestJS backend → `/health` endpoint
- UI → Backend’e HTTP GET çağrısı
- Docker Compose ile Postgres & Redis ayağa kaldır

**DoD**
- `docker compose up` → DB ve Redis hazır
- UI → “Backend OK” gösterebiliyor
- README.md’de quickstart komutları yazıldı

**Demo Checklist**
- Uygulama açılır, “Backend OK” mesajı görünür

---

##  Sprint 2 — Kimlik & Bağlantı Yönetimi

**Backend öğrenilecekler**
- DTO ve Validation (`class-validator`)
- Authentication (JWT temeli)
- Authorization (basit guard’lar)
- RBAC kavramı

**Görevler**
- `/auth/login`, `/auth/logout`, `/auth/me`
- `/connections/test` ve `/connections` CRUD
- UI: Login formu + Bağlantı ekleme/test etme formu

**DoD**
- Login → token alınıyor
- Bağlantı eklenip listeleniyor
- BACKEND_API.md güncellendi

**Demo Checklist**
- Login ol → bağlantı ekle → “test başarılı” bildirimi

---

##  Sprint 3 — Şema Keşfi & Sorgu Çalıştırma

**Backend öğrenilecekler**
- SQL temel sorgular (SELECT, LIMIT, OFFSET)
- ORM/Adapter pattern (Prisma veya TypeORM)
- SQL injection önleme (parametreli query)
- Error handling (global exception filter)

**Görevler**
- `/schemas/:connectionId/databases`
- `/schemas/:connectionId/:database/tables`
- `/schemas/:connectionId/:database/:table/columns`
- `/queries/execute` (SELECT only, limit/timeout)
- UI: Sol panelde şema explorer, sağda query editor + result grid

**DoD**
- DB tabloları listeleniyor
- “SELECT … LIMIT 100” çalıştırılıp sonuç gösteriliyor
- QUERY hatalarında düzgün geri bildirim var

**Demo Checklist**
- Tablolar → kolonlar → query sonucu grid’de görünüyor

---

##  Sprint 4 — Analiz İşleri (Python Entegrasyonu + Kuyruk)

**Backend öğrenilecekler**
- Asenkron işler (neden queue kullanılır?)
- BullMQ + Redis ile job kuyruğu
- NestJS WebSocket Gateway
- Node `child_process.spawn` ile Python script çalıştırma

**Görevler**
- `/analyses/start`, `/analyses/:jobId/status`, `/analyses/:jobId/result`
- WS: `analysis:update` event’i
- Python analizleri:
  1. `describe_table` (özellikler, kolon istatistikleri)
  2. `group_aggregate` (sum/avg/count)
- UI: Analiz başlat, job durumunu izle, sonucu grafikle göster

**DoD**
- İki analiz tipi uçtan uca çalışıyor
- WS ile progress güncelleniyor
- RUNBOOK.md → Python bağımlılıkları yazıldı

**Demo Checklist**
- “Bölgeye göre satış toplamı” analizi çalışıyor, grafik görünüyor

---

##  Sprint 5 — Güvenlik, Export & Artefact Yönetimi

**Backend öğrenilecekler**
- Electron security (contextIsolation, preload API sınırlandırma)
- Gizli bilgi yönetimi (env, OS Keychain)
- Dosya export (CSV/PNG)
- Basit RBAC (Owner/Member)

**Görevler**
- `/exports/:jobId/csv`, `/exports/:jobId/png`
- Artefact modeli ve TTL temizliği
- UI: Export butonları
- Gizli anahtar saklama PoC

**DoD**
- CSV/PNG export indirilebiliyor
- Secret saklama PoC çalışıyor
- RBAC ile iki rol farkı var

**Demo Checklist**
- Analiz sonucu CSV ve PNG indirilebiliyor

---

##  Sprint 6 — SaaS Hazırlıkları (Auth, Multi-tenant, Telemetry)

**Backend öğrenilecekler**
- OAuth/OIDC akışları
- Multi-tenant modelleme (org/workspace isolation)
- Logging & Monitoring (Winston/Pino, temel metrikler)
- Audit log kavramı

**Görevler**
- Org/Workspace kavramını DB’ye ekle
- Tenant-aware guards
- Audit log (sorgu & analiz çalıştırma)
- Telemetry (istek sayısı, latency)

**DoD**
- Workspace değiştirince izole veri görünüyor
- Audit log ekranı mevcut

**Demo Checklist**
- İki workspace → biriyle yapılan işlemler diğerinde görünmüyor

---

##  Sprint 7 — Dashboard, Paylaşım, Paketleme

**Backend öğrenilecekler**
- Persisted view (dashboard modeli)
- Paylaşım token’ları (short-lived tokens)
- Deployment & Packaging (electron-builder)

**Görevler**
- Dashboard modeli (widget layout)
- Share link özelliği
- Installer üretme

**DoD**
- Dashboard kaydedilip tekrar yükleniyor
- Installer çalışıyor

**Demo Checklist**
- Dashboard oluştur, kapat, aç → aynı layout geliyor

---

##  Sprint 8 — Monetizasyon & Ürünleşme

**Backend öğrenilecekler**
- Feature flags ve planlama
- Quota takibi (rate limiting, kullanım sayacı)
- Temel faturalandırma metrikleri

**Görevler**
- Planlar: Free, Pro, Team
- Kullanım limiti
- ROADMAP.md → v1/v2 hedefleri

**DoD**
- Plan değiştirince özellik davranışı değişiyor
- Yol haritası güncellendi

**Demo Checklist**
- Free planda kısıtlı, Pro’da açık özellik gösteriliyor
