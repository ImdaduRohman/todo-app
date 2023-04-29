import { Dialog, Transition } from '@headlessui/react';
import { Fragment } from 'react';

export default function ModalSuccess({
  // eslint-disable-next-line react/prop-types
  isOpen,
  // eslint-disable-next-line react/prop-types
  onClose,
  // eslint-disable-next-line react/prop-types
  ref = undefined,
}) {
  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog
        as='div'
        className='relative z-50'
        onClose={onClose}
        {...(ref ? { ref } : {})}
      >
        <Transition.Child
          as={Fragment}
          enter='ease-out duration-300'
          enterFrom='opacity-0'
          enterTo='opacity-100'
          leave='ease-in duration-200'
          leaveFrom='opacity-100'
          leaveTo='opacity-0'
        >
          <div className='fixed inset-0 bg-black bg-opacity-25' />
        </Transition.Child>

        <div className='fixed inset-0 overflow-y-auto'>
          <div className='flex min-h-full items-center justify-center p-4 text-center'>
            <Transition.Child
              as={Fragment}
              enter='ease-out duration-300'
              enterFrom='opacity-0 scale-95'
              enterTo='opacity-100 scale-100'
              leave='ease-in duration-200'
              leaveFrom='opacity-100 scale-100'
              leaveTo='opacity-0 scale-95'
            >
              <Dialog.Panel data-cy='modal-information' className='w-full max-w-md overflow-hidden rounded-xl py-5 px-7 bg-white text-left align-middle shadow-xl transition-all'>
                <div className='flex gap-3'>
                  <img data-cy='modal-information-icon' src='images/delete-success.svg' alt='delete-success' />
                  <div data-cy='modal-information-title' className='text-sm text-[#111111] leading-[21px] font-medium'>Activity berhasil dihapus</div>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}
