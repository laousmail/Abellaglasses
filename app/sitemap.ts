import type { MetadataRoute } from 'next';
import { SITE } from '@/lib/site';

const PATHS = ['', '/services', '/verres', '/prix-assurances', '/equipe', '/faq', '/rendez-vous', '/confidentialite'];

export default function sitemap(): MetadataRoute.Sitemap {
  return PATHS.map((p) => ({ url: SITE.url + p, changeFrequency: 'monthly', priority: p === '' ? 1 : 0.7 }));
}
