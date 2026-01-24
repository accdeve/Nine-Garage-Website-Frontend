# Nine Garage Database - Dokumentasi Konteks & Alur Kerja Lengkap

## 1. Tinjauan Arsitektur Sistem

**Database Engine**: PostgreSQL 18+ (Target)
**Filosofi Desain**: "Strict Schema, Flexible Logic" (Skema Ketat, Logika Fleksibel)

Database Nine Garage dirancang untuk menangani operasional kompleks bengkel otomotif yang juga berfungsi sebagai toko retail dan distributor online. Skema ini dinormalisasi (3NF) tetapi menggunakan fitur PostgreSQL Modern seperti `JSONB` untuk fleksibilitas dalam spesifikasi produk dan bukti garansi.

### Referensi Utama

*   **DDL SQL**: `database/ddl/init_schema_part[1-3].sql` (Implementasi Fisik)
*   **Schema Design**: `docs/schema/schema.md` (Blueprint Logis & Catatan)

---

## 2. Konteks Per-Layer & Alur Kerja Detail

### 2.1 Organization & Employees Layer
Layer ini mendefinisikan struktur perusahaan dan sumber daya manusia.

*   **Konteks Organisasi**:
    *   **Company**: Entitas induk perusahaan.
    *   **Divisions**: Perusahaan terbagi menjadi beberapa divisi fungsional (misal: Teknisi, Gudang, Sales, Admin).
*   **Konteks Karyawan**:
    *   Setiap `employee` terikat pada satu `division` yang menandakan fungsi utama mereka.
    *   **Employee Assignments**: Tabel ini krusial untuk menentukan *di mana* karyawan bekerja (Scope Lokasi) dan dalam kapasitas apa. Ini memungkinkan satu karyawan memiliki akses atau tugas di Warehouse A dan Workshop B sekaligus tanpa duplikasi data profil.
*   **Referensi File**:
    *   *Schema Blueprint*: `docs/schema/schema.md` (Lines 28-70)
    *   *SQL Implementation*: `database/ddl/init_schema_part1.sql` (Lines 22-77)

### 2.2 Product & Catalog Management Layer
Tulang punggung statis dari sistem yang mendefinisikan "Barang".

*   **Alur Data**: `Brand` -> `Category` -> `Product` (Generik) -> `Variant` (SKU).
*   **Specs**: Disimpan dalam `variant.specs` (JSONB) untuk fleksibilitas atribut (voltage, wattage, color_temp).
*   **Konsep**: Memisahkan konsep Marketing (`products`) dari Item Fisik (`product_variants`).
*   **Referensi File**:
    *   *Schema Blueprint*: `docs/schema/schema.md` (Lines 76-137)
    *   *SQL Implementation*: `database/ddl/init_schema_part1.sql` (Lines 82-176)

### 2.3 Services Layer
Layer ini mendefinisikan "Jasa" atau "Pengerjaan".

*   **Konteks**:
    *   `services`: Mengurai daftar layanan yang tersedia (misal: "Instalasi BiLED Motor", "Tuning Audio").
    *   **Variant Requirement**: Tabel `variant_required_services` bertindak sebagai *klasifikasi teknis*. Ini menjawab: "Produk ini kalau dipasang butuh jasa apa?". Misal: Produk 'Proyektor X' *requires* 'Jasa Retrofit Headlamp'. Ini mencegah kasir menjual barang teknis tanpa input jasa.
*   **Referensi File**:
    *   *Schema Blueprint*: `docs/schema/schema.md` (Lines 143-166)
    *   *SQL Implementation*: `database/ddl/init_schema_part1.sql` (Lines 181-210)

### 2.4 Product Packages Layer (Bundling)
Layer untuk kebutuhan Marketing Campaign.

*   **Konteks**:
    *   `product_packages` adalah entitas **Bundling**.
    *   Menggabungkan **Product(s)** + **Service(s)** + **Benefit(s)** menjadi satu SKU marketing.
    *   Digunakan untuk promo musiman atau paket hemat (misal: "Paket Terang 1: Lampu + Pasang + Kabel").
    *   Harga paket bersifat "Kontrak" (mengunci harga total).
*   **Referensi File**:
    *   *Schema Blueprint*: `docs/schema/schema.md` (Lines 172-198)
    *   *SQL Implementation*: `database/ddl/init_schema_part1.sql` (Lines 214-254)

### 2.5 Pricing Layer (Mesin Harga)
Layer ini mengatur logika "Berapa harganya?" yang bergantung pada konteks.

*   **Konteks**:
    1.  **Variants Pricing**: Harga beli barang saja (`pricing_variants`).
    2.  **Services Pricing**: Harga jasa saja (`pricing_services`).
    3.  **Variant-Services Pricing**: Harga jasa KHUSUS untuk produk tertentu (`pricing_variant_services`). *Contoh: Pasang Klakson (50rb) vs Pasang Proyektor (500rb) - jasa berbeda tergantung varian produknya.*
    4.  **Bundling Pricing**: Harga paket all-in (`pricing_packages`).
*   **Referensi File**:
    *   *Schema Blueprint*: `docs/schema/schema.md` (Lines 205-260)
    *   *SQL Implementation*: `database/ddl/init_schema_part2.sql` (Lines 112-148)

### 2.6 Promotion Layer
Mengatur mekanisme diskon marketing.

*   **Konfigurasi Tipe**:
    *   `promotion_type`: Mendukung **Voucher** (wajib kode unik) dan **Direct** (potongan harga otomatis).
    *   `discount_type`: Mendukung **Percentage** (misal: Diskon 10%) dan **Fixed Amount** (misal: Potongan Rp 50.000).
*   **Konteks**:
    *   Entitas `promotions` berfungsi sebagai 'Rule Engine' untuk diskon yang valid saat transaksi di Order Layer.
    *   *Note*: Entitas ini digunakan di `order_promotions` (Layer 2.10).
*   **Referensi File**:
    *   *Schema Blueprint*: `docs/schema/schema.md` (Lines 266-291)
    *   *SQL Implementation*: `database/ddl/init_schema_part2.sql` (Lines 153-176)

### 2.7 Warehouse & Workshop Layer (Lokasi Fisik)
Lapisan infrastruktur fisik bisnis.

*   **Konteks Warehouse**:
    *   `warehouses` adalah gudang penyimpanan fisik.
    *   **Hirarki**: Mendukung struktur `Main Warehouse` > `Sub Warehouse`. Barang masuk terpusat lalu didistribusikan ke cabang.
*   **Konteks Workshop**:
    *   `workshops` adalah bengkel resmi Nine.
    *   **Fokus Bisnis**: Instalasi produk sendiri (Bukan bengkel umum segala merk).
    *   **Fungsi Ganda**: Workshop juga bertindak sebagai entitas Retail Offline (Display Product & Transaksi Kasir).
*   **Referensi File**:
    *   *Schema Blueprint*: `docs/schema/schema.md` (Lines 297-318)
    *   *SQL Implementation*: `database/ddl/init_schema_part2.sql` (Lines 11-37)

### 2.8 Online Shop Layer (Future-Proofing)
Lapisan untuk integrasi E-Commerce.

*   **Platform**: Daftar third-party marketplace (Shopee, Lazada, TikTok Shop).
*   **Online Shops**:
    *   Entitas virtual toko online.
    *   **Tanpa Stok Fisik**: Stok online shop secara logis merujuk/mengambil dari `warehouse_id` tertentu.
    *   *Catatan*: Layer ini belum sepenuhnya aktif, menunggu API engineering (cold data).
*   **Referensi File**:
    *   *Schema Blueprint*: `docs/schema/schema.md` (Lines 324-339)
    *   *SQL Implementation*: `database/ddl/init_schema_part2.sql` (Lines 38-56)

### 2.9 Booking Layer
Manajemen jadwal instalasi (Pre-Transaction).

*   **Konteks**:
    *   `bookings`: Mengatur slot waktu instalasi (schedule arrangement) di workshop tertentu.
    *   **Item Booking**:
        *   `booking_variant_items`: Customer ingin pasang produk varian tertentu.
        *   `booking_package_items`: Customer ingin pasang paket bundling tertentu.
    *   *Note*: Booking hanya data reservasi, bukan transaksi finansial.
*   **Referensi File**:
    *   *Schema Blueprint*: `docs/schema/schema.md` (Lines 359-410)
    *   *SQL Implementation*: `database/ddl/init_schema_part3.sql` (Lines 14-49)

### 2.10 Order Layer
Pusat kegiatan transaksi penjualan.

*   **Alur**:
    1.  **Order**: Transaksi finansial (Dibuat saat hari H). Mengikat item (Variant/Package/Service) ke Customer.
    2.  **Installation**: Eksekusi teknis dari Order (Pengurangan stok terjadi di sini/finalisasi order).
    3.  **Payment**: Penyelesaian pembayaran.
*   **Konteks**:
    *   `orders`: Entitas history transaksi, baik di workshop (offline) maupun nantinya online shop (cold data). Mengikat Customer dan Pembayaran.
    *   `order_items`: Daftar detail item yang dibeli, mendukung pelaporan yang jelas (variants, packages, or services).
    *   `order_promotions`: Jembatan ke tabel `promotions`, mencatat diskon/voucher apa yang dipakai saat checkout.
*   **Referensi File**:
    *   *Schema Blueprint*: `docs/schema/schema.md` (Lines 437-493)
    *   *SQL Implementation*: `database/ddl/init_schema_part3.sql` (Lines 67-111)

### 2.11 Payment Layer
Pencatatan keuangan historis.

*   **Konteks**:
    *   `payments`: Mencatat pembayaran yang terjadi (Historical Entity). Dalam konteks sekarang fokus pada transaksi workshop (Cash/Transfer/QRIS).
*   **Referensi File**:
    *   *Schema Blueprint*: `docs/schema/schema.md` (Lines 504-517)
    *   *SQL Implementation*: `database/ddl/init_schema_part3.sql` (Lines 119-130)

### 2.12 Workshops Return Layer
Manajemen pengembalian barang (RMA/Defect).

*   **Konteks**:
    *   `workshop_returns`: Mencatat kejadian retur barang fisik ke workshop (misal: cacat produk).
    *   `workshop_return_items`: Detail produk apa saja yang diretur.
    *   *Note*: Saat ini desain dominan untuk offline workshop. Penyatuan proses retur lintas platform (Online & Offline) belum sepenuhnya selesai (*Work in Progress*).
*   **Referensi File**:
    *   *Schema Blueprint*: `docs/schema/schema.md` (Lines 530-556)
    *   *SQL Implementation*: `database/ddl/init_schema_part3.sql` (Lines 133-157)

### 2.13 Installation Layer
Rekam jejak eksekusi teknis (Operational History).

*   **Konteks**:
    *   `installations`: Log historis pengerjaan. Mencatat:
        *   *Di mana* (Workshop mana).
        *   *Sumber* (Apakah dari Booking ID atau Walk-in Order ID).
        *   *Siapa* (Teknisi yang bertugas).
    *   `installation_items`: Daftar produk yang benar-benar dipasang ke kendaraan.
*   **Referensi File**:
    *   *Schema Blueprint*: `docs/schema/schema.md` (Lines 562-588)
    *   *SQL Implementation*: `database/ddl/init_schema_part3.sql` (Lines 163-180)

### 2.14 Customer & Community Layer
Manajemen relasi pelanggan dan komunitas.

*   **Konteks**:
    *   `communities`: Daftar partner komunitas otomotif (Non-kontrak) yang berafiliasi dengan Nine Autoseries.
    *   `customers`: Member terdaftar. Memiliki akun dan terikat dengan komunitas tertentu (opsional).
    *   `vehicles`: Aset kendaraan milik customer. Sekarang memiliki atribut `category` (Car/Motorcycle) untuk segmentasi layanan.
*   **Referensi File**:
    *   *Schema Blueprint*: `docs/schema/schema.md` (Lines 594-642)
    *   *SQL Implementation*: `database/ddl/init_schema_part2.sql` (Lines 61-104)

### 2.15 Review & Rating Layer
Umpan balik pelanggan dan kredibilitas.

*   **Konteks**:
    *   `reviews`: Menyimpan ulasan pelanggan terhadap layanan workshop atau produk.
*   **Referensi File**:
    *   *Schema Blueprint*: `docs/schema/schema.md` (Lines 646-671)
    *   *SQL Implementation*: `database/ddl/init_schema_part3.sql` (Lines 239-253)

### 2.16 Loyalty & Points Layer
Sistem retensi pelanggan berbasis poin.

*   **Konteks**:
    *   `point_ledger`: Koleksi riwayat perolehan dan penggunaan poin (Historical Data).
    *   `reward_catalog`: Daftar hadiah yang dapat diklaim (Items redeemable).
    *   `redemptions`: Mencatat sejarah klaim hadiah oleh customer agar saldo poin terkalkulasi akurat.
*   **Referensi File**:
    *   *Schema Blueprint*: `docs/schema/schema.md` (Lines 674-729)
    *   *SQL Implementation*: `database/ddl/init_schema_part3.sql` (Lines 256-298)

### 2.17 Inventory Layer (Warehouse & Workshop Stock)
Manajemen stok fisik multi-lokasi.

*   **Konteks**:
    *   `warehouse_stock`: Stok di gudang penyimpanan.
    *   `workshop_stock`: Stok di etalase/workshop siap jual.
    *   `stock_requests`: Mekanisme permintaan stok dari workshop ke gudang (Approval Workflow).
    *   `stock_request_items`: Detail varian yang diminta dalam satu tiket request.
*   **Referensi File**:
    *   *Schema Blueprint*: `docs/schema/schema.md` (Lines 732-786)
    *   *SQL Implementation*: `database/ddl/init_schema_part2.sql` (Lines 181-226)

### 2.18 Warranty Layer
Manajemen jaminan purna jual.

*   **Konteks**:
    *   `product_warranties`: Historis garansi barang (Fisik). Aktif setelah pembelian.
    *   `installation_warranties`: Historis garansi jasa (Pengerjaan). Aktif setelah instalasi selesai.
    *   `warranty_claims`: Pencatatan klaim garansi dari customer (Incident Tracking) untuk kedua jenis garansi.
    *   *Note*: Struktur ini masih dalam tahap pengembangan awal (Raw Structure).
*   **Referensi File**:
    *   *Schema Blueprint*: `docs/schema/schema.md` (Lines 789-858)
    *   *SQL Implementation*: `database/ddl/init_schema_part3.sql` (Lines 186-234)

---

## 3. Strategi Optimasi & Performa PostgreSQL 18+

### 3.1 Partisi Tabel (Skalabilitas)

*   **Tabel Target**: `orders`, `point_ledger`.
*   **Strategi**: Partisi berdasarkan `RANGE (created_at)`.

### 3.2 Deduplikasi & Indexing

*   **B-Tree Deduplication**: Efektif untuk kolom status yang repetitif.
*   **GIN Indexing**: Digunakan pada `product_variants(specs)` *[SQL Part 1, L161]* dan `reviews(photos)`.
*   **Partial Indexes**: `WHERE is_active = TRUE` *[SQL Part 1, L139]* untuk menjaga index tetap ramping.

### 3.3 Catatan Deployment

*   **Connection Pooling**: Gunakan **PgBouncer**.
*   **Volume**: Pisahkan volume untuk `pg_data` dan WAL logs.

> **CATATAN PENTING**: infrastruktur ERD ini adalah struktur yang belum final, masih dalam tahap pengembangan secara berkala.
