import { ISBN } from "@/domain/ISBN";

export interface Book {
  isbn: ISBN;
  title: string;
  author: string;
  pages: number;
}
