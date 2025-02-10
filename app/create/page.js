'use client';

import { useForm } from 'react-hook-form';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { cronJobsApi } from '../api/api';
import { useRouter } from 'next/navigation';

export default function CreateCronJob() {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { register, handleSubmit, formState: { errors } } = useForm();

  const createMutation = useMutation({
    mutationFn: (data) => cronJobsApi.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries(['cronJobs']);
      router.push('/');
    },
  });

  const onSubmit = (data) => {
    createMutation.mutate(data);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-2xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-100">Create New Cron Job</h1>
          <p className="mt-2 text-gray-600 dark:text-gray-400">Set up a new scheduled task with the details below.</p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Name</label>
            <input
              {...register('name', { required: 'Name is required' })}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              placeholder="e.g., Daily Backup"
            />
            {errors.name && <p className="mt-1 text-sm text-red-500">{errors.name.message}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Link to trigger</label>
            <input
              {...register('link', { required: 'Link is required' })}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              placeholder="https://api.example.com/endpoint"
            />
            {errors.link && <p className="mt-1 text-sm text-red-500">{errors.link.message}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">API Key</label>
            <input
              type="password"
              {...register('apiKey', { required: 'API Key is required' })}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              placeholder="Enter your API key"
            />
            {errors.apiKey && <p className="mt-1 text-sm text-red-500">{errors.apiKey.message}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Schedule (Cron Expression)</label>
            <input
              {...register('schedule', { required: 'Schedule is required' })}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              placeholder="* * * * *"
            />
            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">Format: minute hour day month weekday</p>
            {errors.schedule && <p className="mt-1 text-sm text-red-500">{errors.schedule.message}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Start Date</label>
            <input
              type="datetime-local"
              {...register('startDate', { required: 'Start Date is required' })}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            />
            {errors.startDate && <p className="mt-1 text-sm text-red-500">{errors.startDate.message}</p>}
          </div>

          <div className="flex space-x-4 pt-4">
            <button
              type="submit"
              className="flex-1 bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-lg transition-colors duration-200 disabled:opacity-50"
              disabled={createMutation.isLoading}
            >
              {createMutation.isLoading ? 'Creating...' : 'Create Cron Job'}
            </button>
            <button
              type="button"
              onClick={() => router.push('/')}
              className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 dark:bg-gray-700 dark:hover:bg-gray-600 dark:text-gray-200 py-2 px-4 rounded-lg transition-colors duration-200"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}