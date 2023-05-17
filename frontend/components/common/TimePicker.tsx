import { Fragment, useState } from 'react';
import { Listbox, Transition } from '@headlessui/react';
import {
  CheckIcon,
  ChevronUpDownIcon,
} from '@heroicons/react/20/solid';

const times = [
  { name: '00:00' },
  { name: '00:30' },
  { name: '01:00' },
  { name: '01:30' },
  { name: '02:00' },
  { name: '02:30' },
  { name: '03:00' },
  { name: '03:30' },
  { name: '04:00' },
  { name: '04:30' },
  { name: '05:00' },
  { name: '05:30' },
  { name: '06:00' },
  { name: '06:30' },
  { name: '07:00' },
  { name: '07:30' },
  { name: '08:00' },
  { name: '08:30' },
  { name: '09:00' },
  { name: '09:30' },
  { name: '10:00' },
  { name: '10:30' },
  { name: '11:00' },
  { name: '11:30' },
  { name: '12:00' },
  { name: '12:30' },
  { name: '13:00' },
  { name: '13:30' },
  { name: '14:00' },
  { name: '14:30' },
  { name: '15:00' },
  { name: '15:30' },
  { name: '16:00' },
  { name: '16:30' },
  { name: '17:00' },
  { name: '17:30' },
  { name: '18:00' },
  { name: '18:30' },
  { name: '19:00' },
  { name: '19:30' },
  { name: '20:00' },
  { name: '20:30' },
  { name: '21:00' },
  { name: '21:30' },
  { name: '22:00' },
  { name: '22:30' },
  { name: '23:00' },
  { name: '23:30' },
];

export default function TimePicker() {
  const [selected, setSelected] = useState(times[0]);

  const handleSubmit = () => {
    return;
  };
  return (
    <div className="flex items-baseline space-x-2">
      <div className="top-16 w-48">
        <Listbox value={selected} onChange={setSelected}>
          <div className="relative mt-1">
            <Listbox.Button className="relative w-full cursor-default rounded-lg bg-white py-2 pl-3 pr-10 text-left shadow-md focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm">
              <span className="block truncate">{selected.name}</span>
              <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                <ChevronUpDownIcon
                  className="h-5 w-5 text-gray-400"
                  aria-hidden="true"
                />
              </span>
            </Listbox.Button>
            <Transition
              as={Fragment}
              leave="transition ease-in duration-100"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Listbox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                {times.map((time, timeIdx) => (
                  <Listbox.Option
                    key={timeIdx}
                    className={({ active }) =>
                      `relative cursor-default select-none py-2 pl-10 pr-4 ${
                        active
                          ? 'bg-amber-100 text-amber-900'
                          : 'text-gray-900'
                      }`
                    }
                    value={time}
                  >
                    {({ selected }) => (
                      <>
                        <span
                          className={`block truncate ${
                            selected ? 'font-medium' : 'font-normal'
                          }`}
                        >
                          {time.name}
                        </span>
                        {selected ? (
                          <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-amber-600">
                            <CheckIcon
                              className="h-5 w-5"
                              aria-hidden="true"
                            />
                          </span>
                        ) : null}
                      </>
                    )}
                  </Listbox.Option>
                ))}
              </Listbox.Options>
            </Transition>
          </div>
        </Listbox>
      </div>
      <button className="btn btn-sm" onClick={handleSubmit}>
        설정
      </button>
    </div>
  );
}
