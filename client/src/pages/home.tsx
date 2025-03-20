import { useState, useEffect } from 'react';
import { useQuery, useMutation } from '@tanstack/react-query';
import { apiRequest, queryClient } from '@/lib/queryClient';
import { type Book } from '@shared/schema';
import BookCard from '@/components/BookCard';
import BookForm from '@/components/BookForm';
import DeleteConfirmation from '@/components/DeleteConfirmation';
import { useToast } from '@/hooks/use-toast';
import Sidebar from '@/components/Sidebar';
import { Input } from '@/components/ui/input';
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Search, SlidersHorizontal, Plus } from 'lucide-react';

export default function Home() {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('title');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editingBook, setEditingBook] = useState<Book | null>(null);
  const [bookToDelete, setBookToDelete] = useState<Book | null>(null);
  const { toast } = useToast();

  // Query to fetch books
  const { data: books = [], isLoading } = useQuery({
    queryKey: ['/api/books'],
  });

  // Delete book mutation
  const deleteBookMutation = useMutation({
    mutationFn: async (id: number) => {
      await apiRequest('DELETE', `/api/books/${id}`);
      return id;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/books'] });
      toast({
        title: 'Book deleted',
        description: 'The book has been successfully deleted.',
      });
    },
    onError: (error) => {
      toast({
        title: 'Error',
        description: `Failed to delete book: ${error instanceof Error ? error.message : 'Unknown error'}`,
        variant: 'destructive',
      });
    },
  });

  // Filter and sort the books
  const filteredBooks = books
    .filter((book: Book) => {
      if (!searchTerm) return true;
      const term = searchTerm.toLowerCase();
      return (
        book.title.toLowerCase().includes(term) ||
        book.author.toLowerCase().includes(term) ||
        book.genre.toLowerCase().includes(term)
      );
    })
    .sort((a: Book, b: Book) => {
      switch (sortBy) {
        case 'title':
          return a.title.localeCompare(b.title);
        case 'author':
          return a.author.localeCompare(b.author);
        case 'year':
          return a.year - b.year;
        case 'genre':
          return a.genre.localeCompare(b.genre);
        default:
          return 0;
      }
    });

  const handleEdit = (book: Book) => {
    setEditingBook(book);
    setIsAddModalOpen(true);
  };

  const handleDelete = (book: Book) => {
    setBookToDelete(book);
  };

  const confirmDelete = () => {
    if (bookToDelete) {
      deleteBookMutation.mutate(bookToDelete.id);
      setBookToDelete(null);
    }
  };

  const handleFormClose = () => {
    setIsAddModalOpen(false);
    setEditingBook(null);
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      <Sidebar />
      
      <div className="flex-1 overflow-auto">
        {/* Header */}
        <header className="bg-white shadow-sm">
          <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between">
              <h1 className="text-xl font-semibold text-gray-900">Books Management</h1>
              <Button onClick={() => setIsAddModalOpen(true)} className="inline-flex items-center">
                <Plus className="h-5 w-5 mr-2" />
                Add Book
              </Button>
            </div>
          </div>
        </header>

        {/* Search and Filter */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="bg-white rounded-lg shadow p-4 mb-6">
            <div className="md:flex md:items-center md:justify-between">
              <div className="flex-1 min-w-0">
                <div className="relative rounded-md shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Search className="h-5 w-5 text-gray-400" />
                  </div>
                  <Input
                    type="text"
                    id="search"
                    className="block w-full pl-10 sm:text-sm"
                    placeholder="Search by title, author or genre..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
              </div>
              <div className="mt-4 flex items-center md:mt-0 md:ml-4">
                <div className="flex items-center space-x-2">
                  <label htmlFor="sort-by" className="text-sm font-medium text-gray-700 whitespace-nowrap">
                    Sort by:
                  </label>
                  <Select value={sortBy} onValueChange={setSortBy}>
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Sort by" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="title">Title</SelectItem>
                      <SelectItem value="author">Author</SelectItem>
                      <SelectItem value="year">Year</SelectItem>
                      <SelectItem value="genre">Genre</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="ml-3">
                  <Button variant="outline" size="sm" className="flex items-center">
                    <SlidersHorizontal className="h-4 w-4 mr-1" />
                    Filter
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Book List */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-8">
          {isLoading ? (
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {[...Array(4)].map((_, index) => (
                <div key={index} className="bg-white overflow-hidden shadow rounded-lg h-48 animate-pulse">
                  <div className="p-4 flex-1">
                    <div className="h-4 bg-gray-200 rounded mb-2 w-1/4"></div>
                    <div className="h-6 bg-gray-200 rounded mb-2"></div>
                    <div className="h-4 bg-gray-200 rounded mb-2 w-3/4"></div>
                    <div className="h-16 bg-gray-200 rounded"></div>
                  </div>
                </div>
              ))}
            </div>
          ) : filteredBooks.length === 0 ? (
            <div className="text-center py-10">
              <h3 className="text-lg font-medium text-gray-900">No books found</h3>
              <p className="mt-1 text-sm text-gray-500">
                {searchTerm ? "Try adjusting your search or filter criteria" : "Start by adding a new book"}
              </p>
              <div className="mt-6">
                <Button onClick={() => setIsAddModalOpen(true)}>
                  <Plus className="h-5 w-5 mr-2" />
                  Add Book
                </Button>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {filteredBooks.map((book: Book) => (
                <BookCard
                  key={book.id}
                  book={book}
                  onEdit={() => handleEdit(book)}
                  onDelete={() => handleDelete(book)}
                />
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Add/Edit Book Modal */}
      {isAddModalOpen && (
        <BookForm
          book={editingBook}
          isOpen={isAddModalOpen}
          onClose={handleFormClose}
        />
      )}

      {/* Delete Confirmation Modal */}
      {bookToDelete && (
        <DeleteConfirmation
          isOpen={!!bookToDelete}
          onClose={() => setBookToDelete(null)}
          onConfirm={confirmDelete}
          book={bookToDelete}
        />
      )}
    </div>
  );
}
