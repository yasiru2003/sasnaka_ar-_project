import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;

    if (!id) {
      return NextResponse.json({ error: 'Missing Participant ID' }, { status: 400 });
    }

    await prisma.participant.delete({
      where: { id }
    });

    return NextResponse.json({ message: 'Participant deleted successfully' });
  } catch (error: any) {
    console.error('Error deleting participant:', error);
    return NextResponse.json(
      { error: 'Failed to delete participant' },
      { status: 500 }
    );
  }
}
