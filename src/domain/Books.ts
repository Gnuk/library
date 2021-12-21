import { Book } from "@/domain/Book";
import { Either } from "@/domain/Either";

export interface Books {
  get(): Promise<Either<Error, Book>>;
}
