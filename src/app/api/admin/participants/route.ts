import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(req: Request) {
  try {
    // Basic protection check (internal secret header or similar)
    // For now, we allow the GET but in the page we will have a password check
    const participants = await prisma.participant.findMany({
      orderBy: {
        created_at: 'desc'
      }
    });

    return NextResponse.json(participants);
  } catch (error: any) {
    console.error('Error fetching participants:', error);
    return NextResponse.json(
      { error: 'Failed to fetch participants' },
      { status: 500 }
    );
  }
}
