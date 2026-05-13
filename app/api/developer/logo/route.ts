import { NextResponse } from 'next/server';
import { getDeveloperLogo } from '@/lib/offplan';

// Resolves a developer's logo from the assets-allegiance S3 bucket.
// Tries several path conventions (see lib/offplan.ts buildS3Index).
//
// Query params:
//   dev — developer name (e.g. "DAMAC", "Emaar Properties")
//
// Response:
//   { url: string | null }

export const dynamic = 'force-dynamic';

export async function GET(req: Request) {
  const url = new URL(req.url);
  const dev = (url.searchParams.get('dev') || '').trim();
  if (!dev) return NextResponse.json({ url: null });
  try {
    const logo = await getDeveloperLogo(dev);
    return NextResponse.json(
      { url: logo },
      { headers: { 'cache-control': 'public, max-age=3600, s-maxage=3600' } },
    );
  } catch {
    return NextResponse.json({ url: null }, { status: 200 });
  }
}
