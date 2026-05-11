import type { Metadata } from 'next';
import ExitStrategyClient from './Client';

export const metadata: Metadata = {
  title: 'Exit Strategy — Allegiance Real Estate',
  description:
    'When to flip, refinance or hold. Model 3 Dubai exit scenarios against DLD comparables, target IRR and projected appreciation.',
};

export default function ExitStrategyPage() {
  return <ExitStrategyClient />;
}
