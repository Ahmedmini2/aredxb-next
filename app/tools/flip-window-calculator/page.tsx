import type { Metadata } from 'next';
import FlipWindowClient from './Client';

export const metadata: Metadata = {
  title: 'Flip Window Calculator — Allegiance Real Estate',
  description:
    'Pinpoint the optimal months to flip your off-plan unit. Tower velocity, developer history and 36-month probability curves modeled.',
};

export default function FlipWindowPage() {
  return <FlipWindowClient />;
}
