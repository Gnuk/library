import { RestBooks } from "@/infrastructure/secondary/RestBooks";
import { AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";
import sinon, { SinonStub } from "sinon";
import { RestBook, toBook } from "@/infrastructure/secondary/RestBook";
import { restBook } from "./RestBookFixture";
import { Either, Err, Ok } from "@/domain/Either";
import { Book } from "@/domain/Book";
import { ISBN } from "@/domain/ISBN";

interface AxiosInstanceStub extends AxiosInstance {
  get: SinonStub;
}

const stubAxiosInstance = (): AxiosInstanceStub =>
  ({
    get: sinon.stub(),
  } as AxiosInstanceStub);

describe("RestBooks", () => {
  it("Should get book", async () => {
    const axiosInstance = stubAxiosInstance();
    const response: AxiosResponse<RestBook> = {
      data: restBook,
    } as AxiosResponse<RestBook>;
    axiosInstance.get.resolves(response);
    const repository = new RestBooks(axiosInstance);

    const eitherBook = await repository.get();

    expect(axiosInstance.get.getCall(0).args).toContain(
      "/api/books?bibkeys=ISBN:9780321125217&jscmd=details&format=json"
    );
    expect(eitherBook).toEqual<Either<Error, Book>>(
      Ok.of({
        title: "Domain-driven design",
        author: "Eric Evans",
        isbn: ISBN.of("9780321125217"),
        pages: 529,
      })
    );
  });

  it("Should error on rejection", async () => {
    const axiosInstance = stubAxiosInstance();
    axiosInstance.get.rejects(new Error("Network error"));
    const repository = new RestBooks(axiosInstance);

    const eitherBook = await repository.get();

    expect(eitherBook).toEqual<Either<Error, Book>>(
      Err.of(new Error("Network error"))
    );
  });
});
