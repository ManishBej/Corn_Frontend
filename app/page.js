'use client';

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { cronJobsApi } from './api/api';

export default function Home() {
  const queryClient = useQueryClient();
  const { data: cronJobs, isLoading } = useQuery({
    queryKey: ['cronJobs'],
    queryFn: async () => {
      const { data } = await cronJobsApi.getAll();
      return data;
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (id) => cronJobsApi.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries(['cronJobs']);
    },
  });

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-100">Cron Jobs Manager</h1>
        <a 
          href="/create" 
          className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-lg transition-colors duration-200 flex items-center space-x-2 shadow-md"
        >
          <span className="text-lg">+</span>
          <span>New Cron Job</span>
        </a>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {cronJobs?.map((job) => (
          <div 
            key={job._id} 
            className="bg-white dark:bg-gray-800 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200 overflow-hidden border border-gray-200 dark:border-gray-700"
          >
            <div className="p-6">
              <div className="flex justify-between items-start mb-4">
                <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-100">{job.name}</h2>
                <span className={`px-2 py-1 rounded-full text-xs ${job.isActive ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                  {job.isActive ? 'Active' : 'Inactive'}
                </span>
              </div>
              
              <div className="space-y-2 mb-4">
                <p className="text-gray-600 dark:text-gray-300 text-sm flex items-center">
                  <span className="font-medium mr-2">Schedule:</span>
                  <code className="bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded">{job.schedule}</code>
                </p>
                <p className="text-gray-600 dark:text-gray-300 text-sm flex items-center">
                  <span className="font-medium mr-2">Link:</span>
                  <span className="truncate flex-1">{job.link}</span>
                </p>
                <p className="text-gray-600 dark:text-gray-300 text-sm flex items-center">
                  <span className="font-medium mr-2">Start Date:</span>
                  <span>{new Date(job.startDate).toLocaleDateString()}</span>
                </p>
              </div>

              <div className="flex space-x-3">
                <a
                  href={`/edit/${job._id}`}
                  className="flex-1 bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-200 px-4 py-2 rounded-md text-center transition-colors duration-200"
                >
                  Edit
                </a>
                <button
                  onClick={() => deleteMutation.mutate(job._id)}
                  className="flex-1 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md transition-colors duration-200"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
        {cronJobs?.length === 0 && (
          <div className="col-span-full text-center py-12">
            <p className="text-gray-500 dark:text-gray-400 text-lg">No cron jobs found. Create your first one!</p>
          </div>
        )}
      </div>
    </div>
  );
}
