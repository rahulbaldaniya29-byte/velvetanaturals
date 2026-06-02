// TypeScript may complain about side-effect CSS imports if no declaration is present.
// @ts-ignore: Allow importing CSS modules/globals in Next.js layout
import './globals.css'

import Script from 'next/script'
import type { Metadata } from 'next';
export const metadata: Metadata = {
  title: 'Velveta Naturals | Premium Ayurvedic Wellness',

  description:
    'Discover premium Ayurvedic wellness products crafted for modern healthy lifestyles. Natural luxury for complete wellness.',

  keywords: [
    'Ayurvedic Products',
    'Velveta Naturals',
    'Herbal Wellness',
    'Natural Supplements',
    'Premium Wellness',
  ],

  openGraph: {
    title: 'Velveta Naturals',
    description:
      'Premium Ayurvedic wellness products crafted with natural ingredients.',
    url: 'https://velvetanaturals.vercel.app',
    siteName: 'Velveta Naturals',
    type: 'website',
  },

  robots: {
    index: true,
    follow: true,
  },
    verification: {
    google: 'GjX8DLKN1c6wbi4nqfVXuy9MNKKU82ZTPmjemQAgBMU',
  },
};
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">

      <body>

        {children}
  
<Script
  src="https://checkout.razorpay.com/v1/checkout.js"
  strategy="beforeInteractive"
/>

      </body>

    </html>
  )
}