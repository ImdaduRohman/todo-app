import { Listbox } from "@headlessui/react";

const options = [
  {
    title: 'Terbaru',
    value: 'terbaru',
    icon: '/images/sort-terbaru.svg',
  },
  {
    title: 'Terlama',
    value: 'terlama',
    icon: '/images/sort-terlama.svg',
  },
  {
    title: 'A-Z',
    value: 'a-z',
    icon: '/images/sort-a.svg',
  },
  {
    title: 'Z-A',
    value: 'z-a',
    icon: '/images/sort-z.svg',
  },
  {
    title: 'Belum Selesai',
    value: 'aktif',
    icon: '/images/sort-aktif.svg',
  },
];

// eslint-disable-next-line react/prop-types
export default function SortList({value, onChange}) {
    return (
      <Listbox
        value={value}
        onChange={onChange}
        className='relative lg:w-auto'
        as='div'
      >
        <Listbox.Button as='button' data-cy='todo-sort-button'>
          <img src='/images/todo-sort-button.svg' alt='todo-sort-button' />
        </Listbox.Button>
        <Listbox.Options
          as="ul"
          className="absolute left-0 w-[200px] origin-top-left bg-white shadow-lg ring-1 ring-black/5 focus:outline-none z-20"
        >
          {
            options.map((item, index) => (
              <Listbox.Option as="div" data-cy='data-cy=sort-selection' value={item.value} key={index}>
                {({active, selected}) => (
                  <li
                    className={`${active ? "bg-blue-50" : ""} ${
                      selected ? "bg-blue-100" : ""
                    } group flex gap-5 w-full items-center px-[18px] py-[10px] text-sm text-[#4A4A4A] cursor-pointer border-b border-[#E5E5E5]`}
                  >
                    <img src={item.icon} alt={item.icon} />
                    <div>{item.title}</div>
                  </li>
                )}
              </Listbox.Option>
            ))
          }
        </Listbox.Options>
      </Listbox>
    );
  }
  