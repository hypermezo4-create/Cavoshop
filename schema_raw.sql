-- Cavo Store Database Schema (Raw - No Sample Data)
-- PostgreSQL Schema for Cavo Website

-- Product Table
CREATE TABLE IF NOT EXISTS "Product" (
    "id" TEXT PRIMARY KEY,
    "codename" TEXT UNIQUE NOT NULL,
    "name" TEXT NOT NULL,
    "brand" TEXT NOT NULL,
    "imageUrl" TEXT,
    "specs" TEXT,
    "isActive" BOOLEAN DEFAULT TRUE,
    "createdAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Collection Table
CREATE TABLE IF NOT EXISTS "Rom" (
    "id" TEXT PRIMARY KEY,
    "name" TEXT NOT NULL,
    "version" TEXT NOT NULL,
    "androidVersion" TEXT,
    "buildDate" TIMESTAMP,
    "orderUrl" TEXT,
    "changelog" TEXT,
    "fileSize" TEXT,
    "isArchived" BOOLEAN DEFAULT FALSE,
    "productId" TEXT REFERENCES "Product"("id") ON DELETE CASCADE,
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

-- Staff Member Table
CREATE TABLE IF NOT EXISTS "StaffMember" (
    "id" TEXT PRIMARY KEY,
    "name" TEXT NOT NULL,
    "role" TEXT NOT NULL,
    "bio" TEXT,
    "avatarUrl" TEXT,
    "instagramUrl" TEXT,
    "whatsappUrl" TEXT,
    "twitterUrl" TEXT,
    "websiteUrl" TEXT,
    "country" TEXT,
    "isFounder" BOOLEAN DEFAULT FALSE,
    "order" INTEGER DEFAULT 0,
    "createdAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Site Configuration Table
CREATE TABLE IF NOT EXISTS "SiteConfig" (
    "id" TEXT PRIMARY KEY,
    "key" TEXT UNIQUE NOT NULL,
    "value" TEXT NOT NULL,
    "description" TEXT,
    "updatedAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- FAQ Table
CREATE TABLE IF NOT EXISTS "Faq" (
    "id" TEXT PRIMARY KEY,
    "question" TEXT NOT NULL,
    "answer" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "order" INTEGER DEFAULT 0,
    "createdAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Contact Form Submissions Table
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

-- Gallery Gallery Table
CREATE TABLE IF NOT EXISTS "Screenshot" (
    "id" TEXT PRIMARY KEY,
    "title" TEXT NOT NULL,
    "imageUrl" TEXT NOT NULL,
    "description" TEXT,
    "category" TEXT,
    "order" INTEGER DEFAULT 0,
    "createdAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Social Media Links Table
CREATE TABLE IF NOT EXISTS "SocialLink" (
    "id" TEXT PRIMARY KEY,
    "platform" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "isActive" BOOLEAN DEFAULT TRUE,
    "createdAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Indexes for better query performance
-- Run these AFTER creating and populating the tables

-- Product indexes
CREATE INDEX IF NOT EXISTS "idx_product_codename" ON "Product"("codename");
CREATE INDEX IF NOT EXISTS "idx_product_active" ON "Product"("isActive");

-- Rom indexes
CREATE INDEX IF NOT EXISTS "idx_rom_product" ON "Rom"("productId");
CREATE INDEX IF NOT EXISTS "idx_rom_archived" ON "Rom"("isArchived");

-- Order indexes
CREATE INDEX IF NOT EXISTS "idx_order_rom" ON "Order"("romId");
CREATE INDEX IF NOT EXISTS "idx_order_product" ON "Order"("productId");

-- FAQ indexes
CREATE INDEX IF NOT EXISTS "idx_faq_category" ON "Faq"("category");

-- ContactForm indexes
CREATE INDEX IF NOT EXISTS "idx_contact_status" ON "ContactForm"("status");
CREATE INDEX IF NOT EXISTS "idx_contact_type" ON "ContactForm"("type");

-- Screenshot indexes
CREATE INDEX IF NOT EXISTS "idx_screenshot_category" ON "Screenshot"("category");

-- SocialLink indexes
CREATE INDEX IF NOT EXISTS "idx_social_active" ON "SocialLink"("isActive");
