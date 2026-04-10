import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST(req: Request) {
  try {
    const { registrationNumber: providedRegNo, name, phone, district, category } = await req.json();

    if (!name || !phone || !district || !category) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Auto-generate registration number if not provided by stall
    const registrationNumber = providedRegNo || `S-${Math.floor(1000 + Math.random() * 9000)}`;

    const participant = await prisma.participant.create({
      data: {
        registrationNumber,
        name,
        phone,
        district,
        category,
      },
    });

    return NextResponse.json(participant);
  } catch (error: any) {
    if (error.code === 'P2002') {
      const field = error.meta?.target?.[0] || 'account';
      return NextResponse.json(
        { error: `This ${field} is already registered` },
        { status: 400 }
      );
    }
    console.error('Registration error:', error);
    return NextResponse.json(
      { error: 'Failed to register' },
      { status: 500 }
    );
  }
}
