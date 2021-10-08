import { shallowMount } from "@vue/test-utils";
import { BookVue } from "@/infrastructure/primary/book";

describe("Book.vue", () => {
  it("exists", () => {
    const wrapper = shallowMount(BookVue);
    expect(wrapper.exists()).toBe(true);
  });
});
