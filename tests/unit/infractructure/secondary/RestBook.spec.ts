import { RestBook, toBook } from "@/infrastructure/secondary/RestBook";
import { Book } from "@/domain/Book";
import { ISBN } from "@/domain/ISBN";

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

describe("RestBook", () => {
  it("Should convert to domain", () => {
    expect(toBook(restBook)).toEqual<Book>({
      title: "Domain-driven design",
      author: "Eric Evans",
      isbn: ISBN.of("9780321125217"),
      pages: 529,
    });
  });
});
