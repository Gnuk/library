import { Book } from "@/domain/Book";
import { Either } from "@/domain/Either";

interface Books {
  get(): Promise<Either<Error, Book>>;
}
