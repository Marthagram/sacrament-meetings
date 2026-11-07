import { NextResponse, NextRequest } from 'next/server';
import { getAllMeetings, getMeetingsByDate } from '@/lib/meetings-db';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const date = searchParams.get('date');

  const data = date ? getMeetingsByDate(date) : getAllMeetings();
  return NextResponse.json(data);
}