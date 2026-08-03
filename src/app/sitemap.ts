import type { MetadataRoute } from 'next';
import { siteConfig } from '@/lib/metadata';

export default function sitemap(): MetadataRoute.Sitemap {
  const base = siteConfig.url;
  const now = new Date();

  return [
    {
      url: base,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 1,
    },
    {
      url: `${base}/liege-react-developer`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${base}/belgium-blockchain-developer`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
  ];
}
