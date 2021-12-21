import { shallowMount, Wrapper } from "@vue/test-utils";
import { BookComponent, BookVue } from "@/infrastructure/primary/book";
import { Books } from "@/domain/Books";
import sinon, { SinonStub } from "sinon";
import { Either } from "@/domain/Either";
import { Book } from "@/domain/Book";
import { ISBN } from "@/domain/ISBN";

let wrapper: Wrapper<BookComponent>;
let component: BookComponent;

interface BooksStub extends Books {
  get: SinonStub<[], Promise<Either<Error, Book>>>;
}

const stubBooks = (): BooksStub => ({
  get: sinon.stub(),
});

const defaultBooks = () => {
  const books = stubBooks();
  books.get.resolves(
    Either.ok({
      title: "Patterns, Principles, and Practices of Domain-Driven Design",
      isbn: ISBN.of("9781118714706"),
      pages: 705,
      author: "Scott Millet & Nick Tune",
    })
  );
  return books;
};

interface WrapOptions {
  books: Books;
}

const wrap = async (options: Partial<WrapOptions> = {}) => {
  const { books }: WrapOptions = {
    books: defaultBooks(),
    ...options,
  };
  wrapper = shallowMount<BookComponent>(BookVue, {
    provide: {
      books: () => books,
    },
  });
  component = wrapper.vm;
  await new Promise<void>((resolve) => setTimeout(() => resolve(), 0));
};

describe("Book.vue", () => {
  it("exists", async () => {
    await wrap();

    expect(wrapper.exists()).toBe(true);
  });

  it("Should render a book", async () => {
    await wrap();

    expect(component.title).toBe(
      "Patterns, Principles, and Practices of Domain-Driven Design"
    );
    expect(component.isbn).toBe("9781118714706");
  });

  it("Should not render a book when errors occurs", async () => {
    const books = defaultBooks();
    books.get.resolves(Either.err(new Error("Something wrong happens")));

    await wrap({
      books,
    });

    expect(component.error).toBe("Something wrong happens");
  });
});
