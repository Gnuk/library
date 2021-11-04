import { RestBook, toBook } from "@/infrastructure/secondary/RestBook";
import { Book } from "@/domain/Book";
import { ISBN } from "@/domain/ISBN";
import { Either, Err, Ok } from "@/domain/Either";

const restBook: RestBook = {
  "ISBN:9780321125217": {
    details: {
      number_of_pages: 529,
      authors: [{ name: "Eric Evans" }],
      title: "Domain-driven design",
      isbn_13: ["9780321125217"],
    },
  },
};

const bookWithBadISBN: RestBook = {
  "ISBN:9780321125217": {
    details: {
      number_of_pages: 529,
      authors: [{ name: "Eric Evans" }],
      title: "Domain-driven design",
      isbn_13: ["123"],
    },
  },
};

describe("RestBook", () => {
  it("Should convert to domain", () => {
    expect(toBook(restBook)).toEqual<Either<Error, Book>>(
      Ok.of({
        title: "Domain-driven design",
        author: "Eric Evans",
        isbn: ISBN.of("9780321125217"),
        pages: 529,
      })
    );
  });

  it("Should fail to convert invalid book", () => {
    expect(toBook(bookWithBadISBN)).toEqual<Either<Error, Book>>(
      Err.of(new Error("The ISBN size is not valid"))
    );
  });
});
