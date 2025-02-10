import axios from 'axios';

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json'
  }
});

api.interceptors.response.use(
  response => response,
  error => {
    console.error('API Error:', error);
    return Promise.reject(error);
  }
);

export const cronJobsApi = {
  getAll: () => api.get('/cron-jobs'),
  getOne: (id) => api.get(`/cron-jobs/${id}`),
  create: (data) => api.post('/cron-jobs', data),
  update: (id, data) => api.put(`/cron-jobs/${id}`, data),
  delete: (id) => api.delete(`/cron-jobs/${id}`),
};

export const webhooksApi = {
  getAll: () => api.get('/webhooks'),
}