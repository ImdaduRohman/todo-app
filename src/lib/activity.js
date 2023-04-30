import axios from 'axios';

const BASE_URL = 'https://todo.api.devcode.gethired.id';

export const getAllActivity = async () => await axios
  .get(`${BASE_URL}/activity-groups?email=ir.imdadurohman@gmail.com`, {
  })
  .then((res) => res.data);

export const postActivity = async (data) => await axios
  .post(`${BASE_URL}/activity-groups`, data, {
  })
  .then((res) => res.data);

export const deleteActivity = async (id) => await axios
  .delete(`${BASE_URL}/activity-groups/${id}`)
  .then((res) => res.data)
  .catch((err) => err);

export const getDetailActivity = async (id) => {
  if (id !== null) {
    return await axios
      .get(`${BASE_URL}/activity-groups/${id}`)
      .then((res) => res.data);
  }
};

export const updateActivity = async (id, formData) => await axios
  .patch(`${BASE_URL}/activity-groups/${id}`, formData)
  .then((res) => res.data)
  .catch((err) => err);
