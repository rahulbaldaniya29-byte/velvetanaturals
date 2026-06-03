import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: 'https://velvetanaturals.vercel.app',
      lastModified: new Date(),
    },
    {
      url: 'https://velvetanaturals.vercel.app/cart',
      lastModified: new Date(),
    },
    {
      url: 'https://velvetanaturals.vercel.app/orders',
      lastModified: new Date(),
    },
  ];
}