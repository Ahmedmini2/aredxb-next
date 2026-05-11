import type { Metadata } from 'next';
import PropertyFitClient from './Client';

export const metadata: Metadata = {
  title: 'Property Fit — Allegiance Real Estate',
  description:
    'Paste a Bayut or PropertyFinder link. Get a Buy / Watch / Skip verdict in 90 seconds, weighted to your investment thesis.',
};

export default function PropertyFitPage() {
  return <PropertyFitClient />;
}
