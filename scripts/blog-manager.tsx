#!/usr/bin/env node

import { PrismaClient } from "~/generated/prisma-node/client";
import { Box, render, Text, useApp, useInput, usePaste } from "ink";
import React, { useCallback, useEffect, useMemo, useState } from "react";

const prisma = new PrismaClient();
type Locale = "tr" | "en";
type Field = "title" | "slug" | "keywords" | "categories" | "content";
type Summary = { id: number; title: string; locale: Locale; slug: string; published: boolean; updatedAt: Date };
type Draft = Record<Field, string> & { blogId?: number; locale: Locale; published: boolean; featured: boolean };

const fields: Field[] = ["title", "slug", "keywords", "categories", "content"];
const labels: Record<Field, string> = { title: "Başlık", slug: "Slug", keywords: "Anahtar kelimeler", categories: "Kategoriler", content: "Markdown içerik" };
const emptyDraft = (locale: Locale = "tr"): Draft => ({ locale, title: "", slug: "", keywords: "", categories: "", content: "", published: false, featured: false });

function slugify(value: string) {
  return value.toLocaleLowerCase("tr-TR").normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/ı/g, "i").replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}

function BlogManager() {
  const { exit } = useApp();
  const [items, setItems] = useState<Summary[]>([]);
  const [selected, setSelected] = useState(0);
  const [draft, setDraft] = useState<Draft>(emptyDraft());
  const [editing, setEditing] = useState(false);
  const [field, setField] = useState<Field>("title");
  const [status, setStatus] = useState("Yükleniyor…");
  const [saving, setSaving] = useState(false);

  const refresh = useCallback(async () => {
    const translations = await prisma.blogTranslation.findMany({
      select: { blogId: true, locale: true, title: true, slug: true, published: true, updatedAt: true },
      orderBy: { updatedAt: "desc" },
    });
    setItems(translations.filter((item): item is typeof item & { locale: Locale } => item.locale === "tr" || item.locale === "en").map((item) => ({ id: item.blogId, locale: item.locale, title: item.title, slug: item.slug, published: item.published, updatedAt: item.updatedAt })));
    setSelected((current) => Math.min(current, Math.max(0, translations.length - 1)));
    setStatus(`${translations.length} çeviri yüklendi`);
  }, []);

  useEffect(() => { void refresh().catch((error: Error) => setStatus(`Veritabanı hatası: ${error.message}`)); }, [refresh]);

  const open = useCallback(async (summary: Summary) => {
    const translation = await prisma.blogTranslation.findUnique({ where: { blogId_locale: { blogId: summary.id, locale: summary.locale } }, include: { blog: { select: { featured: true } } } });
    if (!translation) return;
    setDraft({ blogId: summary.id, locale: summary.locale, title: translation.title, slug: translation.slug, content: translation.content, keywords: translation.keywords, categories: translation.categories, published: translation.published, featured: translation.blog.featured });
    setField("title"); setEditing(true); setStatus("Düzenleme açık — Ctrl+S kaydeder");
  }, []);

  const save = useCallback(async () => {
    if (!draft.title.trim() || !draft.slug.trim() || !draft.content.trim()) { setStatus("Başlık, slug ve içerik zorunludur."); return; }
    setSaving(true);
    try {
      const now = new Date();
      if (draft.blogId) {
        await prisma.$transaction([
          prisma.blog.update({ where: { id: draft.blogId }, data: { featured: draft.featured } }),
          prisma.blogTranslation.upsert({ where: { blogId_locale: { blogId: draft.blogId, locale: draft.locale } }, create: { blogId: draft.blogId, locale: draft.locale, title: draft.title.trim(), slug: draft.slug.trim(), content: draft.content, keywords: draft.keywords.trim(), categories: draft.categories.trim(), published: draft.published, publishedAt: draft.published ? now : null }, update: { title: draft.title.trim(), slug: draft.slug.trim(), content: draft.content, keywords: draft.keywords.trim(), categories: draft.categories.trim(), published: draft.published, publishedAt: draft.published ? now : null } }),
        ]);
      } else {
        await prisma.blog.create({ data: { title: draft.title.trim(), slug: `legacy-${Date.now()}`, content: "", keywords: "", categories: "", featured: draft.featured, published: false, translations: { create: { locale: draft.locale, title: draft.title.trim(), slug: draft.slug.trim(), content: draft.content, keywords: draft.keywords.trim(), categories: draft.categories.trim(), published: draft.published, publishedAt: draft.published ? now : null } } } });
      }
      setStatus("Kaydedildi."); setEditing(false); await refresh();
    } catch (error) { setStatus(`Kaydedilemedi: ${error instanceof Error ? error.message : String(error)}`); }
    finally { setSaving(false); }
  }, [draft, refresh]);

  usePaste((text) => {
    if (editing && field === "content") setDraft((current) => ({ ...current, content: current.content + text.replace(/\r\n/g, "\n") }));
  }, { isActive: editing && field === "content" });

  useInput((input, key) => {
    if (key.ctrl && input === "c") { exit(); return; }
    if (!editing) {
      if (key.downArrow || input === "j") setSelected((current) => Math.min(items.length - 1, current + 1));
      else if (key.upArrow || input === "k") setSelected((current) => Math.max(0, current - 1));
      else if (key.return && items[selected]) void open(items[selected]).catch((error: Error) => setStatus(error.message));
      else if (input === "n") { setDraft(emptyDraft()); setField("title"); setEditing(true); setStatus("Yeni taslak — içerik alanında terminale doğrudan yapıştırabilirsiniz."); }
      else if (input === "r") void refresh().catch((error: Error) => setStatus(error.message));
      return;
    }
    if (key.ctrl && input === "s") { void save(); return; }
    if (key.escape) { setEditing(false); setStatus("Düzenleme iptal edildi; kayıt yapılmadı."); return; }
    if (key.tab) { setField((current) => fields[(fields.indexOf(current) + 1) % fields.length]); return; }
    if (key.ctrl && input === "p") { setDraft((current) => ({ ...current, published: !current.published })); return; }
    if (key.ctrl && input === "f") { setDraft((current) => ({ ...current, featured: !current.featured })); return; }
    if (key.ctrl && input === "l") { setDraft((current) => ({ ...current, locale: current.locale === "tr" ? "en" : "tr" })); return; }
    if (key.backspace || key.delete) { setDraft((current) => ({ ...current, [field]: current[field].slice(0, -1) })); return; }
    if (key.return && field === "content") { setDraft((current) => ({ ...current, content: `${current.content}\n` })); return; }
    if (!key.ctrl && !key.meta && input) setDraft((current) => {
      const value = current[field] + input;
      return { ...current, [field]: field === "title" && !current.slug ? current[field] + input : value, ...(field === "title" && !current.slug ? { slug: slugify(value) } : {}) };
    });
  });

  const preview = useMemo(() => draft.content.split("\n").slice(-8).join("\n") || "İçerik henüz boş.", [draft.content]);
  if (!editing) return <Box flexDirection="column" padding={1}><Text bold color="cyan">Blog Studio</Text><Text dimColor>↑↓/j/k seç • Enter düzenle • n yeni • r yenile • Ctrl+C çık</Text><Box marginTop={1} flexDirection="column">{items.map((item, index) => <Text key={`${item.id}-${item.locale}`} color={index === selected ? "green" : undefined}>{index === selected ? "› " : "  "}[{item.locale.toUpperCase()}] {item.published ? "●" : "○"} {item.title}  /{item.slug}</Text>)}</Box><Box marginTop={1}><Text color="yellow">{status}</Text></Box></Box>;
  return <Box flexDirection="column" padding={1}><Text bold color="cyan">{draft.blogId ? "Çeviriyi düzenle" : "Yeni blog"}</Text><Text dimColor>Tab alan değiştir • içerikte Enter yeni satır • doğrudan yapıştır • Ctrl+S kaydet • Ctrl+P yayın • Ctrl+L dil • Esc iptal</Text><Box marginTop={1} flexDirection="column">{fields.filter((item) => item !== "content").map((item) => <Text key={item} color={field === item ? "green" : undefined}>{field === item ? "› " : "  "}{labels[item]}: {draft[item] || "_"}</Text>)}</Box><Box marginTop={1} flexDirection="column"><Text color={field === "content" ? "green" : undefined}>{field === "content" ? "› " : "  "}{labels.content} ({draft.content.length} karakter)</Text><Text>{preview}</Text></Box><Box marginTop={1}><Text>Durum: {draft.published ? "Yayında" : "Taslak"} • Dil: {draft.locale.toUpperCase()} • Öne çıkan: {draft.featured ? "Evet" : "Hayır"}</Text></Box><Box marginTop={1}><Text color={saving ? "yellow" : "green"}>{saving ? "Kaydediliyor…" : status}</Text></Box></Box>;
}

const app = render(<BlogManager />);
app.waitUntilExit().finally(() => prisma.$disconnect());
