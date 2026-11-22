
'use client';

import { useState } from 'react';
import { useActionState } from 'react';
import { updateMeeting, type State } from '@/lib/actions';

type Speaker = {
  name: string;
  topic: string;
  type: 'speaker' | 'musical-number';
};

type WardBusiness = {
  description: string;
};

type Meeting = {
  id: number;
  date: string;
  meetingType: 'regular' | 'testimony' | 'stake' | 'general' | 'special';
  presiding: string;
  conducting: string;
  announcements?: string[];
  openingHymn: { number: number; title: string };
  openingPrayer: string;
  wardBusiness: WardBusiness[];
  stakeBusiness: boolean;
  sacramentHymn: { number: number; title: string };
  speakers: Speaker[];
  closingHymn: { number: number; title: string };
  closingPrayer: string;
};

const initialState: State = {
  errors: {},
  message: null,
};

function FieldError({ errors, id }: { errors?: string[]; id: string }) {
  return (
    <div id={id} aria-live="polite" className="text-sm text-red-600">
      {errors?.map((error, index) => (
        <p key={`${id}-${index}`}>{error}</p>
      ))}
    </div>
  );
}

export default function EditMeetingForm({ meeting }: { meeting: Meeting }) {
  const updateMeetingWithId = updateMeeting.bind(null, meeting.id);

  const [state, formAction, isPending] = useActionState(
    updateMeetingWithId,
    initialState
  );

  const [announcements, setAnnouncements] = useState<string[]>(
    meeting.announcements ?? []
  );
  const [wardBusiness, setWardBusiness] = useState<WardBusiness[]>(
    meeting.wardBusiness ?? []
  );
  const [speakers, setSpeakers] = useState<Speaker[]>(
    meeting.speakers ?? []
  );

  return (
    <form action={formAction} className="space-y-8">
      <section className="space-y-4">
        <h2 className="text-xl font-semibold">Meeting Details</h2>

        <div>
          <label htmlFor="date">Meeting date</label>
          <input
            id="date"
            name="date"
            type="date"
            defaultValue={meeting.date.slice(0, 10)}
            aria-describedby="date-error"
            className="w-full rounded border p-2"
          />
          <FieldError id="date-error" errors={state.errors?.date} />
        </div>

        <div>
          <label htmlFor="meetingType">Meeting type</label>
          <select
            id="meetingType"
            name="meetingType"
            defaultValue={meeting.meetingType}
            aria-describedby="meetingType-error"
            className="w-full rounded border p-2"
          >
            <option value="regular">Regular</option>
            <option value="testimony">Testimony</option>
            <option value="stake">Stake</option>
            <option value="general">General</option>
            <option value="special">Special</option>
          </select>
          <FieldError
            id="meetingType-error"
            errors={state.errors?.meetingType}
          />
        </div>

        <div>
          <label htmlFor="presiding">Presiding</label>
          <input
            id="presiding"
            name="presiding"
            defaultValue={meeting.presiding}
            aria-describedby="presiding-error"
            className="w-full rounded border p-2"
          />
          <FieldError
            id="presiding-error"
            errors={state.errors?.presiding}
          />
        </div>

        <div>
          <label htmlFor="conducting">Conducting</label>
          <input
            id="conducting"
            name="conducting"
            defaultValue={meeting.conducting}
            aria-describedby="conducting-error"
            className="w-full rounded border p-2"
          />
          <FieldError
            id="conducting-error"
            errors={state.errors?.conducting}
          />
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-semibold">Announcements</h2>

        {announcements.map((announcement, index) => (
          <div key={index}>
            <label htmlFor={`announcement-${index}`}>
              Announcement {index + 1}
            </label>
            <div className="flex gap-2">
              <input
                id={`announcement-${index}`}
                name="announcements"
                value={announcement}
                onChange={(e) =>
                  setAnnouncements((items) =>
                    items.map((item, i) =>
                      i === index ? e.target.value : item
                    )
                  )
                }
                aria-describedby="announcements-error"
                className="w-full rounded border p-2"
              />
              <button
                type="button"
                onClick={() =>
                  setAnnouncements((items) =>
                    items.filter((_, i) => i !== index)
                  )
                }
                className="rounded border px-3"
              >
                Remove
              </button>
            </div>
          </div>
        ))}

        <button
          type="button"
          onClick={() => setAnnouncements((items) => [...items, ''])}
          className="rounded border px-3 py-2"
        >
          + Add announcement
        </button>
        <FieldError
          id="announcements-error"
          errors={state.errors?.announcements}
        />
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-semibold">Opening</h2>

        <div>
          <label htmlFor="openingHymnNumber">Opening hymn number</label>
          <input
            id="openingHymnNumber"
            name="openingHymnNumber"
            type="number"
            min="1"
            defaultValue={meeting.openingHymn.number}
            aria-describedby="openingHymn-error"
            className="w-full rounded border p-2"
          />
        </div>

        <div>
          <label htmlFor="openingHymnTitle">Opening hymn title</label>
          <input
            id="openingHymnTitle"
            name="openingHymnTitle"
            defaultValue={meeting.openingHymn.title}
            aria-describedby="openingHymn-error"
            className="w-full rounded border p-2"
          />
          <FieldError
            id="openingHymn-error"
            errors={state.errors?.openingHymn}
          />
        </div>

        <div>
          <label htmlFor="openingPrayer">Opening prayer</label>
          <input
            id="openingPrayer"
            name="openingPrayer"
            defaultValue={meeting.openingPrayer}
            aria-describedby="openingPrayer-error"
            className="w-full rounded border p-2"
          />
          <FieldError
            id="openingPrayer-error"
            errors={state.errors?.openingPrayer}
          />
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-semibold">Ward Business</h2>

        <input
          type="hidden"
          name="wardBusiness"
          value={JSON.stringify(
            wardBusiness.filter((item) => item.description.trim())
          )}
        />

        {wardBusiness.map((item, index) => (
          <div key={index}>
            <label htmlFor={`wardBusiness-${index}`}>
              Ward business item {index + 1}
            </label>
            <div className="flex gap-2">
              <input
                id={`wardBusiness-${index}`}
                value={item.description}
                onChange={(e) =>
                  setWardBusiness((items) =>
                    items.map((current, i) =>
                      i === index
                        ? { description: e.target.value }
                        : current
                    )
                  )
                }
                aria-describedby="wardBusiness-error"
                className="w-full rounded border p-2"
              />
              <button
                type="button"
                onClick={() =>
                  setWardBusiness((items) =>
                    items.filter((_, i) => i !== index)
                  )
                }
                className="rounded border px-3"
              >
                Remove
              </button>
            </div>
          </div>
        ))}

        <button
          type="button"
          onClick={() =>
            setWardBusiness((items) => [...items, { description: '' }])
          }
          className="rounded border px-3 py-2"
        >
          + Add ward business
        </button>
        <FieldError
          id="wardBusiness-error"
          errors={state.errors?.wardBusiness}
        />

        <div>
          <input
            id="stakeBusiness"
            name="stakeBusiness"
            type="checkbox"
            defaultChecked={meeting.stakeBusiness}
            className="mr-2"
          />
          <label htmlFor="stakeBusiness">Include stake business</label>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-semibold">Sacrament</h2>

        <div>
          <label htmlFor="sacramentHymnNumber">
            Sacrament hymn number
          </label>
          <input
            id="sacramentHymnNumber"
            name="sacramentHymnNumber"
            type="number"
            min="1"
            defaultValue={meeting.sacramentHymn.number}
            aria-describedby="sacramentHymn-error"
            className="w-full rounded border p-2"
          />
        </div>

        <div>
          <label htmlFor="sacramentHymnTitle">
            Sacrament hymn title
          </label>
          <input
            id="sacramentHymnTitle"
            name="sacramentHymnTitle"
            defaultValue={meeting.sacramentHymn.title}
            aria-describedby="sacramentHymn-error"
            className="w-full rounded border p-2"
          />
          <FieldError
            id="sacramentHymn-error"
            errors={state.errors?.sacramentHymn}
          />
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-semibold">Speakers</h2>

        <input
          type="hidden"
          name="speakers"
          value={JSON.stringify(speakers)}
        />

        {speakers.map((speaker, index) => (
          <div key={index} className="space-y-2 rounded border p-4">
            <div>
              <label htmlFor={`speaker-name-${index}`}>Name</label>
              <input
                id={`speaker-name-${index}`}
                value={speaker.name}
                onChange={(e) =>
                  setSpeakers((items) =>
                    items.map((item, i) =>
                      i === index ? { ...item, name: e.target.value } : item
                    )
                  )
                }
                aria-describedby="speakers-error"
                className="w-full rounded border p-2"
              />
            </div>

            <div>
              <label htmlFor={`speaker-topic-${index}`}>Topic</label>
              <input
                id={`speaker-topic-${index}`}
                value={speaker.topic}
                onChange={(e) =>
                  setSpeakers((items) =>
                    items.map((item, i) =>
                      i === index ? { ...item, topic: e.target.value } : item
                    )
                  )
                }
                aria-describedby="speakers-error"
                className="w-full rounded border p-2"
              />
            </div>

            <div>
              <label htmlFor={`speaker-type-${index}`}>Type</label>
              <select
                id={`speaker-type-${index}`}
                value={speaker.type}
                onChange={(e) =>
                  setSpeakers((items) =>
                    items.map((item, i) =>
                      i === index
                        ? {
                            ...item,
                            type: e.target.value as Speaker['type'],
                          }
                        : item
                    )
                  )
                }
                className="w-full rounded border p-2"
              >
                <option value="speaker">Speaker</option>
                <option value="musical-number">Musical number</option>
              </select>
            </div>

            <button
              type="button"
              onClick={() =>
                setSpeakers((items) =>
                  items.filter((_, i) => i !== index)
                )
              }
              className="rounded border px-3 py-2"
            >
              Remove
            </button>
          </div>
        ))}

        <button
          type="button"
          onClick={() =>
            setSpeakers((items) => [
              ...items,
              { name: '', topic: '', type: 'speaker' },
            ])
          }
          className="rounded border px-3 py-2"
        >
          + Add speaker or musical number
        </button>
        <FieldError
          id="speakers-error"
          errors={state.errors?.speakers}
        />
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-semibold">Closing</h2>

        <div>
          <label htmlFor="closingHymnNumber">Closing hymn number</label>
          <input
            id="closingHymnNumber"
            name="closingHymnNumber"
            type="number"
            min="1"
            defaultValue={meeting.closingHymn.number}
            aria-describedby="closingHymn-error"
            className="w-full rounded border p-2"
          />
        </div>

        <div>
          <label htmlFor="closingHymnTitle">Closing hymn title</label>
          <input
            id="closingHymnTitle"
            name="closingHymnTitle"
            defaultValue={meeting.closingHymn.title}
            aria-describedby="closingHymn-error"
            className="w-full rounded border p-2"
          />
          <FieldError
            id="closingHymn-error"
            errors={state.errors?.closingHymn}
          />
        </div>

        <div>
          <label htmlFor="closingPrayer">Closing prayer</label>
          <input
            id="closingPrayer"
            name="closingPrayer"
            defaultValue={meeting.closingPrayer}
            aria-describedby="closingPrayer-error"
            className="w-full rounded border p-2"
          />
          <FieldError
            id="closingPrayer-error"
            errors={state.errors?.closingPrayer}
          />
        </div>
      </section>

      {state.message && (
        <p aria-live="polite" className="text-sm text-red-600">
          {state.message}
        </p>
      )}

      <button
        type="submit"
        disabled={isPending}
        className="rounded bg-blue-600 px-5 py-3 text-white disabled:opacity-50"
      >
        {isPending ? 'Updating meeting...' : 'Update meeting'}
      </button>
    </form>
  );
}
