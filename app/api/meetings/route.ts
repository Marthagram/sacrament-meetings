//  route.ts is the file name always in Next.js 13+ for API routes in the app directory. It defines the HTTP methods (GET, POST, etc.) for the route. NOT routes.ts or routes.js. The file name must be route.ts or route.js for the API route to work correctly in Next.js 13+.
import { NextResponse, NextRequest } from 'next/server';
import { getAllMeetings, getMeetingsByDate } from '@/lib/meetings-db';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const date = searchParams.get('date');

  const data = date ? getMeetingsByDate(date) : getAllMeetings();
  return NextResponse.json(data);
}