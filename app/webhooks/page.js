'use client';

import { useQuery } from '@tanstack/react-query';
import { webhooksApi } from '../api/api';
import '../page.module.css';

export default function WebhooksPage() {
  const { data: webhooks, isLoading } = useQuery({
    queryKey: ['webhooks'],
    queryFn: async () => {
      const { data } = await webhooksApi.getAll();
      return data;
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
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-100">Webhook History</h1>
        <p className="mt-2 text-gray-600 dark:text-gray-400">View all incoming webhook data and responses.</p>
      </div>

      <div className="grid gap-6">
        {webhooks?.map((webhook) => (
          <div 
            key={webhook._id} 
            className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 border border-gray-200 dark:border-gray-700"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-2">
                <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                <span className="text-sm font-medium text-gray-500 dark:text-gray-400">
                  Webhook received
                </span>
              </div>
              <time className="text-sm text-gray-500 dark:text-gray-400">
                {new Date(webhook.createdAt).toLocaleString()}
              </time>
            </div>
            
            <div className="space-y-4">
              {webhook.cronJobId && (
                <div className="text-sm">
                  <span className="font-medium text-gray-700 dark:text-gray-300">Cron Job ID: </span>
                  <code className="bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded text-gray-800 dark:text-gray-200">
                    {webhook.cronJobId}
                  </code>
                </div>
              )}
              
              <div className="relative">
                <pre className="bg-gray-50 dark:bg-gray-900 p-4 rounded-lg overflow-auto max-h-96 text-sm">
                  <code className="text-gray-800 dark:text-gray-200">
                    {JSON.stringify(webhook.data, null, 2)}
                  </code>
                </pre>
              </div>
            </div>
          </div>
        ))}
        
        {webhooks?.length === 0 && (
          <div className="text-center py-12 bg-white dark:bg-gray-800 rounded-lg shadow-md">
            <p className="text-gray-500 dark:text-gray-400 text-lg">No webhook data received yet.</p>
            <p className="text-gray-400 dark:text-gray-500 mt-2">Webhook events will appear here when received.</p>
          </div>
        )}
      </div>
    </div>
  );
}