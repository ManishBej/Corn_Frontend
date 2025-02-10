import Link from 'next/link';

export default function Navigation() {
  return (
    <nav className="bg-gray-900 text-white shadow-lg">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-8">
            <h1 className="text-xl font-bold">Cron Manager</h1>
            <div className="hidden md:flex space-x-6">
              <Link href="/" className="hover:text-blue-400 transition-colors py-2">
                Cron Jobs
              </Link>
              <Link href="/webhooks" className="hover:text-blue-400 transition-colors py-2">
                Webhooks
              </Link>
            </div>
          </div>
          <div className="md:hidden">
            <div className="space-x-4">
              <Link href="/" className="hover:text-blue-400 transition-colors py-2">
                Jobs
              </Link>
              <Link href="/webhooks" className="hover:text-blue-400 transition-colors py-2">
                Hooks
              </Link>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}