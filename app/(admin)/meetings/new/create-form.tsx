
'use client';

import { useState } from 'react';
import { useActionState } from 'react';
import { createMeeting, type State } from '@/lib/actions';

type Speaker = {
  name: string;
  topic: string;
  type: 'speaker' | 'musical-number';
};

type WardBusiness = {
  description: string;
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

export default function CreateMeetingForm() {
  const [state, formAction, isPending] = useActionState(
    createMeeting,
    initialState
  );

  const [announcements, setAnnouncements] = useState<string[]>(['']);
  const [wardBusiness, setWardBusiness] = useState<WardBusiness[]>([
    { description: '' },
  ]);
  const [speakers, setSpeakers] = useState<Speaker[]>([
    { name: '', topic: '', type: 'speaker' },
  ]);

  function updateAnnouncement(index: number, value: string) {
    setAnnouncements((items) =>
      items.map((item, i) => (i === index ? value : item))
    );
  }

  function updateWardBusiness(index: number, value: string) {
    setWardBusiness((items) =>
      items.map((item, i) =>
        i === index ? { description: value } : item
      )
    );
  }

  function updateSpeaker(
    index: number,
    field: keyof Speaker,
    value: string
  ) {
    setSpeakers((items) =>
      items.map((item, i) =>
        i === index ? { ...item, [field]: value } : item
      )
    );
  }

  return (
    <form action={formAction} className="space-y-8">
      <section className="space-y-4">
        <h2 className="text-xl font-semibold">Meeting Details</h2>

        <div>
          <label htmlFor="date" className="block font-medium">
            Meeting date
          </label>
          <input
            id="date"
            name="date"
            type="date"
            aria-describedby="date-error"
            className="w-full rounded border p-2"
          />
          <FieldError id="date-error" errors={state.errors?.date} />
        </div>

        <div>
          <label htmlFor="meetingType" className="block font-medium">
            Meeting type
          </label>
          <select
            id="meetingType"
            name="meetingType"
            defaultValue="regular"
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
          <label htmlFor="presiding" className="block font-medium">
            Presiding
          </label>
          <input
            id="presiding"
            name="presiding"
            type="text"
            aria-describedby="presiding-error"
            className="w-full rounded border p-2"
          />
          <FieldError
            id="presiding-error"
            errors={state.errors?.presiding}
          />
        </div>

        <div>
          <label htmlFor="conducting" className="block font-medium">
            Conducting
          </label>
          <input
            id="conducting"
            name="conducting"
            type="text"
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
                  updateAnnouncement(index, e.target.value)
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
            aria-describedby="openingHymn-error"
            className="w-full rounded border p-2"
          />
        </div>

        <div>
          <label htmlFor="openingHymnTitle">Opening hymn title</label>
          <input
            id="openingHymnTitle"
            name="openingHymnTitle"
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
                  updateWardBusiness(index, e.target.value)
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
            setWardBusiness((items) => [
              ...items,
              { description: '' },
            ])
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
                  updateSpeaker(index, 'name', e.target.value)
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
                  updateSpeaker(index, 'topic', e.target.value)
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
                  updateSpeaker(index, 'type', e.target.value)
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
            aria-describedby="closingHymn-error"
            className="w-full rounded border p-2"
          />
        </div>

        <div>
          <label htmlFor="closingHymnTitle">Closing hymn title</label>
          <input
            id="closingHymnTitle"
            name="closingHymnTitle"
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
        {isPending ? 'Creating meeting...' : 'Create meeting'}
      </button>
    </form>
  );
}
