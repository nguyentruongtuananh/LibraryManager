import type { Express, Request, Response } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertBookSchema } from "@shared/schema";
import { fromZodError } from "zod-validation-error";

export async function registerRoutes(app: Express): Promise<Server> {
  // Books API routes
  app.get("/api/books", async (req: Request, res: Response) => {
    try {
      const books = await storage.getBooks();
      res.json(books);
    } catch (error) {
      console.error("Error fetching books:", error);
      res.status(500).json({ message: "Failed to fetch books" });
    }
  });

  app.get("/api/books/:id", async (req: Request, res: Response) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ message: "Invalid book ID" });
      }

      const book = await storage.getBook(id);
      if (!book) {
        return res.status(404).json({ message: "Book not found" });
      }

      res.json(book);
    } catch (error) {
      console.error("Error fetching book:", error);
      res.status(500).json({ message: "Failed to fetch book" });
    }
  });

  app.post("/api/books", async (req: Request, res: Response) => {
    try {
      const validateResult = insertBookSchema.safeParse(req.body);
      
      if (!validateResult.success) {
        const validationError = fromZodError(validateResult.error);
        return res.status(400).json({ 
          message: "Invalid book data", 
          errors: validationError.details 
        });
      }

      const newBook = await storage.createBook(validateResult.data);
      res.status(201).json(newBook);
    } catch (error) {
      console.error("Error creating book:", error);
      res.status(500).json({ message: "Failed to create book" });
    }
  });

  app.put("/api/books/:id", async (req: Request, res: Response) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ message: "Invalid book ID" });
      }

      const validateResult = insertBookSchema.partial().safeParse(req.body);
      
      if (!validateResult.success) {
        const validationError = fromZodError(validateResult.error);
        return res.status(400).json({ 
          message: "Invalid book data", 
          errors: validationError.details 
        });
      }

      const updatedBook = await storage.updateBook(id, validateResult.data);
      if (!updatedBook) {
        return res.status(404).json({ message: "Book not found" });
      }

      res.json(updatedBook);
    } catch (error) {
      console.error("Error updating book:", error);
      res.status(500).json({ message: "Failed to update book" });
    }
  });

  app.delete("/api/books/:id", async (req: Request, res: Response) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ message: "Invalid book ID" });
      }

      const result = await storage.deleteBook(id);
      if (!result) {
        return res.status(404).json({ message: "Book not found" });
      }

      res.status(204).end();
    } catch (error) {
      console.error("Error deleting book:", error);
      res.status(500).json({ message: "Failed to delete book" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
