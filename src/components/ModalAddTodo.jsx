import { Dialog, Transition } from '@headlessui/react';
import { Fragment, useEffect, useState } from 'react';
import { postTodo } from '../lib/todo';
import { useMutation, useQueryClient } from 'react-query';
import Button from './Button';
import FormInput from './FormInput';
import FormSelectPriority from './FormSelectPriority';
import FullLoading from './FullLoading';

export default function ModalAddTodo({
  // eslint-disable-next-line react/prop-types
  isOpen,
  // eslint-disable-next-line react/prop-types
  onClose,
  // eslint-disable-next-line react/prop-types
  idActivity,
  // eslint-disable-next-line react/prop-types
  ref = undefined,
  
}) {
  const queryClient = useQueryClient();
  const [selectedPriority, setSelectedPriority] = useState('');
  const [formData, setFormData] = useState({
    activity_group_id: idActivity,
    title: '',
    priority: '',
  })

  const mutation = useMutation(
    (formData) =>
      postTodo(formData),
    {
      onSettled: () => {
        queryClient.invalidateQueries('allTodo');
      }
    }
  );

  const handleAddTodo = (e) => {
    e.preventDefault();
    mutation.mutate(formData);
    setFormData({
      activity_group_id: idActivity,
      title: '',
      priority: '',
    })
    onClose();
  };

  useEffect(() => {
    setFormData({...formData, priority : selectedPriority})
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedPriority]);

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog
        data-cy='modal-add' 
        as="div"
        className="relative z-50"
        onClose={onClose}
        {...(ref ? { ref } : {})}
      >
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-25" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel 
                data-cy='modal-add' 
                className="w-full max-w-3xl rounded-xl bg-white text-left align-middle shadow-xl transition-all"
              >
                <div className="flex items-center justify-between p-6 border-b border-[#E5E5E5]">
                  <Dialog.Title
                    data-cy='modal-add-title'
                    as="h3"
                    className="text-lg font-semibold text-[#111111]"
                  >
                    Tambah List Item
                  </Dialog.Title>
                  <button data-cy='modal-add-close-button' type="button" onClick={onClose}>
                    <img src='/images/modal-add-close-button.svg' alt='modal-add-close-button' />
                  </button>
                </div>
                <form className='px-6 mt-[30px] mb-[18px]' id='myForm' onSubmit={handleAddTodo}>
                  <FormInput
                    type='text'
                    name='list-item'
                    value={formData.title}
                    onChange={(e) => setFormData({...formData, title: e.target.value})}
                  />
                  <div className='h-[26px]'/>
                  <div data-cy='modal-add-priority-title' className='text-xs text-[#111111] leading-[18px] font-semibold'>PRIORITY</div>
                  <FormSelectPriority 
                    data-cy='modal-add-priority-item'
                    value={selectedPriority}
                    onChange={setSelectedPriority}
                    selected={selectedPriority}
                  />
                </form>
                <div className='flex items-center justify-end gap-3 px-10 py-5 border-t border-[#E5E5E5]'>
                  <Button
                    data-cy='modal-add-save-button'
                    type='submit'
                    form='myForm'
                    variant='primary'
                    className='w-[140px] h-[51px]'
                    disabled={formData.title && formData.priority ? false : true}
                  >
                    {
                      mutation.isLoading ? <FullLoading /> : 'Simpan'
                    }
                  </Button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}
