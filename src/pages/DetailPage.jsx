import { Link, useParams } from "react-router-dom";
import { getDetailActivity, updateActivity } from "../lib/activity";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { useEffect, useState } from "react";
import Button from "../components/Button";

export default function DetailPage() {
  const { id } = useParams();
  const queryClient = useQueryClient();


  const {
    // isLoading,
    // isError,
    // error,
    data: detailActivity,
  } = useQuery(['detailActivity', id], () =>
    getDetailActivity(id)
  );

  const [titleActivity, setTitleActivity] = useState('');

  useEffect(() => {
    setTitleActivity(detailActivity?.title)
}, [detailActivity]);

  console.log(titleActivity)

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

  const handleSubmit = (e) => {
    e.preventDefault();
    mutation.mutate({title: titleActivity});
  };

  return (
    <div className='bg-[#F4F4F4] min-h-screen'>
      <div className='px-[25px] md:px-[100px] lg:px-[150px] py-9'>
        <div className='flex justify-between mb-28'>
          <form onSubmit={handleSubmit} className='text-4xl leading-[54px] text-[#111111] font-bold flex items-center gap-6'>
            <Link to='/' data-cy='todo-back-button' >
              <img src='/images/todo-back-button.svg' alt='todo-back-button' />
            </Link>
            <input 
              data-cy='todo-title'
              type='text' 
              id='titleActivity' 
              value={titleActivity} 
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

      </div>    
    </div>
  )
}
