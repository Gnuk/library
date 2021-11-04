import { Book } from "@/domain/Book";
import { ISBN } from "@/domain/ISBN";
import { Either } from "@/domain/Either";

interface RestAuthor {
  name: string;
}

interface RestBookDetails {
  authors: [RestAuthor];
  number_of_pages: number;
  title: string;
  isbn_13: [string];
}

interface RestBookItem {
  details: RestBookDetails;
}

export type RestBook = Record<string, RestBookItem>;

export const toBook = (restBook: RestBook): Either<Error, Book> => {
  const [item] = Object.values(restBook);
  const { details } = item;
  const {
    isbn_13: [isbn],
    title,
    number_of_pages,
    authors: [{ name }],
  } = details;

  return Either.tryFrom(() => ({
    isbn: ISBN.of(isbn),
    title,
    pages: number_of_pages,
    author: name,
  }));
};
