
'use server';

import { z } from 'zod';
import { neon } from '@neondatabase/serverless';
const sql = neon(process.env.DATABASE_URL!);
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

const MeetingFormSchema = z.object({
  date: z.string().min(1, 'Meeting date is required.'),
  meetingType: z.enum(['regular', 'testimony', 'stake', 'general', 'special']),
  presiding: z.string().trim().min(1, 'Presiding is required.'),
  conducting: z.string().trim().min(1, 'Conducting is required.'),
  announcements: z.array(z.string()).optional(),
  openingHymn: z.object({
    number: z.number().int().positive(),
    title: z.string().trim().min(1, 'Opening hymn title is required.'),
  }),
  openingPrayer: z.string().trim().min(1, 'Opening prayer is required.'),
  wardBusiness: z.array(z.object({
    description: z.string().trim().min(1),
  })),
  stakeBusiness: z.boolean(),
  sacramentHymn: z.object({
    number: z.number().int().positive(),
    title: z.string().trim().min(1),
  }),
  speakers: z.array(z.object({
    name: z.string().trim().min(1),
    topic: z.string(),
    type: z.enum(['speaker', 'musical-number']),
  })),
  closingHymn: z.object({
    number: z.number().int().positive(),
    title: z.string().trim().min(1),
  }),
  closingPrayer: z.string().trim().min(1),
});

export type State = {
  errors?: Record<string, string[] | undefined>;
  message?: string | null;
};



// Read JSON fields submitted by the form
function getJsonField(formData: FormData, field: string) {
  return JSON.parse(String(formData.get(field) ?? '[]'));
}

// Prepare form data for validation
function prepareMeetingData(formData: FormData) {
  return {
    date: formData.get('date'),
    meetingType: formData.get('meetingType'),
    presiding: formData.get('presiding'),
    conducting: formData.get('conducting'),
    announcements: formData.getAll('announcements').map(String),

    openingHymn: {
      number: Number(formData.get('openingHymnNumber')),
      title: formData.get('openingHymnTitle'),
    },

    openingPrayer: formData.get('openingPrayer'),

    wardBusiness: getJsonField(formData, 'wardBusiness'),

    stakeBusiness:
      formData.get('stakeBusiness') === 'on' ||
      formData.get('stakeBusiness') === 'true',

    sacramentHymn: {
      number: Number(formData.get('sacramentHymnNumber')),
      title: formData.get('sacramentHymnTitle'),
    },

    speakers: getJsonField(formData, 'speakers'),

    closingHymn: {
      number: Number(formData.get('closingHymnNumber')),
      title: formData.get('closingHymnTitle'),
    },

    closingPrayer: formData.get('closingPrayer'),
  };
}

// CREATE MEETING
export async function createMeeting(
  prevState: State,
  formData: FormData
): Promise<State> {

  let raw;

  try {
    raw = prepareMeetingData(formData);
  } catch {
    return {
      message: 'Invalid form data. Please check your entries.',
    };
  }

  const parsed = MeetingFormSchema.safeParse(raw);

  if (!parsed.success) {
    return {
      errors: parsed.error.flatten().fieldErrors,
      message: 'Please correct the errors below.',
    };
  }

  const {
    date,
    meetingType,
    presiding,
    conducting,
    announcements,
    openingHymn,
    openingPrayer,
    wardBusiness,
    stakeBusiness,
    sacramentHymn,
    speakers,
    closingHymn,
    closingPrayer,
  } = parsed.data;

  try {
    await sql`
      INSERT INTO meetings (
        date,
        meeting_type,
        presiding,
        conducting,
        announcements,
        opening_hymn,
        opening_prayer,
        ward_business,
        stake_business,
        sacrament_hymn,
        speakers,
        closing_hymn,
        closing_prayer
      )
      VALUES (
        ${date},
        ${meetingType},
        ${presiding},
        ${conducting},
        ${announcements ?? []},
        ${JSON.stringify(openingHymn)}::jsonb,
        ${openingPrayer},
        ${JSON.stringify(wardBusiness)}::jsonb,
        ${stakeBusiness},
        ${JSON.stringify(sacramentHymn)}::jsonb,
        ${JSON.stringify(speakers)}::jsonb,
        ${JSON.stringify(closingHymn)}::jsonb,
        ${closingPrayer}
      )
    `;
  } catch (error) {
    console.error('Database Error:', error);
    return {
      message: 'Database Error: Failed to create meeting.',
    };
  }

  revalidatePath('/meetings');
  redirect('/meetings');
}

// UPDATE MEETING
export async function updateMeeting(
  id: number,
  prevState: State,
  formData: FormData
): Promise<State> {

  let raw;

  try {
    raw = prepareMeetingData(formData);
  } catch {
    return {
      message: 'Invalid form data. Please check your entries.',
    };
  }

  const parsed = MeetingFormSchema.safeParse(raw);

  if (!parsed.success) {
    return {
      errors: parsed.error.flatten().fieldErrors,
      message: 'Please correct the errors below.',
    };
  }

  const {
    date,
    meetingType,
    presiding,
    conducting,
    announcements,
    openingHymn,
    openingPrayer,
    wardBusiness,
    stakeBusiness,
    sacramentHymn,
    speakers,
    closingHymn,
    closingPrayer,
  } = parsed.data;

  try {
    await sql`
      UPDATE meetings
      SET
        date = ${date},
        meeting_type = ${meetingType},
        presiding = ${presiding},
        conducting = ${conducting},
        announcements = ${announcements ?? []},
        opening_hymn = ${JSON.stringify(openingHymn)}::jsonb,
        opening_prayer = ${openingPrayer},
        ward_business = ${JSON.stringify(wardBusiness)}::jsonb,
        stake_business = ${stakeBusiness},
        sacrament_hymn = ${JSON.stringify(sacramentHymn)}::jsonb,
        speakers = ${JSON.stringify(speakers)}::jsonb,
        closing_hymn = ${JSON.stringify(closingHymn)}::jsonb,
        closing_prayer = ${closingPrayer}
      WHERE id = ${id}
    `;
  } catch (error) {
    console.error('Database Error:', error);
    return {
      message: 'Database Error: Failed to update meeting.',
    };
  }

  revalidatePath('/meetings');
  redirect('/meetings');
}
