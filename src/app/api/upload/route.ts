import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST(req: Request) {
  try {
    const { email, videoUrl } = await req.json();

    if (!email || !videoUrl) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    const participant = await prisma.participant.update({
      where: { email },
      data: {
        entry_video_url: videoUrl,
      },
    });

    return NextResponse.json(participant);
  } catch (error: any) {
    if (error.code === 'P2025') {
      return NextResponse.json(
        { error: 'Participant not found. Please register first.' },
        { status: 404 }
      );
    }
    console.error('Upload error:', error);
    return NextResponse.json(
      { error: 'Failed to upload entry' },
      { status: 500 }
    );
  }
}
