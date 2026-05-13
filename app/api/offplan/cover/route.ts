import { NextResponse } from 'next/server';
import { ensureS3Index, slugify } from '@/lib/offplan';

// Resolves a project's cover image from the assets-allegiance S3 bucket only.
// Never returns a Reelly or third-party URL.
//
// Query params:
//   dev   — developer name (e.g. "DAMAC")
//   proj  — project name (e.g. "Damac Lagoons Marbella")
//
// Response:
//   { url: string | null }

export const dynamic = 'force-dynamic';

export async function GET(req: Request) {
  const url = new URL(req.url);
  const devRaw = (url.searchParams.get('dev') || '').trim();
  const projRaw = (url.searchParams.get('proj') || '').trim();
  if (!projRaw) return NextResponse.json({ url: null });

  const devSlug = slugify(devRaw);
  const projSlug = slugify(projRaw);

  try {
    const idx = await ensureS3Index();
    let entry = devSlug ? idx[devSlug + '/' + projSlug] : undefined;
    if (!entry) {
      // Fallback: match on project slug alone across any developer.
      entry = Object.values(idx).find((v) => v.proj === projSlug);
    }
    const cover = entry && entry.images[0] ? entry.images[0] : null;
    return NextResponse.json(
      { url: cover },
      { headers: { 'cache-control': 'public, max-age=600, s-maxage=600' } },
    );
  } catch (e) {
    return NextResponse.json({ url: null }, { status: 200 });
  }
}
