import type { Metadata } from 'next';
import OffPlanAnalyzerClient from './Client';

export const metadata: Metadata = {
  title: 'Off-Plan Analyzer — Allegiance Real Estate',
  description:
    'Score any Dubai off-plan unit on the 5 pillars: Location, Developer, Comps, Payment Plan, Price-per-sqft. Snowflake analysis in 60 seconds.',
};

export default function OffPlanAnalyzerPage() {
  return <OffPlanAnalyzerClient />;
}
