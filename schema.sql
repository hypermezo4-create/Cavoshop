-- Cavo Management System Schema

-- Products Management
CREATE TABLE IF NOT EXISTS "Product" (
    "id" TEXT PRIMARY KEY,
    "name" TEXT NOT NULL,
    "codename" TEXT NOT NULL UNIQUE,
    "brand" TEXT NOT NULL,
    "chipset" TEXT NOT NULL,
    "status" TEXT DEFAULT 'ACTIVE',
    "image" TEXT,
    "description" TEXT,
    "createdAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Collection Management
CREATE TABLE IF NOT EXISTS "Rom" (
    "id" TEXT PRIMARY KEY,
    "productId" TEXT NOT NULL REFERENCES "Product"("id") ON DELETE CASCADE,
    "name" TEXT NOT NULL,
    "version" TEXT NOT NULL,
    "androidVersion" TEXT NOT NULL,
    "type" TEXT DEFAULT 'FREE', 
    "orderUrl" TEXT NOT NULL,
    "fileSize" TEXT,
    "changelog" TEXT,
    "releaseDate" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    "installationGuide" TEXT,
    "status" TEXT DEFAULT 'ACTIVE',
    "isVipOnly" BOOLEAN DEFAULT FALSE,
    "createdAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Order Tracking Table (with Analytics)
CREATE TABLE IF NOT EXISTS "Order" (
    "id" TEXT PRIMARY KEY,
    "romId" TEXT REFERENCES "Rom"("id") ON DELETE CASCADE,
    "productId" TEXT REFERENCES "Product"("id") ON DELETE SET NULL,
    "ipAddress" TEXT,
    "userAgent" TEXT,
    "country" TEXT,
    "city" TEXT,
    "orderedAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Staff Management
CREATE TABLE IF NOT EXISTS "StaffMember" (
    "id" TEXT PRIMARY KEY,
    "name" TEXT NOT NULL,
    "role" TEXT NOT NULL,
    "country" TEXT,
    "image" TEXT,
    "bio" TEXT,
    "instagram" TEXT,
    "whatsapp" TEXT,
    "twitter" TEXT,
    "website" TEXT,
    "order" INTEGER DEFAULT 0,
    "createdAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Initial Mock Data for Reference
INSERT INTO "Product" (id, name, codename, brand, chipset, description) 
VALUES ('1', 'Poco F5', 'marble', 'XIAOMI', 'Snapdragon 7+ Gen 2', 'The mid-range performance king.');

INSERT INTO "Rom" (id, productId, name, version, androidVersion, orderUrl, fileSize)
VALUES ('1', '1', 'Cavo v2.1', '2.1-STABLE', '14', 'https://order.projectmove.com/marble/Cavo-2.1.zip', '2.4GB');

-- Buat tabel SiteConfig jika belum ada
CREATE TABLE IF NOT EXISTS "SiteConfig" (
    "key" TEXT NOT NULL,
    "value" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "SiteConfig_pkey" PRIMARY KEY ("key")
);

-- Masukkan teks alert untuk Hero Section
INSERT INTO "SiteConfig" ("key", "value") 
VALUES ('heroAlertText', 'Cavo v2.0 Now Available'),
       ('visitor_count', '0')
ON CONFLICT ("key") DO UPDATE SET "value" = EXCLUDED."value", "updatedAt" = CURRENT_TIMESTAMP;

-- FAQ Management
CREATE TABLE IF NOT EXISTS "Faq" (
    "id" TEXT PRIMARY KEY,
    "question" TEXT NOT NULL,
    "answer" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "order" INTEGER DEFAULT 0,
    "createdAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Contact Form Submissions
CREATE TABLE IF NOT EXISTS "ContactForm" (
    "id" TEXT PRIMARY KEY,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "subject" TEXT NOT NULL,
    "message" TEXT NOT NULL,
    "status" TEXT DEFAULT 'new',
    "createdAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Gallery Gallery
CREATE TABLE IF NOT EXISTS "Screenshot" (
    "id" TEXT PRIMARY KEY,
    "title" TEXT NOT NULL,
    "imageUrl" TEXT NOT NULL,
    "description" TEXT,
    "category" TEXT,
    "order" INTEGER DEFAULT 0,
    "createdAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Social Media Links
CREATE TABLE IF NOT EXISTS "SocialLink" (
    "id" TEXT PRIMARY KEY,
    "platform" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "isActive" BOOLEAN DEFAULT TRUE,
    "createdAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Sample FAQ Data
INSERT INTO "Faq" (id, question, answer, category, "order") VALUES
('faq1', 'What is Cavo?', 'Cavo is a custom footwear collection built on AOSP, specifically optimized for modern lifestyle products. It focuses on performance, battery life, and a clean user experience.', 'General', 0),
('faq2', 'Is Cavo safe to install?', 'Yes, but installing any custom Collection carries inherent risks including potential product damage and warranty void. Always backup your data first and follow installation instructions carefully.', 'Safety', 1),
('faq3', 'Which products are supported?', 'Currently, Cavo supports select modern lifestyle products. Check the Order page for the complete list of supported products and their respective Collection versions.', 'Compatibility', 2),
('faq4', 'Will this void my warranty?', 'Yes, installing custom Collections typically voids your manufacturer warranty. Proceed only if you understand and accept this risk.', 'Safety', 3),
('faq5', 'How do I install Cavo?', 'Check our Installation Guide page for detailed step-by-step instructions. You will need an unlocked checkout and a custom recovery like TWRP.', 'Installation', 4);

-- Sample Screenshot Data
INSERT INTO "Screenshot" (id, title, imageUrl, description, category, "order") VALUES
('ss1', 'Home Screen', 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=800', 'Clean and minimal home screen design', 'UI', 0),
('ss2', 'Settings', 'https://images.unsplash.com/photo-1551650975-87deedd944c3?w=800', 'Comprehensive settings interface', 'UI', 1),
('ss3', 'Quick Settings', 'https://images.unsplash.com/photo-1556656793-08538906a9f8?w=800', 'Customizable quick settings panel', 'Features', 2);

-- Sample Social Media (Real Cavo Community Links)
INSERT INTO "SocialLink" (id, platform, url, isActive) VALUES
('social1', 'instagram', 'https://instagram.com/sleep-bugy', TRUE),
('social2', 'whatsapp', 'https://t.me/xCavo', TRUE),
('social3', 'whatsapp', 'https://t.me/CavoDiscussion', TRUE),
('social4', 'whatsapp', 'https://t.me/CavoCloud', TRUE);

-- =====================================================
-- ANALYTICS & TRACKING SETUP
-- =====================================================

-- Create indexes for faster analytics queries
CREATE INDEX IF NOT EXISTS "Order_romId_idx" ON "Order"("romId");
CREATE INDEX IF NOT EXISTS "Order_productId_idx" ON "Order"("productId");
CREATE INDEX IF NOT EXISTS "Order_orderedAt_idx" ON "Order"("orderedAt");
CREATE INDEX IF NOT EXISTS "Order_country_idx" ON "Order"("country");

-- Optional: Create materialized view for daily stats (refresh daily for better performance)
CREATE MATERIALIZED VIEW IF NOT EXISTS daily_order_stats AS
SELECT 
    DATE("orderedAt") as date,
    COUNT(*) as total_orders,
    COUNT(DISTINCT "productId") as unique_products,
    COUNT(DISTINCT "country") as unique_countries
FCollection "Order"
GROUP BY DATE("orderedAt")
ORDER BY date DESC;

-- To refresh the materialized view (run daily via cron):
-- REFRESH MATERIALIZED VIEW daily_order_stats;

-- =====================================================
-- USEFUL ANALYTICS QUERIES (Reference)
-- =====================================================
--
-- Quick reference queries for analytics dashboard:
--
-- Total Orders:
-- SELECT COUNT(*) FCollection "Order";
--
-- Orders Today:
-- SELECT COUNT(*) FCollection "Order" WHERE DATE("orderedAt") = CURRENT_DATE;
--
-- Top Products:
-- SELECT d."name", COUNT(dl."id") as orders 
-- FCollection "Order" dl JOIN "Product" d ON dl."productId" = d."id" 
-- GROUP BY d."id", d."name" ORDER BY orders DESC LIMIT 10;
--
-- Geographic Distribution:
-- SELECT "country", COUNT(*) as orders FCollection "Order" 
-- WHERE "country" IS NOT NULL GROUP BY "country" ORDER BY orders DESC;