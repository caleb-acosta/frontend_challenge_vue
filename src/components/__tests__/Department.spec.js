import { describe, it, expect } from "vitest";
import { mount } from "@vue/test-utils";
import Department from "../Department.vue";

describe("Department Component", () => {
  it("calculates the right total allocation when add or delete children", async () => {
    const wrapper = createWrapper();

    // No children
    expect(wrapper.vm.totalAllocation).toBe(0);

    // Add manager
    await wrapper.find(".add-main").trigger("click");
    expect(wrapper.vm.totalAllocation).toBe(300);

    // Add manager
    await wrapper.find(".add-main").trigger("click");
    expect(wrapper.vm.totalAllocation).toBe(600);

    // Delete manager
    await wrapper
      .find(".employee:nth-child(1)")
      .findAll("[icon]")[1]
      .trigger("click");
    expect(wrapper.vm.totalAllocation).toBe(300);
  });
});

function createWrapper() {
  return mount(Department, {
    global: {
      mocks: {
        $helper: {
          current_id: 0,
          profilePic() {
            "";
          },
        },
      },
      stubs: { FontAwesomeIcon: true },
    },
  });
}
