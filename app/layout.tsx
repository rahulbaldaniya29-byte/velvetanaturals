// TypeScript may complain about side-effect CSS imports if no declaration is present.
// @ts-ignore: Allow importing CSS modules/globals in Next.js layout
import './globals.css'
import Script from 'next/script'
export const metadata = {
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

        <script src="https://checkout.razorpay.com/v1/checkout.js"></script>

      </body>

    </html>
  )
}