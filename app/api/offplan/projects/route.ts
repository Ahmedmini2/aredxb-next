import { NextResponse } from 'next/server';
import { getProjectsSummary } from '@/lib/offplan';

export const dynamic = 'force-dynamic';

export async function GET(req: Request) {
  try {
    const summary = await getProjectsSummary();
    const url = new URL(req.url);
    const limit = Math.min(parseInt(url.searchParams.get('limit') || '0', 10) || summary.length, 2000);
    const offset = parseInt(url.searchParams.get('offset') || '0', 10) || 0;
    return NextResponse.json({
      total: summary.length,
      offset,
      limit,
      projects: summary.slice(offset, offset + limit),
    });
  } catch (e: any) {
    console.error('[offplan/projects] failed:', e?.message);
    return NextResponse.json({ error: 'Failed to fetch projects' }, { status: 500 });
  }
}
