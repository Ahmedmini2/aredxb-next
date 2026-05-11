import { NextResponse } from 'next/server';
import { getProjectDetail } from '@/lib/offplan';

export const dynamic = 'force-dynamic';

export async function GET(_req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const project = await getProjectDetail(id);
    if (!project) return NextResponse.json({ error: 'Project not found' }, { status: 404 });
    return NextResponse.json(project);
  } catch (e: any) {
    return NextResponse.json({ error: 'Failed to fetch project' }, { status: 500 });
  }
}
