import { Dialog, Transition } from '@headlessui/react';
import { Fragment } from 'react';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import Button from './Button';
import { deleteActivity, getDetailActivity } from '../lib/activity';
import FullLoading from './FullLoading';

export default function ModalDelete({
  // eslint-disable-next-line react/prop-types
  isOpen,
  // eslint-disable-next-line react/prop-types
  onClose,
  // eslint-disable-next-line react/prop-types
  idActivity,
  // eslint-disable-next-line react/prop-types
  ref = undefined,
  // eslint-disable-next-line react/prop-types
  respons,
}) {
  const queryClient = useQueryClient();

  const {
    isLoading,
    data: detailActivity,
  } = useQuery(['detailActivity', idActivity], () => getDetailActivity(idActivity));

  const deleteMutation = useMutation(
    (id) => deleteActivity(id),
    {
      onSettled: () => {
        queryClient.invalidateQueries('allActivity');
      },

    },
  );

  const handleDelete = (id) => {
    deleteMutation.mutate(id);
    onClose();
    respons();
  };

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog
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
              <Dialog.Panel data-cy='modal-delete' className="w-full max-w-md flex flex-col p-10 pb-6 gap-10 overflow-hidden rounded-xl bg-white text-left align-middle shadow-xl transition-all">
                <img data-cy='modal-delete-icon' src="images/modal-delete-icon.svg" alt="modal-delete-icon" className="mx-auto" />
                <div data-cy='modal-delete-title' className="text-lg leading-[27px] font-medium text-center">
                  <div>Apakah anda yakin menghapus activity</div>
                  {
                    isLoading ? <FullLoading /> : <div className="font-bold">“{detailActivity?.title}“</div>
                  }
                </div>
                <div className="flex items-center justify-center gap-3 px-4 py-4">
                  <Button data-cy='modal-delete-cancel-button' onClick={onClose}>Batalkan</Button>
                  <Button
                    data-cy='modal-delete-confirm-button'
                    variant="danger"
                    className='w-[140px] h-[51px]'
                    onClick={() => handleDelete(idActivity)}
                  >
                    {
                      deleteMutation.isLoading ? <FullLoading /> : 'Hapus'
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
