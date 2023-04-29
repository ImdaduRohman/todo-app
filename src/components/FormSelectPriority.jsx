import { Listbox } from "@headlessui/react";

const options = [
  {
    title: 'Very High',
    value: 'very-high',
    icon: '/images/priority-very-high.svg',
  },
  {
    title: 'High',
    value: 'high',
    icon: '/images/priority-high.svg',
  },
  {
    title: 'Medium',
    value: 'normal',
    icon: '/images/priority-medium.svg',
  },
  {
    title: 'Low',
    value: 'low',
    icon: '/images/priority-low.svg',
  },
  {
    title: 'Very Low',
    value: 'very-low',
    icon: '/images/priority-very-low.svg',
  },
];

const getPriority = (item) => {
  if(item === 'very-high') return {title: 'Very High', icon: '/images/priority-very-high.svg'}
  if(item === 'high') return {title: 'High', icon: '/images/priority-high.svg'}
  if(item === 'normal') return {title: 'Medium', icon: '/images/priority-medium.svg'}
  if(item === 'low') return {title: 'Low', icon: '/images/priority-low.svg'}
  if(item === 'very-low') return {title: 'Very Low', icon: '/images/priority-very-low.svg'}
};

// eslint-disable-next-line react/prop-types
export default function FormSelectPriority({value, onChange, selected}) {
    return (
      <Listbox
        data-cy='modal-add-priority-dropdown'
        value={value}
        onChange={onChange}
        className='relative lg:w-auto'
        as='div'
      >
        <Listbox.Button as='div' className='flex justify-between px-[18px] py-[14px] w-[200px] bg-[#F4F4F4] ring-1 mt-[9px] text-slate-900 text-sm focus:ring-[#16ABF8] focus:ring-2 outline-none rounded-md ring-[#E5E5E5]'>
            {
              selected ? (
                <div className='flex gap-5' data-cy='modal-add-priority-item'>
                  <img src={getPriority(selected).icon} alt='icon-priority' />
                  <div className='text-base text-[#111111]'>{getPriority(selected).title}</div>
                </div>
              ) : (
                <div className='text-base text-[#111111]'>Pilih Priority</div>
              )
            }
            <img src='/images/vector-priority.svg' alt='vector-priority' className='rotate-180'/>
        </Listbox.Button>
        <Listbox.Options
          as="ul"
          className="absolute left-0 w-[200px] origin-top-left bg-white shadow-lg ring-1 ring-black/5 focus:outline-none z-20"
        >
          {
            options.map((item, index) => (
              <Listbox.Option as="div" value={item.value} key={index}>
                {({active, selected}) => (
                  <li
                    data-cy={`modal-add-priority-${item.value}`}
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
  