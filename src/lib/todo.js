import axios from 'axios';

const BASE_URL = 'https://todo.api.devcode.gethired.id';

export const getAllTodo = async (id) => await axios
  .get(`${BASE_URL}/todo-items?activity_group_id=${id}`, {
  })
  .then((res) => res.data);

export const updateTodo = async (id, formData) => await axios
  .patch(`${BASE_URL}/todo-items/${id}`, formData)
  .then((res) => res.data)
  .catch((err) => err);

export const getDetailTodo = async (id) => {
  if (id !== null) {
    return await axios
      .get(`${BASE_URL}/todo-items/${id}`)
      .then((res) => res.data);
  }
};

export const deleteTodo = async (id) => await axios
  .delete(`${BASE_URL}/todo-items/${id}`)
  .then((res) => res.data)
  .catch((err) => err);