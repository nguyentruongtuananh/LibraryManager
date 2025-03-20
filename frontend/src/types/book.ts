// Types corresponding to FastAPI backend schemas

export interface Book {
  id: number;
  title: string;
  author: string;
  year: number;
  genre: string;
  description: string | null;
}

export interface BookCreate {
  title: string;
  author: string;
  year: number;
  genre: string;
  description?: string | null;
}

export interface BookUpdate {
  title?: string;
  author?: string;
  year?: number;
  genre?: string;
  description?: string | null;
}