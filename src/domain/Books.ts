import { Book } from "@/domain/Book";

interface Books {
  get(): Promise<Book>;
}
