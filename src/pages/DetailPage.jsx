import { Link, useParams } from "react-router-dom";
import { getDetailActivity, updateActivity } from "../lib/activity";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { useEffect, useState } from "react";
import Button from "../components/Button";
import { getAllTodo, updateTodo } from "../lib/todo";
import FullLoading from "../components/FullLoading";
import ModalDeleteTodo from "../components/ModalDeleteTodo";

const getPriority = (priority) => {
  if(priority === 'very-high') return '/images/priority-very-high.svg'
  if(priority === 'high') return '/images/priority-high.svg'
  if(priority === 'normal') return '/images/priority-medium.svg'
  if(priority === 'low') return '/images/priority-low.svg'
  if(priority === 'very-low') return '/images/priority-very-low.svg'
};

export default function DetailPage() {
  const [isModalOpen, setIsModalOpen] = useState({ status: false, type: '' });
  const [selectedTodo, setSelectedTodo] = useState(null);
  const { id } = useParams();
  const queryClient = useQueryClient();

  const {
    data: detailActivity,
  } = useQuery(['detailActivity', id], () =>
    getDetailActivity(id)
  );

  const {
    isLoading,
    data: allTodo,
  } = useQuery('allTodo', () => getAllTodo(id));

  const [titleActivity, setTitleActivity] = useState('');

  useEffect(() => {
    setTitleActivity(detailActivity?.title)
}, [detailActivity]);

  const handleInput = (e) => {
    setTitleActivity(e.target.value)
  }

  const mutation = useMutation(
    (formData) => updateActivity(id, formData),
    {
      onSettled: () => {
        queryClient.invalidateQueries('detailActivity');
      }
    }
  );

  const mutationTodo = useMutation(
    (formData) => updateTodo(formData.id, formData),
    {
      onSettled: () => {
        queryClient.invalidateQueries('allTodo');
      }
    }
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    mutation.mutate({title: titleActivity});
  };

  const handleCheckBox = (item) => {
    const formData = {
      id: item.id,
      is_active: !item.is_active
    }
    mutationTodo.mutate(formData);
  }

  const handleDeleteTodo = (id) => {
    setSelectedTodo(id)
    setIsModalOpen({ status: true, type: 'deleteTodo' })
  }

  return (
    <div className='bg-[#F4F4F4] min-h-screen'>
      <div className='px-[25px] md:px-[100px] lg:px-[150px] py-9'>
        <div className='flex justify-between mb-12'>
          <form onSubmit={handleSubmit} className='text-4xl leading-[54px] text-[#111111] font-bold flex items-center gap-6'>
            <Link to='/' data-cy='todo-back-button' >
              <img src='/images/todo-back-button.svg' alt='todo-back-button' />
            </Link>
            <input 
              data-cy='todo-title'
              type='text' 
              id='titleActivity' 
              value={titleActivity || ''} 
              onChange={handleInput} 
              className='bg-[#F4F4F4] truncate w-fit outline-none focus:ring-2 focus:ring-[#16ABF8] p-2 rounded-sm'
            /> 
            <label 
              data-cy='todo-title-edit-button' 
              htmlFor='titleActivity'
              className='hover:opacity-70'
            >
              <img src='/images/todo-title-edit-button.svg' alt='todo-title-edit-button.svg' />
            </label>
          </form>
          <Button 
            data-cy='activity-add-button' 
            variant="primary" 
            className='w-[176px] h-[54px]' 
            // onClick={handleAddActivity}
          >
            {/* {mutation.isLoading ? <FullLoading /> : "+ Tambah"} */}
            + Tambah
          </Button>
        </div>

        {
          isLoading ? <FullLoading /> : (
            <>
              {
                allTodo?.data.length ? (
                  <div className='flex flex-col gap-[10px]'>
                    {allTodo?.data.length && (allTodo?.data.map((item, index) => (
                      <div
                        data-cy={`todo-item-${index}`}
                        key={index}
                        className='flex justify-between rounded-lg shadow-md px-7 py-[30px] bg-white'>
                        <div className='flex gap-5'>
                          <input
                            data-cy='todo-item-checkbox' 
                            onChange={() => handleCheckBox(item)}
                            type="checkbox" 
                            checked={item.is_active === 0 ? 'checked' : ''}
                            className='w-5 h-5 bg-red-400'
                          />
                          <img src={getPriority(item.priority)} alt={item.priority} />
                          <div className={`text-lg text-[#111111] leading-[27px] font-medium ${item.is_active === 0 ? 'line-through text-[#888888]' : ''}`}>{item.title}</div>
                          <button type='button'>
                            <img src='/images/todo-title-edit-button.svg' alt='edit-todo' className='w-5 h-5' />
                          </button>
                        </div>
                        <button 
                          type='button' 
                          className='self-end'
                          onClick={() => handleDeleteTodo(item.id)}
                        >
                          <img src='/images/delete.svg' alt='edit-todo' className='w-5 h-5' />
                        </button>
                      </div>
                    )))}
                  </div> 
                ) : (
                  <div data-cy='todo-empty-state' className='flex justify-center'>
                    <img 
                      src='/images/todo-empty-state.svg' 
                      alt='todo-empty-state' 
                      className='w-[620px]' />
                  </div>
                )
              }
            </>
          )
        }
      </div> 

      <ModalDeleteTodo
        isOpen={isModalOpen.status && isModalOpen.type === 'deleteTodo' && selectedTodo !== null}
        onClose={() => setIsModalOpen({ status: false, type: '' })}
        idActivity={selectedTodo}
        // respons={handleDeleteSuccess}
        />
    </div>
  )
}
