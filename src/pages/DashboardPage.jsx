import { getAllActivity, postActivity } from '../lib/activity';
import { Link } from "react-router-dom";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { useState } from "react";
import Button from '../components/Button';
import FullLoading from '../components/FullLoading';
import ModalDelete from "../components/ModalDelete";
import ModalSuccess from "../components/ModalSuccess";
import axios from 'axios';

export default function DashboardPage() {
  const [isModalOpen, setIsModalOpen] = useState({ status: false, type: '' });
  const [selectedActivity, setSelectedActivity] = useState(null);
  const queryClient = useQueryClient();

  const formatDate = (date, month = "long") => {
    if (!date) {
      return "-";
    }
    return new Date(date).toLocaleDateString("id-id", {
      year: "numeric",
      month: month,
      day: "numeric",
    });
  };

  const {
    isLoading,
    data: allActivity,
  } = useQuery('allActivity', () => getAllActivity());

  const mutation = useMutation(
    (formData) =>
      postActivity(formData),
    {
      onSettled: () => {
        queryClient.invalidateQueries('allActivity');
      }
    }
  );

  const handleAddActivity = async () => {
    const post = { title: 'New Activity',
    email: 'im@gmail.com', }
    try {
      const res = await axios.post('https://todo.api.devcode.gethired.id/activity-groups', post)
      console.log(res.data)
      queryClient.invalidateQueries('allActivity')
    } catch (e) {
      alert(e)
    }
  }

  // const handleAddActivity = () => {
  //   const data = {
  //     title: 'New Activity',
  //     email: 'im@gmail.com',
  //   }
  //   mutation.mutate(data);
  // };

  const handleDeleteActivity = (id) => {
    setSelectedActivity(id)
    setIsModalOpen({ status: true, type: 'deleteActivity' })
  }

  const handleDeleteSuccess = () => {
    setIsModalOpen({ status: true, type: 'deleteSuccess' })
  }

  return (
    <div className='bg-[#F4F4F4] min-h-screen'>
      <div className='px-[25px] md:px-[100px] lg:px-[150px] py-9'>
        <div className='flex justify-between mb-28'>
          <div 
            data-cy='activity-title' 
            className='text-4xl leading-[54px] text-[#111111] font-bold'
          >
            Activity
          </div>
          <Button 
            data-cy='activity-add-button' 
            variant="primary" 
            className='w-[176px] h-[54px]' 
            onClick={() => handleAddActivity()}
          >
            {/* {mutation.isLoading ? <FullLoading /> : "+ Tambah"} */}
            + Tambah
          </Button>
        </div>
        {
          isLoading ? <FullLoading /> : (
            <>
              {
                allActivity?.data.length ? (
                  <div className='grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-5'>
                    {allActivity?.data.length && (allActivity.data.map((item, index) => (
                      <div 
                        data-cy='activity-item'
                        key={index}
                        className='h-[235px] bg-white flex flex-col justify-between p-6 rounded-lg shadow-md'
                      >
                        <Link to={`/detail/${item.id}`} className='flex-grow'>
                          <div 
                            data-cy='activity-item-title'
                            className='text-lg leading-[27px] text-[#111111] font-bold flex-grow'
                          >
                            {item.title || 'Activity'}
                          </div>
                        </Link>
                        <div className='flex justify-between'>
                          <div 
                            data-cy='activity-item-date'
                            className='text-sm leding-[21px] text-[#888888] font-medium'
                          >
                            {formatDate(item.created_at)}
                          </div>
                          <button 
                            data-cy='activity-item-delete-button'
                            type='button'
                            className='hover:opacity-70'
                            onClick={() => handleDeleteActivity(item.id)}
                          >
                            <img src='/images/delete.svg' alt='delete' />
                          </button>
                        </div>
                      </div>
                    )))}
                  </div> 
                ) : (
                  <div data-cy='activity-empty-state' className='flex justify-center'>
                    <button onClick={() => handleAddActivity()}>
                      <img 
                        src='/images/activity-empty-state.svg' 
                        alt='empty-state' 
                        className='w-[620px]'
                      />
                    </button>
                  </div>
                )
              }
            </>
          )
        }
      </div>
      
      {/* modals */}
      <ModalDelete 
        isOpen={isModalOpen.status && isModalOpen.type === 'deleteActivity' && selectedActivity !== null}
        onClose={() => setIsModalOpen({ status: false, type: '' })}
        idActivity={selectedActivity}
        respons={handleDeleteSuccess}
        />
      <ModalSuccess 
        isOpen={isModalOpen.status && isModalOpen.type === 'deleteSuccess'}
        onClose={() => setIsModalOpen({ status: false, type: '' })}
      />
    </div>
  )
}