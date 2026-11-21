import type { Metadata } from 'next';
import DealsClient from './DealsClient';

export const metadata: Metadata = {
  title: 'Live Miniature & Rolife Black Friday Deals & Promo Codes (2026) | CraftsAndKits',
  description:
    'Verified 2026 Black Friday discount codes for Rolife, ROKR, and miniature kits. Copy BFCM20 (20% off) and BFCM25 (25% off $120+), compare Amazon deals, and grab our $9.99 blueprint flash sale.',
  alternates: {
    canonical: 'https://www.craftsandkits.com/deals',
  },
  openGraph: {
    title: '2026 Black Friday Miniature & Rolife Promo Codes | CraftsAndKits',
    description:
      'Copy verified Rolife & ROKR Black Friday discount codes (20%–25% off) and shop live 2026 kit deals.',
    url: 'https://www.craftsandkits.com/deals',
    type: 'website',
  },
};

export default function DealsPage() {
  return <DealsClient />;
}
