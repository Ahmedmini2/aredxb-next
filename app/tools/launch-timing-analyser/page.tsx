import type { Metadata } from 'next';
import LaunchTimingClient from './Client';

export const metadata: Metadata = {
  title: 'Launch Timing Analyser — Allegiance Real Estate',
  description:
    'EOI, day-one launch or wait for resale — pinpointed from 318 prior Dubai off-plan launches across tier-1 developers.',
};

export default function LaunchTimingPage() {
  return <LaunchTimingClient />;
}
