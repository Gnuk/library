import { Books } from "@/domain/Books";
import { Either } from "@/domain/Either";
import { Book } from "@/domain/Book";
import { AxiosInstance } from "axios";
import { RestBook, toBook } from "@/infrastructure/secondary/RestBook";

export class RestBooks implements Books {
  constructor(private readonly axiosInstance: AxiosInstance) {}

  get(): Promise<Either<Error, Book>> {
    return this.axiosInstance
      .get<RestBook>(
        "/api/books?bibkeys=ISBN:9780321125217&jscmd=details&format=json"
      )
      .then((response) => response.data)
      .then(toBook)
      .catch((error) => Promise.resolve(Either.err(error)));
  }
}
