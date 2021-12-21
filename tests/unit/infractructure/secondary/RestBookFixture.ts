import { RestBook } from "@/infrastructure/secondary/RestBook";

export const restBook: RestBook = {
  "ISBN:9780321125217": {
    details: {
      number_of_pages: 529,
      authors: [{ name: "Eric Evans" }],
      title: "Domain-driven design",
      isbn_13: ["9780321125217"],
    },
  },
};

export const bookWithBadISBN: RestBook = {
  "ISBN:9780321125217": {
    details: {
      number_of_pages: 529,
      authors: [{ name: "Eric Evans" }],
      title: "Domain-driven design",
      isbn_13: ["123"],
    },
  },
};
