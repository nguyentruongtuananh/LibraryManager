import { Book } from '@shared/schema';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Pencil, Trash2 } from 'lucide-react';

interface BookCardProps {
  book: Book;
  onEdit: () => void;
  onDelete: () => void;
}

// Function to get genre-specific colors
const getGenreStyles = (genre: string) => {
  const genreMap: Record<string, { bg: string; text: string }> = {
    'Fiction': { bg: 'bg-primary-50', text: 'text-primary-700' },
    'Fantasy': { bg: 'bg-purple-50', text: 'text-secondary-500' },
    'Romance': { bg: 'bg-pink-50', text: 'text-pink-600' },
    'Science': { bg: 'bg-green-50', text: 'text-green-700' },
    'Mystery': { bg: 'bg-orange-50', text: 'text-orange-700' },
    'Biography': { bg: 'bg-gray-100', text: 'text-gray-700' },
    'Philosophy': { bg: 'bg-indigo-50', text: 'text-indigo-700' },
    'Horror': { bg: 'bg-red-50', text: 'text-red-700' },
  };

  return genreMap[genre] || { bg: 'bg-gray-100', text: 'text-gray-700' };
};

export default function BookCard({ book, onEdit, onDelete }: BookCardProps) {
  const genreStyles = getGenreStyles(book.genre);

  return (
    <div className="bg-white overflow-hidden shadow rounded-lg flex flex-col">
      <div className="p-4 flex-1">
        <div className={`text-xs font-medium ${genreStyles.text} ${genreStyles.bg} rounded px-2 py-1 inline-block mb-2`}>
          {book.genre}
        </div>
        <h3 className="text-lg font-semibold text-gray-900 mb-1">{book.title}</h3>
        <p className="text-sm text-gray-600 mb-2">{book.author} • {book.year}</p>
        <p className="text-sm text-gray-500 line-clamp-3">
          {book.description || "No description available."}
        </p>
      </div>
      <div className="border-t border-gray-200 px-4 py-3 bg-gray-50 flex justify-between">
        <Button 
          variant="ghost" 
          size="sm" 
          onClick={onEdit}
          className="text-sm text-gray-700 hover:text-primary-700 flex items-center"
        >
          <Pencil className="h-4 w-4 mr-1" />
          Edit
        </Button>
        <Button 
          variant="ghost" 
          size="sm" 
          onClick={onDelete}
          className="text-sm text-red-600 hover:text-red-800 flex items-center"
        >
          <Trash2 className="h-4 w-4 mr-1" />
          Delete
        </Button>
      </div>
    </div>
  );
}
