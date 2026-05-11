import { NextResponse } from 'next/server';
import { getProjectsSummary } from '@/lib/offplan';

export const dynamic = 'force-dynamic';

export async function GET(req: Request) {
  try {
    const summary = await getProjectsSummary();
    const withImage = summary.filter((p) => p.image);
    const url = new URL(req.url);
    const limit = parseInt(url.searchParams.get('limit') || '3', 10) || 3;
    return NextResponse.json({ projects: withImage.slice(0, limit) });
  } catch (e: any) {
    return NextResponse.json({ error: 'Failed to fetch featured', projects: [] }, { status: 500 });
  }
}
