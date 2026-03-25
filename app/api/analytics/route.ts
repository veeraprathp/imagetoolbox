import { NextRequest, NextResponse } from 'next/server';

// In-memory store (resets on redeploy — replace with a DB for persistence)
const counts: Record<string, number> = {};

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { tool } = body;

    const allowed = ['compress', 'resize', 'remove-background', 'qr-code-generator'];
    if (!tool || !allowed.includes(tool)) {
      return NextResponse.json({ error: 'Invalid tool' }, { status: 400 });
    }

    counts[tool] = (counts[tool] ?? 0) + 1;
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: 'Bad request' }, { status: 400 });
  }
}

export async function GET() {
  return NextResponse.json({ counts });
}
