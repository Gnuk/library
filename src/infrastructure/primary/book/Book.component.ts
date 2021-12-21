import { Component, Inject, Vue } from "vue-property-decorator";
import { Books } from "@/domain/Books";

@Component
export default class BookComponent extends Vue {
  @Inject()
  private books!: () => Books;

  title = "";
  isbn = "";
  error = "";

  created(): void {
    this.resolve();
  }

  private async resolve(): Promise<void> {
    const eitherBook = await this.books().get();
    eitherBook.evaluate(
      (err) => (this.error = err.message),
      (book) => {
        this.title = book.title;
        this.isbn = book.isbn.get();
      }
    );
  }
}
