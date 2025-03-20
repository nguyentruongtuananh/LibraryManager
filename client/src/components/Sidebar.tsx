import { Link, useRoute } from "wouter";
import { Home, Book, Tag, Settings } from "lucide-react";

export default function Sidebar() {
  const [isAtRoot] = useRoute("/");

  return (
    <div className="bg-white border-r border-gray-200 w-full md:w-64 flex-shrink-0 md:h-screen shadow-sm">
      <div className="p-4 border-b border-gray-200">
        <h1 className="text-xl font-semibold text-primary-600 flex items-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
          </svg>
          Book Manager
        </h1>
      </div>
      
      <nav className="p-4">
        <div className="space-y-1">
          <Link href="/">
            <a className={`flex items-center px-3 py-2 text-sm font-medium rounded-md ${isAtRoot ? "bg-primary-50 text-primary-700" : "text-gray-700 hover:bg-gray-100"}`}>
              <Home className="h-5 w-5 mr-2" />
              Dashboard
            </a>
          </Link>
          <Link href="/books">
            <a className="flex items-center px-3 py-2 text-sm font-medium rounded-md text-gray-700 hover:bg-gray-100">
              <Book className="h-5 w-5 mr-2" />
              All Books
            </a>
          </Link>
          <Link href="/categories">
            <a className="flex items-center px-3 py-2 text-sm font-medium rounded-md text-gray-700 hover:bg-gray-100">
              <Tag className="h-5 w-5 mr-2" />
              Categories
            </a>
          </Link>
          <Link href="/settings">
            <a className="flex items-center px-3 py-2 text-sm font-medium rounded-md text-gray-700 hover:bg-gray-100">
              <Settings className="h-5 w-5 mr-2" />
              Settings
            </a>
          </Link>
        </div>
      </nav>
      
      <div className="mt-auto p-4 border-t border-gray-200 hidden md:block">
        <div className="flex items-center">
          <div className="h-8 w-8 rounded-full bg-primary-100 text-primary-700 flex items-center justify-center">
            <span className="font-medium text-sm">JS</span>
          </div>
          <div className="ml-3">
            <p className="text-sm font-medium text-gray-700">John Smith</p>
            <p className="text-xs text-gray-500">admin@example.com</p>
          </div>
        </div>
      </div>
    </div>
  );
}
