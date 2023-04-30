import { Link, useParams } from "react-router-dom";
import { getDetailActivity, updateActivity } from "../lib/activity";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { useState } from "react";
import Button from "../components/Button";
import { getAllTodo, updateTodo } from "../lib/todo";
import FullLoading from "../components/FullLoading";
import ModalDeleteTodo from "../components/ModalDeleteTodo";
import ModalAddTodo from "../components/ModalAddTodo";
import ModalSuccess from "../components/ModalSuccess";
import SortList from "../components/SortList";

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
  const [selectedSort, setSelectedSort] = useState('');
  const [editTitle, setEditTitle] = useState(false);
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

  const mutation = useMutation(
    (formData) => updateActivity(id, formData),
    {
      onSettled: () => {
        queryClient.invalidateQueries('detailActivity');
      }
    }
  );

  const handleInput = (e) => {
    mutation.mutate({title: e.target.value});
  }

  // console.log(allTodo.data)

  const mutationTodo = useMutation(
    (formData) => updateTodo(formData.id, formData),
    {
      onSettled: () => {
        queryClient.invalidateQueries('allTodo');
      }
    }
  );

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

  const handleDeleteSuccess = () => {
    setIsModalOpen({ status: true, type: 'deleteSuccess' })
  }

  const sortList = (sort, data) => {
    let list = [...data];

    if (sort) {
      switch (sort) {
        case "terbaru":
          list;
          break;
        case "terlama":
          list = list.reverse();
          break;
        case "a-z":
          list = list.sort((a, b) => {
            var x = a.title.toLowerCase(); // ignore upper and lowercase
            var y = b.title.toLowerCase(); // ignore upper and lowercase
            if(x < y) {
              return -1;
            }
            if(x > y) {
                return 1;
            }
            // names must be equal
            return 0;
          });
        break;
        case "z-a":
          list = list.sort((a, b) => {
            var x = b.title.toLowerCase(); // ignore upper and lowercase
            var y = a.title.toLowerCase(); // ignore upper and lowercase
            if(x < y) {
              return -1;
            }
            if(x > y) {
                return 1;
            }
            // names must be equal
            return 0;
          });
        break;
        default:
          // eslint-disable-next-line no-self-assign
          list = list;
          break;
      }
    }
  
    return list;
  }

  return (
    <div className='bg-[#F4F4F4] min-h-screen'>
      <div className='px-[25px] md:px-[100px] lg:px-[150px] py-9'>
        <div className='flex justify-between mb-12'>
          <form className='text-4xl leading-[54px] text-[#111111] font-bold flex items-center gap-6'>
            <Link to='/' data-cy='todo-back-button' >
              <img src='/images/todo-back-button.svg' alt='todo-back-button' />
            </Link>
            <button type='button' onClick={() => setEditTitle(true)}>
              {
                editTitle ? (
                  <input
                    data-cy='todo-title'
                    type='text'
                    id='titleActivity' 
                    value={detailActivity?.title} 
                    onChange={handleInput} 
                    onBlur={() => setEditTitle(false)}
                    className='bg-[#F4F4F4] truncate w-fit outline-none focus:ring-2 focus:ring-[#16ABF8] p-2 rounded-sm'
                  />
                ) : (
                  <div 
                    data-cy='todo-title' 
                    className='bg-[#F4F4F4] truncate w-fit outline-none focus:ring-2 focus:ring-[#16ABF8] p-2 rounded-sm'>
                      {detailActivity?.title}
                  </div>
                )
              }
            </button>
            <label 
              data-cy='todo-title-edit-button'
              type='button'
              htmlFor='titleActivity'
              className='hover:opacity-70'
              onClick={() => setEditTitle(true)}
            >
              <img src='/images/todo-title-edit-button.svg' alt='todo-title-edit-button.svg' />
            </label>
          </form>
          <div className='flex gap-[18px]'>
            <SortList 
              value={selectedSort}
              onChange={setSelectedSort}
              selected={selectedSort}
            />
            <Button 
              data-cy='todo-add-button' 
              variant='primary' 
              className='w-[176px] h-[54px]' 
              onClick={() => setIsModalOpen({ status: true, type: 'addTodo' })}
            >
              {/* {mutation.isLoading ? <FullLoading /> : "+ Tambah"} */}
              + Tambah
            </Button>
          </div>
        </div>

        {
          isLoading ? <FullLoading /> : (
            <>
              {
                allTodo?.data.length ? (
                  <div className='flex flex-col gap-[10px]'>
                    {allTodo?.data.length && (sortList(selectedSort, allTodo?.data).map((item, index) => (
                      <div
                        data-cy='todo-item'
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
                          <div data-cy='todo-item-title' className={`text-lg text-[#111111] leading-[27px] font-medium ${item.is_active === 0 ? 'line-through text-[#888888]' : ''}`}>{item.title}</div>
                          <button type='button'>
                            <img src='/images/todo-title-edit-button.svg' alt='edit-todo' className='w-5 h-5' />
                          </button>
                        </div>
                        <button 
                          data-cy='todo-item-delete-button'
                          type='button'
                          className='self-end'
                          onClick={() => handleDeleteTodo(item.id)}
                        >
                          <img src='/images/delete.svg' alt='edit-todo' className='w-5 h-5 hover:opacity-70' />
                        </button>
                      </div>
                    )))}
                  </div> 
                ) : (
                  <div data-cy='todo-empty-state' className='flex justify-center'>
                    <button onClick={() => setIsModalOpen({ status: true, type: 'addTodo' })}>
                      <img 
                        src='/images/todo-empty-state.svg' 
                        alt='todo-empty-state' 
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

      <ModalDeleteTodo
        isOpen={isModalOpen.status && isModalOpen.type === 'deleteTodo' && selectedTodo !== null}
        onClose={() => setIsModalOpen({ status: false, type: '' })}
        idActivity={selectedTodo}
        respons={handleDeleteSuccess}
      />
      <ModalAddTodo
        isOpen={isModalOpen.status && isModalOpen.type === 'addTodo'}
        onClose={() => setIsModalOpen({ status: false, type: '' })}
        idActivity={id}
      />
      <ModalSuccess 
        isOpen={isModalOpen.status && isModalOpen.type === 'deleteSuccess'}
        onClose={() => setIsModalOpen({ status: false, type: '' })}
      />
    </div>
  )
}
