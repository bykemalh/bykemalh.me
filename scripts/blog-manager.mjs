#!/usr/bin/env node

/**
 * Blog Management Script
 * Prisma + PostgreSQL ile blog yönetimi için CLI aracı
 * 
 * Kullanım:
 *   npm run blog
 *   veya
 *   node scripts/blog-manager.mjs
 */

import { PrismaClient } from '@prisma/client';
import readline from 'readline';
import fs from 'fs';
import path from 'path';

const prisma = new PrismaClient();

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// Renklendirme için ANSI kodları
const colors = {
  reset: '\x1b[0m',
  bright: '\x1b[1m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  cyan: '\x1b[36m',
  red: '\x1b[31m',
};

function question(prompt) {
  return new Promise((resolve) => {
    rl.question(prompt, resolve);
  });
}

function log(message, color = colors.reset) {
  console.log(`${color}${message}${colors.reset}`);
}

function createSlug(title) {
  return title
    .toLowerCase()
    .replace(/ğ/g, 'g')
    .replace(/ü/g, 'u')
    .replace(/ş/g, 's')
    .replace(/ı/g, 'i')
    .replace(/ö/g, 'o')
    .replace(/ç/g, 'c')
    .replace(/İ/g, 'i')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
}

async function showMenu() {
  console.clear();
  log('\n╔════════════════════════════════════════╗', colors.cyan);
  log('║       🚀 BLOG YÖNETIM PANELİ 🚀      ║', colors.cyan);
  log('╚════════════════════════════════════════╝', colors.cyan);
  log('\n1. ➕ Yeni Blog Ekle', colors.green);
  log('2. 📝 Blog Güncelle', colors.yellow);
  log('3. 🗑️  Blog Sil', colors.red);
  log('4. 📋 Blog Listele', colors.blue);
  log('5. 🔍 Blog Detayını Gör', colors.cyan);
  log('6. ❌ Çıkış\n', colors.reset);

  const choice = await question('Seçiminiz (1-6): ');
  return choice;
}

async function listBlogs(showDetails = false) {
  const blogs = await prisma.blog.findMany({
    orderBy: [
      { featured: 'desc' },
      { createdAt: 'desc' }
    ]
  });

  if (blogs.length === 0) {
    log('\n❌ Henüz blog yok!', colors.red);
    return [];
  }

  log('\n╔════════════════════════════════════════════════════════════════╗', colors.blue);
  log('║                          BLOG LİSTESİ                          ║', colors.blue);
  log('╚════════════════════════════════════════════════════════════════╝', colors.blue);

  blogs.forEach((blog, index) => {
    const featuredIcon = blog.featured ? '⭐' : '  ';
    const publishedIcon = blog.published ? '✅' : '⏸️ ';
    log(`\n${index + 1}. ${featuredIcon} ${publishedIcon} [ID: ${blog.id}] ${blog.title}`, colors.bright);
    log(`   Slug: ${blog.slug}`, colors.cyan);
    log(`   Kategoriler: ${blog.categories}`, colors.yellow);
    log(`   Tarih: ${new Date(blog.createdAt).toLocaleDateString('tr-TR')}`, colors.reset);
    
    if (showDetails) {
      log(`   Keywords: ${blog.keywords}`, colors.reset);
      log(`   İçerik: ${blog.content.substring(0, 100)}...`, colors.reset);
    }
  });

  console.log('');
  return blogs;
}

async function addBlog() {
  console.clear();
  log('\n╔════════════════════════════════════════╗', colors.green);
  log('║         ➕ YENİ BLOG EKLE            ║', colors.green);
  log('╚════════════════════════════════════════╝', colors.green);

  const title = await question('\n📌 Blog Başlığı: ');
  if (!title.trim()) {
    log('❌ Başlık boş olamaz!', colors.red);
    return;
  }

  const suggestedSlug = createSlug(title);
  log(`\n💡 Önerilen slug: ${suggestedSlug}`, colors.cyan);
  const slugInput = await question('🔗 Slug (Enter = önerilen kullan): ');
  const slug = slugInput.trim() || suggestedSlug;

  log('\n📝 İçerik (Markdown):', colors.yellow);
  log('   - Dosyadan okumak için dosya yolunu gir', colors.reset);
  log('   - Manuel girmek için "manuel" yaz\n', colors.reset);

  const contentChoice = await question('Seçiminiz: ');
  let content = '';

  if (contentChoice.toLowerCase() === 'manuel') {
    log('\n💡 İçeriği girin (bitirmek için boş satırda ".done" yazın):\n', colors.cyan);
    const lines = [];
    while (true) {
      const line = await question('');
      if (line === '.done') break;
      lines.push(line);
    }
    content = lines.join('\n');
  } else {
    try {
      const filePath = path.resolve(contentChoice.trim());
      content = fs.readFileSync(filePath, 'utf-8');
      log(`✅ İçerik dosyadan okundu: ${filePath}`, colors.green);
    } catch (error) {
      log(`❌ Dosya okunamadı: ${error.message}`, colors.red);
      return;
    }
  }

  const keywords = await question('\n🏷️  SEO Keywords (virgülle ayır): ');
  const categories = await question('📂 Kategoriler (virgülle ayır): ');
  const featured = (await question('⭐ Öne çıkarılsın mı? (e/h): ')).toLowerCase() === 'e';
  const published = (await question('✅ Yayınlansın mı? (e/h): ')).toLowerCase() === 'e';

  try {
    const blog = await prisma.blog.create({
      data: {
        title: title.trim(),
        slug: slug.trim(),
        content: content.trim(),
        keywords: keywords.trim(),
        categories: categories.trim(),
        featured,
        published
      }
    });

    log(`\n✅ Blog başarıyla oluşturuldu! ID: ${blog.id}`, colors.green);
    log(`🔗 URL: /blog/${blog.slug}`, colors.cyan);
  } catch (error) {
    if (error.code === 'P2002') {
      log('\n❌ Bu slug zaten kullanılıyor! Farklı bir slug deneyin.', colors.red);
    } else {
      log(`\n❌ Hata: ${error.message}`, colors.red);
    }
  }
}

async function updateBlog() {
  console.clear();
  log('\n╔════════════════════════════════════════╗', colors.yellow);
  log('║         📝 BLOG GÜNCELLE              ║', colors.yellow);
  log('╚════════════════════════════════════════╝', colors.yellow);

  const blogs = await listBlogs();
  if (blogs.length === 0) return;

  const blogId = parseInt(await question('\n🔢 Güncellenecek blog ID: '));
  const blog = await prisma.blog.findUnique({ where: { id: blogId } });

  if (!blog) {
    log('\n❌ Blog bulunamadı!', colors.red);
    return;
  }

  log(`\n📌 Mevcut: ${blog.title}`, colors.cyan);
  const title = await question('Yeni başlık (Enter = değiştirme): ');

  log(`\n🔗 Mevcut: ${blog.slug}`, colors.cyan);
  const slug = await question('Yeni slug (Enter = değiştirme): ');

  log('\n📝 İçerik güncellensin mi?', colors.yellow);
  const updateContent = (await question('   (e/h): ')).toLowerCase() === 'e';
  let content = blog.content;

  if (updateContent) {
    log('\n   - Dosyadan okumak için dosya yolunu gir', colors.reset);
    log('   - Manuel girmek için "manuel" yaz\n', colors.reset);
    const contentChoice = await question('Seçiminiz: ');

    if (contentChoice.toLowerCase() === 'manuel') {
      log('\n💡 İçeriği girin (bitirmek için boş satırda ".done" yazın):\n', colors.cyan);
      const lines = [];
      while (true) {
        const line = await question('');
        if (line === '.done') break;
        lines.push(line);
      }
      content = lines.join('\n');
    } else {
      try {
        const filePath = path.resolve(contentChoice.trim());
        content = fs.readFileSync(filePath, 'utf-8');
        log(`✅ İçerik dosyadan okundu`, colors.green);
      } catch (error) {
        log(`❌ Dosya okunamadı: ${error.message}`, colors.red);
        content = blog.content;
      }
    }
  }

  log(`\n🏷️  Mevcut: ${blog.keywords}`, colors.cyan);
  const keywords = await question('Yeni keywords (Enter = değiştirme): ');

  log(`\n📂 Mevcut: ${blog.categories}`, colors.cyan);
  const categories = await question('Yeni kategoriler (Enter = değiştirme): ');

  log(`\n⭐ Mevcut: ${blog.featured ? 'Evet' : 'Hayır'}`, colors.cyan);
  const featuredInput = await question('Öne çıkarılsın mı? (e/h/Enter=değiştirme): ');
  const featured = featuredInput === 'e' ? true : featuredInput === 'h' ? false : blog.featured;

  log(`\n✅ Mevcut: ${blog.published ? 'Yayında' : 'Taslak'}`, colors.cyan);
  const publishedInput = await question('Yayınlansın mı? (e/h/Enter=değiştirme): ');
  const published = publishedInput === 'e' ? true : publishedInput === 'h' ? false : blog.published;

  try {
    const updated = await prisma.blog.update({
      where: { id: blogId },
      data: {
        title: title.trim() || blog.title,
        slug: slug.trim() || blog.slug,
        content: content.trim(),
        keywords: keywords.trim() || blog.keywords,
        categories: categories.trim() || blog.categories,
        featured,
        published
      }
    });

    log(`\n✅ Blog başarıyla güncellendi!`, colors.green);
    log(`🔗 URL: /blog/${updated.slug}`, colors.cyan);
  } catch (error) {
    if (error.code === 'P2002') {
      log('\n❌ Bu slug zaten kullanılıyor!', colors.red);
    } else {
      log(`\n❌ Hata: ${error.message}`, colors.red);
    }
  }
}

async function deleteBlog() {
  console.clear();
  log('\n╔════════════════════════════════════════╗', colors.red);
  log('║          🗑️  BLOG SİL                ║', colors.red);
  log('╚════════════════════════════════════════╝', colors.red);

  const blogs = await listBlogs();
  if (blogs.length === 0) return;

  const blogId = parseInt(await question('\n🔢 Silinecek blog ID: '));
  const blog = await prisma.blog.findUnique({ where: { id: blogId } });

  if (!blog) {
    log('\n❌ Blog bulunamadı!', colors.red);
    return;
  }

  log(`\n⚠️  UYARI: "${blog.title}" kalıcı olarak silinecek!`, colors.red);
  const confirm = await question('Emin misiniz? (EVET yazın): ');

  if (confirm === 'EVET') {
    await prisma.blog.delete({ where: { id: blogId } });
    log('\n✅ Blog başarıyla silindi!', colors.green);
  } else {
    log('\n❌ İşlem iptal edildi.', colors.yellow);
  }
}

async function viewBlogDetail() {
  console.clear();
  log('\n╔════════════════════════════════════════╗', colors.cyan);
  log('║       🔍 BLOG DETAYI GÖRÜNTÜLE       ║', colors.cyan);
  log('╚════════════════════════════════════════╝', colors.cyan);

  const blogs = await listBlogs();
  if (blogs.length === 0) return;

  const blogId = parseInt(await question('\n🔢 Blog ID: '));
  const blog = await prisma.blog.findUnique({ where: { id: blogId } });

  if (!blog) {
    log('\n❌ Blog bulunamadı!', colors.red);
    return;
  }

  log('\n╔════════════════════════════════════════════════════════════════╗', colors.bright);
  log(`  ${blog.title}`, colors.bright);
  log('╚════════════════════════════════════════════════════════════════╝', colors.bright);
  log(`\n🆔 ID: ${blog.id}`, colors.reset);
  log(`🔗 Slug: ${blog.slug}`, colors.cyan);
  log(`📂 Kategoriler: ${blog.categories}`, colors.yellow);
  log(`🏷️  Keywords: ${blog.keywords}`, colors.yellow);
  log(`⭐ Featured: ${blog.featured ? 'Evet' : 'Hayır'}`, colors.reset);
  log(`✅ Status: ${blog.published ? 'Yayında' : 'Taslak'}`, colors.reset);
  log(`📅 Oluşturulma: ${new Date(blog.createdAt).toLocaleString('tr-TR')}`, colors.reset);
  log(`📅 Güncellenme: ${new Date(blog.updatedAt).toLocaleString('tr-TR')}`, colors.reset);
  log(`\n📝 İçerik:\n`, colors.bright);
  log('─'.repeat(64), colors.reset);
  log(blog.content.substring(0, 500), colors.reset);
  if (blog.content.length > 500) {
    log('\n... (devamı var)', colors.yellow);
  }
  log('\n' + '─'.repeat(64), colors.reset);
}

async function main() {
  log('\n🚀 Blog Yönetim Sistemi başlatıldı...', colors.green);

  while (true) {
    const choice = await showMenu();

    switch (choice) {
      case '1':
        await addBlog();
        break;
      case '2':
        await updateBlog();
        break;
      case '3':
        await deleteBlog();
        break;
      case '4':
        await listBlogs(true);
        break;
      case '5':
        await viewBlogDetail();
        break;
      case '6':
        log('\n👋 Görüşmek üzere!\n', colors.cyan);
        await prisma.$disconnect();
        rl.close();
        process.exit(0);
      default:
        log('\n❌ Geçersiz seçim!', colors.red);
    }

    await question('\n⏎ Devam etmek için Enter\'a basın...');
  }
}

// Error handling
process.on('SIGINT', async () => {
  log('\n\n👋 Çıkış yapılıyor...', colors.yellow);
  await prisma.$disconnect();
  rl.close();
  process.exit(0);
});

main().catch(async (error) => {
  log(`\n❌ HATA: ${error.message}`, colors.red);
  await prisma.$disconnect();
  rl.close();
  process.exit(1);
});
